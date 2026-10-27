# Gotchas (each one cost a render in episode 1)

| symptom | cause | fix |
|---|---|---|
| Arabic text renders in a fallback font in Chromium/Playwright | `file://` font URLs refused from an `about:blank` page | inline fonts as `data:font/woff2;base64,…` (cover.js does), or import `@fontsource/*` CSS inside Remotion |
| letters disconnected | letter-spacing on Arabic, or a word split into per-letter spans | never letter-space Arabic; karaoke per word only, spaces between spans |
| phone/app says "preview unavailable" | file too large, and/or full-range `yuvj420p` from the renderer | final encode with `scale=in_range=full:out_range=tv,format=yuv420p`, bt709 tags, `+faststart`; also export a ~15 MB 720p preview |
| HuggingFace downloads 403 | sandbox egress policy | Whisper turbo from `k2-fsa/sherpa-onnx` GitHub releases; Depth Anything V2 ONNX from `fabio-sim/Depth-Anything-ONNX` releases |
| free music/SFX sites unreachable | same policy | `score.py` composes an original score + SFX; or ask the user for a licensed track |
| Remotion tries to download Chrome | no network for its CDN | pass `--browser-executable=<chrome-headless-shell>` (Playwright ships one) |
| `pkill -f "pattern"` kills your own shell | the pattern appears in your own command line | kill by PID, or use a pattern that cannot match the shell (e.g. `pgrep -f '[d]ocker build'`) |
| zoompan render takes 10+ min | upscaling stills to 2160×3840 before zoompan | in Remotion use CSS transforms on 1080×1920 layers; zoompan only for quick drafts |
| caption words cut off | Whisper clips the last word of a phrase | `transcribe.py --window START END` with ±0.3 s padding, then correct by ear |
| a generated "listening" shot reads as lip-sync error | talking clip with different words under the voice | use closed-mouth / smiling moments, slow to ~0.45×, grade darker, or cut away |
| text over the subject's face | one text position for all scenes | per-scene `textTop` in `make_data.py`, chosen from the negative space |
| a talking clip looks brighter than everything else | AI/real footage graded differently | per-scene `grade` override (CSS filter) in `make_data.py` |
| depth split puts the window frame, not the person, in front | subject behind glass | use `still` (plain push-in) for that scene instead of `parallax` |
