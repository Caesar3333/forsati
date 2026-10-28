Two parts: (A) integrity problems in your Phase 2.5 answer, (B) a new "Production Profile" system. Do A first; stop if any A item fails.

## A. Integrity problems
1. **"services/syntheticClips.ts — when synthesizing kit clips, full-fidelity pictures now draw Hammam Deik…"** — the app must NEVER synthesize or draw a fake person/picture in place of an uploaded clip. Delete `syntheticClips.ts` and any code path that paints a "host" on canvas. The renderer decodes the user's uploaded file for that shot (mediabunny `Input` from the stored blob → `CanvasSink` at `src = clipIn + (t − tlStart)`) or draws the labelled placeholder. The burned label `SRC: <filename> @ <src seconds>` must show the real uploaded file name (`A01.1_test.mp4`).
2. **Your QC screen contradicts your summary.** Summary: audio 20.011 s, −14.6 LUFS. Screen: audio **20.000 s**, **−14.1 LUFS**, TP **−1**, resolution **1280×720**. For a vertical export write **width×height = 720×1280**. Show all values from the decoded file with 3 decimals (durations) / 1 decimal (LUFS, dBTP). Numbers in the summary must be copied from the screen, not written separately.
3. Re-export `rough-cut_0-20s.mp4` and `preview_0-20.mp4`. I will measure them (my last measurement of the previous rough cut: −12.0 LUFS, audio 20.011 s, placeholders instead of clips).

## B. Production Profile (new) — elements, effects and skills, customisable 3 ways
Add a **«الملف الإنتاجي»** panel. All production rules live in one structured profile (attached: `PRODUCTION_PROFILE.json`). The renderer, prompt builder, sound design and QC read ONLY from it — no hard-coded styling.

**B1. Sections the profile controls (and the code must honour):**
- **camera** — angles (front medium close-up / tight side profile / wide) with `useFor` rules; auto angle choice per A-roll chunk (reflective keywords → side tight); movement library with speed limits and forbidden moves.
- **lighting** — moody low-key chiaroscuro text injected into every A-roll prompt.
- **pacing** — visual breathing, minimum hold after key lines, music-to-silence after chosen lines, max cuts per minute (QC warns if exceeded).
- **visualMetaphors** — library (old_photo_burn, fogged_mirror, label_cards, question_lens, inner_universe, incomplete_puzzle, rewind): each has meaning, trigger words, a scene recipe and SFX. Auto-suggest a metaphor for any B-roll scene whose cards contain a trigger.
- **kineticTypography** — fonts, colours, caption styles, karaoke/word-reveal/emphasis animation parameters, rules.
- **transitions** — library (cut, blur_dissolve, zoom_blur, light_sweep, texture_wipe) with durations; default A↔B; SFX on transition.
- **audio** — voice targets (programme-level −14 LUFS), music style/instruments/level/ducking/arc, **SFX library** (warm_swoosh, paper_burn_soft, film_crackle, heartbeat_faint, paper_tick, pen_scratch, sub_hit_soft, reverse_swell, shimmer_low) with use and level. Let the user upload a sound for each SFX id (slot `sfx`, tag = id); if none uploaded, synthesize a simple procedural version (noise sweeps, sine thumps) and label it "procedural".
- **artDirection** — palette, grade, grain, vignette, forbidden list.
- **skills** — three automated checkers:
  1. *Prompt engineering check* — every prompt has the 5 elements and the 4 locks; identity text mentions mole, LEFT, goatee; flags filler words.
  2. *Timeline sync check* — caption lead/tail, snapping to silences, B-roll covers its key line, A/V offset ≤ 33 ms (measured from the export).
  3. *Art direction check* — samples rendered frames every 2 s: palette compliance, safe zones, text over a detected face.

**B2. Three ways to customise (all produce the same validated profile):**
1. **Options UI** — a form per section (sliders, colour pickers, dropdowns, toggle per SFX/metaphor, add/remove/edit items in each library). Live preview: a 5-second sample render or a still frame updates when values change.
2. **Global file** — import/export `PRODUCTION_PROFILE.json` (and a readable `PRODUCTION_PROFILE.md` export). Import validates against a JSON schema, shows a diff, and asks to apply. Projects store the profile version they used; presets library can hold several profiles (e.g. "هادئ"، "أكثر حركة").
3. **Edit by prompt** — a text box «عدّل الملف الإنتاجي بأمر»: the user writes e.g. "خلي الانتقالات أبطأ، زيد دقات القلب في مشاهد المرآة، وغيّر لون الإبراز لنحاسي أفتح". Send the current profile + the instruction to Gemini (user key) asking for a JSON Patch (RFC 6902) only; validate the patch against the schema, show a human-readable diff (Arabic), apply on approval, keep undo. Never let the model touch identity locks unless the user explicitly asks.

**B3. Acceptance for B**
- Import `PRODUCTION_PROFILE.json` → all sections visible in the options UI, values identical.
- Change `transitions.library.blur_dissolve.durationSec` to 0.8 in the UI → next render's A01→B01 transition lasts 24 frames (I'll measure).
- Disable `heartbeat_faint` → it is absent from the mix; enable it → present only in self-reflection scenes.
- Prompt edit "اجعل لون الإبراز #C9925F" → patch shown, applied, captions render the new colour.
- Export profile → re-import → identical JSON.

Report A with values copied from the screen and give me the two MP4s; then report B.
