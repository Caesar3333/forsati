Phase 1.1 looks good — thank you for the measured table. Phase 2 is not accepted yet: the report describes the design but most tests have no measured evidence, and one result is wrong. Do PHASE 2.1 below, then stop.

## A. Problems in the Phase 2 report
1. **Caption test is wrong.** At t = 4.5 s the screen must show **card 3** «موقف… لو سألتني عنه وقتها» (03.35 → 05.55), not card 1 (card 1 ends at 01.78). Either the test was not actually run or caption timing is off. Find out which, fix it, and prove it with frames.
2. **Muxing in memory.** `fastStart: 'in-memory'` keeps the whole MP4 in RAM — a 5-minute 1080×1920 file at 7 Mbps is ~260 MB plus encoder buffers and will crash the tab. Write through a `StreamTarget` to an OPFS file (chunked), and use fast-start only if it doesn't require holding the whole file in memory (otherwise moov at the end is acceptable for the final download). Same for the audio: render the OfflineAudioContext in chunks of ≤ 60 s if memory is tight.
3. **No measured values.** "−14.0 ±0.5 LUFS", "valid MP4", "±0 frames" are requirements, not measurements. Report the actual numbers.
4. **Untested items:** tone removal from clip audio, full-length 4:53 render, transitions at 0:16.13, missing-media placeholder + final-export block, phone preview and clean presets, timecode burn-in in rough cut, music ducking, whoosh SFX on cuts, teaser + logo sting + outro, `big-type` recipe for B-roll scenes without clips.

## B. PHASE 2.1 — fix and prove
1. Fix (1) and (2) above.
2. Implement whatever of (4) is still missing.
3. Extend the Acceptance runner with a **Render QC** section that, after each export, decodes the produced file and reports: duration (s, 3 decimals) vs master, video codec/profile, pixel format, colour primaries/transfer/matrix/range, fps, frame count, audio codec/sample rate/channels, integrated LUFS and true peak of the exported audio, and A/V duration difference. Show measured vs expected and PASS/FAIL.
4. Add a **Frame grabber** in the runner: enter times (e.g. `1.0, 4.5, 16.13, 16.40, 16.60`) → saves PNG frames from the exported file and shows them as thumbnails; allow "Download frames (.zip)" via `Flow.download`.
5. Run and report with measured values:
   - Rough cut 0:00–0:20 (kit clips + placeholders, timecode burn-in): duration 20.000 s ±0.033, 1 audio track, the 220/330 Hz test tones from the clips are absent (report an FFT/peak check at those frequencies vs the voice level), LUFS ≈ −14, TP ≤ −1.
   - Frames at 1.0 s and 4.5 s showing cards 1 and 3 with joined Arabic letters.
   - Transition A01→B01 at 16.13 s: frames at 15.90, 16.13, 16.40, 16.60 show the transition starting and ending at the computed frames.
   - Final export attempt with placeholders present → blocked by QC with a clear message listing missing shots.
   - Full 4:53 rough cut (720p, placeholders allowed): completes without crash; report total time, average FPS and peak memory.
   - Phone preview of 0:00–0:20: size in MB, resolution 720×1280.
6. Export these files for independent verification and download them via `Flow.download`:
   `rough_0-20.mp4`, `preview_0-20.mp4`, `frames_qc.zip`, `render_qc.json`.

Stop after Phase 2.1 and report the measured tables.
