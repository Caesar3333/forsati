Act as a senior full-stack engineer and motion-graphics pipeline architect. Build **"Ma La Yuqal Studio"** — a single-page, fully client-side web app that turns an Arabic podcast recording into a finished, branded vertical video, and that also writes chained, continuity-safe shot prompts for Google Flow (Veo 3.1). Use **React 18 + TypeScript + Vite + TailwindCSS + Zustand**, **@ffmpeg/ffmpeg 0.12.x (FFmpeg.wasm)** for all media processing, **IndexedDB/OPFS** for local storage, and optionally the **Gemini API** (user-supplied key, never hard-coded) for transcription and prompt writing. No backend: all media stays on the user's device.

Deliver working code, not a mock. Where a step is hard (Arabic text, memory limits, sync), implement the exact mechanisms specified below.

---

## 0. Product summary

The user brings: one master voice track, an SRT (or lets the app make one), reference photos of the host, a brand kit, and video clips (A-roll = host talking at the mic, B-roll = motion graphics or generated shots). The app:
1. Plans the edit (scenes on a timeline locked to the master audio).
2. Writes Google Flow prompts per shot, each chained to the last frame of the previous shot.
3. Assembles the final video with FFmpeg.wasm: conform, mute clips, lay the master audio, burn Arabic captions, add logo/intro/outro, transitions, loudness, export presets.
4. Forces human review at every gate, with an identity checklist.

UI language: **Arabic first, RTL** (`<html dir="rtl" lang="ar">`), with an English toggle. Dark theme.

---

## 1. Inputs (Upload & Project panel)

| input | formats | rules |
|---|---|---|
| Master audio (exactly 1) | .mp3 .wav .m4a | The only audio in the final video. Show waveform, duration, integrated loudness (measured, §6). |
| Subtitles (0–1) | .srt .vtt | Parse to cards. If absent → "Generate" via Gemini (§4.1) or manual entry. |
| A-roll clips (0–n) | .mp4 .mov .webm | Host talking. Each must be mapped to a time range of the master audio. |
| B-roll clips (0–n) | .mp4 .mov .webm .png .jpg | Motion graphics, generated shots, stills (stills get a Ken-Burns move). |
| Identity references | .jpg .png | Tag each as `face` / `mouth-detail` / `full-body` / `style`. |
| Brand kit | form + files | See §2. Import/export as JSON. |
| Logo | .svg .png (transparent) | Used for intro sting, corner bug, outro. If none, render text logo in the logo font. |
| Fonts | .ttf .otf .woff2 | Body font, emphasis weight, logo font. Stored in IndexedDB and written into FFmpeg's FS. |
| Music / SFX (optional) | .mp3 .wav | Music bed (ducked) and SFX library with tags. |
| Project template (optional) | .json | Restores brand + scene recipes + prompt templates (§9). |

Validate on upload with `ffprobe`-style probing via FFmpeg.wasm (`-i file -f null -` and parse stderr): duration, fps, resolution, rotation, audio presence, pixel format. Warn if fps ≠ project fps, if a clip is landscape in a 9:16 project, or if a still is under 1080 px wide.

---

## 2. Brand kit (defaults = «ما لا يُقال»)

```json
{
  "name": "ما لا يُقال",
  "host": "همام ديك",
  "colors": { "bg": "#0B0D10", "bg2": "#10181B", "text": "#EDE6D6", "accent": "#B8835A", "muted": "#9A9590" },
  "fonts": { "body": "IBM Plex Sans Arabic", "bodyWeight": 300, "emphasisWeight": 600, "logo": "Aref Ruqaa" },
  "identity": "short dark hair with receding temples, trimmed beard, moustache with goatee, grey hairs in the beard, small dark mole above the LEFT corner of the upper lip (image-right when facing camera), natural skin, not beautified",
  "look": "muted teal-black shadows, warm amber practical light, desaturated palette, soft film grain, Kodak Vision3 500T look, anamorphic lens, shallow depth of field",
  "motionRules": ["no bounce", "no shake", "no neon", "no bright yellow/red", "expo-out easing", "mask reveals", "slow 2–8% push-ins"],
  "safeZone": { "bottomPct": 20, "rightPx": 120 },
  "loudness": { "integratedLUFS": -14, "truePeakDBTP": -1 }
}
```
Every colour, font and rule is editable; the brand is applied everywhere (captions, logo, prompts, exports).

---

## 3. Data model (single source of truth, persisted to IndexedDB, exportable as JSON)

```ts
type Seconds = number;
interface Project {
  id: string; name: string; fps: 30; aspect: '9:16' | '16:9' | '1:1';
  width: number; height: number;              // 1080x1920 for 9:16
  brand: Brand; masterAudioId: string; durationSec: Seconds;
  cards: CaptionCard[];                       // from SRT or generated
  scenes: Scene[];                            // ordered, contiguous, cover [0, duration]
  templates: PromptTemplate[]; reviews: Review[]; exports: ExportJob[];
}
interface CaptionCard { id: string; start: Seconds; end: Seconds; text: string; emphasis?: string; uncertain?: boolean }
interface Scene {
  id: string; kind: 'aroll' | 'broll' | 'still' | 'title' | 'logo';
  tlStart: Seconds; tlEnd: Seconds;           // position on the master-audio timeline
  clipId?: string; clipIn?: Seconds;          // source trim
  speed?: number;                             // 1 = real time; A-roll must stay 1
  transitionIn: 'cut' | 'dissolve' | 'zoomblur' | 'lightsweep'; transitionDur: Seconds;
  captionMode: 'lower' | 'center-big' | 'none';
  motion?: 'pushin' | 'pullback' | 'hold';    // for stills
  shot?: FlowShot;                            // the generation recipe, §5
  status: 'planned' | 'prompted' | 'generated' | 'approved' | 'rejected';
}
```
Invariants enforced in the store: scenes are sorted, contiguous, non-overlapping and exactly cover `[0, durationSec]`; A-roll speed is always 1; any change re-validates and shows conflicts in red.

---

## 4. Planning

### 4.1 Transcript (optional Gemini step)
- If no SRT: send the master audio to Gemini (model selectable, key from the user, stored in `localStorage` only on opt-in) with an instruction to return JSON `[{start,end,text}]` in **Levantine Arabic exactly as spoken, no paraphrase, no translation**, phrase-level at natural pauses.
- Show a transcript editor; words the model is unsure of are flagged `uncertain` and highlighted. The user must clear all flags before the storyboard gate.
- Card splitter: max 8 words per card, never a single-word card, split at «…», «؟», «:».

### 4.2 Auto-storyboard
- "Suggest structure" button: proposes A-roll / B-roll scenes (target ratio slider, default 57 % A-roll), places strongest lines (user-starrable cards) into B-roll moments, and proposes an optional cold-open teaser (a 5–8 s B-roll moment duplicated before the episode, with a 1.5 s logo sting).
- Timeline UI: horizontal track with the waveform, caption cards, and scene blocks; drag edges to retime (snaps to card boundaries and to silences detected by `silencedetect=noise=-35dB:d=0.4`), drag to reorder B-roll, double-click to edit.
- Show totals: duration, A/B ratio, number of shots to generate, estimated Flow credits (user-editable cost per shot).

---

## 5. Google Flow prompt builder (chained continuity)

Each scene that needs generation gets a `FlowShot`:
```ts
interface FlowShot {
  mode: 'text-to-video' | 'frames-to-video' | 'ingredients-to-video' | 'extend';
  durationSec: 8;                       // Veo 3.1 clip length; longer scenes = chained shots
  aspect: '9:16' | '16:9';
  ingredients: string[];                // reference image ids (identity + style)
  firstFrameFrom?: string;              // previous shot id → its extracted last frame
  prompt: string;                       // rendered from a template
  dialogue?: string;                    // exact Arabic line for talking shots
  audioNote: 'mute-in-edit';            // generated audio is never used
}
```

### 5.1 Chaining rule ("start from the last shot of the previous video")
- When the user imports the generated clip for shot N, the app extracts its last frame:
  `ffmpeg -sseof -0.1 -i shotN.mp4 -frames:v 1 -q:v 2 shotN_last.jpg`
- Shot N+1 is switched to `frames-to-video` with `shotN_last.jpg` as **First Frame** (keep the same ingredients), and its prompt gets the continuity clause (below). Scenes longer than 8 s are split into a chain of 8 s shots automatically; the user can choose `extend` instead when Flow's Extend fits better.
- A "Continuity board" view shows each shot's last frame next to the next shot's first frame for a visual check.

### 5.2 Prompt template (editable, with variables)
```
{shot_size}, vertical {aspect}. {subject_identity_ref} {action_one_beat}.
Setting: {setting}. Light: {light}. Camera: {camera_move}. Mood: {mood}.
{continuity_clause}
{dialogue_or_ambience}
Style: {brand.look}. Leave calm empty space {negative_space} for on-screen text.
Keep exactly: {brand.identity}. No text, no logos, no subtitles in the image.
```
- `{continuity_clause}` = "Begin exactly from the provided first frame: same person, same clothes, same set, same lighting and lens; continue the motion naturally with no cut." (empty for the first shot).
- `{dialogue_or_ambience}` = for A-roll: `He says in Levantine Arabic, calm and slow: "{dialogue}"` + "(audio will be replaced; lip movement only)"; for B-roll: `No dialogue, {ambience}`.
- `{subject_identity_ref}` = "The same man from the reference images" when identity ingredients are attached.
- Template library per scene type (podcast-front, podcast-side, podcast-wide, b-roll-symbolic, still-push-in); user can duplicate, edit, rename, set default; templates live in the project JSON.
- Buttons per shot: **Copy prompt**, **Copy all prompts (numbered)**, **Download shot list (.md/.csv)**, **Open Flow** (link to labs.google/flow).
- Optional "Polish with Gemini": rewrites only the descriptive parts; never touches `{dialogue}` or identity text.

### 5.3 Lip-sync path (real voice)
For A-roll the app exports the master-audio slice per scene (`-ss tlStart -to tlEnd`, 40 ms fades, ≤ 30 s per file) plus the chosen studio still, named `A01_000.00-016.13.wav`, so the user can lip-sync in an image+audio tool (OmniHuman / HeyGen Avatar IV / Hedra). Imported results snap back to their scene by filename.

---

## 6. Assembly engine (FFmpeg.wasm)

### 6.1 Setup
- Load `@ffmpeg/core-mt` when `crossOriginIsolated` is true (serve with `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: require-corp`; include a `vite.config.ts` and a `_headers`/`vercel.json` example), else fall back to single-thread `@ffmpeg/core`. Show which one is active.
- Write fonts into the FS at `/fonts/` and logo/assets at `/assets/`.
- **Arabic self-test on startup:** render one frame with the subtitles filter and the Arabic test string «من متى أنا هيك؟» and compare pixel coverage against a canvas render of the same string. If the build lacks libass/harfbuzz/fribidi, or the letters render disconnected, automatically switch captions to **Canvas overlay mode** (§6.4).
- Memory: never load a whole 5-minute 1080p project at once. Process **per scene**, write intermediates, then concat. Delete FS files as soon as they are consumed. Show a memory meter.

### 6.2 Per-scene normalisation (each scene → `seg_XXX.mp4`, video only)
```
-ss {clipIn} -t {tlEnd-tlStart} -i clip
-vf "scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},fps=30,setsar=1,
     eq=brightness=-0.03:contrast=1.06:saturation=0.85, format=yuv420p"
-an -c:v libx264 -preset {veryfast|medium} -crf {23|18}
```
- Stills: `-loop 1 -t dur -i img` + `zoompan=z='1+0.06*on/{frames}':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d={frames}:s={W}x{H}:fps=30` (pre-scale the still to 2× to avoid jitter).
- If a clip is shorter than its scene: freeze the last frame with `tpad=stop_mode=clone:stop_duration=X` and warn; if longer: trim. The total must equal the master duration to the frame.

### 6.3 Concatenate with transitions
- Cuts: concat demuxer (`-f concat -safe 0 -i list.txt -c copy`).
- Dissolve / zoom-blur: `xfade=transition=fade|zoomin:duration=d:offset=o` chained; compute every `offset` from `tlStart` so sync never drifts (extend each outgoing segment by `d` before xfade).
- Light-sweep: overlay a pre-rendered transparent PNG sequence (generated on a canvas in the brand accent colour) at the cut time.

### 6.4 Captions
**ASS mode (preferred if the self-test passes):** generate `captions.ass` from the cards:
```
[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
WrapStyle: 0
[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Lower,IBM Plex Sans Arabic,64,&H00D6E6ED,&H00D6E6ED,&H64000000,&H96000000,0,0,0,0,100,100,0,0,1,0,6,2,90,90,560,178
Style: Big,IBM Plex Sans Arabic,100,&H00D6E6ED,&H00D6E6ED,&H64000000,&H96000000,0,0,0,0,100,100,0,0,1,0,8,5,90,90,0,178
[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
Dialogue: 0,0:00:51.46,0:00:54.51,Lower,,0,0,0,,{\fad(250,200)}المشكلة إنّا مرّات منضل عايشين جوّا {\b1\c&H005A83B8&}تفسير قديم{\b0\c&H00D6E6ED&}
```
- ASS colours are **&HAABBGGRR** (BGR!): ivory #EDE6D6 → `&H00D6E6ED`, copper #B8835A → `&H005A83B8`. Encoding 178 = Arabic.
- Burn with `subtitles=captions.ass:fontsdir=/fonts`. Never add `Spacing` > 0 for Arabic.
- Scene `captionMode` picks the style; `none` skips cards in that range.

**Canvas overlay mode (fallback, and for animated "calm karaoke"):** render each card in the browser on an OffscreenCanvas (the browser shapes Arabic correctly) at 1080×1920 with transparency: phrase at 55 % opacity, each word rising to 100 % at its time (word times = card span split by letter count), 500 ms blur-in + 8 px rise, emphasis word in accent SemiBold with an underline that draws in. Export as a transparent PNG sequence or a VP9-alpha WebM per card, then `overlay=enable='between(t,{start},{end})'`. Set `direction='rtl'` on the canvas context; never draw letter by letter.

### 6.5 Logo, intro, outro, bug
- Optional cold-open teaser + 1.5 s logo sting (logo mask-wipe right→left + accent line) prepended; all timeline offsets shift accordingly (handled in the timeline model, not by hand).
- Corner bug: logo at 0.7 opacity, top-right, A-roll scenes only.
- Outro: logo reveal over the brand background with dust particles (canvas-rendered clip), host name under it in the body font, fade out.

### 6.6 Audio
```
-i video_no_audio.mp4 -i master.wav [-i music.wav] [-i sfx...]
-filter_complex "
 [2:a]volume=0.18[m];
 [m][1:a]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=400[mduck];
 [1:a][mduck]{sfx mixes}amix=inputs=N:normalize=0,alimiter=limit=0.89[a]"
-map 0:v -map "[a]" -shortest
```
- Original clip audio is always dropped (`-an` at segment stage).
- Optional "silence after key line" toggle: music and SFX gated to zero for a chosen range (`volume=enable='between(t,a,b)':volume=0`).
- Final loudness: two-pass `loudnorm=I=-14:TP=-1:LRA=7` (measure pass parses JSON from stderr, apply pass uses `measured_*`).

### 6.7 Export presets
| preset | settings |
|---|---|
| Final 9:16 | 1080×1920, H.264 high@4.1, `-vf ...,scale=out_range=tv,format=yuv420p`, `-colorspace bt709 -color_primaries bt709 -color_trc bt709 -color_range tv`, 6–8 Mbps, AAC 192 k, `-movflags +faststart` |
| Phone preview | 720×1280, 1.8–2.5 Mbps, under 20 MB |
| Clean | same, no captions |
| 16:9 | 1920×1080 re-layout (A-roll centred crop or blurred side pads; Big captions re-flowed) |
| Shorts | user-selected ranges, each starting with its own hook |
| Cover | single frame + headline text from a card, key text inside the centre 4:5 area |
Also export: SRT, ASS, project JSON, shot list.

---

## 7. Review gates (cannot be skipped; each logs who/when/notes)

1. **Transcript gate:** all `uncertain` words cleared; spelling reviewed; dialect kept.
2. **Storyboard gate:** timeline covers the full duration; A/B ratio and key-line placement approved.
3. **Shot gate (per generated clip):** checklist — face matches references · beard + goatee correct · **mole above the left corner of the upper lip, on image-right** · mouth not covered by the mic · no text/logos in image · continuity with previous last frame · motion calm. Reject → regenerate with notes appended to the prompt.
4. **Rough-cut gate:** 480p fast render (`-preset ultrafast -crf 30`) with timecode burn-in; comments pinned to timestamps.
5. **Final QC (automatic + human):** duration equals master ±1 frame; `ebur128` integrated −14 ±0.5 LUFS and TP ≤ −1; `blackdetect` finds no unintended black; captions never in the bottom 20 % or over a detected face (optional face detection via the browser's FaceDetector API or MediaPipe); file opens on mobile (yuv420p, tv range). Show a QC report; failing items block "Approve final".

---

## 8. UX
- Layout: left = media bin (A-roll, B-roll, stills, refs, audio), centre = player + timeline, right = inspector (scene, captions, prompt, brand).
- Keyboard: space play/pause, J/K/L shuttle, S split scene, [ ] trim to playhead.
- Progress: per-step progress from FFmpeg `progress` events with ETA; cancel button (`ffmpeg.terminate()`), resumable jobs (intermediates kept in OPFS).
- Every destructive action has undo (Zustand history).
- Toasts in Arabic; errors show the FFmpeg command and the last 30 log lines.

---

## 9. Templates & extensibility
- **Project template** = brand + scene recipes + prompt templates + caption styles + export presets, saved/loaded as JSON. Ship the «ما لا يُقال» template as default.
- **Scene recipes** (reusable B-roll designs) defined declaratively, e.g.:
```json
{ "id": "label-stack", "duration": "auto", "captionMode": "none",
  "layers": [ {"type": "still", "src": "{ref:mirror}", "filter": "blur(10px) brightness(.35)"},
              {"type": "cards", "from": "cards[style=label]", "stack": "vertical", "strikeAt": "lastWord+0.45", "fall": true} ] }
```
  rendered by a small canvas renderer to a transparent clip, then composited by FFmpeg. Include at least: `big-type`, `old-photo-burn`, `label-stack`, `pull-back-words`, `climax-word`, `strike-and-highlight`, `logo-reveal`.
- Add/edit/remove any scene, card, template, font or preset without code; all changes re-validate the timeline.

---

## 10. Acceptance tests (implement as a "Run self-tests" page)
1. Arabic caption «من متى أنا هيك؟» renders with joined letters in both caption modes.
2. A 65 s project (1 master audio, 4 A-roll, 6 B-roll, 1 SRT) renders a 9:16 file whose duration equals the audio, audio is the master only, captions appear at the SRT times ±1 frame.
3. Extracted last frame of shot N is byte-identical to the image attached as first frame of shot N+1.
4. Loudness of the final file is −14 ±0.5 LUFS, true peak ≤ −1 dBTP.
5. Final file is yuv420p, bt709, tv range, faststart, and plays in iOS Safari.
6. Project JSON round-trips (export → import) with no loss.

Ship: source code with a README (install, run, COOP/COEP hosting notes, browser support: latest Chrome/Edge desktop recommended; Safari limits noted), and the default «ما لا يُقال» template pre-loaded.

---

## 11. Generator profile: Google Flow (Omni 1.1 Flash / Veo 3.1) — add as a selectable "Tool profile"

- **Model selector** per shot: `Omni 1.1 Flash` (default), `Veo 3.1 Quality`, `Veo 3.1 Fast`; store per-model clip length (8 s default) and per-shot credit cost.
- **Reference IDs:** each identity reference can store a tool-specific `media_id` (e.g. the approved character image ID inside Flow). Prompts insert `{REF_ID}`; if no ID is stored, the shot card tells the user to attach the image as an Ingredient instead.
- **Continuity modes:** `ingredients` (first shot of a scene), `frames` (first frame = last frame of previous shot, §5.1), `extend` (Flow's Extend), and `lineage/edit` (re-generate or edit an existing clip while keeping its motion lineage). The UI records which parent clip each shot descends from and draws the chain.
- **Locks (applied to every A-roll prompt, editable once per project, never per shot):**
  `{WARDROBE}` one outfit for the whole episode (e.g. "a dark charcoal turtleneck under a dark camel blazer");
  `{SET}` "dark mahogany podcast studio, burnt-walnut desk, black broadcast microphone on a boom arm beside his mouth (never covering it), shelves of books softly out of focus, warm amber tungsten practical lamp, gentle haze";
  `{IDENTITY}` brand.identity (always includes the goatee and the mole above the LEFT corner of the upper lip, image-right).
  Changing a lock flags every already-generated shot as "needs regeneration".
- **Five-element prompt schema** (the template editor shows five required fields and refuses to render a prompt with an empty one):
  1. Subject & character — who, from which reference, wearing `{WARDROBE}`.
  2. Composition & camera — shot size, angle, lens, one camera move.
  3. Action & performance — calm, specific, no exaggeration; for A-roll: subtle head tilts, slow blinks, restrained gestures, natural lip movement + the exact Arabic line.
  4. Lighting & atmosphere — `{SET}` + brand.look.
  5. Style & constraints — photorealistic cinematic; "No on-screen text, no subtitles, no logos"; for B-roll also "No readable letters or numbers anywhere".
- **Arabic typography is never requested from the video model.** All Arabic text comes from the SRT and the caption/scene-recipe renderer (§6.4, §9).
- **Episode shot pack import:** accept a shot list (Markdown/CSV/JSON with `id, tlStart, tlEnd, mode, parent, prompt, dialogue`) such as `full/FLOW_SHOTS_FULL.md` (51 shots: A01–A13 split into ≤ 8 s chained shots, B01–B15), and create the scenes and FlowShots from it.

## 12. Style presets, one-command wardrobe swap, face-ID swap
- **Style preset from reference stills:** the user uploads 1–3 approved studio stills (default: `refs/style/studio_front.jpg`, `refs/style/studio_side.jpg`). The preset stores `SET` (walnut slat wall, book shelves, amber globe Edison lamp, light walnut desk, black dynamic mic on a boom arm at chin height, warm key from camera-left, f/2) and `WARDROBE` (default: "a navy-blue unstructured wool blazer over a heather-grey crew-neck t-shirt").
- **Tagged slots inside every prompt:** `[FACE: …]` and `[WARDROBE: …]` are rendered as literal tagged segments, so a change is a single operation:
  - **Change wardrobe** (one input field + "Apply to all"): rewrites every prompt's `[WARDROBE: …]`, marks generated shots as stale, and offers a per-shot Flow *edit* prompt: "Edit this shot. Change ONLY his clothes to: {new}. Keep exactly the same face, beard, goatee and the mole above the left corner of his upper lip, the same pose, gestures, lip movement, camera, framing, studio, microphone, lamp, lighting and timing."
  - **Change face ID** (new `media_id` or new reference image): rewrites `[FACE: …]` everywhere and asks the user to confirm or edit the identity description (so the old person's features don't leak into prompts); offers the matching Flow edit prompt that keeps clothes, pose, set and timing.
- **Presets library:** save/load several presets (e.g. "Studio — navy blazer", "Studio — black tee"); switching preset re-renders all prompts and the stale list.
