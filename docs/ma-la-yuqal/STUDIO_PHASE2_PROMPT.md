Good progress, and thanks for fixing the `brand.refs` crash. Before Phase 2, close the gaps below (PHASE 1.1). Then, only if every Phase 1.1 check passes with real numbers, continue to PHASE 2. Report with real measured values, not code descriptions — "the function does X" is not evidence; "I loaded the file and the UI shows 293.18 s" is.

## PHASE 1.1 — verification fixes (do first)

1. **Shot-list grammar mismatch.** Your report describes `## A01` / `### A01.1 (x ث) — Ingredients`. My real file uses a different grammar. The parser must read THIS exact format (and the exporter must write it back identically):
   ```
   ### A01 — 0:00.0–0:16.1 · بودكاست (أمامية) · 3 لقطات
   **A01.1** (5.5 ث) — Ingredients: {REF_ID}
   ```(fenced prompt)```
   **A01.2** (6.9 ث) — Frames to Video: أول إطار = آخر إطار من A01.1
   ```(fenced prompt)```
   ### B01 — 0:16.1–0:24.0 · موشن · 1 لقطة
   > الجملة على الشاشة (تُضاف في المونتاج، لا في الفيديو): …
   **B01.1** (7.9 ث)
   ```(fenced prompt)```
   ```
   Rules: a `###` line = scene (id, start–end in m:ss.s, type بودكاست/موشن, angle in parentheses for A-roll); a `**Xnn.k**` line = shot (duration in ث, mode = Ingredients | Frames to Video with parent id | none); the next fenced block = the prompt verbatim; a `>` line under a B scene = on-screen text. Keep the file header (lines before the first `###`) verbatim. Support both the old and this grammar if you like, but THIS one is mandatory.
   **Expected with `FLOW_SHOTS_FULL.md` from the kit: 28 scenes, 51 shots (31 A + 20 B), 23 shots with a parent (e.g. A01.2 → A01.1), export → re-import byte-identical prompts.**
2. **Duration precision.** Store and display duration with 2 decimals from the decoded buffer (`buffer.length / buffer.sampleRate`). Expected for the kit audio: **293.15–293.19 s** (your report says 293.1).
3. **LUFS must be measured, not rounded to the target.** Expected for the kit audio: about **−14.4 LUFS** and true peak below −1 dBTP. Show 1 decimal. If you get exactly −14.0, check that the value isn't copied from the brand target.
4. **Mole marker default.** Remove the preset `moleMarker: { x: 0.65, y: 0.48 }` from `DEFAULT_BRAND`/`INITIAL_PROJECT`. The marker must be empty until the user clicks it on the uploaded face image; until then the face slot stays "warning: mark the mole". `mediaId` defaults to empty (not the literal `{REF_ID}`); prompts then say "attach studio_front.jpg as Ingredient".
5. **Schema migration.** Add `schemaVersion` to the project and a `migrateProject()` that fills every optional object (`brand.refs`, `presets`, `reviews`, `audio`…) with defaults when loading from IndexedDB or importing JSON/`.mlyproj`, so old saves can never crash the UI. Add a unit check: load a project JSON missing `brand.refs` → no crash.
6. **Media storage.** Do not keep large media (audio, video) as base64 inside the Zustand state that is persisted on every change. Store blobs in OPFS (or IndexedDB blob store) keyed by asset id; keep only ids + metadata + small thumbnails/last-frames in state; debounce state saves (≥ 500 ms). Show storage used/available.
7. **In-app Acceptance runner.** Add a "اختبارات القبول" panel: the user drops the kit files, the panel runs the 10 checks from `README_TESTS.md` and shows measured value vs expected and PASS/FAIL. Paste its output in your report.

**PHASE 1.1 report:** paste the Acceptance runner table (measured vs expected). If anything fails, fix it and stop there.

---

## PHASE 2 — real render engine (WebCodecs + Canvas, via mediabunny)

### 2.1 Architecture
- **Frame clock:** output time `t = frameIndex / 30` (plus teaser offset when the cold-open is enabled). For each `t`: find the active scene(s) (two during a transition), compute source time `src = clipIn + (t − tlStart) × speed`, fetch the decoded frame, compose, encode. Never accumulate float drift: derive everything from `frameIndex`.
- **Decoding:** mediabunny `Input` + `CanvasSink`/`VideoSampleSink` per clip, requesting frames in display order; keep at most 2 open decoders (current + next scene) and close them when the scene ends. Stills: draw the image with a Ken-Burns transform (push-in 2–8 % over the scene, pre-scaled to avoid shimmer).
- **Compositor (OffscreenCanvas 1080×1920, in a Worker):** layer order → scene frame (cover-fit scale/crop) → grade (`ctx.filter = 'brightness(.97) contrast(1.06) saturate(.85)'`, A-roll warm, per-scene override) → transition → motion-graphic layer (scene recipe, at least `big-type` in this phase) → vignette + grain (pre-generated noise tiles, rotated per frame) → Arabic captions → logo bug / sting / outro.
- **Missing media:** a scene without a clip renders a branded placeholder ("لقطة ناقصة: A03.2") — allowed in rough cut, **blocked** in final export by QC.
- **Encoder:** `VideoEncoder` `avc1.640028` (H.264 High 4.0), 1080×1920, 30 fps, 7 Mbps VBR, keyframe every 60 frames, `colorSpace { primaries:'bt709', transfer:'bt709', matrix:'bt709', fullRange:false }`. Respect back-pressure (wait while `encodeQueueSize > 4`). Check `VideoEncoder.isConfigSupported` first and fall back to Main/Baseline profiles if needed.
- **Muxing:** mediabunny `Output` with `Mp4OutputFormat`, writing to an OPFS file through a `StreamTarget` (no full-file buffering in RAM); fast-start (moov at the start) when the target allows it. Then hand the file to `Flow.download` in chunks.

### 2.2 Captions (Canvas, RTL, calm karaoke)
- `ctx.direction = 'rtl'`, `textAlign = 'center'`, fonts loaded via `FontFace` (`await document.fonts.ready` before rendering). Never letter-space Arabic; never draw letter by letter.
- Word timings: split each card's span across its words by letter count. Card fade-in 500 ms (blur 8 px → 0, rise 8 px), whole card at 55 % opacity, each word ramps to 100 % over 250 ms at its time; emphasis word (from the card) in SemiBold `#B8835A` with an underline drawing in over 500 ms; fade-out 400 ms.
- Styles: `lower` (64 px, y≈1290, max width 900 px, 2 lines, dark gradient behind) for A-roll; `center-big` (96–110 px) for B-roll; `none`. Wrap by measuring words with `measureText`. Keep out of the bottom 20 % and the right 120 px.
- Pre-render each card's text layout once (Path2D/bitmap cache), only animate opacity/blur per frame.

### 2.3 Transitions (computed from `tlStart`, no drift)
`cut` · `dissolve` (cross-fade d=0.4 s) · `zoomblur` (outgoing scale 1→1.12 + blur 0→12 px, incoming 0.94→1 + blur 10→0, d=0.45 s) · `lightsweep` (warm gradient bar sweeping right→left over the cut, screen blend). The outgoing scene keeps decoding through the overlap.

### 2.4 Logo, bug, outro, teaser
Cold-open teaser (optional) + 1.5 s logo sting (Ruqaa wordmark revealed right→left by a mask, copper line draws under it); corner bug top-right at 0.7 opacity on A-roll scenes only; outro logo reveal with drifting dust and «همام ديك» under it, fade to black.

### 2.5 Audio
- `OfflineAudioContext(2, ceil(duration × 48000), 48000)`.
- Voice = master buffer (never clip audio). Music (if any): gain 0.18, ducked by a precomputed envelope from the voice RMS (attack 30 ms, release 450 ms, −5.5 dB) via `gain.setValueCurveAtTime`; optional silence gates set music/SFX to 0 for chosen ranges.
- SFX at cues: whoosh on every A/B cut, tag-based list (whoosh/hit/swell/tick/scratch/ambience).
- Loudness: measure the rendered mix with your BS.1770 meter → apply static gain to reach −14.0 LUFS → true-peak limiter (4× oversampled peak detection, ceiling −1 dBTP, lookahead 5 ms) → re-measure and report.
- Encode with `AudioEncoder` `mp4a.40.2` 192 kbps if supported, else Opus 160 kbps; mux with the video. Audio and video durations must match the master to ±1 frame.

### 2.6 Export presets & controls
Final 9:16 1080×1920 · Phone preview 720×1280 ~2 Mbps (< 20 MB for 65 s, scale for longer) · Clean (no captions) · Rough cut 480×854, fast, with timecode burn-in and scene id label. Progress shows frames done/total, real render FPS, ETA; Cancel via AbortController (closes decoders/encoders, deletes the partial OPFS file). Memory meter (JS heap if available).

### 2.7 PHASE 2 acceptance tests (run them; paste measured values)
1. **Range render:** render 0:00–0:20 of Episode 1 with the kit clips (A01.1, A01.2, B01.1; the rest placeholders) as rough cut → duration 20.00 s ±1 frame; audio track count 1; the test tone from the clips is absent (output loudness ≈ voice only).
2. **Captions:** frames at t=1.0 s and t=4.5 s show card 1 «في يوم وأنا قاعد بفكّر بموقف» and card 3 «موقف… لو سألتني عنه وقتها» with joined Arabic letters (attach the two frames as images).
3. **Sync:** clap/marker test — a 1-frame white flash inserted at a known scene boundary appears at the exact expected frame in the output (±0 frames).
4. **Loudness:** final export of the 0:00–0:20 range measures −14.0 ±0.5 LUFS, TP ≤ −1.0 dBTP.
5. **File compliance:** output is H.264, yuv420p, bt709, limited range, 30 fps, AAC/Opus; plays in Chrome and iOS Safari.
6. **Full length:** full 4:53 rough cut renders without crashing; report peak memory and total time.
7. **Transitions:** dissolve and zoom-blur at 0:16.13 (A01→B01) start and end at the computed frames.

Stop after Phase 2 and report (feature matrix rows touched + the 7 test results with evidence).
