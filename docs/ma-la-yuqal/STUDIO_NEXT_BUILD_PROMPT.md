Thank you for the honest audit. Here are my decisions, the missing Section 13, a complete IMPORT / EXPORT specification, and the build order. Implement PHASE 1 only in this turn, then stop and report using the same audit format (feature matrix rows touched + PASS/FAIL of the phase acceptance tests). Do not mark anything DONE that you have not run.

## 1. Answers to your questions
1. **Rendering engine → WebCodecs + Canvas compositor (via `mediabunny`)** for video. Every frame is composed on an OffscreenCanvas (scaled/cropped clip frame → grade → transitions → motion-graphic layers → Arabic captions → logo/bug) and encoded with `VideoEncoder` (H.264 High, `colorSpace: { primaries: 'bt709', transfer: 'bt709', matrix: 'bt709', fullRange: false }`). Audio is mixed in an `OfflineAudioContext` (master voice + ducked music + SFX + silence gates), loudness is measured with a JS ITU-R BS.1770 meter (K-weighting, gating) and corrected by gain + a true-peak limiter to −14 LUFS / −1 dBTP, then encoded with `AudioEncoder` (AAC if supported, else Opus) and muxed by mediabunny into MP4 with fast-start. Keep FFmpeg.wasm (single-thread) only as a fallback for: AAC encoding when WebCodecs AAC is unavailable, and probing exotic files. Never use libass.
2. **Lip-sync slices → both:** a per-shot "Export audio slice" button in the Inspector AND "Export all A-roll slices (.zip)" in the Outputs panel (zip with `fflate`), named `A01_000.00-016.13.wav` (48 kHz mono, 40 ms fades).
3. **Projects → both:** keep Episode 1 (51 shots) as a preloaded template, AND add "New project" that starts empty from a new master audio + SRT, using the same pipeline (auto-storyboard, prompts, render).

## 2. Platform rules for this sandbox
- All downloads go through `Flow.download({ base64, mimeType, filename })` (replace every `<a>.click()` / `createObjectURL` download). Large files: chunk the base64 conversion in a worker so the UI never freezes.
- All uploads: `<input type="file">` + drag-and-drop on the slot cards, read with `File`/`Blob` APIs.
- Persistence: IndexedDB for project JSON and small assets; OPFS for media if available, else IndexedDB blobs; detect quota and show used/available space. If storage is unavailable in the sandbox, say so in the UI and offer "Export project bundle" as the save method.
- `crossOriginIsolated` is false here: no SharedArrayBuffer, no multi-thread WASM. Design for that.
- Fonts: bundle IBM Plex Sans Arabic (300/600) and Aref Ruqaa as WOFF2 inside the app (no network dependency), plus user-uploaded fonts via the `fonts` slot; load with `FontFace` and `await document.fonts.ready` before any canvas text render.

## 3. IMPORT / EXPORT specification (implement as an "Import / Export" centre reachable from the header + per-slot actions)

### 3.1 Imports (each validated, previewed, and bound to the store; show a diff when it replaces existing data)
| what | file | binds to | parser rules |
|---|---|---|---|
| Project bundle | `.mlyproj` (zip: `project.json` + `media/*` + `fonts/*`) | whole project | version check, migrate older schemas, restore media into OPFS/IndexedDB |
| Project JSON only | `.json` | project without media | warn which media are missing; mark slots empty |
| Master audio | `.wav .mp3 .m4a` | `masterAudio` | decode with WebAudio; duration; waveform peaks (store 2000 peaks); LUFS/TP measure |
| Subtitles | `.srt .vtt` | `cards` | UTF-8; monotonic; `[؟]` → `uncertain:true`; offer split for > 8 words |
| Transcript | `.txt .md` | `transcript` | cross-check against cards; diff view |
| Episode plan | `plan.json` (`aroll[]`, `broll[]`, `cold_open`) | `scenes` | timeline invariants; reject gaps/overlaps with a clear list |
| Shot list | `FLOW_SHOTS_FULL.md` / `.csv` / `.json` | `scenes[].shot` | MD grammar: `### A01 — m:ss.s–m:ss.s`, shot line `**A01.2** (x ث)`, next fenced block = prompt, "Frames to Video … A01.1" → `parent`, "Ingredients" → mode; round-trip with the exporter must be lossless |
| Identity spec | `IDENTITY_SPEC.md` | `brand.identity`, `brand.identityAr` | take the fenced block under the heading containing "IDENTITY block"; must include "mole" and "LEFT" |
| Style lock | `STYLE_LOCK.md` | `preset.set`, `preset.wardrobe` | block under "الاستوديو الثابت" → set; `[WARDROBE: …]` → wardrobe |
| Brand kit | `.json` | `brand` | schema validation |
| Presets | `.json` | `presets[]` | merge or replace |
| Images (refs, style, logo) | `.jpg .png .svg .webp` | slots 4–7, 9, 12 | dimensions, face detection, mole marker |
| Clips | `.mp4 .mov .webm` | A-roll / B-roll / Flow returns | probe with mediabunny (fps, size, rotation, duration, codec, audio); route by filename `^(A|B)\d{2}(\.\d+)?[_-]` |
| Music / SFX | `.wav .mp3` | `audio.music`, `audio.sfx[]` | licence text required for music; tag SFX |
| Batch drop | any mix | auto-route | route by extension + filename + content; report unrouted files |

### 3.2 Exports (all via `Flow.download`; filenames include project name + date)
| what | format | details |
|---|---|---|
| Final video 9:16 | `.mp4` | 1080×1920, 30 fps, H.264 High, bt709 limited range, 6–8 Mbps, AAC 192 k / Opus, fast-start |
| Phone preview | `.mp4` | 720×1280, ~2 Mbps, < 20 MB |
| Clean version | `.mp4` | no captions |
| 16:9 version | `.mp4` | 1920×1080 re-layout |
| Shorts | `.mp4` (n) or `.zip` | user-selected ranges |
| Cover / thumbnail | `.png` | 1080×1920 and 1280×720 |
| Captions | `.srt`, `.ass`, `.vtt` | from current cards |
| Shot list | `.md` (same grammar as import), `.csv`, `.json` | lossless round-trip |
| Lip-sync slices | `.wav` single / `.zip` all | §1.2 |
| Last frames | `.jpg` single / `.zip` all | for Flow "Frames to Video" |
| Prompts | `.txt` (numbered, copy-ready) | one prompt per shot |
| QC report | `.md` + `.json` | duration, LUFS/TP, blackdetect, safe-zone, identity checklist results per shot |
| Brand kit / presets | `.json` | |
| Project | `.json` (no media) and `.mlyproj` bundle (with media) | |

## 4. Section 13 — Upload slots registry (implement in PHASE 1)
Replace generic uploads with a slot grid driven by a declarative registry:
```ts
interface UploadSlot {
  id: SlotId; labelAr: string; labelEn: string; accept: string[]; multiple: boolean; required: boolean;
  bindsTo: string; validate(f: File, probe: Probe): Issue[]; extract?(f: File): Promise<Partial<Project>>;
  filenamePattern?: RegExp; idField?: { labelAr: string; pattern: RegExp };
  guide: { requirements: string[]; mustContain: string[]; rules: string[]; prompt?: string; checklist: string[] };
}
```
Each slot card: Arabic + English label, accepted types, required badge, status (empty/validating/ok/warning/error), preview (thumbnail/waveform/text excerpt), extracted values, **«دليل التجهيز»** (drawer with Requirements · Must contain · Rules · Ready prompt/steps · checklist that must be ticked to turn the slot green) and **«نسخ أمر التوليد»** (copies the ready prompt with `{brand.identity}`, `{preset.wardrobe}`, `{preset.set}` filled in).

Slots (ids · Arabic label · accepts · binds to):
1 `masterAudio` الصوت الرئيسي · wav/mp3/m4a · masterAudio
2 `subtitles` ملف الترجمة · srt/vtt · cards
3 `transcript` النص الكامل · txt/md · transcript
4 `faceRef` صورة الوجه الأساسية · jpg/png + media_id field · brand.refs.face (≥1024 px, one face, user clicks the mole → saved marker; must be on viewer's right, else "mirrored?" warning)
5 `characterSheet` لوحة الهوية (3 زوايا) · jpg/png + media_id · brand.refs.sheet
6 `mouthDetail` صورة الشامة واللحية القريبة · jpg/png · brand.refs.mouth
7 `bodyRef` صورة الجسم كاملاً · jpg/png · brand.refs.body
8 `identitySpec` ملف مواصفات الهوية · md/txt · brand.identity
9 `styleRefs` صور ستايل الاستوديو (1–3) · jpg/png + media_id each · preset.styleRefs
10 `styleLock` ملف قفل الستايل · md · preset.set / preset.wardrobe
11 `brandKit` الهوية البصرية · json · brand
12 `logo` الشعار · svg/png (transparent) · brand.logo
13 `fonts` الخطوط · ttf/otf/woff2 · brand.fonts.files (Arabic glyph test)
14 `plan` خطة المشاهد · json · scenes
15 `shotList` قائمة أوامر Flow · md/csv/json · scenes[].shot
16 `arollClips` لقطات البودكاست · mp4/mov · A-roll scenes (filename routing)
17 `brollClips` لقطات الموشن · mp4/mov/webm/png/jpg · B-roll scenes (warn if letters detected)
18 `flowReturns` لقطات راجعة من Flow · mp4 · shot results (auto last-frame extraction → next shot first frame)
19 `music` الموسيقى · wav/mp3 + licence text · audio.music
20 `sfx` المؤثرات الصوتية · wav/mp3 + tag · audio.sfx[]
21 `projectTemplate` قالب مشروع · json/mlyproj · whole store

Guide texts (ship as editable defaults):
- Master audio: WAV 48 kHz 24-bit preferred, one speaker, final cut, no music under it, peaks < −3 dBFS when recording; app normalises to −14 LUFS.
- Subtitles: UTF-8 SRT, exact spoken Levantine words, ≤ 8 words per cue, no paraphrase/translation, unsure words marked `[؟]`.
- Face ref: ≥ 1024 px, front, unmirrored, soft even light, neutral expression, mouth relaxed and uncovered, mole visible on viewer's right, no filters. Prompt: "Using the attached photos of the same man, create a front-facing head-and-shoulders portrait, unmirrored, eye level, 50mm, soft even warm light, neutral calm expression, mouth relaxed, plain dark background. Keep exactly: {brand.identity}. Natural skin, not beautified. No text."
- Character sheet: 16:9, front + three-quarter + right profile, same light/expression, plain dark-grey background, mouth closed, plain heather warm-grey t-shirt. Prompt: "Using the attached references of the same man, create a clean character reference sheet, 16:9, photorealistic: front view, three-quarter view and right profile side by side, head and shoulders, neutral calm expression, mouth closed, plain dark-grey background, soft even lighting. Keep exactly: {brand.identity}. No text, no labels."
- Style refs: 9:16 or 3:4, the locked set (walnut slat wall, shelves, amber globe Edison lamp, light walnut desk, black dynamic mic on a boom arm at chin height, never covering the mouth), warm key from camera-left, one front + one side angle, current wardrobe.
- A-roll clips: 9:16, 1080p/4K, 30 fps, named `A01.1_take2.mp4`; host in locked set and wardrobe; if self-recorded, clap once at the start while the master audio plays in an earpiece; clip audio is discarded.
- B-roll clips: 9:16, ≥ 1080 px, ≥ scene length, named `B07.1_*.mp4`; no letters/numbers in the image; calm motion; near-black/ivory/copper palette.
- Flow returns: rename to the shot id (`A03.2.mp4`); generate in order so each next shot uses the previous last frame.
- Logo: SVG or transparent PNG ≥ 2000 px, no baked effects. Fonts: Arabic glyphs, Light + SemiBold, licensed for video. Music: no beat/vocals, licensed. SFX: short, dry, tagged.

## 5. Build order
**PHASE 1 (now) — real ingestion, storage, import/export, slots**
1. Replace every download with `Flow.download` (Bug 2).
2. Zustand store + IndexedDB/OPFS persistence + undo/redo (20 steps); remove hard-coded approvals from `INITIAL_PROJECT` (all gates start "pending").
3. Section 13 slot grid with registry, validation, extraction, guides, ready prompts, mole marker, media_id fields.
4. Master audio ingestion: real decode, waveform peaks, duration, BS.1770 LUFS/TP meter.
5. SRT/VTT import + card editor with `[؟]` highlighting + card splitter (≤ 8 words, no single-word cards).
6. Clip ingestion with mediabunny probing + filename routing to scenes + real thumbnails.
7. Real last-frame extraction on Flow-return import (seek to `duration − 0.1 s` on a `<video>` → canvas → JPEG) and real images in the Continuity board.
8. Import/Export centre (§3) incl. `FLOW_SHOTS_FULL.md` lossless parser/exporter, `IDENTITY_SPEC.md`, `STYLE_LOCK.md`, `plan.json`, project JSON and `.mlyproj` bundle.
9. Lip-sync slice export (single + zip).
10. Fix Bug 4: the split shortcut fires only when no input/textarea/contenteditable is focused, and requires `Alt+S`; bare `S` does nothing.
11. "New project" flow alongside the Episode 1 template.

**PHASE 1 acceptance tests (run and report PASS/FAIL with evidence):**
- Import `voice_full_-14LUFS.mp3` → duration 293.15 s ±0.05, LUFS −14 ±1, real waveform drawn.
- Import `subtitles_full.srt` → 152 cards, 7 flagged uncertain.
- Import `FLOW_SHOTS_FULL.md` → 51 shots with correct parents; export → re-import → identical JSON.
- Import `IDENTITY_SPEC.md` and `STYLE_LOCK.md` → identity/set/wardrobe fields filled, all prompts re-rendered.
- Drop 3 clips named `A01.1_x.mp4`, `A01.2_x.mp4`, `B01.1_x.mp4` → routed to the right shots; last frame of A01.1 shown as first frame of A01.2.
- Reload the page → project, media and approvals persist.
- Export `.mlyproj` → new project → import → identical state.
- Every export button downloads through `Flow.download`.

**PHASE 2 (next turn) — real render engine**: WebCodecs/mediabunny compositor (per-scene, streaming, no full-project buffering), transitions computed from `tlStart`, Canvas Arabic captions with calm karaoke, logo sting/bug/outro, OfflineAudioContext mix + ducking + loudness to −14 LUFS/−1 dBTP, export presets, progress with real FPS/ETA, cancel, rough-cut 480p.
**PHASE 3 — Flow workflow & polish**: staleness engine, five-element guard, parent-chain view, face-ID swap confirmation, user presets library, scene-recipe canvas renderer (big-type, old-photo-burn, label-stack, pull-back-words, climax-word, strike-and-highlight, logo-reveal), review gates UI, final QC automation, 16:9 and shorts.

Stop after PHASE 1 and report.
