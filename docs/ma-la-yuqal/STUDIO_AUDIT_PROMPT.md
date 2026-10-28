STOP building for now. Do NOT change any code in this turn. Act as a senior QA engineer and technical auditor of THIS app ("Ma La Yuqal Studio"). Inspect the actual current codebase (every file, component, store, hook and config) and run what can be run, then give me an honest status report against the specification I gave you earlier (sections 0–12). Section 13 (upload slots registry) has NOT been given to you yet — list it as "not started" and do not invent it.

Be strict: a feature counts as DONE only if it is implemented in code AND works end-to-end. UI without logic = PARTIAL. Mocked/hard-coded/placeholder data = PARTIAL. Never claim something works unless you ran it or can point to the exact code path. If you cannot verify something in this environment, say "UNVERIFIED" and why.

## A. Report format (exactly this structure)

### 1. Summary (5 lines max)
Overall % complete (weighted by importance), whether the app builds and starts, whether a full render has ever succeeded, and the top 3 blockers.

### 2. Feature matrix
One table row per item below. Columns: `#` · `Feature` · `Status` (DONE / PARTIAL / MISSING / BROKEN / UNVERIFIED) · `Evidence` (file path + component/function name) · `What is missing or wrong` · `Effort` (S/M/L).

**§0–1 Inputs & upload**
1. Master audio upload + waveform + duration + measured LUFS/TP
2. SRT/VTT upload + parser + card editor + `[؟]` uncertain flags
3. A-roll and B-roll clip upload (multiple) + probing (fps, size, rotation, audio)
4. Identity reference upload with tags (face / mouth-detail / full-body / style)
5. Brand kit form + JSON import/export
6. Logo upload (SVG/PNG) + fonts upload stored in IndexedDB
7. Music / SFX upload with tags
8. Project template import/export (JSON round-trip)

**§2–3 Brand & data model**
9. Default «ما لا يُقال» brand (colours, fonts, identity, look, rules, safe zone, loudness)
10. Single store (Zustand) with Project/Scene/CaptionCard/FlowShot types as specified
11. Timeline invariants enforced (sorted, contiguous, no overlap, covers full duration, A-roll speed = 1)
12. Persistence to IndexedDB/OPFS + undo/redo

**§4 Planning**
13. Optional Gemini transcription (user key, Levantine Arabic, no paraphrase) + transcript editor
14. Card splitter (≤ 8 words, no single-word cards)
15. Auto-storyboard (A/B ratio, key lines → B-roll, cold-open teaser)
16. Timeline UI (waveform, cards, scene blocks, drag/trim, snapping to cards and silences)

**§5 Google Flow prompt builder**
17. FlowShot model per scene + auto-split of scenes > 8 s into chained shots
18. Last-frame extraction on import (`-sseof -0.1 … -frames:v 1`) and auto-attach as next shot's first frame
19. Continuity board (last frame vs next first frame)
20. Prompt template engine with variables + template library per scene type
21. Copy prompt / copy all / download shot list (.md/.csv)
22. Lip-sync audio slice export (`A01_000.00-016.13.wav`) and re-import by filename

**§6 Assembly engine (FFmpeg.wasm)**
23. FFmpeg.wasm loads; multi-thread core when `crossOriginIsolated`, single-thread fallback; COOP/COEP configured in dev and in deploy config
24. Arabic caption self-test on startup + automatic fallback to Canvas overlay
25. Per-scene normalisation (scale/crop/fps/grade, `-an`), stills with zoompan, tpad/trim to exact length
26. Concat + transitions (cut / xfade with offsets from tlStart / light-sweep overlay) without sync drift
27. ASS caption generation (BGR colours, Arabic encoding, emphasis tags) + burn with `fontsdir`
28. Canvas caption mode with calm karaoke (55 %→100 % per word, blur-in, RTL)
29. Logo sting, corner bug, outro
30. Audio: master only, music ducking (sidechain), SFX, silence gate, two-pass loudnorm to −14 LUFS
31. Export presets: Final 9:16 (yuv420p, bt709, tv range, faststart), 720p preview < 20 MB, clean, 16:9, shorts, cover; SRT/ASS/JSON exports
32. Memory strategy (per-scene processing, FS cleanup, memory meter) and cancel/resume

**§7 Review gates**
33. Transcript gate · 34. Storyboard gate · 35. Per-shot identity checklist (mole on viewer's right, goatee, mic not covering mouth, wardrobe, continuity) · 36. Rough-cut 480p with timestamped comments · 37. Final QC (duration ±1 frame, LUFS/TP, blackdetect, caption safe zone, mobile-compatible file)

**§8 UX**
38. Arabic-first RTL UI + English toggle · 39. Three-panel layout · 40. Keyboard shortcuts · 41. Progress with ETA from FFmpeg events · 42. Error toasts showing the FFmpeg command and last log lines

**§9 Templates**
43. Scene recipes renderer (big-type, old-photo-burn, label-stack, pull-back-words, climax-word, strike-and-highlight, logo-reveal)

**§10 Acceptance tests**
44. "Run self-tests" page implementing tests 1–6 — run each test now and report PASS/FAIL with the actual output

**§11 Google Flow profile**
45. Model selector (Omni 1.1 Flash / Veo 3.1 Quality / Fast) with clip length and credit cost
46. media_id per reference inserted as `{REF_ID}` (fallback text when missing)
47. Continuity modes: ingredients / frames / extend / lineage-edit, with a parent-chain view
48. Project locks `{WARDROBE}`, `{SET}`, `{IDENTITY}`; changing a lock marks generated shots stale
49. Five-element prompt schema that refuses to render with an empty element
50. Shot-pack import (`FLOW_SHOTS_FULL.md` format: `### A01 — m:ss–m:ss`, `**A01.2**`, fenced prompts, parent from "Frames to Video … A01.1")

**§12 Style presets**
51. Style preset from reference stills (SET + WARDROBE)
52. Tagged `[FACE: …]` / `[WARDROBE: …]` slots and one-command "Apply to all" wardrobe swap + Flow edit prompt
53. Face-ID swap with identity-description confirmation
54. Presets library (save/load/switch)

**§13 Upload slots registry**
55. NOT STARTED (will be provided next)

### 3. Bugs and errors found
For each: symptom → reproduction steps → root cause (file:line) → proposed fix. Include console errors, TypeScript errors, failed builds, broken imports, unhandled promise rejections, and any place where Arabic text renders disconnected or left-to-right.

### 4. Risks and environment limits
Be explicit about: SharedArrayBuffer / COOP-COEP in the preview and in deployment; which FFmpeg core is loaded and whether it includes libass + harfbuzz + fribidi (prove with the self-test, not assumptions); browser memory limits for a 5-minute 1080×1920 project; fonts licensing/availability; Gemini key handling; anything that only works in Chrome desktop.

### 5. What is hard-coded, mocked or placeholder
List every fake value, stub function, TODO, or sample data that would break with real files.

### 6. Missing inputs from me
Files, IDs, keys or decisions you need (e.g. fonts, logo, media_id, Gemini key), each with why it is needed and which feature it unblocks.

### 7. Prioritised plan to finish
Ordered list of the next steps (max 15), grouped into: (1) blockers to a first real end-to-end render, (2) correctness of sync/captions/audio, (3) Flow workflow, (4) professional polish. For each step: what you will change (files), how you will verify it, and estimated effort.

### 8. Questions for me
Only questions whose answers change what you build.

End the report there. Wait for my go-ahead before writing any code.
