# ما لا يُقال: اللقطات على Google Flow (Veo 3.1)

## الإعداد العام (لكل اللقطات)
- **Aspect ratio:** 9:16 (Portrait) · **Model:** Veo 3.1 (Quality) · **المدة:** 8 ثوانٍ
- **الوضع:** `Ingredients to Video`
- **ارفع هذه المكوّنات (Ingredients) في كل لقطة يظهر فيها همام:**
  1. `refs/hammam_ref_portrait.jpg`: الصورة الأمامية في الممر
  2. `refs/hammam_ref_mole.jpg`: صورة الشامة واللحية
  3. `wood_room_graded.png`: لقطة الديكور الخشبي بعد تعديل الألوان للقطات الكلام المباشر
- **الصوت:** Flow يولّد صوتاً من عنده. **اكتم صوت كل اللقطات** عند المونتاج، فالصوت النهائي هو `voice_cut_-14LUFS.mp3`.
- **عن لقطات الكلام المباشر:** الصوت الذي يولّده Veo ليس صوتك. فائدة الحوار المكتوب في الـ Prompt أن تتحرك الشفاه بإيقاع قريب من الجملة، لكن التطابق مع صوت البودكاست لن يكون دقيقاً. لذلك تُستخدم هذه اللقطات قصيرة، أو مع قطع إلى لقطة أخرى.
- **ثبّت هذه الجملة في آخر كل Prompt:**
  `Cinematic, muted teal-black shadows, warm amber practical light, desaturated, soft film grain, anamorphic lens, shallow depth of field, slow and calm camera, natural skin texture, not beautified. Keep his exact face, beard, goatee and the small mole above the left corner of his upper lip.`

---

## اللقطة A: الافتتاحية، كلام مباشر (0:00 ← 0:08)
**المكوّنات:** 1 + 2 + 3
```
Medium close-up, vertical. The same man from the references sits in a warm wood-panelled room wearing a dark charcoal blazer over a grey t-shirt. He looks straight into the lens, calm and intimate, as if asking the viewer a personal question. Very slow push-in. Soft key light from the left, the background falls into warm shadow. He says in Levantine Arabic, slowly with natural pauses: "كم مرّة قابلنا شخص... وطلعنا من عنده بانطباع معيّن... حكينا إنه مغرور... بارد... عصبي". Room tone only, no music.
```

## اللقطة B: اللمحة، صامتة (0:07 ← 0:12)
**المكوّنات:** 1 + 2 + `backgrounds/1_glimpse.jpg` (للأسلوب)
```
Vertical. Night, seen from a train platform through a rain-streaked window: the same man sits inside the carriage, looking slightly away, half his face in deep shadow, one eye catching a thin warm amber light. The train begins to move very slowly, raindrops run across the glass, city lights pass as soft bokeh. On the final second the frame almost freezes. No dialogue, soft rain ambience.
```
> عند الثانية 0:09.6 ("لحظة") جمّد الصورة عند آخر إطار واخفض إضاءتها 20%.

## اللقطة C: التفسير القديم، صامتة (0:12 ← 0:23)
**المكوّنات:** 1 + `backgrounds/2_old_interpretation.jpg` (للمكان)
```
Vertical. An abandoned living room with all furniture draped in white dust sheets. The same man sits still in an armchair in three-quarter profile, elbows on knees, looking at an old framed photograph on the wall. A shaft of pale window light drifts slowly across the floating dust. Imperceptibly slow dolly-in. He barely moves; only a slow breath. No dialogue, quiet room tone.
```
> 8 ثوانٍ لا تكفي المشهد، فاستخدم `Extend` في Flow لتمديدها 4 ثوانٍ.

## اللقطة D: المرآة، صامتة (0:24 ← 0:36)
**المكوّنات:** 1 + 2
```
Vertical, over-the-shoulder from behind. The same man stands before a fogged bathroom mirror in a dim room lit by one warm tungsten bulb. Slowly he wipes one horizontal streak through the condensation with his palm, revealing his eyes in the reflection. He holds his own gaze, serious and searching. Then the fog slowly creeps back over the streak. No dialogue, faint hum of the bulb.
```
> مدّدها بـ `Extend`. النص («أنا عصبي»…) يظهر في المساحة الضبابية أعلى المرآة.

## اللقطة E: "من متى أنا هيك؟"، صامتة (0:43 ← 0:46)
**المكوّنات:** 1 + 2
```
Vertical extreme close-up in near darkness. A thin horizontal band of warm amber light across the same man's eyes. His gaze is lowered, then slowly rises to meet the lens and holds, completely still. Everything above the eyes is deep black. No dialogue, silence.
```
> هذه لحظة الصمت (1.5 ثانية). اختر الجزء الذي ترتفع فيه عيناه نحو الكاميرا.

## اللقطة F: "وهل هاي فعلاً طبيعتي؟"، كلام مباشر (0:48 ← 0:53)
**المكوّنات:** 1 + 2 + 3
```
Close-up, vertical, same warm wood-panelled room, now darker and moodier than before. The same man looks into the lens, softer, vulnerable, a slight pause before speaking. Very slow pull-back. He says quietly in Levantine Arabic: "وهل هاي فعلاً طبيعتي؟ ولا طريقة تعلّمتها بوقت كنت محتاج فيها أحمي حالي؟". Room tone only.
```
> بديل عن مقطع الممر في المشهد 4ب. أنصح بالقطع بين الاثنين: الممر من 0:46 إلى 0:48، ثم هذه اللقطة.

## اللقطة G: التوقيع، كلام مباشر (0:59.8 ← 1:03)
**المكوّنات:** 1 + 2 + 3
```
Medium close-up, vertical, dark wood-panelled room, single warm key light. The same man looks into the lens, a faint, warm half-smile. He says calmly in Levantine Arabic: "أنا همام ديك... وهذا ما لا يُقال". Then he holds his gaze in silence as the light slowly dims to black. Room tone only.
```

---

## ملخص التركيب
| الوقت | اللقطة | النوع |
|---|---|---|
| 0:00 ← 0:07 | A | كلام مباشر |
| 0:07 ← 0:12 | B | صامتة |
| 0:12 ← 0:23 | C | صامتة |
| 0:24 ← 0:37 | D | صامتة |
| 0:37 ← 0:43 | `backgrounds/3_fogged_mirror.jpg` بحركة بطيئة، أو تمديد D | صامتة |
| 0:43 ← 0:46 | E | صمت |
| 0:46 ← 0:48 | `footage/4b_corridor_walk.mp4` | حقيقية |
| 0:48 ← 0:54 | F | كلام مباشر |
| 0:54 ← 0:60 | `backgrounds/5_outro.jpg` | صامتة |
| 0:60 ← 1:05 | G ← سواد ← الشعار | كلام مباشر |

بعد التوليد ارفع اللقطات هنا، فأقصّها وأعدّل ألوانها لتتطابق وأركّبها على الصوت والنصوص.
