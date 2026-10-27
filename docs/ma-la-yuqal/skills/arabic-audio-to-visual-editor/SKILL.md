---
name: arabic-audio-to-visual-editor
description: Execute an Arabic podcast-to-vertical-video edit end to end — cut and reassemble the voice at the real pauses, normalise to −14 LUFS, build phrase subtitles (SRT) with emphasis words and per-word karaoke timings, map scenes to assets, make 2.5D depth layers from stills, compose an original score with transition SFX and ducking, render cinematic Arabic motion graphics with Remotion (IBM Plex Sans Arabic, Aref Ruqaa logo, calm karaoke, blur-in, dust/rain/fog) and export phone-safe MP4s, a cover and QC sheets. Use it whenever a storyboard or cut list for an Arabic recording needs to become actual files — "طلّع الفيديو", "اعمل الترجمة", "ركّب المشاهد على الصوت", "render the Reel", subtitle/karaoke timing, re-render after notes, or a new episode of «ما لا يُقال» — even when the user does not say Remotion or FFmpeg.
---

# Arabic audio → visual edit (executable)

This skill turns a plan (ideally from `arabic-podcast-storyboard`) into files: the cut voice,
captions, timeline data, music/SFX, the rendered 1080×1920 MP4, a phone preview and a cover.
Everything runs locally with free tools. Read `references/gotchas.md` before the first render —
each row there already cost a failed render once. Brand rules: `references/brand-ma-la-yuqal.md`.

The scripts are the working episode-1 pipeline. Each has one clearly marked data block you
replace per episode; the rest is reusable.

## 0. Check the toolbox (one command each)
`ffmpeg -buildconf` (needs libass, harfbuzz, fribidi, x264) · `node -v` (≥18) · `python3` with
`numpy soundfile onnxruntime opencv-python-headless sherpa-onnx` · a Chromium/headless shell
(Playwright's works: `--browser-executable`). No GPU needed; a 65 s film renders in ~10 min on 4 cores.
Report what is missing and what each missing piece blocks — don't stop for optional ones.

## Episode folder layout
```
<episode>/
  voice_cut_-14LUFS.mp3  subtitles.srt  timeline.json      # step 2
  backgrounds/…  footage/…  refs/…                         # assets from the user / generators
  render/layers/  audio/  render/remotion/  final/  cover/  # steps 3-7
```

## 1. Transcribe (if not done)
`scripts/transcribe.py <audio> <model_dir> transcript.json` — phrase-level, split at pauses.
Re-check on-screen phrases with `--window`. Captions must be his exact words.

## 2. Cut the voice + captions — `scripts/build_cut.py`
Edit `SEGS` (scene label, source_in, source_out, pause_after) and `PH` (source_start,
source_end, exact text, emphasis word). Cut points go inside measured pauses; pauses are filled
with room tone from a silent stretch of the same recording (set its time in the script). The
script writes `subtitles.srt`, `timeline.json` (source↔timeline map, phrases with emphasis) and
the voice normalised to −14 LUFS. Give the climax line a longer pause and let its caption hold
through it. Verify: `ffmpeg -i voice.wav -af ebur128 -f null -` → I ≈ −14, peak ≤ −1.

## 3. Depth layers — `scripts/make_layers.py <depth.onnx> <out> <images…>`
Depth Anything V2 small (ONNX) → foreground cutout (feathered) + inpainted background plate.
Look at the contact sheet: use `parallax` only where the subject separates cleanly; scenes where
the subject is behind glass or fills the frame use `still`.

## 4. Score + sound design — `scripts/score.py <voice> <out_dir>`
Original music (pads that follow the meaning: tension → swell → hard cut to silence → warm
release → outro piano note) plus SFX (whooshes at cuts, reverse swell + sub hit on the key line,
scene ambience like rain/hum/wind, glass ticks on labels). Edit the cue block (`CUTS`, `SIL0/SIL1`,
chord sections, SFX times) to the new timeline. It ducks music ~5.5 dB under speech and sets music
−29 LUFS / SFX −31 LUFS, mix ≈ −13 LUFS. If the user supplies a licensed track, replace the pad
section with it and keep the ducking, silence and SFX.

## 5. Motion graphics — `assets/remotion/`
Copy to `<episode>/render/remotion/`, `npm install`, then edit the scene list `S` in
`make_data.py` (id, start, end, kind = parallax|still|video, asset, motion or playbackRate,
fx = rain|dust|beam|fog|door|leak, textTop, optional grade) and run it — it stages assets into
`public/` and writes `src/data.json` (cards with per-word times spread by letter count across each
phrase, label stacks, climax style, logo timing). `src/index.jsx` holds the look: calm karaoke
55→100 %, blur-in + 8 px drift, copper SemiBold emphasis, label stack that dissolves together,
climax at 88 px, Ruqaa logo, grain, vignette, cross-dissolves with blur.

Before rendering, render stills at the key moments and look at them:
```
npx remotion still src/index.jsx MaLaYuqal out/t.png --frame=<s*30> --browser-executable=<bin>
```
Check: text not on a face, readable over bright areas, mole side correct, no fallback font.
Then render in the background (it takes minutes):
```
npx remotion render src/index.jsx MaLaYuqal out/raw.mp4 --browser-executable=<bin> --concurrency=4 --crf=16 --audio-codec=aac
```

## 6. Export for phones and platforms
```
ffmpeg -i raw.mp4 -vf "scale=in_range=full:out_range=tv,format=yuv420p" -c:v libx264 -profile:v high \
  -level 4.1 -b:v 6M -maxrate 8M -bufsize 12M -colorspace bt709 -color_primaries bt709 -color_trc bt709 \
  -color_range tv -c:a aac -b:a 192k -movflags +faststart final/<name>_9x16.mp4
```
Also a 720p ~15 MB preview (same flags, `scale=720:1280`, `-b:v 1800k`) — chat apps refuse to
preview big files. QC: a contact sheet every 2.5 s (`fps=1/2.5,scale=180:320,tile=9x3`) and an
ebur128 pass on the final.

## 7. Cover — `scripts/cover.js <episode_dir> <node_modules>`
Two 9:16 options (eyes + climax question; portrait + release line) with the Ruqaa logo; key text
inside the centre 4:5 band for the grid crop.

## Reporting back
Say what was rendered (size, length, loudness), show stills, list what is still placeholder
(music, generated vs real shots), and name the one or two things you would fix next. Large media
does not belong in an app's Git history — suggest a separate production repo, LFS or Drive.
