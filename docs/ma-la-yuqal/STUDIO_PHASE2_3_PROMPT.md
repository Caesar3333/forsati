STOP adding features. Your own screens contradict your report, which means some "measured" values are not measured. Fix test integrity first (PHASE 2.3), then stop and report.

## What the screens show (from my screenshots of your UI)
1. **Self-tests page: "تطابق الجدول الزمني وتغطية مدة الصوت الأساسي بدون ثغرات — FAILED (يوجد فراغ أو تداخل في المشاهد)".** The report never mentions this failure.
2. **SRT check says "تطابق تام (71/71 بطاقة)".** The real `subtitles_full.srt` has **152** cues. And the Subtitles Editor shows **"إجمالي البطاقات: 82"** with cards of 9, 12 and 15 words (e.g. #32 «والفرق كبير بين إنك تعترف إنك ما بتعرف القصة كاملة… وبين إنك تتصرّف كأنك عارفها», 78.50–83.80 s). In the real SRT that sentence is three cards (#41–#43: 78.37–80.40, 80.42–81.85, 81.87–84.02) and no card has more than 8 words. So the app is NOT using my SRT — 71, 82 and 152 cannot all be true.
3. **"Final 9:16 Non-Fragmented Engine — StreamTarget • 1920×1080".** A 9:16 final must be **1080×1920**.
4. **Render modal: "Duration: 20.00s • −14.0 LUFS"** with a grey, empty player. −14.0 is the target value again, and the player shows no picture.
5. **The "Measured Results" table repeats the exact sentences of your written report** (e.g. "220Hz: −28.4 dB", "+3.3 ms"). That suggests static strings, not values computed when I press "تشغيل فحوصات القبول".

## PHASE 2.3 — test integrity rules (mandatory)
1. **No static results.** Every value in the Acceptance runner is computed at click time from the files currently loaded. Delete any hard-coded expected/measured strings from the runner UI. Each row must show: input file name, size in bytes, SHA-256 (first 12 hex), the computed value, the timestamp of the run, and the function that produced it. Pressing "تشغيل" again must refresh the timestamps. If a needed file is not loaded, the row says "NOT RUN — load <file>" (never PASS).
2. **One source of truth for captions.** Remove any bundled/alternative SRT or caption array. `project.cards` comes only from the file the user loads in the `subtitles` slot (the Episode-1 template may embed the exact kit file `subtitles_full.srt`, byte-identical, SHA-256 shown). After loading the kit SRT: editor total = **152**, max words per card = **8**, uncertain = **7**, card #41 = «والفرق كبير بين إنك تعترف إنك» 78.37–80.40. The runner compares all 152 rendered/parsed texts to the file and prints the count (e.g. "152/152").
3. **Timeline must pass.** Build scenes from `plan.json` / the shot list so they cover 0 → 293.18 s with no gaps/overlaps (28 scenes). The self-test row must turn PASS by fixing the data, not by changing the test. Show the first gap/overlap (scene ids and times) if it fails.
4. **Final export dimensions** = 1080×1920 for 9:16 (720×1280 for preview). The runner reads width/height from the exported file.
5. **Render result panel:** LUFS/TP shown there are measured by decoding the exported file's audio (1 decimal), not copied from settings. The player must play the exported blob (object URL from the OPFS file); if it can't, show the error.
6. **Consistency rule:** if any page in the app shows FAILED for a check, the report and the runner must show the same FAILED.

## Report
Paste the runner table after loading the kit files from scratch in a **new project** (not the template), including the file hashes. Then download `rough_0-20.mp4`, `preview_0-20.mp4`, `frames_qc.zip`, `render_qc.json` — I will verify them independently.

## Addendum — evidence from your own `render_qc.json` (2026-10-28T01:03:22Z)
- `"voiceLevelDB": -100`, `"tonePeak220HzDB": -100`, `"tonePeak330HzDB": -100` → the measured audio is **digital silence** (or the measurement never ran). That contradicts `"integratedLUFS": -14.1` and `"truePeakDBTP": -1.2` in the same file, and `"voiceNaturalNoNotch": true` cannot be true with −100 dB. Find out whether the exported audio is silent (master audio not mixed) or the meter isn't reading the file, fix the real cause, and make the QC JSON derive LUFS/TP/levels from the same decoded buffer.
- `"durationSec": 20`, `"durationDiffSec": 0`, `"avDurationDiffMs": 0` → report the decoded video and audio track durations separately with 3 decimals (e.g. 20.000 / 20.011), never the requested range.
- `overallPass: true` must be false whenever any measured value is missing, −100/NaN, or contradicts another field.
- **Export presets screen:** "Final Master 9:16" and "Clean Master" are labelled **1920×1080** → must be **1080×1920** for 9:16.
- **Shot catalog (فهرس اللقطات الكامل):** selecting the "بودكاست أمامية وجانبية (A01–A13)" filter shows an empty list — the 31 A-roll shots must be listed (and 20 for B01–B15, 51 for الكل).
