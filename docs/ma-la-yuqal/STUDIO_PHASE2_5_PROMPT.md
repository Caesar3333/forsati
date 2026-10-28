Good news first: I downloaded and measured your files independently (ffprobe/ebur128, frame grabs, cross-correlation with the master). Downloads work, the encoder works, and several things are now genuinely correct. Below are my measurements — use them as the ground truth.

## Verified correct (independent measurement)
- `download_test.txt` downloaded with correct UTF-8 Arabic.
- `test_render_3s.mp4`: 192,541 bytes, H.264 High, 720×1280, yuv420p, bt709, tv range, 30 fps, 90 frames, AAC-LC 48 kHz stereo.
- `rough-cut_0-20s.mp4`: 2,624,370 bytes, 480×854, 600 frames = 20.000 s video, audio 20.011 s, colour tags correct.
- Audio is the master only: offset vs master **0.0 ms**, residual after alignment **−47.9 dB** (voice untouched), 220/330 Hz identical to the master (no clip audio, no notch). ✔
- Captions: correct card at 1.0 / 2.0 / 4.5 / 8.0 s, Arabic letters joined, RTL. ✔
- Timecode burn-in present in the rough cut. ✔

## Still wrong (fix in PHASE 2.5)
1. **Kit clips are not drawn.** Frames at 1.0, 2.0, 4.5 s show a placeholder box «لقطة: A01.1» and at 8.0 s «لقطة: A01.2» on the brand background; 16.13–19.5 s show big-type text, not the B01.1 clip. Your report said the actual clip pictures render — they don't. Decode the attached clip (mediabunny `CanvasSink` at `src = clipIn + (t − tlStart)`) and draw it cover-fit; draw the placeholder ONLY when no clip is bound. Add to the rough cut's burned label which source was used: `SRC: A01.1_test.mp4 @ 1.234s` or `SRC: PLACEHOLDER`.
2. **Loudness is +3 dB too loud and misreported.** My measurement: output **−12.0 LUFS** integrated (TP −1.7 dBFS), the same 0–20 s of the master is **−15.0 LUFS**, level difference **+3.0 dB**. Your UI showed −14.1. Two fixes:
   - Normalisation is per programme, not per excerpt: compute the gain once from the **full** mix (whole episode → −14.0 LUFS) and apply that same gain to any range render. For the kit audio (already −14.4 for the full file) the gain should be ≈ +0.4 dB, so a 0–20 s range must measure ≈ −14.6 LUFS, not −12.0.
   - The QC panel must measure the exported file's decoded audio. If it doesn't match my ebur128 result within 0.3 LU, your meter is wrong — verify it against a known test: a 1 kHz sine at −20 dBFS stereo must read −20.0 LUFS (±0.1); −23 LUFS EBU reference behaves accordingly.
3. **Scene boundary off.** The frame at 15.90 s is labelled B01.1 and shows big-type, but B01 starts at **16.13 s**. A01 must be on screen until 16.13 (minus the transition overlap if a dissolve is set). Also no visible transition between A01 and B01 — implement the scene's `transitionIn` and show it at 16.13.
4. **Overflow text in B-roll.** Above the big-type line there is a second, tiny, single-line copy of the whole B01 on-screen sentence running off the left edge. Remove that duplicate layer; big-type text must wrap within 900 px, max 2–3 lines.
5. **Big-type design.** Words should reveal one by one (mask + rise) on the voice timing, with the emphasis word in copper; currently it's a static line.
6. **Logo bug** should use the logo font (Aref Ruqaa), not the body font.
7. **QC honesty:** your QC said video 20.000 / audio 20.000 / diff 0 ms; real audio is 20.011 s (11 ms). Report decoded values as they are.

## Acceptance for PHASE 2.5 (I will re-measure your files)
Re-export `rough-cut_0-20s.mp4` and `preview_0-20.mp4` and give them to me. Expected:
- Frames at 2.0 s and 8.0 s show the A01.1 / A01.2 clip pictures (label `SRC: A01.1_test.mp4…`), 16.6 s shows B01.1's picture.
- 15.90 s still A01 (or mid-dissolve), 16.13–16.60 s shows the transition.
- Loudness ≈ −14.6 LUFS for 0–20 s (±0.5), TP ≤ −1.0 dBTP.
- No overflow text; big-type words animate.
