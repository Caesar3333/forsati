"""MANUS_LIPSYNC_PROMPT.md — one prompt for Manus: build the full episode from the real voice, with new audio-driven
lip-synced footage. Attached images/videos are references only; the master audio is used as is. Shot data comes from flow_master.py."""
import re, subprocess
src = open("flow_master.py", encoding="utf-8").read().split("# ---------- timeline checks")[0]
exec(src)
DUR = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", "voice_full_-14LUFS.mp3"],
                           capture_output=True, text=True).stdout)

# each shot is shown on screen until the next one starts (silences between phrases are covered by the previous shot)
rows = []
for i, s in enumerate(shots):
    a = 0.0 if i == 0 else s["a"]
    b = shots[i + 1]["a"] if i + 1 < len(shots) else DUR
    rows.append((s, a, b))
f3 = lambda x: f"{x:.2f}"

L = []
w = L.append
w(f"""# أمر Manus — حلقة «ما لا يُقال» كاملة من الصوت الحقيقي مع مزامنة الشفايف

انسخ كل اللي تحت الخط لـ Manus، وارفق الملفات المذكورة بالقسم 2.

---

You are a senior video producer and editor. Build the complete vertical episode «ما لا يُقال» (Arabic podcast by Hammam Deek) from **his real recorded voice**. Generate **new** footage of him speaking at a podcast microphone, **lip-synced to that voice**, plus cinematic B-roll, then edit everything into one finished video.

## 1. The three non-negotiable rules
1. **The voice is the master.** Use the attached `voice_full_-14LUFS.mp3` exactly as it is: {DUR:.2f} s, already mastered to −14 LUFS. Do not re-record it. Do not clone it. Do not regenerate it. Do not shorten it. Do not speed it up. Do not denoise it. Do not re-order it. The finished video's voice must be this file, sample-aligned (0 ms offset).
2. **Attached images and videos are references only.** Use them to learn the face, the studio, the lighting, the framing and the body language. Use them as identity or style conditioning for the generators. Never place an attached image or video on the final timeline. No stills with pan or zoom. No attached clip reused as footage. No crop of an attached file. Every frame of the final video must come from footage you generated in this job.
3. **Lip-sync comes from the audio.** Every podcast shot is driven by the slice of the real voice for that shot. Mouth, jaw, head and breathing follow that audio. Do not drive the mouth from text. Do not use text-to-speech anywhere, even as a temporary track.

## 2. Attached files and what each one is for
| File | Role | Use it how |
|---|---|---|
| `voice_full_-14LUFS.mp3` | **Master audio** | The only voice in the final video |
| `lipsync_audio.zip` | 25 audio slices + `manifest.json` | One slice per podcast shot, cut from the master at the exact times in section 5. Drive each shot's lip-sync with its slice |
| `subtitles_full.srt` | 152 Arabic caption cards, timed to the master | Burned-in captions (section 7). Do not retime or rewrite them |
| `hammam_ref_portrait.jpg`, `hammam_ref_mole.jpg` | **Identity reference** | Face conditioning only |
| `K_front_a.jpg`, `K_front_b.jpg` | **Framing reference — front angle** | Composition, set, light and wardrobe for front shots |
| `K_side_a.jpg`, `K_side_b.jpg` | **Framing reference — side angle** | Composition, set, light and wardrobe for side shots |
| `studio_front.jpg`, `studio_side.jpg` | Studio style reference | Set and light only |
| Flow test clips (`A01.1…mp4` etc., if attached) | **Motion reference** | Body language and pacing only |
| B-roll test clips (`B01.1…mp4`, `B02.1…mp4`, if attached) | **Look reference for B-roll** | Palette and motion style only |

## 3. Identity lock (every podcast shot)
- Short dark hair with receding temples.
- Connected Van Dyke beard (moustache + goatee + soul patch) with grey hairs in the chin.
- A small dark mole above the **LEFT** corner of his upper lip. In a front shot it appears on the **viewer's right**.
- Never mirror the image. Never flip the image horizontally. The mole never moves. The mole never changes side.
- Do not beautify the face. Do not de-age the face. Do not slim the face. Do not change the skin tone.
- Mouth always visible. The microphone never covers the mouth. A hand never covers the mouth.

## 4. Look of the podcast footage
- Navy unstructured wool blazer over a heather warm-grey crew-neck T-shirt.
- Dark walnut slatted wall, wooden shelves with a few books, warm amber Edison lamp in soft bokeh, light walnut desk, black dynamic microphone on a boom arm beside the mouth.
- Moody low-key warm tungsten light, gentle shadows, teal-black shadows with amber highlights, shallow depth of field, natural skin texture, light film grain.
- Seated, calm, small head movements, natural blinks, restrained hand gestures below the chin.
- Front angle: medium close-up at eye level, very slow push-in (≤ 2%) or locked-off.
- Side angle: three-quarter from his right side, both eyes and the full mouth visible, locked-off or a barely perceptible drift.
- No on-screen text inside generated footage. No logos. No watermarks. No extra people.

## 5. Shot list — exact timeline ({len(shots)} shots)
Each shot stays on screen from its start to the next shot's start. Short silences between phrases are covered by the previous shot. Podcast shots: generate audio-driven lip-sync from the named slice, matching the named framing reference. B-roll: generate new footage from the description.

| # | Shot | Type | Start (s) | End (s) | Length (s) | Framing ref | Audio slice / description |
|---|---|---|---|---|---|---|---|""")
for n, (s, a, b) in enumerate(rows, 1):
    if s["kind"] == "A":
        w(f"| {n} | {s['id']} | Podcast — {'front' if s['ang'] == 'front' else 'side'} | {f3(a)} | {f3(b)} | {b - a:.2f} | {s['kf']} | `{s['id']}.wav` — «{s['line']}» |")
    else:
        main, phase = B[s["seg"]][1], B[s["seg"]][4][min(s["k"], len(B[s["seg"]][4])) - 1]
        w(f"| {n} | {s['id']} | B-roll | {f3(a)} | {f3(b)} | {b - a:.2f} | — | {main} {phase} |")
w(f"""
Notes on the table:
- The `.wav` slice for a podcast shot covers the spoken part only. If the shot is longer than its slice (silence before the next shot), keep the generated performance going with a closed, relaxed mouth and natural blinks. No mouth movement during silence.
- B-roll rules: 9:16, photorealistic, slow elegant motion, warm amber highlights against deep teal-black shadows. No readable text. No letters. No numbers. No faces unless the description says so. When a B-roll idea spans two shots, the second continues from the last frame of the first.
- Recommended order of preference for audio-driven lip-sync: any tool that animates a person from a reference image + an audio file at ≥ 720×1280 with accurate Arabic visemes (for example: Hedra Character-3, HeyGen Avatar IV, Kling Avatar/Lip Sync, Sync.so lipsync-2-pro on generated footage, OmniHuman). Pick by result quality, not by name. State which tool, model and settings you used for every shot.

## 6. Edit
- Canvas 1080×1920, 30 fps (or 24 fps), 9:16, the full {DUR:.2f} s.
- Podcast ↔ B-roll: soft blur dissolve 0.45 s. Podcast ↔ podcast (angle change): straight cut.
- Grade everything to one look (section 4). Same grain on all shots.
- Music: soft ambient (felt piano, warm low drone, airy pad), no beat, no vocals, about 15 LU under the voice, ducking −5.5 dB while he speaks (attack 30 ms, release 450 ms). Music drops to silence for about 1.2 s after «من متى أنا هيك؟» and 1.0 s after «هل بدّي أضل هيك؟». Ending: one low piano note.
- Sound effects at low level only: warm swoosh on podcast↔B-roll transitions; soft paper burn on B03; faint shimmer on B10. Never louder than the voice.
- Final mix: −14 LUFS integrated, true peak ≤ −1 dBTP. The voice itself is not processed.

## 7. Arabic captions
- Use `subtitles_full.srt` exactly: same text, same timing.
- Font: IBM Plex Sans Arabic (Light 300 for text, SemiBold 600 for emphasis), ivory #EDE6D6, emphasis copper #B8835A. Logo «ما لا يُقال» in Aref Ruqaa.
- Right-to-left, connected letters. Never split Arabic letters. Never letter-space Arabic.
- Max 2 lines, max width 900 px, lower third with a soft dark gradient behind. Never over the mouth or eyes. Keep 120 px clear on the right edge.

## 8. Deliverables
1. `ma_la_yuqal_full_9x16.mp4`: H.264 High, 1080×1920, yuv420p, bt709, tv range, AAC 48 kHz stereo, {DUR:.2f} s ± 0.04 s.
2. `ma_la_yuqal_full_9x16_nocaptions.mp4`: the same without captions.
3. `shots/`: every generated clip before editing, named by shot ID (`A01.1.mp4`, `B01.1.mp4` …).
4. `REPORT.md`: one row per shot with tool, model, settings, seed (if any), source slice, and which reference images were used as conditioning.
5. `qc/`: contact sheet of one frame every 2 s, and the measurements in section 9.

## 9. Acceptance tests (I will measure your files)
- Duration {DUR:.2f} s ± 0.04 s.
- Audio: cross-correlation with `voice_full_-14LUFS.mp3` gives 0 ms offset. Residual after removing music shows the voice untouched.
- Loudness −14.0 ± 0.5 LUFS, true peak ≤ −1.0 dBTP.
- Lip-sync: mouth closures (م، ب، ف) land within 2 frames of the audio on 10 random checks.
- Identity: on every podcast shot the mole is above the lip on the viewer's right in front shots. No mirrored shot.
- No attached image or clip appears in the final video (I will compare frames).
- Captions match the SRT text and timing; letters joined; nothing over the mouth.
- No visible text, letters or watermarks inside generated footage.

## 10. Honesty rules
- Report only what you actually produced and measured. Copy numbers from the measured files.
- If a tool cannot do something (for example Arabic lip-sync accuracy, or 1080p), say so and show the closest result. Never replace a missing shot with an attached reference, a still image or a placeholder without labelling it in the report.
- If you run out of credits or time, deliver what is finished, list exactly which shots are missing, and stop. Do not fake progress.

Start by confirming which lip-sync tool you will use and generating **one test shot (A01.1, 0.00–8.65 s)** for my approval before generating the rest.
""")
open("MANUS_LIPSYNC_PROMPT.md", "w", encoding="utf-8").write("\n".join(L) + "\n")
print(len(rows), "rows", DUR)
