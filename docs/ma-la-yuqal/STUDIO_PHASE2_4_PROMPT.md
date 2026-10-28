Your Phase 2.3 summary says the render, downloads and 1080×1920 labels are fixed. My screen shows otherwise:
- "اكتمل preview_0-20.mp4 **(0.00 MB)**" → the exported file is empty.
- "Final 9:16 Non-Fragmented Engine — StreamTarget • **1920×1080**" → label still wrong.
- **No file can be downloaded** from the app at all.
- The layout is confusing: buttons and information are scattered and hard to follow.

Do not report anything as fixed unless I can see it on screen. Work in this exact order and stop after each step that fails.

## STEP 1 — Prove downloads work (smallest possible test)
Add a "اختبار التنزيل" button that calls `Flow.download` with a 1 KB text file `download_test.txt` (base64 of "ma la yuqal test"). Show the exact return value/error on screen. If `Flow.download` does not work in this tool, tell me exactly what the platform supports instead and implement that. Nothing else matters until this works.

## STEP 2 — Prove the encoder produces bytes
Add a "اختبار رندرة 3 ثوانٍ" button: 90 frames of the brand background with the text «اختبار» (canvas, RTL) + the first 3 s of the master audio → MP4. After muxing, show on screen: file size in bytes (must be > 50,000), video track duration, audio track duration, width×height. If size is 0, show the stage that failed (encoder output chunks count, muxer bytes written, OPFS file size) — log each stage's byte/chunk counts. Then download it via the method proven in Step 1 and play it in a visible `<video controls>`.

## STEP 3 — Real 20 s rough cut
Only after Steps 1–2 pass: render 0:00–0:20 with the kit clips, show size in bytes (> 1 MB expected), decoded durations (3 decimals), and download it.

## STEP 4 — Redesign the UI as a 4-step workflow (after Step 3 passes)
Replace the current scattered layout with a clear stepper in the header: **1 الملفات ← 2 الخطة والأوامر ← 3 الإخراج ← 4 التنزيل والفحص**. Each step is one full screen with one primary button at the bottom-left (RTL) and a status bar showing what blocks the next step.
- **1 الملفات:** the 21 upload slots in 4 grouped sections (الصوت والنص · الهوية · الستايل والهوية البصرية · اللقطات والصوتيات), each card the same size, status colour, «دليل التجهيز» button.
- **2 الخطة والأوامر:** timeline on top, shot list (51) on the right with filters, selected shot's prompt + copy buttons on the left, style lock (wardrobe/face) as a compact bar.
- **3 الإخراج:** range selector, preset cards (correct sizes: Final 1080×1920, Clean 1080×1920, Preview 720×1280, Rough 480×854), one "ابدأ" button, live progress (frames, FPS, ETA, bytes written), cancel.
- **4 التنزيل والفحص:** a single list of produced files with size, duration, resolution and a download button each; the QC table (measured values only) underneath.
Use consistent spacing (8-pt grid), one accent colour (#B8835A) for primary actions only, secondary buttons outlined, Arabic RTL alignment everywhere, no text overflow, and readable sizes (≥ 14 px body).

Report each step with what is visible on screen (values, sizes) — screenshots-level facts, not code descriptions.
