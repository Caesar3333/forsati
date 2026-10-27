---
name: arabic-podcast-storyboard
description: Turn an Arabic podcast or voice recording into a timed, cinematic shot breakdown for a vertical (9:16) motion-graphics video — which minute to cut, scene by scene timings tied to the real pauses, on-screen phrases and emphasis words, camera move, lighting, transitions, sound cues, asset source (real footage, likeness image, generated still, AI video) and ready-to-paste image/Veo prompts that keep the host's face. Use it whenever someone has an Arabic recording (podcast, voice note, episode of «ما لا يُقال» or similar) and wants a storyboard, shot list, scene plan, Reels/TikTok/Shorts cut, B-roll plan or image prompts for it, or asks you to critique and improve an existing storyboard — even if they only say "حوّل هالحلقة لفيديو" or "شو المشاهد المناسبة".
---

# Arabic podcast → storyboard

The output is a plan a human editor (or the `arabic-audio-to-visual-editor` skill) can execute
without guessing: every scene has a time from the actual audio, the exact words on screen, and a
visual that serves the meaning of that line.

Brand defaults for «ما لا يُقال» live in `references/brand-ma-la-yuqal.md`; read it first when the
show is that one or no other brand is given. Prompt wording lives in `references/prompt-templates.md`.

## 1. Measure the audio before planning anything
Timings invented from reading speed are always wrong for real speech. Measure:
```
ffprobe -v error -show_entries format=duration -of csv=p=0 in.mp3
ffmpeg -i in.mp3 -af silencedetect=noise=-35dB:d=0.45 -f null - 2>&1 | grep silence_
ffmpeg -i in.mp3 -af ebur128 -f null - 2>&1 | tail -12     # integrated loudness
```
Report: total length, long pauses (≥1 s — natural scene cuts), and loudness (social target
−14 LUFS; flag anything far below). Levantine speech runs ~2.5 words/s, so a 17-word hook is 6–7 s,
not 5.

## 2. Get a timestamped transcript
Prefer, in order: the user's own transcript aligned to the pauses; the offline transcriber in
`arabic-audio-to-visual-editor/scripts/transcribe.py` (Whisper turbo via sherpa-onnx, model from
GitHub releases — HuggingFace is often blocked in sandboxes); a connected speech-to-text tool if it
has credits. Whisper clips phrase endings: re-check every phrase that will go on screen with a
padded window and fix by ear. Never paraphrase his words into captions.

## 3. Choose the cut (45–75 s for Reels/TikTok)
Find the lines in the transcript and note their source timecodes — a proposed storyboard often
quotes lines from different minutes. Build an arc:
**hook question → the problem → turning toward the self → the climax line → release → signature.**
- The hook must be understandable alone in the first 2 s and work with sound off.
- Give the single strongest line its own scene and real silence after it (1.5–2 s).
- Prefer lines that echo each other (labels we give others ↔ labels we give ourselves).
- Cut at existing pauses so edits are inaudible; say where room tone must fill gaps.
- Offer one alternative opening (e.g. a 2 s cold open with the climax line) when it might test
  better, but recommend one.

## 4. Critique an existing storyboard honestly
Check it against its own stated principles. Typical conflicts: word-by-word karaoke vs "phrases
not words", flashes/bounce vs "calm", yellow/neon vs muted copper, scrolling text, symbolic clichés
(hourglass, cracked mirror) that don't say what the line says. For each, say what conflicts and
give the replacement. Keep what works.

## 5. Write the scene table
For every scene:

| field | content |
|---|---|
| time | timeline in→out (and source in→out) |
| spoken line | exact words |
| on screen | the phrase(s), line breaks, emphasis word |
| visual | shot size, subject, setting, one concrete detail that carries the meaning |
| camera | very slow push-in / pull-back / locked-off / parallax |
| light & colour | motivated source, where on the colour arc |
| text position | where the negative space is |
| transition in | dissolve / blur dissolve / light leak / hard cut to silence |
| sound | ambience + one cue (whoosh, swell, sub hit, silence) |
| asset | real footage file · likeness image · generated still · AI video shot |
| prompt | from `references/prompt-templates.md`, with the identity block if the host appears |

Visual choice rule: show what the line *means*, not its keywords. "We only saw a moment of him" →
a stranger's face glimpsed through a train window, not a person in a dark room.

**Host's face:** use real footage for moments of revelation and signature; likeness images for
contemplative beats. Limit direct-to-camera talking to ~3 short moments or the piece turns into a
talking-head video. Always list the identity features to preserve (see brand file) and check the
mole side on every generated image.

## 6. Deliverables
Write files, not just chat, when a filesystem exists:
- `STORYBOARD.md` — cut map (source → timeline), the scene table, typography and sound notes.
- `SHOTS_<tool>.md` — per-shot prompts for the chosen generator (Google Flow/Veo, Nano Banana,
  Seedream), with ingredients/reference images listed and "mute this clip" notes.
- A short checklist of what the user must supply (real clips, music licence, brand kit) and what
  costs credits, with an estimate when a tool reports one.

Then hand off: the `arabic-audio-to-visual-editor` skill turns this plan into the cut audio, SRT,
timeline data and the rendered MP4.
