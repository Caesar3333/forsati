Thanks. Three results in the Phase 2.1 report show the pipeline is being adjusted to pass tests instead of being correct. Fix these before anything else (PHASE 2.2), then stop and report.

1. **Captions must come from the imported SRT, never from constants.** You edited `INITIAL_PROJECT.cards` and changed the text: card 1 became «في يوم وأنا قاعد بفكّر» and card 2 «بموقف صار معي من فترة». The real `subtitles_full.srt` says: card 1 «في يوم وأنا قاعد بفكّر بموقف» (00:00:00,000 → 00:00:01,780), card 2 «صار معي من فترة» (00:00:01,800 → 00:00:03,230), card 3 «موقف… لو سألتني عنه وقتها» (00:00:03,350 → 00:00:05,550).
   - Remove all hard-coded caption text from `constants.ts` for rendering. The Episode-1 template may ship the SRT as a bundled asset, but the renderer reads `project.cards`, which comes only from parsing an SRT/VTT (or the transcript editor).
   - Add a runner check: the text of every rendered card equals the SRT cue text byte-for-byte (152/152).

2. **No notch filter on the voice.** The report says the rough cut used an "audio notch filter" at 220/330 Hz. That is wrong: it colours the voice and hides the real bug. Clip audio must simply never be decoded or mixed (no audio track is read from A-roll/B-roll files at all). Remove the notch. Re-measure the 220/330 Hz energy in the output without any filtering: it must be at the natural level of the voice recording (no tone peak).

3. **The export gate says 51 missing shots although 3 kit clips were loaded.** Expected: 48 missing (A01.1, A01.2, B01.1 attached). This means the rough cut did not use the attached clips. Fix the binding so the renderer uses `scene.clipId`/shot results, and prove it: in the rough cut 0:00–0:20, frames at 2.0 s (A01.1), 8.0 s (A01.2) and 20.0 s / B01.1 range must show the actual clip pictures, not placeholders. The gate must list exactly the 48 missing shot ids.

4. **Container for the final.** Keep `fastStart: 'fragmented'` for previews and rough cuts. For the Final 9:16 export, write a regular (non-fragmented) MP4 to OPFS through a StreamTarget (moov may be at the end); fragmented MP4 is not accepted everywhere for upload.

5. **Evidence, not statements.** "A/V sync 0.000 ms (frame clock aligned)" and "Verified frame sequence" are not measurements. Measure A/V sync by decoding the exported file (video duration vs audio duration, and the timestamp of a 1-frame white flash marker you insert at 16.13 s vs a 1 kHz 20 ms beep at the same time in a test-only audio layer). Report numbers.

Then re-export `rough_0-20.mp4`, `preview_0-20.mp4`, `frames_qc.zip` (frames at 1.0, 2.0, 4.5, 8.0, 15.90, 16.13, 16.40, 16.60, 19.5) and `render_qc.json`, and report the measured table again.
