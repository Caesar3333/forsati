# أمر Manus: فيديو «ما لا يُقال» (نسخة هجين: بودكاست + موشن جرافيك)

## الملفات التي ترفقها مع الأمر
| الملف | لماذا |
|---|---|
| `voice_cut_-14LUFS.mp3` | الصوت النهائي (65.25 ث). هو الصوت الوحيد المسموح |
| `subtitles.srt` | العبارات بتوقيتها |
| `timeline.json` | توقيت كل عبارة والكلمة المهمة فيها |
| `render/remotion/src/v2.json` | ترتيب المشاهد بالثانية |
| `refs/hammam_ref_portrait.jpg` + `refs/hammam_ref_mole.jpg` | الهوية والشامة |
| `backgrounds/likeness/*.jpg` | صور بملامحي تُستخدم داخل مشاهد الموشن |
| `podcast_lipsync/A1..A4.wav` | مقاطع الصوت للقطات البودكاست |
| لقطات البودكاست الأربع (إن صوّرتها أو ولّدتها) | A-roll جاهز |
| `cover/cover_A_eyes.jpg` | مرجع للهوية البصرية |

---

## الأمر (انسخه كما هو)

```
You are producing a finished, professional vertical video (9:16, 1080x1920, 30 fps, ~65 s) for my Arabic podcast «ما لا يُقال» by همام ديك (Hammam Deek). Work step by step, show me a plan first, then a low-res preview, then the final. Do not invent or rewrite any Arabic words.

## 1. Non-negotiables
- AUDIO: use ONLY the attached voice_cut_-14LUFS.mp3 as the voice. Never generate a synthetic voice, never re-record, never translate. Final mix: voice at −14 LUFS integrated, true peak ≤ −1 dBTP.
- CAPTIONS: use the exact Arabic text and timings from subtitles.srt / timeline.json (Levantine dialect, keep spelling as given). Right-to-left, proper Arabic letter joining (no disconnected letters, no letter-spacing on Arabic, never split a word into separate letters).
- IDENTITY: wherever I appear, keep my exact face: short dark hair with receding temples, trimmed beard, moustache with goatee (سكسوكة), grey hairs in the beard, and a small dark MOLE ABOVE THE LEFT CORNER OF MY UPPER LIP (it appears on the image-right side when I face the camera). Natural skin texture, not beautified, no face swap drift. Check every shot for the mole side.

## 2. Structure (follow these timecodes exactly; they match the audio)
| time | type | content |
|---|---|---|
| 0:00.00–0:11.45 | PODCAST A-roll (A1) | me at the mic, front medium shot. Lines: «كم مرّة قابلنا شخص… وطلعنا من عنده بانطباع معيّن… حكينا إنه مغرور… بارد… عصبي… أو أسلوبه سيّئ… وحطّيناه بمكان معيّن براسنا… مع إنّا ما شفنا منه غير لحظة». Overlay: words «مغرور» «بارد» «عصبي» «أسلوبه سيّئ» pop in as copper-outlined pill tags around me (not over my face) exactly when spoken (~4.0 s, 4.9 s, 5.8 s, 6.7 s). At «لحظة» (9.58 s): camera viewfinder corner brackets snap in + a 2-frame soft white flash + shutter sound. |
| 0:11.45–0:16.05 | KINETIC TYPE | «والمشكلة مش إنّا منحس» then «أو بنتأثر… أو حتى بنغلط بالتفسير». Big centered type (~100 px), each word revealed right-to-left with a mask wipe + small rise + blur-to-sharp, timed to the voice. |
| 0:16.05–0:23.77 | KINETIC + PHOTO | an old polaroid photo (use backgrounds/likeness/2_old_room.jpg, sepia) slides up and slowly burns at the edges while the text reads «المشكلة إنّا مرّات منضل عايشين جوّا تفسير قديم» — «تفسير قديم» in copper with an underline that draws itself — then «حتى بعد ما تتغيّر الظروف» and «والناس… وحتى إحنا نفسنا». |
| 0:23.77–0:30.25 | PODCAST A-roll (A2) | side 3/4 angle. «إحنا منحاول نفهم الناس… بس هل بنحاول نفهم حالنا بنفس القدر؟ ولا تعوّدنا نحكي عن حالنا بجمل جاهزة». |
| 0:30.25–0:37.25 | KINETIC TYPE | over a dark, blurred mirror image (3_mirror.jpg): four label cards stack one by one exactly when spoken: «أنا عصبي» (30.27) «أنا ما بثق بحدا» (31.70) «أنا ما بحب أطلب مساعدة» (32.93) «أنا هيك… وما رح أتغيّر» (34.61). At ~35.4 s a copper line strikes through each card in sequence, then all cards fall and blur out. |
| 0:37.25–0:43.50 | KINETIC TYPE | slow camera pull-back through the words «بس تخيّل لو إنّك» / «بدل ما تعتبر هاي الجمل تعريف نهائي إلك» / «رجعت خطوة لورا… وسألت حالك:» with a small window of 4b_corridor_back.jpg (man facing a lit door) in the center. |
| 0:43.50–0:46.07 | CLIMAX | near-black. «من متى» huge in copper (~210 px), «أنا هيك؟» below in ivory. Very faint eyes image (4a_eyes.jpg) behind. From 44.57 to 46.07: COMPLETE SILENCE in music and SFX (voice room tone only). The text holds still. |
| 0:46.07–0:54.47 | PODCAST A-roll (A3) | front angle. «شو اللي صار وخلّاني أتصرّف بهالطريقة؟ وهل هاي فعلاً طبيعتي؟ ولا طريقة تعلّمتها بوقت كنت محتاج فيها أحمي حالي؟». Warmer grade from here. |
| 0:54.47–0:59.75 | KINETIC TYPE | «لأنه مرّات… إحنا ما بنحتاج نغيّر الماضي» — the word «الماضي» gets an ivory strike-through after it is spoken — then «قد ما بنحتاج نفهم شو عمل فينا» with «نفهم» in copper. |
| 0:59.75–0:62.72 | PODCAST A-roll (A4) | «أنا همام ديك… وهذا ما لا يُقال». Close, warm, direct eye contact, slight smile. |
| 0:62.72–0:65.22 | LOGO | «ما لا يُقال» in Aref Ruqaa (رقعة), revealed right-to-left by a mask wipe, faint copper glow, a thin copper line draws under it, then «همام ديك» in IBM Plex Sans Arabic Light, grey. Fade out. |

## 3. Podcast A-roll
If I attach real podcast clips, use them. Otherwise generate them: first a photoreal still of me (from the reference photos) in a dark intimate podcast studio — walnut desk, black Shure SM7B on a boom arm at chin height beside my mouth (never covering it), dark acoustic panels, one warm amber lamp, soft haze, teal-black shadows; black t-shirt under a charcoal blazer; 9:16. Then lip-sync that still to the matching audio clip (A1_hook.wav, A2_self.wav, A3_nature.wav, A4_signature.wav) with an image+audio talking-head model (OmniHuman / HeyGen Avatar IV / Hedra). Direction: calm reflective podcast delivery, subtle natural head movement, slow blinks, no exaggerated gestures. Two angles at least (front medium + side 3/4). The video's audio must remain my original recording. Captions over A-roll sit in the lower third (y≈1290 px) with a dark gradient behind; a small «ما لا يُقال» Ruqaa bug at the top right (opacity 0.7). Slow 4–9 % push-in on every A-roll shot.

## 4. Visual identity
- Colours: background #0B0D10 / #10181B, text ivory #EDE6D6, accent copper #B8835A (only the emphasised word), secondary grey #9A9590. Living background in B-roll: slow drifting copper and teal glows + warm dust particles + film grain 3–5 % + soft vignette.
- Fonts: IBM Plex Sans Arabic (Light 300 body, SemiBold 600 for the emphasised word); logo in Aref Ruqaa.
- Motion: confident but calm. Expo-out easing, mask reveals, self-drawing copper lines, depth/parallax moves. No bounce, no shake, no neon, no bright yellow/red, no meme-style pops, no emoji.
- Transitions: A↔B cuts with a quick zoom-blur (scale 1→1.12 out, 0.94→1 in) plus a thin warm light bar sweeping right-to-left across the cut.
- Safe zones: keep text out of the bottom 20 % and the right-edge UI; never put text over my face.

## 5. Sound design (under the voice)
Music: original or properly licensed dark-ambient / cinematic drone, no beat, ~15 LU under the voice, ducked ~5 dB while I speak, enough 100–250 Hz energy to be heard on phones. Arc: calm → tension from 0:24 → swell from 0:37 → hard cut to silence at 44.57 → warm release from 46.07 → one low piano note with a long tail at 62.72.
SFX: soft whoosh on every A/B cut (11.45, 16.05, 23.77, 30.25, 37.25, 46.07, 54.47, 59.75); shutter at 9.58; soft pops as tags land; a paper/pen scratch for each strike-through (~35.4 s and ~56.6 s); film-crackle bed under the polaroid; reverse swell 41.8→43.58 and a low sub hit at 43.58; shimmer into the logo.

## 6. Deliverables
1. MP4 H.264, 1080x1920, 30 fps, yuv420p (TV range, bt709), AAC 192 kbps, +faststart, ~6–8 Mbps.
2. A 720p preview under 20 MB.
3. A version without captions (clean).
4. A 9:16 cover: my eyes close-up with «من متى أنا هيك؟», key text inside the centre 4:5 area.
5. The project/source files so I can edit later.
Before final render, send me 6 still frames (one per section) for approval.
```

---

## لقطات البودكاست التي تحتاجها (بصوتك وبالعربي)
إن صوّرتها بنفسك فهذا أفضل من توليدها: شغّل المقطع في سماعة أذن، وقُل الجملة معه بنفس الإيقاع، فتتطابق الشفاه مع الصوت الأصلي.

| المقطع | الوقت في الفيديو | المدة | الزاوية | الجملة بالضبط |
|---|---|---|---|---|
| **A1** | 0:00–0:11.5 | 11.5 ث | أمامية متوسطة | كم مرّة قابلنا شخص… وطلعنا من عنده بانطباع معيّن… حكينا إنه مغرور… بارد… عصبي… أو أسلوبه سيّئ… وحطّيناه بمكان معيّن براسنا… مع إنّا ما شفنا منه غير لحظة |
| **A2** | 0:23.8–0:30.3 | 6.5 ث | جانبية 3/4 | إحنا منحاول نفهم الناس… بس هل بنحاول نفهم حالنا بنفس القدر؟ ولا تعوّدنا نحكي عن حالنا بجمل جاهزة |
| **A3** | 0:46.1–0:53.5 | 7.5 ث | أمامية متوسطة | شو اللي صار وخلّاني أتصرّف بهالطريقة؟ وهل هاي فعلاً طبيعتي؟ ولا طريقة تعلّمتها بوقت كنت محتاج فيها أحمي حالي؟ |
| **A4** | 0:59.8–0:62.7 | 3 ث | قريبة، نظرة مباشرة | أنا همام ديك… وهذا ما لا يُقال |

### إعدادات التصوير
- **الكاميرا:** الهاتف عمودياً بدقة 4K وسرعة 30 إطاراً في الثانية، على حامل ثابت بمستوى العين، على بعد متر ونصف تقريباً.
- **المايك:** يظهر في الكادر بجانب الفم ولا يغطيه. الصوت المسجل لا يُستخدم، فأي مايك يصلح للشكل فقط.
- **الإضاءة:** مصدر دافئ واحد من جانب، وخلفية داكنة (رف كتب، لوح خشب، أو جدار داكن)، ومصباح صغير في الخلفية.
- **اللبس:** تيشيرت أسود وبليزر داكن، كما في صورك المرجعية.
- **الأداء:** هادئ وتأملي. خذ نَفَساً قبل كل جملة، واترك ثانية صمت بعدها.
- **الكمية:** صوّر كل جملة مرتين أو ثلاثاً، من الزاويتين إن أمكن.
