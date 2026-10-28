# «ما لا يُقال» — المراجعة الشاملة لأوامر Google Flow

45 لقطة (25 بودكاست + 20 موشن) · مدة الحلقة 4:53.1 · مجموع التوليد 394 ث

## المسار المعتمد للصوت (اقرأه قبل أي توليد)
| | المسار أ — **المعتمد** | المسار ب — غير مستحسن |
|---|---|---|
| الصوت النهائي | تسجيلك الأصلي (`voice_full_-14LUFS.mp3`) | الصوت اللي بيولّده Flow |
| صوت Flow | **يُكتم بالكامل** | يُستخدم |
| حركة الفم | تُعاد بأداة مزامنة شفايف (Sync.so lipsync-2-pro أو بديل) على مقطع صوتك لكل لقطة من `lipsync_audio/` | من Flow نفسه |
| الحوار داخل الأمر | يبقى، لأنه بيعطي حركة فم وإيقاع رأس قريبين من الكلام، بس اللهجة الناتجة ما بتنسمع | هو اللي بيحدد الصوت، واللهجة مش مضمونة (اختبار A01.1: اللهجة طلعت شامية/غير أردنية) |
| المخاطرة | جودة المزامنة (تُختبر على لقطة وحدة أولاً) | لهجة وتوقيت ما بيطابقوا تسجيلك، ونص بيختلف عن كلامك الفعلي |

الأوامر تحت مكتوبة بحيث تشتغل بالمسارين بدون تعديل. قسم «اختبار الصوت» مفيد للمسار ب فقط، أو لتحسين حركة الفم قبل المزامنة.

---

## القسم الأول: ملخص التدقيق

### الحوار والنطق
- **مصدر الحوار:** تفريغ تسجيلك الحقيقي (Whisper turbo) مع تصحيحات يدوية سابقة. أعدت تفريغ المقاطع المشكوك فيها من التسجيل مباشرة:
  - «…من فترة **موقف**… لو سألتني» (0:00–0:05): **موجودة فعلاً بالتسجيل** (إعادة بداية طبيعية). تبقى.
  - «معنا **إحنا… إحنا** منحاول» (1:36–1:38): **موجودة فعلاً بالتسجيل** (تكرار توكيدي). تبقى.
  - «سوء فهم… في ظلم حقيقي» (3:10): الكلمات صحيحة؛ أضفت وقفة «…» بين الفكرتين (تصحيح ترقيم فقط).
- **ما تغيّرت ولا كلمة.** كل التعديلات علامات ترقيم: وقفة ≥ 0.3 ث بالتسجيل → «…»، أقصر → «،». هيك الترقيم مأخوذ من إيقاعك الحقيقي مش تخمين.
- 6 لقطات فيها علامة «[؟]» كانت تعني «مش متأكد إذا الجملة سؤال». شلت العلامة من الحوار وحطيت الجمل بالقسم الخامس للقرار.
- المفردات أردنية مقبولة: «مش» ×10، «إشي» ×4، «هيك»، «شو»، «بدّي». ما في كلمات شامية واضحة مثل «هلّق» أو «مشان». سبب اللهجة الشامية بالاختبار على الأغلب كلمة «Levantine» بالأمر القديم، فشلتها.
- التشكيل: ما أضفت تشكيل جديد. الموجود («بفكّر»، «إنّي») من التفريغ الأصلي.

### التوقيت
- مدة كل لقطة بودكاست **مقاسة من التسجيل** (بداية ونهاية الجمل الفعلية)، مش تقدير من عدد الكلمات.
- كل لقطة بودكاست ≤ 9.7 ث، والتوليد 10 ث ثم قص. اللقطات القصيرة (أقل من 6 ث، 11 لقطات): لو Flow بيسمح بمدة أقصر (4 أو 6 أو 8 ث)، استخدم أقصر مدة أطول من اللقطة. هاد بيحتاج تحقق بالواجهة.
- الفجوات بين اللقطات صمت بين جملتين، وبتنغطّى بتمديد اللقطة السابقة بالمونتاج. التفاصيل بالقسم الرابع.

### الهوية والاستمرارية
- كل لقطة بودكاست بتبدأ من صورة أساسية معتمدة (`keyframes/`): الأمامية `K_front_a` (من A01.1) و`K_front_b`، والجانبية `K_side_a` و`K_side_b`. (أ) و(ب) بيتناوبوا حتى ما يتكرر نفس الوضع بلقطتين ورا بعض.
- **فرق ديكور:** الصور الجانبية المعتمدة فيها لمبة أسطوانية ورفوف على اليسار ونبتة، والأمامية فيها لمبة كروية. لهيك وصف البيئة بالأوامر الجانبية بيقول «نفس استوديو الصورة المرجعية» بدل ما يفرض اللمبة الكروية. بيحتاج قرار (القسم الخامس).
- الأمر القديم كان يطلب «كمّل من آخر إطار» و«غيّر الزاوية» مع بعض. هاد انحل بنظام الصور الأساسية.

### أوامر الموشن (B-roll)
- **B04 مخالف للقواعد:** كان «شاشة مقسومة»، وتعليمات الوكيل بتمنع الشاشات المقسومة. صار لقطة وحدة: قبضة ماسكة بطاقة مضيئة وبتنفتح ببطء. المعنى بيوصل بالحركة نفسها.
- **B12 خطر على الهوية:** كان «رجلين متطابقين قاعدين مقابل بعض»، يعني وجهك مرتين بدون مرجع، ونسبة تشوّه عالية. صار ظل رجل مقابل انعكاسه الضبابي بشباك. بيحتاج موافقتك.
- **B07** (المراية) و**B06** (الممر): الشخص ظل أو انعكاس غير واضح، بدون وجه.
- اللقطات اللي على جزأين (B02، B03، B07، B10، B14): كل جزء إله مرحلة مختلفة (بداية ← نهاية) بدل تكرار نفس الوصف. الجزء الثاني بيبدأ من آخر إطار في الأول.
- أسطر «النص على الشاشة» القديمة صارت **ملاحظة مونتاج** بس، وما في ولا أمر بيطلب نص بالصورة.

### إعدادات بتحتاج تحقق داخل Flow
- النموذج Omni 1.1 Flash، والحد 10 ث، ودقة 720p، وتكلفة 15 رصيد لكل 10 ث: من كلام Flow ومن تقارير توليداتك الأخيرة. التكلفة تأكدت بثلاث توليدات.
- هل في مدد أقصر من 10 ث لـ Omni Flash؟ مش مؤكد.
- طول الأمر: الأوامر الجديدة أطول (حوالي 330–380 كلمة للبودكاست) لأنك طلبت كل التعليمات بكل أمر. Flow قال 100–180 كلمة مثالي، فلازم نجرّب: إذا تجاهل أجزاء، منرجع للنسخة المختصرة بـ `FLOW_SHOTS_OMNI.md`.
- تعليمات الوكيل (Agent instructions) بتكرر الهوية والممنوعات تلقائياً، فالأمر الطويل مش ضروري لو البطاقات شغالة.

---

## القسم الثاني: سجل التعديلات

| اللقطة | الأصل (مختصر) | التعديل | السبب | الحالة |
|---|---|---|---|---|
| كل البودكاست | «spoken urban Jordanian (Ammani) Levantine Arabic» | قسم صوت ثابت بدون كلمة Levantine | Levantine بتشد للهجة الشامية | مؤكد |
| كل البودكاست | الحوار بنفس سطر الوصف | قسم مستقل `EXACT SPOKEN DIALOGUE` | فصل الحوار عن التعليمات | مؤكد |
| كل البودكاست | زاوية موصوفة بالكلام | الإطار الأول صورة أساسية معتمدة | Flow تجاهل وصف الزاوية الجانبية (A01.2) | مؤكد |
| B04 | شاشة مقسومة | لقطة وحدة: قبضة بتنفتح | تعليمات الوكيل بتمنع الشاشات المقسومة | مؤكد |
| B12 | رجلين متطابقين | ظل + انعكاس ضبابي | خطر تشوّه الهوية | **بحاجة موافقة** |
| B02/B03/B07/B10/B14 | نفس الوصف للجزأين | مرحلة لكل جزء | استمرارية بدل تكرار | مؤكد |
| B14 | «Fast reverse-motion flicker» | ترجيع بيتباطأ وبيوقف | قاعدة الحركة الهادئة | مؤكد |

| A01.1 | في يوم وأنا قاعد بفكّر بموقف صار معي من فترة موقف… لو سألتني… | ترقيم فقط: في يوم وأنا قاعد بفكّر بموقف صار معي من فترة… موقف… لو سألتن… | وقفات من التسجيل | مؤكد (ترقيم) |
| A01.2 | وليش صار… ومين كان معه حق ومين كان لازم يتصرّف بطريقة تانية … | ترقيم فقط: وليش صار… ومين كان معه حق، ومين كان لازم يتصرّف بطريقة تانية… | وقفات من التسجيل | مؤكد (ترقيم) |
| A02.1 | الغريب إنه السؤال ما وقف عند الموقف نفسه بلّش ياخدني لمواقف … | ترقيم فقط: الغريب إنه السؤال ما وقف عند الموقف نفسه… بلّش ياخدني لمواقف… | وقفات من التسجيل | مؤكد (ترقيم) |
| A03.1 | وبتذكّرني هاي الفكرة بشغلة تانية كم مرّة قابلنا شخص وطلعنا م… | ترقيم فقط: وبتذكّرني هاي الفكرة بشغلة تانية… كم مرّة قابلنا شخص وطلعنا … | وقفات من التسجيل | مؤكد (ترقيم) |
| A03.2 | حكينا إنه مغرور… بارد… عصبي… أو أسلوبه سيّئ وحطّيناه بمكان م… | ترقيم فقط: حكينا إنه مغرور… بارد… عصبي… أو أسلوبه سيّئ، وحطّيناه بمكان … | وقفات من التسجيل | مؤكد (ترقيم) |
| A03.3 | ويمكن فعلاً كان عنده تصرّف غلط لازم يتحمّل مسؤوليته بس إحنا … | ترقيم فقط: ويمكن فعلاً كان عنده تصرّف غلط لازم يتحمّل مسؤوليته… بس إحنا… | وقفات من التسجيل | مؤكد (ترقيم) |
| A04.3 | واللي استوقفني أكتر إنه نفس الإشي بيصير معنا إحنا إحنا منحاو… | ترقيم فقط: واللي استوقفني أكتر إنه نفس الإشي بيصير معنا إحنا… إحنا منحا… | وقفات من التسجيل | مؤكد (ترقيم) |
| A08.2 | يمكن التغيير يبلّش لما تفهم حالك من غير ما تظلمها… وتتحمّل م… | ترقيم فقط: يمكن التغيير يبلّش لما تفهم حالك من غير ما تظلمها… وتتحمّل م… | وقفات من التسجيل | مؤكد (ترقيم) |
| A09.1 | وهذا ما بيعني إنه كل الناس على حق… ولا إنه كل اختلاف سببه سو… | ترقيم فقط: وهذا ما بيعني إنه كل الناس على حق… ولا إنه كل اختلاف سببه سو… | وقفات من التسجيل | مؤكد (ترقيم) |
| A10.1 | وممكن نفهم الإنسان من غير ما نوافقه… ونحبّه ونحط حدود بنفس ا… | ترقيم فقط: وممكن نفهم الإنسان من غير ما نوافقه… ونحبّه ونحط حدود بنفس ا… | وقفات من التسجيل | مؤكد (ترقيم) |
| A12.2 | هي كمان مساحة نراجع فيها الأشياء اللي طول عمرنا مفكّرين إنّا… | ترقيم فقط: هي كمان مساحة نراجع فيها الأشياء اللي طول عمرنا مفكّرين إنّا… | وقفات من التسجيل | مؤكد (ترقيم) |
| A12.3 | يمكن في قصة أو انطباع بحياتك… لليوم بتحكيها بنفس الطريقة عن … | ترقيم فقط: يمكن في قصة أو انطباع بحياتك… لليوم بتحكيها بنفس الطريقة، عن… | وقفات من التسجيل | مؤكد (ترقيم) |

---

## القسم الثالث: جميع الأوامر المنقّحة (بالترتيب)

كل أمر مستقل وكامل. انسخ من `SHOT ID` لآخر سطر. لقطات البودكاست: Frames to Video، والإطار الأول هو الصورة المذكورة، مع `@me`.


### A01 — 0:00.0–0:16.1 · بودكاست

**A01.1** — 7.6 ث كلام · 24 كلمة · زاوية أمامية · صوت المزامنة: `lipsync_audio/A01.1.wav`

```
SHOT ID: A01.1
Duration: 8.5 s in the edit (0:00.0–0:08.5) — generate 10 s, trim in the edit
Generation Mode: Frames to Video
Reference Frame: K_front_a.jpg + @me

EXACT SPOKEN DIALOGUE:
"في يوم وأنا قاعد بفكّر بموقف صار معي من فترة… موقف… لو سألتني عنه وقتها، كنت رح أحكيلك إنّي فاهمه منيح… فاهم شو صار"

Voice and Delivery: A natural adult male voice, warm, grounded and clear, speaking to one listener in a natural urban Ammani Jordanian Arabic dialect. Do not use generic Levantine Arabic. Do not imitate a Lebanese accent. Do not imitate a Syrian accent. Do not switch to Modern Standard Arabic. Do not exaggerate the dialect. The speaker himself pronounces qaf as a glottal stop in everyday colloquial words, as urban Ammani speakers do; keep this consistent across the clip. Do not change the written spelling. Do not force a hard qaf. Natural Jordanian word linking, conversational rhythm, short pauses only where the meaning requires them. No theatrical acting. No whispering. No robotic delivery. Speak only the supplied dialogue. No added words. No omitted words. No repeated words. No translation. No paraphrasing. Treat punctuation as pacing guidance only. Do not read punctuation aloud.
Performance: Subtle facial expressions, natural blinking, small head movements, restrained hand gestures below the chin, realistic speech-aligned mouth movement. Keep the whole mouth visible at all times.
Camera and Framing: Vertical 9:16. Medium close-up at eye level, exactly matching the reference frame's composition (head in the upper third, microphone entering from frame-right below mouth level). Very slow push-in of no more than 2%, otherwise locked-off.
Identity Lock: Use the exact identity from @me and the provided reference frame. Preserve the real facial structure, natural skin texture, short dark hair with receding temples, connected moustache and goatee with grey hairs in the chin, and the small dark mole above the LEFT corner of the upper lip (viewer's right in a frontal view). Never mirror the image. Never flip the image horizontally. Do not beautify the face. Do not de-age the face. Do not reshape the face. Do not slim the face. Do not replace the person. Do not change the nose. Do not change the jaw. Do not change the eyes. Do not change the mouth.
Wardrobe and Environment: Navy unstructured blazer over a heather warm-grey crew-neck T-shirt. Dark walnut slatted wall, wooden shelves with a few books, warm amber globe lamp in soft bokeh, light walnut desk, black dynamic microphone on a boom arm beside the mouth. The microphone never covers the mouth.
Lighting and Style: Photorealistic cinematic podcast footage. Low-key warm tungsten key light from camera-left, gentle natural shadows, subtle teal-black shadows with amber highlights, shallow depth of field, natural skin texture.
Negative Constraints: No on-screen text. No subtitles. No captions. No titles. No logos. No watermarks. No letters. No numbers. No extra people. No mirrored identity. No facial changes. No obscured mouth. No exaggerated gestures. No sudden camera movement. No cuts. No scene changes. No invented dialogue. No duplicated dialogue. No music. No sound effects.
```

**A01.2** — 6.2 ث كلام · 19 كلمة · زاوية جانبية · صوت المزامنة: `lipsync_audio/A01.2.wav`

```
SHOT ID: A01.2
Duration: 7.5 s in the edit (0:08.7–0:16.1) — generate 10 s, trim in the edit
Generation Mode: Frames to Video
Reference Frame: K_side_a.jpg + @me

EXACT SPOKEN DIALOGUE:
"وليش صار… ومين كان معه حق، ومين كان لازم يتصرّف بطريقة تانية… كنت مرتّب القصة براسي… من أولها لآخرها"

Voice and Delivery: A natural adult male voice, warm, grounded and clear, speaking to one listener in a natural urban Ammani Jordanian Arabic dialect. Do not use generic Levantine Arabic. Do not imitate a Lebanese accent. Do not imitate a Syrian accent. Do not switch to Modern Standard Arabic. Do not exaggerate the dialect. The speaker himself pronounces qaf as a glottal stop in everyday colloquial words, as urban Ammani speakers do; keep this consistent across the clip. Do not change the written spelling. Do not force a hard qaf. Natural Jordanian word linking, conversational rhythm, short pauses only where the meaning requires them. No theatrical acting. No whispering. No robotic delivery. Speak only the supplied dialogue. No added words. No omitted words. No repeated words. No translation. No paraphrasing. Treat punctuation as pacing guidance only. Do not read punctuation aloud.
Performance: Subtle facial expressions, natural blinking, small head movements, restrained hand gestures below the chin, realistic speech-aligned mouth movement. Keep the whole mouth visible at all times.
Camera and Framing: Vertical 9:16. Three-quarter angle from his right side, exactly matching the reference frame's composition and eyeline (he looks slightly off-camera toward frame-right). Both eyes and the full mouth visible. Locked-off or a barely perceptible drift.
Identity Lock: Use the exact identity from @me and the provided reference frame. Preserve the real facial structure, natural skin texture, short dark hair with receding temples, connected moustache and goatee with grey hairs in the chin, and the small dark mole above the LEFT corner of the upper lip (viewer's right in a frontal view). Never mirror the image. Never flip the image horizontally. Do not beautify the face. Do not de-age the face. Do not reshape the face. Do not slim the face. Do not replace the person. Do not change the nose. Do not change the jaw. Do not change the eyes. Do not change the mouth.
Wardrobe and Environment: Navy unstructured blazer over a heather warm-grey crew-neck T-shirt. The same studio as the reference frame: walnut slatted wall, wooden shelves with a few books, warm amber Edison lamp in soft bokeh, light walnut desk, black dynamic microphone in the foreground at frame-left, below the mouth. The microphone never covers the mouth.
Lighting and Style: Photorealistic cinematic podcast footage. Keep the reference frame's light direction and warmth exactly, gentle natural shadows, subtle teal-black shadows with amber highlights, shallow depth of field, natural skin texture.
Negative Constraints: No on-screen text. No subtitles. No captions. No titles. No logos. No watermarks. No letters. No numbers. No extra people. No mirrored identity. No facial changes. No obscured mouth. No exaggerated gestures. No sudden camera movement. No cuts. No scene changes. No invented dialogue. No duplicated dialogue. No music. No sound effects.
```


### B01 — 0:16.1–0:24.0 · موشن

> ملاحظة مونتاج فقط (ما بيظهر بالتوليد): الكلام اللي بتغطيه اللقطة: «بس وأنا برجع أفكّر فيها… خطر ببالي سؤال صغير… طيب… أنا بعرف شو صار فعلاً؟ ولا بعرف بس كيف أنا شفت وفسّرت اللي صار؟»

**B01.1**

```
SHOT ID: B01.1
Duration: 7.9 s in the edit (0:16.1–0:24.0) — generate 8 s
Generation Mode: Text to Video (no @me, no reference images)
Visual Meaning: سؤال صغير بيخلخل اليقين: «بعرف شو صار فعلاً؟ ولا كيف فسّرته؟»

9:16 vertical cinematic B-roll metaphor.
Main Visual: A single glowing copper question mark in a dark void, with a fainter reflection of it behind.
Motion: Golden dust drifts in darkness and slowly gathers into a glowing copper question mark; a fainter reflection forms behind it; the shot ends on the still, fully formed shape.
Camera: Slow push-in from a medium shot to a close shot, centred.
Lighting and Color: Cinematic warm amber highlights, deep teal-black shadows, soft atmospheric light, shallow depth of field, restrained contrast. Photorealistic.
Continuity: Stand-alone opening of this metaphor; it follows A01.2 and is joined to it in the edit with a soft dissolve. It is followed by A02.1.
Negative Constraints: No readable text. No letters. No numbers. No captions. No subtitles. No titles. No logos. No watermarks. No random people. No distracting objects. No abrupt cuts. No excessive motion. No unrelated elements. No dialogue. No music. No sound effects. No sci-fi or magical look. No sparks. No fast swirls. No more than one question mark.
```


### A02 — 0:24.0–0:33.7 · بودكاست

**A02.1** — 7.5 ث كلام · 21 كلمة · زاوية أمامية · صوت المزامنة: `lipsync_audio/A02.1.wav`

```
SHOT ID: A02.1
Duration: 9.7 s in the edit (0:24.0–0:33.7) — generate 10 s, trim in the edit
Generation Mode: Frames to Video
Reference Frame: K_front_b.jpg + @me

EXACT SPOKEN DIALOGUE:
"الغريب إنه السؤال ما وقف عند الموقف نفسه… بلّش ياخدني لمواقف قديمة… وأشخاص اختلفت معهم، وأشياء كنت مقتنع فيها من سنين"

Voice and Delivery: A natural adult male voice, warm, grounded and clear, speaking to one listener in a natural urban Ammani Jordanian Arabic dialect. Do not use generic Levantine Arabic. Do not imitate a Lebanese accent. Do not imitate a Syrian accent. Do not switch to Modern Standard Arabic. Do not exaggerate the dialect. The speaker himself pronounces qaf as a glottal stop in everyday colloquial words, as urban Ammani speakers do; keep this consistent across the clip. Do not change the written spelling. Do not force a hard qaf. Natural Jordanian word linking, conversational rhythm, short pauses only where the meaning requires them. No theatrical acting. No whispering. No robotic delivery. Speak only the supplied dialogue. No added words. No omitted words. No repeated words. No translation. No paraphrasing. Treat punctuation as pacing guidance only. Do not read punctuation aloud.
Performance: Subtle facial expressions, natural blinking, small head movements, restrained hand gestures below the chin, realistic speech-aligned mouth movement. Keep the whole mouth visible at all times.
Camera and Framing: Vertical 9:16. Medium close-up at eye level, exactly matching the reference frame's composition (head in the upper third, microphone entering from frame-right below mouth level). Very slow push-in of no more than 2%, otherwise locked-off.
Identity Lock: Use the exact identity from @me and the provided reference frame. Preserve the real facial structure, natural skin texture, short dark hair with receding temples, connected moustache and goatee with grey hairs in the chin, and the small dark mole above the LEFT corner of the upper lip (viewer's right in a frontal view). Never mirror the image. Never flip the image horizontally. Do not beautify the face. Do not de-age the face. Do not reshape the face. Do not slim the face. Do not replace the person. Do not change the nose. Do not change the jaw. Do not change the eyes. Do not change the mouth.
Wardrobe and Environment: Navy unstructured blazer over a heather warm-grey crew-neck T-shirt. Dark walnut slatted wall, wooden shelves with a few books, warm amber globe lamp in soft bokeh, light walnut desk, black dynamic microphone on a boom arm beside the mouth. The microphone never covers the mouth.
Lighting and Style: Photorealistic cinematic podcast footage. Low-key warm tungsten key light from camera-left, gentle natural shadows, subtle teal-black shadows with amber highlights, shallow depth of field, natural skin texture.
Negative Constraints: No on-screen text. No subtitles. No captions. No titles. No logos. No watermarks. No letters. No numbers. No extra people. No mirrored identity. No facial changes. No obscured mouth. No exaggerated gestures. No sudden camera movement. No cuts. No scene changes. No invented dialogue. No duplicated dialogue. No music. No sound effects.
```


### B02 — 0:33.7–0:47.5 · موشن

> ملاحظة مونتاج فقط (ما بيظهر بالتوليد): الكلام اللي بتغطيه اللقطة: «واكتشفت إنه المعنى اللي بنعطيه لتجاربنا ممكن يضل معنا أطول من التجربة نفسها… ومع الوقت منِنسى إنها كانت مواقف مرّت بحياتنا… ومنصير نتعامل معها كأنها حقائق عنّا وعن الناس»

**B02.1**

```
SHOT ID: B02.1
Duration: 6.9 s in the edit (0:33.7–0:40.6) — generate 8 s
Generation Mode: Text to Video (no @me, no reference images)
Visual Meaning: المعنى اللي بنعطيه للتجربة بيضل أطول من التجربة نفسها، وبيصير «حقيقة»

9:16 vertical cinematic B-roll metaphor.
Main Visual: Old faded photographs (images inside them blurred and unrecognisable) floating in darkness like memories.
Motion: Old faded photographs float slowly in darkness, gently turning, lit by warm amber light; the shot ends with one photograph drifting closer to the lens.
Camera: Slow forward drift between the floating photographs.
Lighting and Color: Cinematic warm amber highlights, deep teal-black shadows, soft atmospheric light, shallow depth of field, restrained contrast. Photorealistic.
Continuity: Stand-alone opening of this metaphor; it follows A02.1 and is joined to it in the edit with a soft dissolve. It must end in a calm state that B02.2 can continue from.
Negative Constraints: No readable text. No letters. No numbers. No captions. No subtitles. No titles. No logos. No watermarks. No random people. No distracting objects. No abrupt cuts. No excessive motion. No unrelated elements. No dialogue. No music. No sound effects. No recognisable faces. No readable writing on the photos. No explosions.
```

**B02.2**

```
SHOT ID: B02.2
Duration: 6.9 s in the edit (0:40.6–0:47.5) — generate 8 s
Generation Mode: Frames to Video — First frame: last frame of B02.1
Visual Meaning: المعنى اللي بنعطيه للتجربة بيضل أطول من التجربة نفسها، وبيصير «حقيقة»

9:16 vertical cinematic B-roll metaphor.
Main Visual: Old faded photographs (images inside them blurred and unrecognisable) floating in darkness like memories.
Motion: The floating photographs slowly crumble into warm golden dust; the dust settles and only a soft amber glow remains in the dark; the shot ends on that glow.
Camera: Slow forward drift between the floating photographs.
Lighting and Color: Cinematic warm amber highlights, deep teal-black shadows, soft atmospheric light, shallow depth of field, restrained contrast. Photorealistic.
Continuity: Continue the same scene from the provided first frame (the last frame of B02.1), no cut, same light and palette. It is followed by B03.1.
Negative Constraints: No readable text. No letters. No numbers. No captions. No subtitles. No titles. No logos. No watermarks. No random people. No distracting objects. No abrupt cuts. No excessive motion. No unrelated elements. No dialogue. No music. No sound effects. No recognisable faces. No readable writing on the photos. No explosions.
```


### B03 — 0:47.5–0:58.1 · موشن

> ملاحظة مونتاج فقط (ما بيظهر بالتوليد): الكلام اللي بتغطيه اللقطة: «والمشكلة مش إنّا منحس… أو بنتأثر… أو حتى بنغلط بالتفسير… المشكلة إنّا مرّات منضل عايشين جوّا تفسير قديم… حتى بعد ما تتغيّر الظروف، والناس… وحتى إحنا نفسنا»

**B03.1**

```
SHOT ID: B03.1
Duration: 5.3 s in the edit (0:47.5–0:52.8) — generate 6 s
Generation Mode: Text to Video (no @me, no reference images)
Visual Meaning: نضل عايشين جوّا تفسير قديم حتى لما تتغيّر الظروف

9:16 vertical cinematic B-roll metaphor.
Main Visual: A vintage sepia photograph of an empty room lying on dark wood.
Motion: A vintage sepia photograph of an empty room lies on dark wood; one corner slowly catches a small flame and the edge begins to glow and curl; the shot ends with the burn reaching a quarter of the photo.
Camera: Top-down macro, very slow push-in.
Lighting and Color: Cinematic warm amber highlights, deep teal-black shadows, soft atmospheric light, shallow depth of field, restrained contrast. Photorealistic.
Continuity: Stand-alone opening of this metaphor; it follows B02.2 and is joined to it in the edit with a soft dissolve. It must end in a calm state that B03.2 can continue from.
Negative Constraints: No readable text. No letters. No numbers. No captions. No subtitles. No titles. No logos. No watermarks. No random people. No distracting objects. No abrupt cuts. No excessive motion. No unrelated elements. No dialogue. No music. No sound effects. No big flames. No smoke filling the frame. No people inside the photo.
```

**B03.2**

```
SHOT ID: B03.2
Duration: 5.3 s in the edit (0:52.8–0:58.1) — generate 6 s
Generation Mode: Frames to Video — First frame: last frame of B03.1
Visual Meaning: نضل عايشين جوّا تفسير قديم حتى لما تتغيّر الظروف

9:16 vertical cinematic B-roll metaphor.
Main Visual: A vintage sepia photograph of an empty room lying on dark wood.
Motion: The slow burn continues across the old photograph, glowing embers curling the edge, while the empty room inside it is still visible; the shot ends with half the photo turned to soft ash and warm embers.
Camera: Top-down macro, very slow push-in.
Lighting and Color: Cinematic warm amber highlights, deep teal-black shadows, soft atmospheric light, shallow depth of field, restrained contrast. Photorealistic.
Continuity: Continue the same scene from the provided first frame (the last frame of B03.1), no cut, same light and palette. It is followed by A03.1.
Negative Constraints: No readable text. No letters. No numbers. No captions. No subtitles. No titles. No logos. No watermarks. No random people. No distracting objects. No abrupt cuts. No excessive motion. No unrelated elements. No dialogue. No music. No sound effects. No big flames. No smoke filling the frame. No people inside the photo.
```


### A03 — 0:58.1–1:18.5 · بودكاست

**A03.1** — 4.8 ث كلام · 14 كلمة · زاوية أمامية · صوت المزامنة: `lipsync_audio/A03.1.wav`

```
SHOT ID: A03.1
Duration: 5.8 s in the edit (0:58.1–1:03.9) — generate 10 s, trim in the edit
Generation Mode: Frames to Video
Reference Frame: K_front_a.jpg + @me

EXACT SPOKEN DIALOGUE:
"وبتذكّرني هاي الفكرة بشغلة تانية… كم مرّة قابلنا شخص وطلعنا من عنده بانطباع معيّن"

Voice and Delivery: A natural adult male voice, warm, grounded and clear, speaking to one listener in a natural urban Ammani Jordanian Arabic dialect. Do not use generic Levantine Arabic. Do not imitate a Lebanese accent. Do not imitate a Syrian accent. Do not switch to Modern Standard Arabic. Do not exaggerate the dialect. The speaker himself pronounces qaf as a glottal stop in everyday colloquial words, as urban Ammani speakers do; keep this consistent across the clip. Do not change the written spelling. Do not force a hard qaf. Natural Jordanian word linking, conversational rhythm, short pauses only where the meaning requires them. No theatrical acting. No whispering. No robotic delivery. Speak only the supplied dialogue. No added words. No omitted words. No repeated words. No translation. No paraphrasing. Treat punctuation as pacing guidance only. Do not read punctuation aloud.
Performance: Subtle facial expressions, natural blinking, small head movements, restrained hand gestures below the chin, realistic speech-aligned mouth movement. Keep the whole mouth visible at all times.
Camera and Framing: Vertical 9:16. Medium close-up at eye level, exactly matching the reference frame's composition (head in the upper third, microphone entering from frame-right below mouth level). Very slow push-in of no more than 2%, otherwise locked-off.
Identity Lock: Use the exact identity from @me and the provided reference frame. Preserve the real facial structure, natural skin texture, short dark hair with receding temples, connected moustache and goatee with grey hairs in the chin, and the small dark mole above the LEFT corner of the upper lip (viewer's right in a frontal view). Never mirror the image. Never flip the image horizontally. Do not beautify the face. Do not de-age the face. Do not reshape the face. Do not slim the face. Do not replace the person. Do not change the nose. Do not change the jaw. Do not change the eyes. Do not change the mouth.
Wardrobe and Environment: Navy unstructured blazer over a heather warm-grey crew-neck T-shirt. Dark walnut slatted wall, wooden shelves with a few books, warm amber globe lamp in soft bokeh, light walnut desk, black dynamic microphone on a boom arm beside the mouth. The microphone never covers the mouth.
Lighting and Style: Photorealistic cinematic podcast footage. Low-key warm tungsten key light from camera-left, gentle natural shadows, subtle teal-black shadows with amber highlights, shallow depth of field, natural skin texture.
Negative Constraints: No on-screen text. No subtitles. No captions. No titles. No logos. No watermarks. No letters. No numbers. No extra people. No mirrored identity. No facial changes. No obscured mouth. No exaggerated gestures. No sudden camera movement. No cuts. No scene changes. No invented dialogue. No duplicated dialogue. No music. No sound effects.
```

**A03.2** — 7.5 ث كلام · 19 كلمة · زاوية جانبية · صوت المزامنة: `lipsync_audio/A03.2.wav`

```
SHOT ID: A03.2
Duration: 7.9 s in the edit (1:04.1–1:12.0) — generate 10 s, trim in the edit
Generation Mode: Frames to Video
Reference Frame: K_side_b.jpg + @me

EXACT SPOKEN DIALOGUE:
"حكينا إنه مغرور… بارد… عصبي… أو أسلوبه سيّئ، وحطّيناه بمكان معيّن براسنا… مع إنّا ما شفنا منه غير لحظة"

Voice and Delivery: A natural adult male voice, warm, grounded and clear, speaking to one listener in a natural urban Ammani Jordanian Arabic dialect. Do not use generic Levantine Arabic. Do not imitate a Lebanese accent. Do not imitate a Syrian accent. Do not switch to Modern Standard Arabic. Do not exaggerate the dialect. The speaker himself pronounces qaf as a glottal stop in everyday colloquial words, as urban Ammani speakers do; keep this consistent across the clip. Do not change the written spelling. Do not force a hard qaf. Natural Jordanian word linking, conversational rhythm, short pauses only where the meaning requires them. No theatrical acting. No whispering. No robotic delivery. Speak only the supplied dialogue. No added words. No omitted words. No repeated words. No translation. No paraphrasing. Treat punctuation as pacing guidance only. Do not read punctuation aloud.
Performance: Subtle facial expressions, natural blinking, small head movements, restrained hand gestures below the chin, realistic speech-aligned mouth movement. Keep the whole mouth visible at all times.
Camera and Framing: Vertical 9:16. Three-quarter angle from his right side, exactly matching the reference frame's composition and eyeline (he looks slightly off-camera toward frame-right). Both eyes and the full mouth visible. Locked-off or a barely perceptible drift.
Identity Lock: Use the exact identity from @me and the provided reference frame. Preserve the real facial structure, natural skin texture, short dark hair with receding temples, connected moustache and goatee with grey hairs in the chin, and the small dark mole above the LEFT corner of the upper lip (viewer's right in a frontal view). Never mirror the image. Never flip the image horizontally. Do not beautify the face. Do not de-age the face. Do not reshape the face. Do not slim the face. Do not replace the person. Do not change the nose. Do not change the jaw. Do not change the eyes. Do not change the mouth.
Wardrobe and Environment: Navy unstructured blazer over a heather warm-grey crew-neck T-shirt. The same studio as the reference frame: walnut slatted wall, wooden shelves with a few books, warm amber Edison lamp in soft bokeh, light walnut desk, black dynamic microphone in the foreground at frame-left, below the mouth. The microphone never covers the mouth.
Lighting and Style: Photorealistic cinematic podcast footage. Keep the reference frame's light direction and warmth exactly, gentle natural shadows, subtle teal-black shadows with amber highlights, shallow depth of field, natural skin texture.
Negative Constraints: No on-screen text. No subtitles. No captions. No titles. No logos. No watermarks. No letters. No numbers. No extra people. No mirrored identity. No facial changes. No obscured mouth. No exaggerated gestures. No sudden camera movement. No cuts. No scene changes. No invented dialogue. No duplicated dialogue. No music. No sound effects.
```

**A03.3** — 5.5 ث كلام · 18 كلمة · زاوية أمامية · صوت المزامنة: `lipsync_audio/A03.3.wav`

```
SHOT ID: A03.3
Duration: 6.2 s in the edit (1:12.2–1:18.5) — generate 10 s, trim in the edit
Generation Mode: Frames to Video
Reference Frame: K_front_b.jpg + @me

EXACT SPOKEN DIALOGUE:
"ويمكن فعلاً كان عنده تصرّف غلط لازم يتحمّل مسؤوليته… بس إحنا ما منعرف شو الحقيقة حتى نحكم عليه"

Voice and Delivery: A natural adult male voice, warm, grounded and clear, speaking to one listener in a natural urban Ammani Jordanian Arabic dialect. Do not use generic Levantine Arabic. Do not imitate a Lebanese accent. Do not imitate a Syrian accent. Do not switch to Modern Standard Arabic. Do not exaggerate the dialect. The speaker himself pronounces qaf as a glottal stop in everyday colloquial words, as urban Ammani speakers do; keep this consistent across the clip. Do not change the written spelling. Do not force a hard qaf. Natural Jordanian word linking, conversational rhythm, short pauses only where the meaning requires them. No theatrical acting. No whispering. No robotic delivery. Speak only the supplied dialogue. No added words. No omitted words. No repeated words. No translation. No paraphrasing. Treat punctuation as pacing guidance only. Do not read punctuation aloud.
Performance: Subtle facial expressions, natural blinking, small head movements, restrained hand gestures below the chin, realistic speech-aligned mouth movement. Keep the whole mouth visible at all times.
Camera and Framing: Vertical 9:16. Medium close-up at eye level, exactly matching the reference frame's composition (head in the upper third, microphone entering from frame-right below mouth level). Very slow push-in of no more than 2%, otherwise locked-off.
Identity Lock: Use the exact identity from @me and the provided reference frame. Preserve the real facial structure, natural skin texture, short dark hair with receding temples, connected moustache and goatee with grey hairs in the chin, and the small dark mole above the LEFT corner of the upper lip (viewer's right in a frontal view). Never mirror the image. Never flip the image horizontally. Do not beautify the face. Do not de-age the face. Do not reshape the face. Do not slim the face. Do not replace the person. Do not change the nose. Do not change the jaw. Do not change the eyes. Do not change the mouth.
Wardrobe and Environment: Navy unstructured blazer over a heather warm-grey crew-neck T-shirt. Dark walnut slatted wall, wooden shelves with a few books, warm amber globe lamp in soft bokeh, light walnut desk, black dynamic microphone on a boom arm beside the mouth. The microphone never covers the mouth.
Lighting and Style: Photorealistic cinematic podcast footage. Low-key warm tungsten key light from camera-left, gentle natural shadows, subtle teal-black shadows with amber highlights, shallow depth of field, natural skin texture.
Negative Constraints: No on-screen text. No subtitles. No captions. No titles. No logos. No watermarks. No letters. No numbers. No extra people. No mirrored identity. No facial changes. No obscured mouth. No exaggerated gestures. No sudden camera movement. No cuts. No scene changes. No invented dialogue. No duplicated dialogue. No music. No sound effects.
```


### B04 — 1:18.5–1:23.8 · موشن

> ملاحظة مونتاج فقط (ما بيظهر بالتوليد): الكلام اللي بتغطيه اللقطة: «والفرق كبير بين إنك تعترف إنك ما بتعرف القصة كاملة… وبين إنك تتصرّف كأنك عارفها»

**B04.1**

```
SHOT ID: B04.1
Duration: 5.4 s in the edit (1:18.5–1:23.8) — generate 6 s
Generation Mode: Text to Video (no @me, no reference images)
Visual Meaning: الفرق بين إنك تعترف إنك ما بتعرف القصة كاملة، وإنك تتصرّف كأنك عارفها

9:16 vertical cinematic B-roll metaphor.
Main Visual: A man's hand on dark wood, tightly closed around a small glowing card.
Motion: A man's hand rests on dark wood, tightly closed around a small glowing card; the fingers slowly relax and the palm opens upward, releasing soft warm light into the dark; the shot ends on the open, empty palm.
Camera: Close-up, locked-off, shallow depth of field.
Lighting and Color: Cinematic warm amber highlights, deep teal-black shadows, soft atmospheric light, shallow depth of field, restrained contrast. Photorealistic.
Continuity: Stand-alone opening of this metaphor; it follows A03.3 and is joined to it in the edit with a soft dissolve. It is followed by A04.1.
Negative Constraints: No readable text. No letters. No numbers. No captions. No subtitles. No titles. No logos. No watermarks. No random people. No distracting objects. No abrupt cuts. No excessive motion. No unrelated elements. No dialogue. No music. No sound effects. No split screens. No two images in one frame. No readable text on the card.
```


### A04 — 1:23.8–1:44.6 · بودكاست

**A04.1** — 3.7 ث كلام · 12 كلمة · زاوية أمامية · صوت المزامنة: `lipsync_audio/A04.1.wav`

```
SHOT ID: A04.1
Duration: 4.1 s in the edit (1:23.8–1:27.9) — generate 10 s, trim in the edit
Generation Mode: Frames to Video
Reference Frame: K_front_a.jpg + @me

EXACT SPOKEN DIALOGUE:
"مش مطلوب منك تبرّر للناس… ولا تعطي كل شخص فرصة بلا حدود"

Voice and Delivery: A natural adult male voice, warm, grounded and clear, speaking to one listener in a natural urban Ammani Jordanian Arabic dialect. Do not use generic Levantine Arabic. Do not imitate a Lebanese accent. Do not imitate a Syrian accent. Do not switch to Modern Standard Arabic. Do not exaggerate the dialect. The speaker himself pronounces qaf as a glottal stop in everyday colloquial words, as urban Ammani speakers do; keep this consistent across the clip. Do not change the written spelling. Do not force a hard qaf. Natural Jordanian word linking, conversational rhythm, short pauses only where the meaning requires them. No theatrical acting. No whispering. No robotic delivery. Speak only the supplied dialogue. No added words. No omitted words. No repeated words. No translation. No paraphrasing. Treat punctuation as pacing guidance only. Do not read punctuation aloud.
Performance: Subtle facial expressions, natural blinking, small head movements, restrained hand gestures below the chin, realistic speech-aligned mouth movement. Keep the whole mouth visible at all times.
Camera and Framing: Vertical 9:16. Medium close-up at eye level, exactly matching the reference frame's composition (head in the upper third, microphone entering from frame-right below mouth level). Very slow push-in of no more than 2%, otherwise locked-off.
Identity Lock: Use the exact identity from @me and the provided reference frame. Preserve the real facial structure, natural skin texture, short dark hair with receding temples, connected moustache and goatee with grey hairs in the chin, and the small dark mole above the LEFT corner of the upper lip (viewer's right in a frontal view). Never mirror the image. Never flip the image horizontally. Do not beautify the face. Do not de-age the face. Do not reshape the face. Do not slim the face. Do not replace the person. Do not change the nose. Do not change the jaw. Do not change the eyes. Do not change the mouth.
Wardrobe and Environment: Navy unstructured blazer over a heather warm-grey crew-neck T-shirt. Dark walnut slatted wall, wooden shelves with a few books, warm amber globe lamp in soft bokeh, light walnut desk, black dynamic microphone on a boom arm beside the mouth. The microphone never covers the mouth.
Lighting and Style: Photorealistic cinematic podcast footage. Low-key warm tungsten key light from camera-left, gentle natural shadows, subtle teal-black shadows with amber highlights, shallow depth of field, natural skin texture.
Negative Constraints: No on-screen text. No subtitles. No captions. No titles. No logos. No watermarks. No letters. No numbers. No extra people. No mirrored identity. No facial changes. No obscured mouth. No exaggerated gestures. No sudden camera movement. No cuts. No scene changes. No invented dialogue. No duplicated dialogue. No music. No sound effects.
```

**A04.2** — 5.6 ث كلام · 15 كلمة · زاوية جانبية · صوت المزامنة: `lipsync_audio/A04.2.wav`

```
SHOT ID: A04.2
Duration: 5.7 s in the edit (1:28.1–1:33.8) — generate 10 s, trim in the edit
Generation Mode: Frames to Video
Reference Frame: K_side_a.jpg + @me

EXACT SPOKEN DIALOGUE:
"بس يمكن المطلوب تضل واعي لحدود اللي شفته… وما تبني عليه أفكار وتفسيرات وتحوّله لحقيقة"

Voice and Delivery: A natural adult male voice, warm, grounded and clear, speaking to one listener in a natural urban Ammani Jordanian Arabic dialect. Do not use generic Levantine Arabic. Do not imitate a Lebanese accent. Do not imitate a Syrian accent. Do not switch to Modern Standard Arabic. Do not exaggerate the dialect. The speaker himself pronounces qaf as a glottal stop in everyday colloquial words, as urban Ammani speakers do; keep this consistent across the clip. Do not change the written spelling. Do not force a hard qaf. Natural Jordanian word linking, conversational rhythm, short pauses only where the meaning requires them. No theatrical acting. No whispering. No robotic delivery. Speak only the supplied dialogue. No added words. No omitted words. No repeated words. No translation. No paraphrasing. Treat punctuation as pacing guidance only. Do not read punctuation aloud.
Performance: Subtle facial expressions, natural blinking, small head movements, restrained hand gestures below the chin, realistic speech-aligned mouth movement. Keep the whole mouth visible at all times.
Camera and Framing: Vertical 9:16. Three-quarter angle from his right side, exactly matching the reference frame's composition and eyeline (he looks slightly off-camera toward frame-right). Both eyes and the full mouth visible. Locked-off or a barely perceptible drift.
Identity Lock: Use the exact identity from @me and the provided reference frame. Preserve the real facial structure, natural skin texture, short dark hair with receding temples, connected moustache and goatee with grey hairs in the chin, and the small dark mole above the LEFT corner of the upper lip (viewer's right in a frontal view). Never mirror the image. Never flip the image horizontally. Do not beautify the face. Do not de-age the face. Do not reshape the face. Do not slim the face. Do not replace the person. Do not change the nose. Do not change the jaw. Do not change the eyes. Do not change the mouth.
Wardrobe and Environment: Navy unstructured blazer over a heather warm-grey crew-neck T-shirt. The same studio as the reference frame: walnut slatted wall, wooden shelves with a few books, warm amber Edison lamp in soft bokeh, light walnut desk, black dynamic microphone in the foreground at frame-left, below the mouth. The microphone never covers the mouth.
Lighting and Style: Photorealistic cinematic podcast footage. Keep the reference frame's light direction and warmth exactly, gentle natural shadows, subtle teal-black shadows with amber highlights, shallow depth of field, natural skin texture.
Negative Constraints: No on-screen text. No subtitles. No captions. No titles. No logos. No watermarks. No letters. No numbers. No extra people. No mirrored identity. No facial changes. No obscured mouth. No exaggerated gestures. No sudden camera movement. No cuts. No scene changes. No invented dialogue. No duplicated dialogue. No music. No sound effects.
```

**A04.3** — 8.7 ث كلام · 27 كلمة · زاوية جانبية · صوت المزامنة: `lipsync_audio/A04.3.wav`

```
SHOT ID: A04.3
Duration: 9.7 s in the edit (1:34.9–1:44.6) — generate 10 s, trim in the edit
Generation Mode: Frames to Video
Reference Frame: K_side_b.jpg + @me

EXACT SPOKEN DIALOGUE:
"واللي استوقفني أكتر إنه نفس الإشي بيصير معنا إحنا… إحنا منحاول نفهم الناس… بس هل بنحاول نفهم حالنا بنفس القدر؟ ولا تعوّدنا نحكي عن حالنا بجمل جاهزة"

Voice and Delivery: A natural adult male voice, warm, grounded and clear, speaking to one listener in a natural urban Ammani Jordanian Arabic dialect. Do not use generic Levantine Arabic. Do not imitate a Lebanese accent. Do not imitate a Syrian accent. Do not switch to Modern Standard Arabic. Do not exaggerate the dialect. The speaker himself pronounces qaf as a glottal stop in everyday colloquial words, as urban Ammani speakers do; keep this consistent across the clip. Do not change the written spelling. Do not force a hard qaf. Natural Jordanian word linking, conversational rhythm, short pauses only where the meaning requires them. No theatrical acting. No whispering. No robotic delivery. Speak only the supplied dialogue. No added words. No omitted words. No repeated words. No translation. No paraphrasing. Treat punctuation as pacing guidance only. Do not read punctuation aloud.
Performance: Subtle facial expressions, natural blinking, small head movements, restrained hand gestures below the chin, realistic speech-aligned mouth movement. Keep the whole mouth visible at all times.
Camera and Framing: Vertical 9:16. Three-quarter angle from his right side, exactly matching the reference frame's composition and eyeline (he looks slightly off-camera toward frame-right). Both eyes and the full mouth visible. Locked-off or a barely perceptible drift.
Identity Lock: Use the exact identity from @me and the provided reference frame. Preserve the real facial structure, natural skin texture, short dark hair with receding temples, connected moustache and goatee with grey hairs in the chin, and the small dark mole above the LEFT corner of the upper lip (viewer's right in a frontal view). Never mirror the image. Never flip the image horizontally. Do not beautify the face. Do not de-age the face. Do not reshape the face. Do not slim the face. Do not replace the person. Do not change the nose. Do not change the jaw. Do not change the eyes. Do not change the mouth.
Wardrobe and Environment: Navy unstructured blazer over a heather warm-grey crew-neck T-shirt. The same studio as the reference frame: walnut slatted wall, wooden shelves with a few books, warm amber Edison lamp in soft bokeh, light walnut desk, black dynamic microphone in the foreground at frame-left, below the mouth. The microphone never covers the mouth.
Lighting and Style: Photorealistic cinematic podcast footage. Keep the reference frame's light direction and warmth exactly, gentle natural shadows, subtle teal-black shadows with amber highlights, shallow depth of field, natural skin texture.
Negative Constraints: No on-screen text. No subtitles. No captions. No titles. No logos. No watermarks. No letters. No numbers. No extra people. No mirrored identity. No facial changes. No obscured mouth. No exaggerated gestures. No sudden camera movement. No cuts. No scene changes. No invented dialogue. No duplicated dialogue. No music. No sound effects.
```


### B05 — 1:44.6–1:51.6 · موشن

> ملاحظة مونتاج فقط (ما بيظهر بالتوليد): الكلام اللي بتغطيه اللقطة: ««أنا عصبي»، «أنا ما بثق بحدا»، «أنا ما بحب أطلب مساعدة»، «أنا هيك… وما رح أتغيّر»»

**B05.1**

```
SHOT ID: B05.1
Duration: 7.0 s in the edit (1:44.6–1:51.6) — generate 8 s
Generation Mode: Text to Video (no @me, no reference images)
Visual Meaning: الجمل الجاهزة اللي بنعرّف حالنا فيها: «أنا عصبي»، «أنا هيك»

9:16 vertical cinematic B-roll metaphor.
Main Visual: Blank worn paper cards falling onto a dark desk. No writing on the cards.
Motion: Blank worn paper cards flutter down in slow motion onto a dark desk and pile up one after another; the pile slowly slides off the desk edge into darkness; the shot ends on the empty desk.
Camera: Medium close-up at desk height, slow lateral drift.
Lighting and Color: Cinematic warm amber highlights, deep teal-black shadows, soft atmospheric light, shallow depth of field, restrained contrast. Photorealistic.
Continuity: Stand-alone opening of this metaphor; it follows A04.3 and is joined to it in the edit with a soft dissolve. It is followed by B06.1.
Negative Constraints: No readable text. No letters. No numbers. No captions. No subtitles. No titles. No logos. No watermarks. No random people. No distracting objects. No abrupt cuts. No excessive motion. No unrelated elements. No dialogue. No music. No sound effects. No any writing on the cards. No chaotic motion.
```


### B06 — 1:51.6–1:58.9 · موشن

> ملاحظة مونتاج فقط (ما بيظهر بالتوليد): الكلام اللي بتغطيه اللقطة: «بس تخيّل لو إنّك بدل ما تعتبر هاي الجمل تعريف نهائي إلك… رجعت خطوة لورا… وسألت حالك:… من متى أنا هيك؟»

**B06.1**

```
SHOT ID: B06.1
Duration: 7.3 s in the edit (1:51.6–1:58.9) — generate 8 s
Generation Mode: Text to Video (no @me, no reference images)
Visual Meaning: نرجع خطوة لورا ونسأل: من متى أنا هيك؟

9:16 vertical cinematic B-roll metaphor.
Main Visual: A dark corridor ending in a tall doorway glowing with golden light and haze; a man seen only from behind, as a silhouette.
Motion: A man stands still in front of a tall doorway glowing with golden light at the end of a dark corridor, seen only from behind as a silhouette; the camera slowly pulls back away from him; the shot ends with him small in the frame.
Camera: Slow pull-back down the corridor.
Lighting and Color: Cinematic warm amber highlights, deep teal-black shadows, soft atmospheric light, shallow depth of field, restrained contrast. Photorealistic.
Continuity: Stand-alone opening of this metaphor; it follows B05.1 and is joined to it in the edit with a soft dissolve. It is followed by A05.1.
Negative Constraints: No readable text. No letters. No numbers. No captions. No subtitles. No titles. No logos. No watermarks. No random people. No distracting objects. No abrupt cuts. No excessive motion. No unrelated elements. No dialogue. No music. No sound effects. No visible face. No fast camera movement. No horror mood.
```


### A05 — 1:58.9–2:06.6 · بودكاست

**A05.1** — 6.8 ث كلام · 19 كلمة · زاوية جانبية · صوت المزامنة: `lipsync_audio/A05.1.wav`

```
SHOT ID: A05.1
Duration: 7.7 s in the edit (1:58.9–2:06.6) — generate 10 s, trim in the edit
Generation Mode: Frames to Video
Reference Frame: K_side_a.jpg + @me

EXACT SPOKEN DIALOGUE:
"شو اللي صار وخلّاني أتصرّف بهالطريقة؟ وهل هاي فعلاً طبيعتي؟ ولا طريقة تعلّمتها بوقت كنت محتاج فيها أحمي حالي؟"

Voice and Delivery: A natural adult male voice, warm, grounded and clear, speaking to one listener in a natural urban Ammani Jordanian Arabic dialect. Do not use generic Levantine Arabic. Do not imitate a Lebanese accent. Do not imitate a Syrian accent. Do not switch to Modern Standard Arabic. Do not exaggerate the dialect. The speaker himself pronounces qaf as a glottal stop in everyday colloquial words, as urban Ammani speakers do; keep this consistent across the clip. Do not change the written spelling. Do not force a hard qaf. Natural Jordanian word linking, conversational rhythm, short pauses only where the meaning requires them. No theatrical acting. No whispering. No robotic delivery. Speak only the supplied dialogue. No added words. No omitted words. No repeated words. No translation. No paraphrasing. Treat punctuation as pacing guidance only. Do not read punctuation aloud.
Performance: Subtle facial expressions, natural blinking, small head movements, restrained hand gestures below the chin, realistic speech-aligned mouth movement. Keep the whole mouth visible at all times.
Camera and Framing: Vertical 9:16. Three-quarter angle from his right side, exactly matching the reference frame's composition and eyeline (he looks slightly off-camera toward frame-right). Both eyes and the full mouth visible. Locked-off or a barely perceptible drift.
Identity Lock: Use the exact identity from @me and the provided reference frame. Preserve the real facial structure, natural skin texture, short dark hair with receding temples, connected moustache and goatee with grey hairs in the chin, and the small dark mole above the LEFT corner of the upper lip (viewer's right in a frontal view). Never mirror the image. Never flip the image horizontally. Do not beautify the face. Do not de-age the face. Do not reshape the face. Do not slim the face. Do not replace the person. Do not change the nose. Do not change the jaw. Do not change the eyes. Do not change the mouth.
Wardrobe and Environment: Navy unstructured blazer over a heather warm-grey crew-neck T-shirt. The same studio as the reference frame: walnut slatted wall, wooden shelves with a few books, warm amber Edison lamp in soft bokeh, light walnut desk, black dynamic microphone in the foreground at frame-left, below the mouth. The microphone never covers the mouth.
Lighting and Style: Photorealistic cinematic podcast footage. Keep the reference frame's light direction and warmth exactly, gentle natural shadows, subtle teal-black shadows with amber highlights, shallow depth of field, natural skin texture.
Negative Constraints: No on-screen text. No subtitles. No captions. No titles. No logos. No watermarks. No letters. No numbers. No extra people. No mirrored identity. No facial changes. No obscured mouth. No exaggerated gestures. No sudden camera movement. No cuts. No scene changes. No invented dialogue. No duplicated dialogue. No music. No sound effects.
```


### B07 — 2:06.6–2:22.3 · موشن

> ملاحظة مونتاج فقط (ما بيظهر بالتوليد): الكلام اللي بتغطيه اللقطة: «يمكن تكتشف إنك ما كنت دايماً عصبي… وإنك ما كنت دايماً تخاف تثق، وإنك بيوم من الأيام كنت تحكي عن اللي بوجعك… قبل ما تتعلّم تسكت… ويمكن تكتشف إنه في أشياء ساعدتك تتجاوز مرحلة صعبة بحياتك، بس اليوم صارت هي نفسها اللي بتتعبك»

**B07.1**

```
SHOT ID: B07.1
Duration: 7.9 s in the edit (2:06.6–2:14.5) — generate 8 s
Generation Mode: Text to Video (no @me, no reference images)
Visual Meaning: نسخة قديمة منّا كانت تحكي قبل ما تتعلّم تسكت

9:16 vertical cinematic B-roll metaphor.
Main Visual: A fogged mirror in a dim room; behind the fog, a blurred, unrecognisable reflection.
Motion: A hand slowly wipes a streak through a fogged mirror in a dim warm room, revealing a blurred, unrecognisable reflection behind the glass; the shot ends with the streak still clear.
Camera: Close-up on the mirror, locked-off.
Lighting and Color: Cinematic warm amber highlights, deep teal-black shadows, soft atmospheric light, shallow depth of field, restrained contrast. Photorealistic.
Continuity: Stand-alone opening of this metaphor; it follows A05.1 and is joined to it in the edit with a soft dissolve. It must end in a calm state that B07.2 can continue from.
Negative Constraints: No readable text. No letters. No numbers. No captions. No subtitles. No titles. No logos. No watermarks. No random people. No distracting objects. No abrupt cuts. No excessive motion. No unrelated elements. No dialogue. No music. No sound effects. No clear or recognisable face. No horror mood. No broken glass.
```

**B07.2**

```
SHOT ID: B07.2
Duration: 7.9 s in the edit (2:14.5–2:22.3) — generate 8 s
Generation Mode: Frames to Video — First frame: last frame of B07.1
Visual Meaning: نسخة قديمة منّا كانت تحكي قبل ما تتعلّم تسكت

9:16 vertical cinematic B-roll metaphor.
Main Visual: A fogged mirror in a dim room; behind the fog, a blurred, unrecognisable reflection.
Motion: The fog slowly returns over the wiped streak until the blurred reflection fades away completely; the shot ends on the evenly fogged mirror glowing softly.
Camera: Close-up on the mirror, locked-off.
Lighting and Color: Cinematic warm amber highlights, deep teal-black shadows, soft atmospheric light, shallow depth of field, restrained contrast. Photorealistic.
Continuity: Continue the same scene from the provided first frame (the last frame of B07.1), no cut, same light and palette. It is followed by A06.1.
Negative Constraints: No readable text. No letters. No numbers. No captions. No subtitles. No titles. No logos. No watermarks. No random people. No distracting objects. No abrupt cuts. No excessive motion. No unrelated elements. No dialogue. No music. No sound effects. No clear or recognisable face. No horror mood. No broken glass.
```


### A06 — 2:22.3–2:26.1 · بودكاست

**A06.1** — 3.0 ث كلام · 8 كلمة · زاوية أمامية · صوت المزامنة: `lipsync_audio/A06.1.wav`

```
SHOT ID: A06.1
Duration: 3.8 s in the edit (2:22.3–2:26.1) — generate 10 s, trim in the edit
Generation Mode: Frames to Video
Reference Frame: K_front_b.jpg + @me

EXACT SPOKEN DIALOGUE:
"وهون بالنسبة إلي… بيبلّش نوع مختلف من الفهم"

Voice and Delivery: A natural adult male voice, warm, grounded and clear, speaking to one listener in a natural urban Ammani Jordanian Arabic dialect. Do not use generic Levantine Arabic. Do not imitate a Lebanese accent. Do not imitate a Syrian accent. Do not switch to Modern Standard Arabic. Do not exaggerate the dialect. The speaker himself pronounces qaf as a glottal stop in everyday colloquial words, as urban Ammani speakers do; keep this consistent across the clip. Do not change the written spelling. Do not force a hard qaf. Natural Jordanian word linking, conversational rhythm, short pauses only where the meaning requires them. No theatrical acting. No whispering. No robotic delivery. Speak only the supplied dialogue. No added words. No omitted words. No repeated words. No translation. No paraphrasing. Treat punctuation as pacing guidance only. Do not read punctuation aloud.
Performance: Subtle facial expressions, natural blinking, small head movements, restrained hand gestures below the chin, realistic speech-aligned mouth movement. Keep the whole mouth visible at all times.
Camera and Framing: Vertical 9:16. Medium close-up at eye level, exactly matching the reference frame's composition (head in the upper third, microphone entering from frame-right below mouth level). Very slow push-in of no more than 2%, otherwise locked-off.
Identity Lock: Use the exact identity from @me and the provided reference frame. Preserve the real facial structure, natural skin texture, short dark hair with receding temples, connected moustache and goatee with grey hairs in the chin, and the small dark mole above the LEFT corner of the upper lip (viewer's right in a frontal view). Never mirror the image. Never flip the image horizontally. Do not beautify the face. Do not de-age the face. Do not reshape the face. Do not slim the face. Do not replace the person. Do not change the nose. Do not change the jaw. Do not change the eyes. Do not change the mouth.
Wardrobe and Environment: Navy unstructured blazer over a heather warm-grey crew-neck T-shirt. Dark walnut slatted wall, wooden shelves with a few books, warm amber globe lamp in soft bokeh, light walnut desk, black dynamic microphone on a boom arm beside the mouth. The microphone never covers the mouth.
Lighting and Style: Photorealistic cinematic podcast footage. Low-key warm tungsten key light from camera-left, gentle natural shadows, subtle teal-black shadows with amber highlights, shallow depth of field, natural skin texture.
Negative Constraints: No on-screen text. No subtitles. No captions. No titles. No logos. No watermarks. No letters. No numbers. No extra people. No mirrored identity. No facial changes. No obscured mouth. No exaggerated gestures. No sudden camera movement. No cuts. No scene changes. No invented dialogue. No duplicated dialogue. No music. No sound effects.
```


### B08 — 2:26.1–2:30.6 · موشن

> ملاحظة مونتاج فقط (ما بيظهر بالتوليد): الكلام اللي بتغطيه اللقطة: «إنك ما تكتفي تسأل: ليش أنا هيك؟ بل تسأل كمان: هل بدّي أضل هيك؟»

**B08.1**

```
SHOT ID: B08.1
Duration: 4.5 s in the edit (2:26.1–2:30.6) — generate 6 s
Generation Mode: Text to Video (no @me, no reference images)
Visual Meaning: من «ليش أنا هيك؟» إلى «هل بدّي أضل هيك؟»

9:16 vertical cinematic B-roll metaphor.
Main Visual: A ribbon of warm light in a dark void.
Motion: A ribbon of warm light twists into a tight knot in a dark void, then slowly loosens and straightens into a calm line moving forward; the shot ends on the straight line.
Camera: Medium shot, slow push-in.
Lighting and Color: Cinematic warm amber highlights, deep teal-black shadows, soft atmospheric light, shallow depth of field, restrained contrast. Photorealistic.
Continuity: Stand-alone opening of this metaphor; it follows A06.1 and is joined to it in the edit with a soft dissolve. It is followed by A07.1.
Negative Constraints: No readable text. No letters. No numbers. No captions. No subtitles. No titles. No logos. No watermarks. No random people. No distracting objects. No abrupt cuts. No excessive motion. No unrelated elements. No dialogue. No music. No sound effects. No neon colours. No fast motion.
```


### A07 — 2:30.6–2:34.3 · بودكاست

**A07.1** — 2.2 ث كلام · 7 كلمة · زاوية أمامية · صوت المزامنة: `lipsync_audio/A07.1.wav`

```
SHOT ID: A07.1
Duration: 3.7 s in the edit (2:30.6–2:34.3) — generate 10 s, trim in the edit
Generation Mode: Frames to Video
Reference Frame: K_front_a.jpg + @me

EXACT SPOKEN DIALOGUE:
"لأنه مش كل إشي تعوّدنا عليه بناسبنا"

Voice and Delivery: A natural adult male voice, warm, grounded and clear, speaking to one listener in a natural urban Ammani Jordanian Arabic dialect. Do not use generic Levantine Arabic. Do not imitate a Lebanese accent. Do not imitate a Syrian accent. Do not switch to Modern Standard Arabic. Do not exaggerate the dialect. The speaker himself pronounces qaf as a glottal stop in everyday colloquial words, as urban Ammani speakers do; keep this consistent across the clip. Do not change the written spelling. Do not force a hard qaf. Natural Jordanian word linking, conversational rhythm, short pauses only where the meaning requires them. No theatrical acting. No whispering. No robotic delivery. Speak only the supplied dialogue. No added words. No omitted words. No repeated words. No translation. No paraphrasing. Treat punctuation as pacing guidance only. Do not read punctuation aloud.
Performance: Subtle facial expressions, natural blinking, small head movements, restrained hand gestures below the chin, realistic speech-aligned mouth movement. Keep the whole mouth visible at all times.
Camera and Framing: Vertical 9:16. Medium close-up at eye level, exactly matching the reference frame's composition (head in the upper third, microphone entering from frame-right below mouth level). Very slow push-in of no more than 2%, otherwise locked-off.
Identity Lock: Use the exact identity from @me and the provided reference frame. Preserve the real facial structure, natural skin texture, short dark hair with receding temples, connected moustache and goatee with grey hairs in the chin, and the small dark mole above the LEFT corner of the upper lip (viewer's right in a frontal view). Never mirror the image. Never flip the image horizontally. Do not beautify the face. Do not de-age the face. Do not reshape the face. Do not slim the face. Do not replace the person. Do not change the nose. Do not change the jaw. Do not change the eyes. Do not change the mouth.
Wardrobe and Environment: Navy unstructured blazer over a heather warm-grey crew-neck T-shirt. Dark walnut slatted wall, wooden shelves with a few books, warm amber globe lamp in soft bokeh, light walnut desk, black dynamic microphone on a boom arm beside the mouth. The microphone never covers the mouth.
Lighting and Style: Photorealistic cinematic podcast footage. Low-key warm tungsten key light from camera-left, gentle natural shadows, subtle teal-black shadows with amber highlights, shallow depth of field, natural skin texture.
Negative Constraints: No on-screen text. No subtitles. No captions. No titles. No logos. No watermarks. No letters. No numbers. No extra people. No mirrored identity. No facial changes. No obscured mouth. No exaggerated gestures. No sudden camera movement. No cuts. No scene changes. No invented dialogue. No duplicated dialogue. No music. No sound effects.
```


### B09 — 2:34.3–2:39.4 · موشن

> ملاحظة مونتاج فقط (ما بيظهر بالتوليد): الكلام اللي بتغطيه اللقطة: «ومش كل إشي تعلّمنا نعمله حتى ننجو من مرحلة معيّنة… لازم يضل يرافقنا طول العمر»

**B09.1**

```
SHOT ID: B09.1
Duration: 5.1 s in the edit (2:34.3–2:39.4) — generate 6 s
Generation Mode: Text to Video (no @me, no reference images)
Visual Meaning: إشي تعلّمناه حتى ننجو من مرحلة، مش لازم يرافقنا طول العمر

9:16 vertical cinematic B-roll metaphor.
Main Visual: A thin glowing copper thread stretched across a dark crack in the ground.
Motion: A tiny warm light travels along a thin glowing copper thread across a dark crack in the ground; once it reaches the other side, the thread gently loosens and fades; the shot ends on the soft glow left behind.
Camera: Low macro angle, slow lateral move along the thread.
Lighting and Color: Cinematic warm amber highlights, deep teal-black shadows, soft atmospheric light, shallow depth of field, restrained contrast. Photorealistic.
Continuity: Stand-alone opening of this metaphor; it follows A07.1 and is joined to it in the edit with a soft dissolve. It is followed by A08.1.
Negative Constraints: No readable text. No letters. No numbers. No captions. No subtitles. No titles. No logos. No watermarks. No random people. No distracting objects. No abrupt cuts. No excessive motion. No unrelated elements. No dialogue. No music. No sound effects. No dramatic snap. No sparks.
```


### A08 — 2:39.4–2:53.7 · بودكاست

**A08.1** — 4.1 ث كلام · 14 كلمة · زاوية جانبية · صوت المزامنة: `lipsync_audio/A08.1.wav`

```
SHOT ID: A08.1
Duration: 4.5 s in the edit (2:39.4–2:43.9) — generate 10 s, trim in the edit
Generation Mode: Frames to Video
Reference Frame: K_side_b.jpg + @me

EXACT SPOKEN DIALOGUE:
"بس التغيير كمان مش إنك ترفض حالك… أو تعتبر كل اللي كنت عليه غلط"

Voice and Delivery: A natural adult male voice, warm, grounded and clear, speaking to one listener in a natural urban Ammani Jordanian Arabic dialect. Do not use generic Levantine Arabic. Do not imitate a Lebanese accent. Do not imitate a Syrian accent. Do not switch to Modern Standard Arabic. Do not exaggerate the dialect. The speaker himself pronounces qaf as a glottal stop in everyday colloquial words, as urban Ammani speakers do; keep this consistent across the clip. Do not change the written spelling. Do not force a hard qaf. Natural Jordanian word linking, conversational rhythm, short pauses only where the meaning requires them. No theatrical acting. No whispering. No robotic delivery. Speak only the supplied dialogue. No added words. No omitted words. No repeated words. No translation. No paraphrasing. Treat punctuation as pacing guidance only. Do not read punctuation aloud.
Performance: Subtle facial expressions, natural blinking, small head movements, restrained hand gestures below the chin, realistic speech-aligned mouth movement. Keep the whole mouth visible at all times.
Camera and Framing: Vertical 9:16. Three-quarter angle from his right side, exactly matching the reference frame's composition and eyeline (he looks slightly off-camera toward frame-right). Both eyes and the full mouth visible. Locked-off or a barely perceptible drift.
Identity Lock: Use the exact identity from @me and the provided reference frame. Preserve the real facial structure, natural skin texture, short dark hair with receding temples, connected moustache and goatee with grey hairs in the chin, and the small dark mole above the LEFT corner of the upper lip (viewer's right in a frontal view). Never mirror the image. Never flip the image horizontally. Do not beautify the face. Do not de-age the face. Do not reshape the face. Do not slim the face. Do not replace the person. Do not change the nose. Do not change the jaw. Do not change the eyes. Do not change the mouth.
Wardrobe and Environment: Navy unstructured blazer over a heather warm-grey crew-neck T-shirt. The same studio as the reference frame: walnut slatted wall, wooden shelves with a few books, warm amber Edison lamp in soft bokeh, light walnut desk, black dynamic microphone in the foreground at frame-left, below the mouth. The microphone never covers the mouth.
Lighting and Style: Photorealistic cinematic podcast footage. Keep the reference frame's light direction and warmth exactly, gentle natural shadows, subtle teal-black shadows with amber highlights, shallow depth of field, natural skin texture.
Negative Constraints: No on-screen text. No subtitles. No captions. No titles. No logos. No watermarks. No letters. No numbers. No extra people. No mirrored identity. No facial changes. No obscured mouth. No exaggerated gestures. No sudden camera movement. No cuts. No scene changes. No invented dialogue. No duplicated dialogue. No music. No sound effects.
```

**A08.2** — 8.7 ث كلام · 24 كلمة · زاوية جانبية · صوت المزامنة: `lipsync_audio/A08.2.wav`

```
SHOT ID: A08.2
Duration: 9.4 s in the edit (2:44.2–2:53.7) — generate 10 s, trim in the edit
Generation Mode: Frames to Video
Reference Frame: K_side_a.jpg + @me

EXACT SPOKEN DIALOGUE:
"يمكن التغيير يبلّش لما تفهم حالك من غير ما تظلمها… وتتحمّل مسؤوليتها من غير ما تكرهها، وبين كل هاي الأفكار… برجع أتذكّر شغلة بسيطة"

Voice and Delivery: A natural adult male voice, warm, grounded and clear, speaking to one listener in a natural urban Ammani Jordanian Arabic dialect. Do not use generic Levantine Arabic. Do not imitate a Lebanese accent. Do not imitate a Syrian accent. Do not switch to Modern Standard Arabic. Do not exaggerate the dialect. The speaker himself pronounces qaf as a glottal stop in everyday colloquial words, as urban Ammani speakers do; keep this consistent across the clip. Do not change the written spelling. Do not force a hard qaf. Natural Jordanian word linking, conversational rhythm, short pauses only where the meaning requires them. No theatrical acting. No whispering. No robotic delivery. Speak only the supplied dialogue. No added words. No omitted words. No repeated words. No translation. No paraphrasing. Treat punctuation as pacing guidance only. Do not read punctuation aloud.
Performance: Subtle facial expressions, natural blinking, small head movements, restrained hand gestures below the chin, realistic speech-aligned mouth movement. Keep the whole mouth visible at all times.
Camera and Framing: Vertical 9:16. Three-quarter angle from his right side, exactly matching the reference frame's composition and eyeline (he looks slightly off-camera toward frame-right). Both eyes and the full mouth visible. Locked-off or a barely perceptible drift.
Identity Lock: Use the exact identity from @me and the provided reference frame. Preserve the real facial structure, natural skin texture, short dark hair with receding temples, connected moustache and goatee with grey hairs in the chin, and the small dark mole above the LEFT corner of the upper lip (viewer's right in a frontal view). Never mirror the image. Never flip the image horizontally. Do not beautify the face. Do not de-age the face. Do not reshape the face. Do not slim the face. Do not replace the person. Do not change the nose. Do not change the jaw. Do not change the eyes. Do not change the mouth.
Wardrobe and Environment: Navy unstructured blazer over a heather warm-grey crew-neck T-shirt. The same studio as the reference frame: walnut slatted wall, wooden shelves with a few books, warm amber Edison lamp in soft bokeh, light walnut desk, black dynamic microphone in the foreground at frame-left, below the mouth. The microphone never covers the mouth.
Lighting and Style: Photorealistic cinematic podcast footage. Keep the reference frame's light direction and warmth exactly, gentle natural shadows, subtle teal-black shadows with amber highlights, shallow depth of field, natural skin texture.
Negative Constraints: No on-screen text. No subtitles. No captions. No titles. No logos. No watermarks. No letters. No numbers. No extra people. No mirrored identity. No facial changes. No obscured mouth. No exaggerated gestures. No sudden camera movement. No cuts. No scene changes. No invented dialogue. No duplicated dialogue. No music. No sound effects.
```


### B10 — 2:53.7–3:07.4 · موشن

> ملاحظة مونتاج فقط (ما بيظهر بالتوليد): الكلام اللي بتغطيه اللقطة: «إنه كل إنسان بنقابله… عنده عالم كامل جوّا… عنده ذكريات ما منعرفها… وأشياء علّمته الحياة إياها بالطريقة الصعبة… وقرارات يمكن لليوم مش عارف إذا كانت صح… وأشياء نفسه يحكيها… بس ما لقى الشخص اللي يعرف يسمعه»

**B10.1**

```
SHOT ID: B10.1
Duration: 6.9 s in the edit (2:53.7–3:00.6) — generate 8 s
Generation Mode: Text to Video (no @me, no reference images)
Visual Meaning: كل إنسان عنده عالم كامل جوّا ما منعرفه

9:16 vertical cinematic B-roll metaphor.
Main Visual: A dark human silhouette in profile filled with a slow galaxy of warm particles.
Motion: A dark human silhouette in profile stands against a deep teal-black background; inside it a slow galaxy of warm golden particles swirls gently; the shot ends with the particles glowing brighter.
Camera: Slow push-in toward the silhouette's chest.
Lighting and Color: Cinematic warm amber highlights, deep teal-black shadows, soft atmospheric light, shallow depth of field, restrained contrast. Photorealistic.
Continuity: Stand-alone opening of this metaphor; it follows A08.2 and is joined to it in the edit with a soft dissolve. It must end in a calm state that B10.2 can continue from.
Negative Constraints: No readable text. No letters. No numbers. No captions. No subtitles. No titles. No logos. No watermarks. No random people. No distracting objects. No abrupt cuts. No excessive motion. No unrelated elements. No dialogue. No music. No sound effects. No facial details. No readable images. No cosmic clichés with planets.
```

**B10.2**

```
SHOT ID: B10.2
Duration: 6.9 s in the edit (3:00.6–3:07.4) — generate 8 s
Generation Mode: Frames to Video — First frame: last frame of B10.1
Visual Meaning: كل إنسان عنده عالم كامل جوّا ما منعرفه

9:16 vertical cinematic B-roll metaphor.
Main Visual: A dark human silhouette in profile filled with a slow galaxy of warm particles.
Motion: Inside the silhouette, among the warm particles, faint blurred fragments of memories glow and fade softly; the shot ends on a calm, glowing inner galaxy.
Camera: Slow push-in toward the silhouette's chest.
Lighting and Color: Cinematic warm amber highlights, deep teal-black shadows, soft atmospheric light, shallow depth of field, restrained contrast. Photorealistic.
Continuity: Continue the same scene from the provided first frame (the last frame of B10.1), no cut, same light and palette. It is followed by A09.1.
Negative Constraints: No readable text. No letters. No numbers. No captions. No subtitles. No titles. No logos. No watermarks. No random people. No distracting objects. No abrupt cuts. No excessive motion. No unrelated elements. No dialogue. No music. No sound effects. No facial details. No readable images. No cosmic clichés with planets.
```


### A09 — 3:07.4–3:16.6 · بودكاست

**A09.1** — 7.8 ث كلام · 25 كلمة · زاوية أمامية · صوت المزامنة: `lipsync_audio/A09.1.wav`

```
SHOT ID: A09.1
Duration: 9.1 s in the edit (3:07.4–3:16.6) — generate 10 s, trim in the edit
Generation Mode: Frames to Video
Reference Frame: K_front_b.jpg + @me

EXACT SPOKEN DIALOGUE:
"وهذا ما بيعني إنه كل الناس على حق… ولا إنه كل اختلاف سببه سوء فهم… في ظلم حقيقي… وفي أخطاء… وفي تصرّفات لازم نوقف عندها"

Voice and Delivery: A natural adult male voice, warm, grounded and clear, speaking to one listener in a natural urban Ammani Jordanian Arabic dialect. Do not use generic Levantine Arabic. Do not imitate a Lebanese accent. Do not imitate a Syrian accent. Do not switch to Modern Standard Arabic. Do not exaggerate the dialect. The speaker himself pronounces qaf as a glottal stop in everyday colloquial words, as urban Ammani speakers do; keep this consistent across the clip. Do not change the written spelling. Do not force a hard qaf. Natural Jordanian word linking, conversational rhythm, short pauses only where the meaning requires them. No theatrical acting. No whispering. No robotic delivery. Speak only the supplied dialogue. No added words. No omitted words. No repeated words. No translation. No paraphrasing. Treat punctuation as pacing guidance only. Do not read punctuation aloud.
Performance: Subtle facial expressions, natural blinking, small head movements, restrained hand gestures below the chin, realistic speech-aligned mouth movement. Keep the whole mouth visible at all times.
Camera and Framing: Vertical 9:16. Medium close-up at eye level, exactly matching the reference frame's composition (head in the upper third, microphone entering from frame-right below mouth level). Very slow push-in of no more than 2%, otherwise locked-off.
Identity Lock: Use the exact identity from @me and the provided reference frame. Preserve the real facial structure, natural skin texture, short dark hair with receding temples, connected moustache and goatee with grey hairs in the chin, and the small dark mole above the LEFT corner of the upper lip (viewer's right in a frontal view). Never mirror the image. Never flip the image horizontally. Do not beautify the face. Do not de-age the face. Do not reshape the face. Do not slim the face. Do not replace the person. Do not change the nose. Do not change the jaw. Do not change the eyes. Do not change the mouth.
Wardrobe and Environment: Navy unstructured blazer over a heather warm-grey crew-neck T-shirt. Dark walnut slatted wall, wooden shelves with a few books, warm amber globe lamp in soft bokeh, light walnut desk, black dynamic microphone on a boom arm beside the mouth. The microphone never covers the mouth.
Lighting and Style: Photorealistic cinematic podcast footage. Low-key warm tungsten key light from camera-left, gentle natural shadows, subtle teal-black shadows with amber highlights, shallow depth of field, natural skin texture.
Negative Constraints: No on-screen text. No subtitles. No captions. No titles. No logos. No watermarks. No letters. No numbers. No extra people. No mirrored identity. No facial changes. No obscured mouth. No exaggerated gestures. No sudden camera movement. No cuts. No scene changes. No invented dialogue. No duplicated dialogue. No music. No sound effects.
```


### B11 — 3:16.6–3:21.1 · موشن

> ملاحظة مونتاج فقط (ما بيظهر بالتوليد): الكلام اللي بتغطيه اللقطة: «بس حتى وإحنا بنختلف… بنقدر نترك مساحة لاحتمال إنّا مش شايفين الصورة كاملة»

**B11.1**

```
SHOT ID: B11.1
Duration: 4.5 s in the edit (3:16.6–3:21.1) — generate 6 s
Generation Mode: Text to Video (no @me, no reference images)
Visual Meaning: ما منشوف الصورة كاملة

9:16 vertical cinematic B-roll metaphor.
Main Visual: An old photograph on dark wood with several jigsaw pieces missing.
Motion: Missing jigsaw pieces drift in from the darkness and settle into an old photograph on dark wood; one corner stays empty; the shot ends on that empty corner.
Camera: Top-down, very slow push-in.
Lighting and Color: Cinematic warm amber highlights, deep teal-black shadows, soft atmospheric light, shallow depth of field, restrained contrast. Photorealistic.
Continuity: Stand-alone opening of this metaphor; it follows A09.1 and is joined to it in the edit with a soft dissolve. It is followed by A10.1.
Negative Constraints: No readable text. No letters. No numbers. No captions. No subtitles. No titles. No logos. No watermarks. No random people. No distracting objects. No abrupt cuts. No excessive motion. No unrelated elements. No dialogue. No music. No sound effects. No completing the picture fully. No readable details.
```


### A10 — 3:21.1–3:34.9 · بودكاست

**A10.1** — 6.7 ث كلام · 19 كلمة · زاوية أمامية · صوت المزامنة: `lipsync_audio/A10.1.wav`

```
SHOT ID: A10.1
Duration: 7.5 s in the edit (3:21.1–3:28.6) — generate 10 s, trim in the edit
Generation Mode: Frames to Video
Reference Frame: K_front_a.jpg + @me

EXACT SPOKEN DIALOGUE:
"وممكن نفهم الإنسان من غير ما نوافقه… ونحبّه ونحط حدود بنفس الوقت… ونراجع رأينا من غير ما نخسر كرامتنا"

Voice and Delivery: A natural adult male voice, warm, grounded and clear, speaking to one listener in a natural urban Ammani Jordanian Arabic dialect. Do not use generic Levantine Arabic. Do not imitate a Lebanese accent. Do not imitate a Syrian accent. Do not switch to Modern Standard Arabic. Do not exaggerate the dialect. The speaker himself pronounces qaf as a glottal stop in everyday colloquial words, as urban Ammani speakers do; keep this consistent across the clip. Do not change the written spelling. Do not force a hard qaf. Natural Jordanian word linking, conversational rhythm, short pauses only where the meaning requires them. No theatrical acting. No whispering. No robotic delivery. Speak only the supplied dialogue. No added words. No omitted words. No repeated words. No translation. No paraphrasing. Treat punctuation as pacing guidance only. Do not read punctuation aloud.
Performance: Subtle facial expressions, natural blinking, small head movements, restrained hand gestures below the chin, realistic speech-aligned mouth movement. Keep the whole mouth visible at all times.
Camera and Framing: Vertical 9:16. Medium close-up at eye level, exactly matching the reference frame's composition (head in the upper third, microphone entering from frame-right below mouth level). Very slow push-in of no more than 2%, otherwise locked-off.
Identity Lock: Use the exact identity from @me and the provided reference frame. Preserve the real facial structure, natural skin texture, short dark hair with receding temples, connected moustache and goatee with grey hairs in the chin, and the small dark mole above the LEFT corner of the upper lip (viewer's right in a frontal view). Never mirror the image. Never flip the image horizontally. Do not beautify the face. Do not de-age the face. Do not reshape the face. Do not slim the face. Do not replace the person. Do not change the nose. Do not change the jaw. Do not change the eyes. Do not change the mouth.
Wardrobe and Environment: Navy unstructured blazer over a heather warm-grey crew-neck T-shirt. Dark walnut slatted wall, wooden shelves with a few books, warm amber globe lamp in soft bokeh, light walnut desk, black dynamic microphone on a boom arm beside the mouth. The microphone never covers the mouth.
Lighting and Style: Photorealistic cinematic podcast footage. Low-key warm tungsten key light from camera-left, gentle natural shadows, subtle teal-black shadows with amber highlights, shallow depth of field, natural skin texture.
Negative Constraints: No on-screen text. No subtitles. No captions. No titles. No logos. No watermarks. No letters. No numbers. No extra people. No mirrored identity. No facial changes. No obscured mouth. No exaggerated gestures. No sudden camera movement. No cuts. No scene changes. No invented dialogue. No duplicated dialogue. No music. No sound effects.
```

**A10.2** — 4.5 ث كلام · 13 كلمة · زاوية جانبية · صوت المزامنة: `lipsync_audio/A10.2.wav`

```
SHOT ID: A10.2
Duration: 4.8 s in the edit (3:30.1–3:34.9) — generate 10 s, trim in the edit
Generation Mode: Frames to Video
Reference Frame: K_side_b.jpg + @me

EXACT SPOKEN DIALOGUE:
"وعشان هيك صرت أشوف إنه أصعب الحوارات مش دايماً اللي بنخوضها مع غيرنا"

Voice and Delivery: A natural adult male voice, warm, grounded and clear, speaking to one listener in a natural urban Ammani Jordanian Arabic dialect. Do not use generic Levantine Arabic. Do not imitate a Lebanese accent. Do not imitate a Syrian accent. Do not switch to Modern Standard Arabic. Do not exaggerate the dialect. The speaker himself pronounces qaf as a glottal stop in everyday colloquial words, as urban Ammani speakers do; keep this consistent across the clip. Do not change the written spelling. Do not force a hard qaf. Natural Jordanian word linking, conversational rhythm, short pauses only where the meaning requires them. No theatrical acting. No whispering. No robotic delivery. Speak only the supplied dialogue. No added words. No omitted words. No repeated words. No translation. No paraphrasing. Treat punctuation as pacing guidance only. Do not read punctuation aloud.
Performance: Subtle facial expressions, natural blinking, small head movements, restrained hand gestures below the chin, realistic speech-aligned mouth movement. Keep the whole mouth visible at all times.
Camera and Framing: Vertical 9:16. Three-quarter angle from his right side, exactly matching the reference frame's composition and eyeline (he looks slightly off-camera toward frame-right). Both eyes and the full mouth visible. Locked-off or a barely perceptible drift.
Identity Lock: Use the exact identity from @me and the provided reference frame. Preserve the real facial structure, natural skin texture, short dark hair with receding temples, connected moustache and goatee with grey hairs in the chin, and the small dark mole above the LEFT corner of the upper lip (viewer's right in a frontal view). Never mirror the image. Never flip the image horizontally. Do not beautify the face. Do not de-age the face. Do not reshape the face. Do not slim the face. Do not replace the person. Do not change the nose. Do not change the jaw. Do not change the eyes. Do not change the mouth.
Wardrobe and Environment: Navy unstructured blazer over a heather warm-grey crew-neck T-shirt. The same studio as the reference frame: walnut slatted wall, wooden shelves with a few books, warm amber Edison lamp in soft bokeh, light walnut desk, black dynamic microphone in the foreground at frame-left, below the mouth. The microphone never covers the mouth.
Lighting and Style: Photorealistic cinematic podcast footage. Keep the reference frame's light direction and warmth exactly, gentle natural shadows, subtle teal-black shadows with amber highlights, shallow depth of field, natural skin texture.
Negative Constraints: No on-screen text. No subtitles. No captions. No titles. No logos. No watermarks. No letters. No numbers. No extra people. No mirrored identity. No facial changes. No obscured mouth. No exaggerated gestures. No sudden camera movement. No cuts. No scene changes. No invented dialogue. No duplicated dialogue. No music. No sound effects.
```


### B12 — 3:34.9–3:37.5 · موشن

> ملاحظة مونتاج فقط (ما بيظهر بالتوليد): الكلام اللي بتغطيه اللقطة: «أحياناً أصعب حوار… هو اللي بنخوضه مع حالنا»

**B12.1**

```
SHOT ID: B12.1
Duration: 2.6 s in the edit (3:34.9–3:37.5) — generate 6 s
Generation Mode: Text to Video (no @me, no reference images)
Visual Meaning: أصعب حوار هو اللي بنخوضه مع حالنا

9:16 vertical cinematic B-roll metaphor.
Main Visual: A man's backlit silhouette sitting opposite his own blurred reflection in a dark window, a warm lamp between them.
Motion: A man's backlit silhouette sits facing his own blurred reflection in a dark window, a warm lamp glowing between them; both stay still and silent while the camera slowly arcs; the shot ends on the lamp between them.
Camera: Medium shot, very slow arc.
Lighting and Color: Cinematic warm amber highlights, deep teal-black shadows, soft atmospheric light, shallow depth of field, restrained contrast. Photorealistic.
Continuity: Stand-alone opening of this metaphor; it follows A10.2 and is joined to it in the edit with a soft dissolve. It is followed by A11.1.
Negative Constraints: No readable text. No letters. No numbers. No captions. No subtitles. No titles. No logos. No watermarks. No random people. No distracting objects. No abrupt cuts. No excessive motion. No unrelated elements. No dialogue. No music. No sound effects. No two clear identical faces. No recognisable face. No mirror tricks that look fake.
```


### A11 — 3:37.5–4:00.2 · بودكاست

**A11.1** — 3.2 ث كلام · 9 كلمة · زاوية أمامية · صوت المزامنة: `lipsync_audio/A11.1.wav`

```
SHOT ID: A11.1
Duration: 3.6 s in the edit (3:37.5–3:41.2) — generate 10 s, trim in the edit
Generation Mode: Frames to Video
Reference Frame: K_front_b.jpg + @me

EXACT SPOKEN DIALOGUE:
"لما نسأل إذا إحنا فعلاً مرتاحين بالاختيارات اللي عايشينها"

Voice and Delivery: A natural adult male voice, warm, grounded and clear, speaking to one listener in a natural urban Ammani Jordanian Arabic dialect. Do not use generic Levantine Arabic. Do not imitate a Lebanese accent. Do not imitate a Syrian accent. Do not switch to Modern Standard Arabic. Do not exaggerate the dialect. The speaker himself pronounces qaf as a glottal stop in everyday colloquial words, as urban Ammani speakers do; keep this consistent across the clip. Do not change the written spelling. Do not force a hard qaf. Natural Jordanian word linking, conversational rhythm, short pauses only where the meaning requires them. No theatrical acting. No whispering. No robotic delivery. Speak only the supplied dialogue. No added words. No omitted words. No repeated words. No translation. No paraphrasing. Treat punctuation as pacing guidance only. Do not read punctuation aloud.
Performance: Subtle facial expressions, natural blinking, small head movements, restrained hand gestures below the chin, realistic speech-aligned mouth movement. Keep the whole mouth visible at all times.
Camera and Framing: Vertical 9:16. Medium close-up at eye level, exactly matching the reference frame's composition (head in the upper third, microphone entering from frame-right below mouth level). Very slow push-in of no more than 2%, otherwise locked-off.
Identity Lock: Use the exact identity from @me and the provided reference frame. Preserve the real facial structure, natural skin texture, short dark hair with receding temples, connected moustache and goatee with grey hairs in the chin, and the small dark mole above the LEFT corner of the upper lip (viewer's right in a frontal view). Never mirror the image. Never flip the image horizontally. Do not beautify the face. Do not de-age the face. Do not reshape the face. Do not slim the face. Do not replace the person. Do not change the nose. Do not change the jaw. Do not change the eyes. Do not change the mouth.
Wardrobe and Environment: Navy unstructured blazer over a heather warm-grey crew-neck T-shirt. Dark walnut slatted wall, wooden shelves with a few books, warm amber globe lamp in soft bokeh, light walnut desk, black dynamic microphone on a boom arm beside the mouth. The microphone never covers the mouth.
Lighting and Style: Photorealistic cinematic podcast footage. Low-key warm tungsten key light from camera-left, gentle natural shadows, subtle teal-black shadows with amber highlights, shallow depth of field, natural skin texture.
Negative Constraints: No on-screen text. No subtitles. No captions. No titles. No logos. No watermarks. No letters. No numbers. No extra people. No mirrored identity. No facial changes. No obscured mouth. No exaggerated gestures. No sudden camera movement. No cuts. No scene changes. No invented dialogue. No duplicated dialogue. No music. No sound effects.
```

**A11.2** — 6.1 ث كلام · 16 كلمة · زاوية جانبية · صوت المزامنة: `lipsync_audio/A11.2.wav`

```
SHOT ID: A11.2
Duration: 6.2 s in the edit (3:41.5–3:47.7) — generate 10 s, trim in the edit
Generation Mode: Frames to Video
Reference Frame: K_side_a.jpg + @me

EXACT SPOKEN DIALOGUE:
"وهل إحنا متمسّكين بقناعاتنا لأنّا لسّه مؤمنين فيها؟ ولا لأنّا خايفين نكتشف إنها ما عادت إلنا"

Voice and Delivery: A natural adult male voice, warm, grounded and clear, speaking to one listener in a natural urban Ammani Jordanian Arabic dialect. Do not use generic Levantine Arabic. Do not imitate a Lebanese accent. Do not imitate a Syrian accent. Do not switch to Modern Standard Arabic. Do not exaggerate the dialect. The speaker himself pronounces qaf as a glottal stop in everyday colloquial words, as urban Ammani speakers do; keep this consistent across the clip. Do not change the written spelling. Do not force a hard qaf. Natural Jordanian word linking, conversational rhythm, short pauses only where the meaning requires them. No theatrical acting. No whispering. No robotic delivery. Speak only the supplied dialogue. No added words. No omitted words. No repeated words. No translation. No paraphrasing. Treat punctuation as pacing guidance only. Do not read punctuation aloud.
Performance: Subtle facial expressions, natural blinking, small head movements, restrained hand gestures below the chin, realistic speech-aligned mouth movement. Keep the whole mouth visible at all times.
Camera and Framing: Vertical 9:16. Three-quarter angle from his right side, exactly matching the reference frame's composition and eyeline (he looks slightly off-camera toward frame-right). Both eyes and the full mouth visible. Locked-off or a barely perceptible drift.
Identity Lock: Use the exact identity from @me and the provided reference frame. Preserve the real facial structure, natural skin texture, short dark hair with receding temples, connected moustache and goatee with grey hairs in the chin, and the small dark mole above the LEFT corner of the upper lip (viewer's right in a frontal view). Never mirror the image. Never flip the image horizontally. Do not beautify the face. Do not de-age the face. Do not reshape the face. Do not slim the face. Do not replace the person. Do not change the nose. Do not change the jaw. Do not change the eyes. Do not change the mouth.
Wardrobe and Environment: Navy unstructured blazer over a heather warm-grey crew-neck T-shirt. The same studio as the reference frame: walnut slatted wall, wooden shelves with a few books, warm amber Edison lamp in soft bokeh, light walnut desk, black dynamic microphone in the foreground at frame-left, below the mouth. The microphone never covers the mouth.
Lighting and Style: Photorealistic cinematic podcast footage. Keep the reference frame's light direction and warmth exactly, gentle natural shadows, subtle teal-black shadows with amber highlights, shallow depth of field, natural skin texture.
Negative Constraints: No on-screen text. No subtitles. No captions. No titles. No logos. No watermarks. No letters. No numbers. No extra people. No mirrored identity. No facial changes. No obscured mouth. No exaggerated gestures. No sudden camera movement. No cuts. No scene changes. No invented dialogue. No duplicated dialogue. No music. No sound effects.
```

**A11.3** — 5.8 ث كلام · 13 كلمة · زاوية أمامية · صوت المزامنة: `lipsync_audio/A11.3.wav`

```
SHOT ID: A11.3
Duration: 5.8 s in the edit (3:48.0–3:53.8) — generate 10 s, trim in the edit
Generation Mode: Frames to Video
Reference Frame: K_front_a.jpg + @me

EXACT SPOKEN DIALOGUE:
"وهل إحنا بنحاول نفهم الناس فعلاً؟ ولا بس بنحاول نلاقي تفسير يخلّينا مرتاحين"

Voice and Delivery: A natural adult male voice, warm, grounded and clear, speaking to one listener in a natural urban Ammani Jordanian Arabic dialect. Do not use generic Levantine Arabic. Do not imitate a Lebanese accent. Do not imitate a Syrian accent. Do not switch to Modern Standard Arabic. Do not exaggerate the dialect. The speaker himself pronounces qaf as a glottal stop in everyday colloquial words, as urban Ammani speakers do; keep this consistent across the clip. Do not change the written spelling. Do not force a hard qaf. Natural Jordanian word linking, conversational rhythm, short pauses only where the meaning requires them. No theatrical acting. No whispering. No robotic delivery. Speak only the supplied dialogue. No added words. No omitted words. No repeated words. No translation. No paraphrasing. Treat punctuation as pacing guidance only. Do not read punctuation aloud.
Performance: Subtle facial expressions, natural blinking, small head movements, restrained hand gestures below the chin, realistic speech-aligned mouth movement. Keep the whole mouth visible at all times.
Camera and Framing: Vertical 9:16. Medium close-up at eye level, exactly matching the reference frame's composition (head in the upper third, microphone entering from frame-right below mouth level). Very slow push-in of no more than 2%, otherwise locked-off.
Identity Lock: Use the exact identity from @me and the provided reference frame. Preserve the real facial structure, natural skin texture, short dark hair with receding temples, connected moustache and goatee with grey hairs in the chin, and the small dark mole above the LEFT corner of the upper lip (viewer's right in a frontal view). Never mirror the image. Never flip the image horizontally. Do not beautify the face. Do not de-age the face. Do not reshape the face. Do not slim the face. Do not replace the person. Do not change the nose. Do not change the jaw. Do not change the eyes. Do not change the mouth.
Wardrobe and Environment: Navy unstructured blazer over a heather warm-grey crew-neck T-shirt. Dark walnut slatted wall, wooden shelves with a few books, warm amber globe lamp in soft bokeh, light walnut desk, black dynamic microphone on a boom arm beside the mouth. The microphone never covers the mouth.
Lighting and Style: Photorealistic cinematic podcast footage. Low-key warm tungsten key light from camera-left, gentle natural shadows, subtle teal-black shadows with amber highlights, shallow depth of field, natural skin texture.
Negative Constraints: No on-screen text. No subtitles. No captions. No titles. No logos. No watermarks. No letters. No numbers. No extra people. No mirrored identity. No facial changes. No obscured mouth. No exaggerated gestures. No sudden camera movement. No cuts. No scene changes. No invented dialogue. No duplicated dialogue. No music. No sound effects.
```

**A11.4** — 4.7 ث كلام · 15 كلمة · زاوية جانبية · صوت المزامنة: `lipsync_audio/A11.4.wav`

```
SHOT ID: A11.4
Duration: 4.9 s in the edit (3:55.3–4:00.2) — generate 10 s, trim in the edit
Generation Mode: Frames to Video
Reference Frame: K_side_b.jpg + @me

EXACT SPOKEN DIALOGUE:
"يمكن ما عندي إجابات جاهزة عن كل هالأسئلة… بس بعرف إنه في أشياء بتتغيّر فينا"

Voice and Delivery: A natural adult male voice, warm, grounded and clear, speaking to one listener in a natural urban Ammani Jordanian Arabic dialect. Do not use generic Levantine Arabic. Do not imitate a Lebanese accent. Do not imitate a Syrian accent. Do not switch to Modern Standard Arabic. Do not exaggerate the dialect. The speaker himself pronounces qaf as a glottal stop in everyday colloquial words, as urban Ammani speakers do; keep this consistent across the clip. Do not change the written spelling. Do not force a hard qaf. Natural Jordanian word linking, conversational rhythm, short pauses only where the meaning requires them. No theatrical acting. No whispering. No robotic delivery. Speak only the supplied dialogue. No added words. No omitted words. No repeated words. No translation. No paraphrasing. Treat punctuation as pacing guidance only. Do not read punctuation aloud.
Performance: Subtle facial expressions, natural blinking, small head movements, restrained hand gestures below the chin, realistic speech-aligned mouth movement. Keep the whole mouth visible at all times.
Camera and Framing: Vertical 9:16. Three-quarter angle from his right side, exactly matching the reference frame's composition and eyeline (he looks slightly off-camera toward frame-right). Both eyes and the full mouth visible. Locked-off or a barely perceptible drift.
Identity Lock: Use the exact identity from @me and the provided reference frame. Preserve the real facial structure, natural skin texture, short dark hair with receding temples, connected moustache and goatee with grey hairs in the chin, and the small dark mole above the LEFT corner of the upper lip (viewer's right in a frontal view). Never mirror the image. Never flip the image horizontally. Do not beautify the face. Do not de-age the face. Do not reshape the face. Do not slim the face. Do not replace the person. Do not change the nose. Do not change the jaw. Do not change the eyes. Do not change the mouth.
Wardrobe and Environment: Navy unstructured blazer over a heather warm-grey crew-neck T-shirt. The same studio as the reference frame: walnut slatted wall, wooden shelves with a few books, warm amber Edison lamp in soft bokeh, light walnut desk, black dynamic microphone in the foreground at frame-left, below the mouth. The microphone never covers the mouth.
Lighting and Style: Photorealistic cinematic podcast footage. Keep the reference frame's light direction and warmth exactly, gentle natural shadows, subtle teal-black shadows with amber highlights, shallow depth of field, natural skin texture.
Negative Constraints: No on-screen text. No subtitles. No captions. No titles. No logos. No watermarks. No letters. No numbers. No extra people. No mirrored identity. No facial changes. No obscured mouth. No exaggerated gestures. No sudden camera movement. No cuts. No scene changes. No invented dialogue. No duplicated dialogue. No music. No sound effects.
```


### B13 — 4:00.2–4:07.3 · موشن

> ملاحظة مونتاج فقط (ما بيظهر بالتوليد): الكلام اللي بتغطيه اللقطة: «مش لما حدا يعطينا الجواب… لكن لما نوقف قدّام حالنا ونسمح لسؤال واحد إنه يغيّر الطريقة اللي بنشوف فيها الأمور»

**B13.1**

```
SHOT ID: B13.1
Duration: 7.2 s in the edit (4:00.2–4:07.3) — generate 8 s
Generation Mode: Text to Video (no @me, no reference images)
Visual Meaning: سؤال واحد بيغيّر الطريقة اللي بنشوف فيها الأمور

9:16 vertical cinematic B-roll metaphor.
Main Visual: A large clear glass lens shaped like a question mark hanging in a dark room.
Motion: A large glass lens shaped like a question mark hangs in a dark room; the camera moves slowly through it and the blurred room behind becomes sharp and warm; the shot ends on the sharp, warmly lit room.
Camera: Slow dolly forward through the lens.
Lighting and Color: Cinematic warm amber highlights, deep teal-black shadows, soft atmospheric light, shallow depth of field, restrained contrast. Photorealistic.
Continuity: Stand-alone opening of this metaphor; it follows A11.4 and is joined to it in the edit with a soft dissolve. It is followed by A12.1.
Negative Constraints: No readable text. No letters. No numbers. No captions. No subtitles. No titles. No logos. No watermarks. No random people. No distracting objects. No abrupt cuts. No excessive motion. No unrelated elements. No dialogue. No music. No sound effects. No readable text. No cartoon look.
```


### A12 — 4:07.3–4:29.6 · بودكاست

**A12.1** — 5.7 ث كلام · 17 كلمة · زاوية أمامية · صوت المزامنة: `lipsync_audio/A12.1.wav`

```
SHOT ID: A12.1
Duration: 6.1 s in the edit (4:07.3–4:13.5) — generate 10 s, trim in the edit
Generation Mode: Frames to Video
Reference Frame: K_front_b.jpg + @me

EXACT SPOKEN DIALOGUE:
"وعشان هيك «ما لا يُقال» بالنسبة إلي مش مساحة نحكي فيها عن الأشياء اللي ما بنحكيها بس"

Voice and Delivery: A natural adult male voice, warm, grounded and clear, speaking to one listener in a natural urban Ammani Jordanian Arabic dialect. Do not use generic Levantine Arabic. Do not imitate a Lebanese accent. Do not imitate a Syrian accent. Do not switch to Modern Standard Arabic. Do not exaggerate the dialect. The speaker himself pronounces qaf as a glottal stop in everyday colloquial words, as urban Ammani speakers do; keep this consistent across the clip. Do not change the written spelling. Do not force a hard qaf. Natural Jordanian word linking, conversational rhythm, short pauses only where the meaning requires them. No theatrical acting. No whispering. No robotic delivery. Speak only the supplied dialogue. No added words. No omitted words. No repeated words. No translation. No paraphrasing. Treat punctuation as pacing guidance only. Do not read punctuation aloud.
Performance: Subtle facial expressions, natural blinking, small head movements, restrained hand gestures below the chin, realistic speech-aligned mouth movement. Keep the whole mouth visible at all times.
Camera and Framing: Vertical 9:16. Medium close-up at eye level, exactly matching the reference frame's composition (head in the upper third, microphone entering from frame-right below mouth level). Very slow push-in of no more than 2%, otherwise locked-off.
Identity Lock: Use the exact identity from @me and the provided reference frame. Preserve the real facial structure, natural skin texture, short dark hair with receding temples, connected moustache and goatee with grey hairs in the chin, and the small dark mole above the LEFT corner of the upper lip (viewer's right in a frontal view). Never mirror the image. Never flip the image horizontally. Do not beautify the face. Do not de-age the face. Do not reshape the face. Do not slim the face. Do not replace the person. Do not change the nose. Do not change the jaw. Do not change the eyes. Do not change the mouth.
Wardrobe and Environment: Navy unstructured blazer over a heather warm-grey crew-neck T-shirt. Dark walnut slatted wall, wooden shelves with a few books, warm amber globe lamp in soft bokeh, light walnut desk, black dynamic microphone on a boom arm beside the mouth. The microphone never covers the mouth.
Lighting and Style: Photorealistic cinematic podcast footage. Low-key warm tungsten key light from camera-left, gentle natural shadows, subtle teal-black shadows with amber highlights, shallow depth of field, natural skin texture.
Negative Constraints: No on-screen text. No subtitles. No captions. No titles. No logos. No watermarks. No letters. No numbers. No extra people. No mirrored identity. No facial changes. No obscured mouth. No exaggerated gestures. No sudden camera movement. No cuts. No scene changes. No invented dialogue. No duplicated dialogue. No music. No sound effects.
```

**A12.2** — 6.6 ث كلام · 20 كلمة · زاوية جانبية · صوت المزامنة: `lipsync_audio/A12.2.wav`

```
SHOT ID: A12.2
Duration: 8.4 s in the edit (4:13.6–4:22.1) — generate 10 s, trim in the edit
Generation Mode: Frames to Video
Reference Frame: K_side_a.jpg + @me

EXACT SPOKEN DIALOGUE:
"هي كمان مساحة نراجع فيها الأشياء اللي طول عمرنا مفكّرين إنّا فاهمينها… وقبل ما تروح… خلّيني أتركك مع فكرة واحدة"

Voice and Delivery: A natural adult male voice, warm, grounded and clear, speaking to one listener in a natural urban Ammani Jordanian Arabic dialect. Do not use generic Levantine Arabic. Do not imitate a Lebanese accent. Do not imitate a Syrian accent. Do not switch to Modern Standard Arabic. Do not exaggerate the dialect. The speaker himself pronounces qaf as a glottal stop in everyday colloquial words, as urban Ammani speakers do; keep this consistent across the clip. Do not change the written spelling. Do not force a hard qaf. Natural Jordanian word linking, conversational rhythm, short pauses only where the meaning requires them. No theatrical acting. No whispering. No robotic delivery. Speak only the supplied dialogue. No added words. No omitted words. No repeated words. No translation. No paraphrasing. Treat punctuation as pacing guidance only. Do not read punctuation aloud.
Performance: Subtle facial expressions, natural blinking, small head movements, restrained hand gestures below the chin, realistic speech-aligned mouth movement. Keep the whole mouth visible at all times.
Camera and Framing: Vertical 9:16. Three-quarter angle from his right side, exactly matching the reference frame's composition and eyeline (he looks slightly off-camera toward frame-right). Both eyes and the full mouth visible. Locked-off or a barely perceptible drift.
Identity Lock: Use the exact identity from @me and the provided reference frame. Preserve the real facial structure, natural skin texture, short dark hair with receding temples, connected moustache and goatee with grey hairs in the chin, and the small dark mole above the LEFT corner of the upper lip (viewer's right in a frontal view). Never mirror the image. Never flip the image horizontally. Do not beautify the face. Do not de-age the face. Do not reshape the face. Do not slim the face. Do not replace the person. Do not change the nose. Do not change the jaw. Do not change the eyes. Do not change the mouth.
Wardrobe and Environment: Navy unstructured blazer over a heather warm-grey crew-neck T-shirt. The same studio as the reference frame: walnut slatted wall, wooden shelves with a few books, warm amber Edison lamp in soft bokeh, light walnut desk, black dynamic microphone in the foreground at frame-left, below the mouth. The microphone never covers the mouth.
Lighting and Style: Photorealistic cinematic podcast footage. Keep the reference frame's light direction and warmth exactly, gentle natural shadows, subtle teal-black shadows with amber highlights, shallow depth of field, natural skin texture.
Negative Constraints: No on-screen text. No subtitles. No captions. No titles. No logos. No watermarks. No letters. No numbers. No extra people. No mirrored identity. No facial changes. No obscured mouth. No exaggerated gestures. No sudden camera movement. No cuts. No scene changes. No invented dialogue. No duplicated dialogue. No music. No sound effects.
```

**A12.3** — 6.6 ث كلام · 19 كلمة · زاوية جانبية · صوت المزامنة: `lipsync_audio/A12.3.wav`

```
SHOT ID: A12.3
Duration: 7.3 s in the edit (4:22.3–4:29.6) — generate 10 s, trim in the edit
Generation Mode: Frames to Video
Reference Frame: K_side_b.jpg + @me

EXACT SPOKEN DIALOGUE:
"يمكن في قصة أو انطباع بحياتك… لليوم بتحكيها بنفس الطريقة، عن شخص… أو عن موقف… أو حتى عن حالك"

Voice and Delivery: A natural adult male voice, warm, grounded and clear, speaking to one listener in a natural urban Ammani Jordanian Arabic dialect. Do not use generic Levantine Arabic. Do not imitate a Lebanese accent. Do not imitate a Syrian accent. Do not switch to Modern Standard Arabic. Do not exaggerate the dialect. The speaker himself pronounces qaf as a glottal stop in everyday colloquial words, as urban Ammani speakers do; keep this consistent across the clip. Do not change the written spelling. Do not force a hard qaf. Natural Jordanian word linking, conversational rhythm, short pauses only where the meaning requires them. No theatrical acting. No whispering. No robotic delivery. Speak only the supplied dialogue. No added words. No omitted words. No repeated words. No translation. No paraphrasing. Treat punctuation as pacing guidance only. Do not read punctuation aloud.
Performance: Subtle facial expressions, natural blinking, small head movements, restrained hand gestures below the chin, realistic speech-aligned mouth movement. Keep the whole mouth visible at all times.
Camera and Framing: Vertical 9:16. Three-quarter angle from his right side, exactly matching the reference frame's composition and eyeline (he looks slightly off-camera toward frame-right). Both eyes and the full mouth visible. Locked-off or a barely perceptible drift.
Identity Lock: Use the exact identity from @me and the provided reference frame. Preserve the real facial structure, natural skin texture, short dark hair with receding temples, connected moustache and goatee with grey hairs in the chin, and the small dark mole above the LEFT corner of the upper lip (viewer's right in a frontal view). Never mirror the image. Never flip the image horizontally. Do not beautify the face. Do not de-age the face. Do not reshape the face. Do not slim the face. Do not replace the person. Do not change the nose. Do not change the jaw. Do not change the eyes. Do not change the mouth.
Wardrobe and Environment: Navy unstructured blazer over a heather warm-grey crew-neck T-shirt. The same studio as the reference frame: walnut slatted wall, wooden shelves with a few books, warm amber Edison lamp in soft bokeh, light walnut desk, black dynamic microphone in the foreground at frame-left, below the mouth. The microphone never covers the mouth.
Lighting and Style: Photorealistic cinematic podcast footage. Keep the reference frame's light direction and warmth exactly, gentle natural shadows, subtle teal-black shadows with amber highlights, shallow depth of field, natural skin texture.
Negative Constraints: No on-screen text. No subtitles. No captions. No titles. No logos. No watermarks. No letters. No numbers. No extra people. No mirrored identity. No facial changes. No obscured mouth. No exaggerated gestures. No sudden camera movement. No cuts. No scene changes. No invented dialogue. No duplicated dialogue. No music. No sound effects.
```


### B14 — 4:29.6–4:44.8 · موشن

> ملاحظة مونتاج فقط (ما بيظهر بالتوليد): الكلام اللي بتغطيه اللقطة: «جرّب ترجع تفكّر فيها مرّة تانية، مش حتى تبرّر اللي صار… ولا حتى تغيّر الحقيقة، بس حتى تشوف إذا في إشي ما انتبهت له وقتها… يمكن ما يتغيّر رأيك… بس يمكن تكتشف إشي جديد… ويمكن تفهم لأول مرّة ليش هالقصة ضلّت معك كل هالوقت»

**B14.1**

```
SHOT ID: B14.1
Duration: 7.6 s in the edit (4:29.6–4:37.2) — generate 8 s
Generation Mode: Text to Video (no @me, no reference images)
Visual Meaning: نرجع نفكّر فيها مرّة تانية، يمكن نكتشف إشي ما انتبهنا له

9:16 vertical cinematic B-roll metaphor.
Main Visual: A sequence of quiet moments from the episode's world: a rainy train window, a covered living room, a fogged mirror, a lit doorway.
Motion: Quiet moments play in reverse motion — a rainy train window, a covered living room, a fogged mirror — gradually slowing down; the shot ends just before stopping.
Camera: Reverse motion that slows down and stops.
Lighting and Color: Cinematic warm amber highlights, deep teal-black shadows, soft atmospheric light, shallow depth of field, restrained contrast. Photorealistic.
Continuity: Stand-alone opening of this metaphor; it follows A12.3 and is joined to it in the edit with a soft dissolve. It must end in a calm state that B14.2 can continue from.
Negative Constraints: No readable text. No letters. No numbers. No captions. No subtitles. No titles. No logos. No watermarks. No random people. No distracting objects. No abrupt cuts. No excessive motion. No unrelated elements. No dialogue. No music. No sound effects. No jarring strobe. No readable text. No people's faces.
```

**B14.2**

```
SHOT ID: B14.2
Duration: 7.6 s in the edit (4:37.2–4:44.8) — generate 8 s
Generation Mode: Frames to Video — First frame: last frame of B14.1
Visual Meaning: نرجع نفكّر فيها مرّة تانية، يمكن نكتشف إشي ما انتبهنا له

9:16 vertical cinematic B-roll metaphor.
Main Visual: A sequence of quiet moments from the episode's world: a rainy train window, a covered living room, a fogged mirror, a lit doorway.
Motion: The reverse motion slows to a stop on one still frame of a softly lit doorway; the light slowly warms; the shot ends on that still warm frame.
Camera: Reverse motion that slows down and stops.
Lighting and Color: Cinematic warm amber highlights, deep teal-black shadows, soft atmospheric light, shallow depth of field, restrained contrast. Photorealistic.
Continuity: Continue the same scene from the provided first frame (the last frame of B14.1), no cut, same light and palette. It is followed by B15.1.
Negative Constraints: No readable text. No letters. No numbers. No captions. No subtitles. No titles. No logos. No watermarks. No random people. No distracting objects. No abrupt cuts. No excessive motion. No unrelated elements. No dialogue. No music. No sound effects. No jarring strobe. No readable text. No people's faces.
```


### B15 — 4:44.8–4:49.6 · موشن

> ملاحظة مونتاج فقط (ما بيظهر بالتوليد): الكلام اللي بتغطيه اللقطة: «لأنه مرّات… إحنا ما بنحتاج نغيّر الماضي، قد ما بنحتاج نفهم شو عمل فينا»

**B15.1**

```
SHOT ID: B15.1
Duration: 4.8 s in the edit (4:44.8–4:49.6) — generate 6 s
Generation Mode: Text to Video (no @me, no reference images)
Visual Meaning: ما بنحتاج نغيّر الماضي قد ما بنحتاج نفهم شو عمل فينا

9:16 vertical cinematic B-roll metaphor.
Main Visual: A faded photograph on dark wood.
Motion: A dark line slowly strikes across a faded photograph on dark wood, then warm light grows from beneath it; the shot ends with the photograph glowing softly.
Camera: Top-down macro, locked-off.
Lighting and Color: Cinematic warm amber highlights, deep teal-black shadows, soft atmospheric light, shallow depth of field, restrained contrast. Photorealistic.
Continuity: Stand-alone opening of this metaphor; it follows B14.2 and is joined to it in the edit with a soft dissolve. It is followed by A13.1.
Negative Constraints: No readable text. No letters. No numbers. No captions. No subtitles. No titles. No logos. No watermarks. No random people. No distracting objects. No abrupt cuts. No excessive motion. No unrelated elements. No dialogue. No music. No sound effects. No violent tearing. No readable writing.
```


### A13 — 4:49.6–4:53.1 · بودكاست

**A13.1** — 2.7 ث كلام · 7 كلمة · زاوية أمامية · صوت المزامنة: `lipsync_audio/A13.1.wav`

```
SHOT ID: A13.1
Duration: 3.5 s in the edit (4:49.6–4:53.1) — generate 10 s, trim in the edit
Generation Mode: Frames to Video
Reference Frame: K_front_a.jpg + @me

EXACT SPOKEN DIALOGUE:
"أنا همام ديك… وهذا ما لا يُقال"

Voice and Delivery: A natural adult male voice, warm, grounded and clear, speaking to one listener in a natural urban Ammani Jordanian Arabic dialect. Do not use generic Levantine Arabic. Do not imitate a Lebanese accent. Do not imitate a Syrian accent. Do not switch to Modern Standard Arabic. Do not exaggerate the dialect. The speaker himself pronounces qaf as a glottal stop in everyday colloquial words, as urban Ammani speakers do; keep this consistent across the clip. Do not change the written spelling. Do not force a hard qaf. Natural Jordanian word linking, conversational rhythm, short pauses only where the meaning requires them. No theatrical acting. No whispering. No robotic delivery. Speak only the supplied dialogue. No added words. No omitted words. No repeated words. No translation. No paraphrasing. Treat punctuation as pacing guidance only. Do not read punctuation aloud.
Performance: Subtle facial expressions, natural blinking, small head movements, restrained hand gestures below the chin, realistic speech-aligned mouth movement. Keep the whole mouth visible at all times.
Camera and Framing: Vertical 9:16. Medium close-up at eye level, exactly matching the reference frame's composition (head in the upper third, microphone entering from frame-right below mouth level). Very slow push-in of no more than 2%, otherwise locked-off.
Identity Lock: Use the exact identity from @me and the provided reference frame. Preserve the real facial structure, natural skin texture, short dark hair with receding temples, connected moustache and goatee with grey hairs in the chin, and the small dark mole above the LEFT corner of the upper lip (viewer's right in a frontal view). Never mirror the image. Never flip the image horizontally. Do not beautify the face. Do not de-age the face. Do not reshape the face. Do not slim the face. Do not replace the person. Do not change the nose. Do not change the jaw. Do not change the eyes. Do not change the mouth.
Wardrobe and Environment: Navy unstructured blazer over a heather warm-grey crew-neck T-shirt. Dark walnut slatted wall, wooden shelves with a few books, warm amber globe lamp in soft bokeh, light walnut desk, black dynamic microphone on a boom arm beside the mouth. The microphone never covers the mouth.
Lighting and Style: Photorealistic cinematic podcast footage. Low-key warm tungsten key light from camera-left, gentle natural shadows, subtle teal-black shadows with amber highlights, shallow depth of field, natural skin texture.
Negative Constraints: No on-screen text. No subtitles. No captions. No titles. No logos. No watermarks. No letters. No numbers. No extra people. No mirrored identity. No facial changes. No obscured mouth. No exaggerated gestures. No sudden camera movement. No cuts. No scene changes. No invented dialogue. No duplicated dialogue. No music. No sound effects.
```


---

## القسم الرابع: جدول التوقيت النهائي

| المقطع | اللقطة | النوع | المقطع بالخطة | اللقطة بالمونتاج | المدة | كلمات | كلام فعلي | توليد | الإجراء | المرجع |
|---|---|---|---|---|---|---|---|---|---|---|
| A01 | A01.1 | بودكاست | 0:00.0–0:16.1 | 0:00.0–0:08.5 | 8.5 | 24 | 7.6 | 10 | إبقاء؛ قص من 10 ث | K_front_a.jpg |
| A01 | A01.2 | بودكاست | 0:00.0–0:16.1 | 0:08.7–0:16.1 | 7.5 | 19 | 6.2 | 10 | إبقاء؛ قص من 10 ث | K_side_a.jpg |
| B01 | B01.1 | موشن | 0:16.1–0:24.0 | 0:16.1–0:24.0 | 7.9 | — | — | 8 | إبقاء | — |
| A02 | A02.1 | بودكاست | 0:24.0–0:33.7 | 0:24.0–0:33.7 | 9.7 | 21 | 7.5 | 10 | إبقاء؛ قص من 10 ث | K_front_b.jpg |
| B02 | B02.1 | موشن | 0:33.7–0:47.5 | 0:33.7–0:40.6 | 6.9 | — | — | 8 | إبقاء | — |
| B02 | B02.2 | موشن | 0:33.7–0:47.5 | 0:40.6–0:47.5 | 6.9 | — | — | 8 | إبقاء | آخر إطار B02.1 |
| B03 | B03.1 | موشن | 0:47.5–0:58.1 | 0:47.5–0:52.8 | 5.3 | — | — | 6 | إبقاء | — |
| B03 | B03.2 | موشن | 0:47.5–0:58.1 | 0:52.8–0:58.1 | 5.3 | — | — | 6 | إبقاء | آخر إطار B03.1 |
| A03 | A03.1 | بودكاست | 0:58.1–1:18.5 | 0:58.1–1:03.9 | 5.8 | 14 | 4.8 | 10 | إبقاء؛ قص من 10 ث (أو أقصر مدة متاحة) | K_front_a.jpg |
| A03 | A03.2 | بودكاست | 0:58.1–1:18.5 | 1:04.1–1:12.0 | 7.9 | 19 | 7.5 | 10 | إبقاء؛ قص من 10 ث | K_side_b.jpg |
| A03 | A03.3 | بودكاست | 0:58.1–1:18.5 | 1:12.2–1:18.5 | 6.2 | 18 | 5.5 | 10 | إبقاء؛ قص من 10 ث | K_front_b.jpg |
| B04 | B04.1 | موشن | 1:18.5–1:23.8 | 1:18.5–1:23.8 | 5.4 | — | — | 6 | إبقاء | — |
| A04 | A04.1 | بودكاست | 1:23.8–1:44.6 | 1:23.8–1:27.9 | 4.1 | 12 | 3.7 | 10 | إبقاء؛ قص من 10 ث (أو أقصر مدة متاحة) | K_front_a.jpg |
| A04 | A04.2 | بودكاست | 1:23.8–1:44.6 | 1:28.1–1:33.8 | 5.7 | 15 | 5.6 | 10 | إبقاء؛ قص من 10 ث (أو أقصر مدة متاحة) | K_side_a.jpg |
| A04 | A04.3 | بودكاست | 1:23.8–1:44.6 | 1:34.9–1:44.6 | 9.7 | 27 | 8.7 | 10 | إبقاء؛ قص من 10 ث | K_side_b.jpg |
| B05 | B05.1 | موشن | 1:44.6–1:51.6 | 1:44.6–1:51.6 | 7.0 | — | — | 8 | إبقاء | — |
| B06 | B06.1 | موشن | 1:51.6–1:58.9 | 1:51.6–1:58.9 | 7.3 | — | — | 8 | إبقاء | — |
| A05 | A05.1 | بودكاست | 1:58.9–2:06.6 | 1:58.9–2:06.6 | 7.7 | 19 | 6.8 | 10 | إبقاء؛ قص من 10 ث | K_side_a.jpg |
| B07 | B07.1 | موشن | 2:06.6–2:22.3 | 2:06.6–2:14.5 | 7.9 | — | — | 8 | إبقاء | — |
| B07 | B07.2 | موشن | 2:06.6–2:22.3 | 2:14.5–2:22.3 | 7.9 | — | — | 8 | إبقاء | آخر إطار B07.1 |
| A06 | A06.1 | بودكاست | 2:22.3–2:26.1 | 2:22.3–2:26.1 | 3.8 | 8 | 3.0 | 10 | إبقاء؛ قص من 10 ث (أو أقصر مدة متاحة) | K_front_b.jpg |
| B08 | B08.1 | موشن | 2:26.1–2:30.6 | 2:26.1–2:30.6 | 4.5 | — | — | 6 | إبقاء | — |
| A07 | A07.1 | بودكاست | 2:30.6–2:34.3 | 2:30.6–2:34.3 | 3.7 | 7 | 2.2 | 10 | إبقاء؛ قص من 10 ث (أو أقصر مدة متاحة) | K_front_a.jpg |
| B09 | B09.1 | موشن | 2:34.3–2:39.4 | 2:34.3–2:39.4 | 5.1 | — | — | 6 | إبقاء | — |
| A08 | A08.1 | بودكاست | 2:39.4–2:53.7 | 2:39.4–2:43.9 | 4.5 | 14 | 4.1 | 10 | إبقاء؛ قص من 10 ث (أو أقصر مدة متاحة) | K_side_b.jpg |
| A08 | A08.2 | بودكاست | 2:39.4–2:53.7 | 2:44.2–2:53.7 | 9.4 | 24 | 8.7 | 10 | إبقاء؛ قص من 10 ث | K_side_a.jpg |
| B10 | B10.1 | موشن | 2:53.7–3:07.4 | 2:53.7–3:00.6 | 6.9 | — | — | 8 | إبقاء | — |
| B10 | B10.2 | موشن | 2:53.7–3:07.4 | 3:00.6–3:07.4 | 6.9 | — | — | 8 | إبقاء | آخر إطار B10.1 |
| A09 | A09.1 | بودكاست | 3:07.4–3:16.6 | 3:07.4–3:16.6 | 9.1 | 25 | 7.8 | 10 | إبقاء؛ قص من 10 ث | K_front_b.jpg |
| B11 | B11.1 | موشن | 3:16.6–3:21.1 | 3:16.6–3:21.1 | 4.5 | — | — | 6 | إبقاء | — |
| A10 | A10.1 | بودكاست | 3:21.1–3:34.9 | 3:21.1–3:28.6 | 7.5 | 19 | 6.7 | 10 | إبقاء؛ قص من 10 ث | K_front_a.jpg |
| A10 | A10.2 | بودكاست | 3:21.1–3:34.9 | 3:30.1–3:34.9 | 4.8 | 13 | 4.5 | 10 | إبقاء؛ قص من 10 ث (أو أقصر مدة متاحة) | K_side_b.jpg |
| B12 | B12.1 | موشن | 3:34.9–3:37.5 | 3:34.9–3:37.5 | 2.6 | — | — | 6 | إبقاء | — |
| A11 | A11.1 | بودكاست | 3:37.5–4:00.2 | 3:37.5–3:41.2 | 3.6 | 9 | 3.2 | 10 | إبقاء؛ قص من 10 ث (أو أقصر مدة متاحة) | K_front_b.jpg |
| A11 | A11.2 | بودكاست | 3:37.5–4:00.2 | 3:41.5–3:47.7 | 6.2 | 16 | 6.1 | 10 | إبقاء؛ قص من 10 ث | K_side_a.jpg |
| A11 | A11.3 | بودكاست | 3:37.5–4:00.2 | 3:48.0–3:53.8 | 5.8 | 13 | 5.8 | 10 | إبقاء؛ قص من 10 ث (أو أقصر مدة متاحة) | K_front_a.jpg |
| A11 | A11.4 | بودكاست | 3:37.5–4:00.2 | 3:55.3–4:00.2 | 4.9 | 15 | 4.7 | 10 | إبقاء؛ قص من 10 ث (أو أقصر مدة متاحة) | K_side_b.jpg |
| B13 | B13.1 | موشن | 4:00.2–4:07.3 | 4:00.2–4:07.3 | 7.2 | — | — | 8 | إبقاء | — |
| A12 | A12.1 | بودكاست | 4:07.3–4:29.6 | 4:07.3–4:13.5 | 6.1 | 17 | 5.7 | 10 | إبقاء؛ قص من 10 ث | K_front_b.jpg |
| A12 | A12.2 | بودكاست | 4:07.3–4:29.6 | 4:13.6–4:22.1 | 8.4 | 20 | 6.6 | 10 | إبقاء؛ قص من 10 ث | K_side_a.jpg |
| A12 | A12.3 | بودكاست | 4:07.3–4:29.6 | 4:22.3–4:29.6 | 7.3 | 19 | 6.6 | 10 | إبقاء؛ قص من 10 ث | K_side_b.jpg |
| B14 | B14.1 | موشن | 4:29.6–4:44.8 | 4:29.6–4:37.2 | 7.6 | — | — | 8 | إبقاء | — |
| B14 | B14.2 | موشن | 4:29.6–4:44.8 | 4:37.2–4:44.8 | 7.6 | — | — | 8 | إبقاء | آخر إطار B14.1 |
| B15 | B15.1 | موشن | 4:44.8–4:49.6 | 4:44.8–4:49.6 | 4.8 | — | — | 6 | إبقاء | — |
| A13 | A13.1 | بودكاست | 4:49.6–4:53.1 | 4:49.6–4:53.1 | 3.5 | 7 | 2.7 | 10 | إبقاء؛ قص من 10 ث (أو أقصر مدة متاحة) | K_front_a.jpg |

**فحص التسلسل:**

- A01.1 → A01.2: فجوة 0.16 ث (صمت بين جملتين؛ تُغطّى بتمديد A01.1 في المونتاج)
- A03.1 → A03.2: فجوة 0.23 ث (صمت بين جملتين؛ تُغطّى بتمديد A03.1 في المونتاج)
- A03.2 → A03.3: فجوة 0.21 ث (صمت بين جملتين؛ تُغطّى بتمديد A03.2 في المونتاج)
- A04.1 → A04.2: فجوة 0.22 ث (صمت بين جملتين؛ تُغطّى بتمديد A04.1 في المونتاج)
- A04.2 → A04.3: فجوة 1.06 ث (صمت بين جملتين؛ تُغطّى بتمديد A04.2 في المونتاج)
- A08.1 → A08.2: فجوة 0.29 ث (صمت بين جملتين؛ تُغطّى بتمديد A08.1 في المونتاج)
- A10.1 → A10.2: فجوة 1.49 ث (صمت بين جملتين؛ تُغطّى بتمديد A10.1 في المونتاج)
- A11.1 → A11.2: فجوة 0.35 ث (صمت بين جملتين؛ تُغطّى بتمديد A11.1 في المونتاج)
- A11.2 → A11.3: فجوة 0.25 ث (صمت بين جملتين؛ تُغطّى بتمديد A11.2 في المونتاج)
- A11.3 → A11.4: فجوة 1.42 ث (صمت بين جملتين؛ تُغطّى بتمديد A11.3 في المونتاج)
- A12.1 → A12.2: فجوة 0.17 ث (صمت بين جملتين؛ تُغطّى بتمديد A12.1 في المونتاج)
- A12.2 → A12.3: فجوة 0.21 ث (صمت بين جملتين؛ تُغطّى بتمديد A12.2 في المونتاج)


الفجوات كلها صمت بين جمل (أقل من ثانية تقريباً) والصوت مستمر تحتها، فما في إشي بينقص من الكلام.

---

## القسم الخامس: قرارات بتحتاجك

1. **الجمل المعلّمة «[؟]»** (هل هي سؤال؟). الترقيم بالأوامر حالياً بدون علامة سؤال. هاد بيأثر على نبرة الصوت بالمسار ب بس، وما إله أي أثر بالمسار أ:
   - 1:24.1: «مش مطلوب منك تبرّر للناس… ولا تعطي كل شخص فرصة بلا حدود» — سؤال؟ نعم / لا
   - 1:28.1: «بس يمكن المطلوب تضل واعي لحدود اللي شفته… وما تبني عليه أفكار وتفسيرات وتحوّله لحقيقة» — سؤال؟ نعم / لا
   - 2:06.6: «يمكن تكتشف إنك ما كنت دايماً عصبي… وإنك ما كنت دايماً تخاف تثق» — سؤال؟ نعم / لا
   - 3:26.2: «ونراجع رأينا من غير ما نخسر كرامتنا» — سؤال؟ نعم / لا
   - 3:41.5: «وهل إحنا متمسّكين بقناعاتنا لأنّا لسّه مؤمنين فيها؟ ولا لأنّا خايفين نكتشف إنها ما عادت إلنا» — سؤال؟ نعم / لا
   - 4:07.7: «وعشان هيك «ما لا يُقال» بالنسبة إلي مش مساحة نحكي فيها عن الأشياء اللي ما بنحكيها بس» — سؤال؟ نعم / لا
   - 4:13.6: «هي كمان مساحة نراجع فيها الأشياء اللي طول عمرنا مفكّرين إنّا فاهمينها» — سؤال؟ نعم / لا
2. **B12:** موافق على «ظل مقابل انعكاسه» بدل «رجلين متطابقين»؟
3. **ديكور الزاوية الجانبية:** اللمبة أسطوانية بالجانبية وكروية بالأمامية. بتقبل الفرق (زاوية تانية من الغرفة)، ولا منعدّل الصور الأمامية أو الجانبية لنفس اللمبة؟
4. **المسار:** أ (صوتك + مزامنة) ولا ب (صوت Flow)؟ أنا بنصح بـ أ.
5. **طول الأمر:** نجرّب النسخة الكاملة هون، ولا المختصرة (`FLOW_SHOTS_OMNI.md`) مع الاعتماد على بطاقات الوكيل؟
6. **مدد التوليد الأقصر:** شوف إذا Omni Flash بيعطي خيار أقل من 10 ث.

---

## القسم الخامس-ب: Jordanian Pronunciation Test Bank

الكتابة بتضل متل ما هي بالتفريغ (القاف مكتوبة قاف). العمود 3 مأخوذ من كلامك أنت («بلفظ القاف همزة»)، مش من تحليل صوتي، فبيحتاج تأكيدك. الأعمدة 4–8 بتنعبّى بعد ما تسمع التوليد، وما في ولا نتيجة مخترعة.

| # | الكلمة | الجملة (اللقطة) | نطق همّام المفضّل | نطق النموذج فعلياً | نوع الخطأ | الصيغة المختبرة | النتيجة | الصيغة المعتمدة |
|---|---|---|---|---|---|---|---|---|
| 1 | قاعد | في يوم وأنا قاعد بفكّر بموقف صار معي من فترة… (A01.1) | همزة (حسب كلامك) | بحاجة إلى اختبار | — | قاعد | — | — |
| 2 | بموقف | في يوم وأنا قاعد بفكّر بموقف صار معي من فترة… موقف… لو سأل… (A01.1) | همزة (حسب كلامك) | بحاجة إلى اختبار | — | بموقف | — | — |
| 3 | موقف | في يوم وأنا قاعد بفكّر بموقف صار معي من فترة… موقف… لو سأل… (A01.1) | همزة (حسب كلامك) | بحاجة إلى اختبار | — | موقف | — | — |
| 4 | وقتها | …من فترة… موقف… لو سألتني عنه وقتها، كنت رح أحكيلك إنّي فاهمه مني… (A01.1) | همزة (حسب كلامك) | بحاجة إلى اختبار | — | وقتها | — | — |
| 5 | رح | …وقف… لو سألتني عنه وقتها، كنت رح أحكيلك إنّي فاهمه منيح… فاهم… (A01.1) | عامي أردني طبيعي | بحاجة إلى اختبار | — | رح | — | — |
| 6 | شو | …أحكيلك إنّي فاهمه منيح… فاهم شو صار… (A01.1) | عامي أردني طبيعي | بحاجة إلى اختبار | — | شو | — | — |
| 7 | حق | وليش صار… ومين كان معه حق، ومين كان لازم يتصرّف بطريقة… (A01.2) | همزة (حسب كلامك) | بحاجة إلى اختبار | — | حق | — | — |
| 8 | بطريقة | …معه حق، ومين كان لازم يتصرّف بطريقة تانية… كنت مرتّب القصة براسي… (A01.2) | همزة (حسب كلامك) | بحاجة إلى اختبار | — | بطريقة | — | — |
| 9 | القصة | …تصرّف بطريقة تانية… كنت مرتّب القصة براسي… من أولها لآخرها… (A01.2) | همزة (حسب كلامك) | بحاجة إلى اختبار | — | القصة | — | — |
| 10 | وقف | الغريب إنه السؤال ما وقف عند الموقف نفسه… بلّش ياخدني… (A02.1) | همزة (حسب كلامك) | بحاجة إلى اختبار | — | وقف | — | — |
| 11 | الموقف | الغريب إنه السؤال ما وقف عند الموقف نفسه… بلّش ياخدني لمواقف قديم… (A02.1) | همزة (حسب كلامك) | بحاجة إلى اختبار | — | الموقف | — | — |
| 12 | لمواقف | …عند الموقف نفسه… بلّش ياخدني لمواقف قديمة… وأشخاص اختلفت معهم، وأ… (A02.1) | همزة (حسب كلامك) | بحاجة إلى اختبار | — | لمواقف | — | — |
| 13 | قديمة | …موقف نفسه… بلّش ياخدني لمواقف قديمة… وأشخاص اختلفت معهم، وأشياء ك… (A02.1) | همزة (حسب كلامك) | بحاجة إلى اختبار | — | قديمة | — | — |
| 14 | مقتنع | …أشخاص اختلفت معهم، وأشياء كنت مقتنع فيها من سنين… (A02.1) | همزة (حسب كلامك) | بحاجة إلى اختبار | — | مقتنع | — | — |
| 15 | قابلنا | …ي الفكرة بشغلة تانية… كم مرّة قابلنا شخص وطلعنا من عنده بانطباع مع… (A03.1) | همزة (حسب كلامك) | بحاجة إلى اختبار | — | قابلنا | — | — |
| 16 | الحقيقة | …مسؤوليته… بس إحنا ما منعرف شو الحقيقة حتى نحكم عليه… (A03.3) | همزة (حسب كلامك) | بحاجة إلى اختبار | — | الحقيقة | — | — |
| 17 | مش | مش مطلوب منك تبرّر للناس… ولا تع… (A04.1) | عامي أردني طبيعي | بحاجة إلى اختبار | — | مش | — | — |
| 18 | لحقيقة | …ي عليه أفكار وتفسيرات وتحوّله لحقيقة… (A04.2) | همزة (حسب كلامك) | بحاجة إلى اختبار | — | لحقيقة | — | — |
| 19 | استوقفني | واللي استوقفني أكتر إنه نفس الإشي بيصير معنا… (A04.3) | همزة (حسب كلامك) | بحاجة إلى اختبار | — | استوقفني | — | — |
| 20 | منحاول | …س الإشي بيصير معنا إحنا… إحنا منحاول نفهم الناس… بس هل بنحاول نفهم… (A04.3) | عامي أردني طبيعي | بحاجة إلى اختبار | — | منحاول | — | — |
| 21 | القدر | …بس هل بنحاول نفهم حالنا بنفس القدر؟ ولا تعوّدنا نحكي عن حالنا بج… (A04.3) | همزة (حسب كلامك) | بحاجة إلى اختبار | — | القدر | — | — |
| 22 | بهالطريقة | شو اللي صار وخلّاني أتصرّف بهالطريقة؟ وهل هاي فعلاً طبيعتي؟ ولا طر… (A05.1) | همزة (حسب كلامك) | بحاجة إلى اختبار | — | بهالطريقة | — | — |
| 23 | طريقة | …و اللي صار وخلّاني أتصرّف بهالطريقة؟ وهل هاي فعلاً طبيعتي؟ ولا طر… (A05.1) | همزة (حسب كلامك) | بحاجة إلى اختبار | — | طريقة | — | — |
| 24 | بوقت | …اً طبيعتي؟ ولا طريقة تعلّمتها بوقت كنت محتاج فيها أحمي حالي؟… (A05.1) | همزة (حسب كلامك) | بحاجة إلى اختبار | — | بوقت | — | — |
| 25 | إشي | لأنه مش كل إشي تعوّدنا عليه بناسبنا… (A07.1) | عامي أردني طبيعي | بحاجة إلى اختبار | — | إشي | — | — |
| 26 | حقيقي | …ل اختلاف سببه سوء فهم… في ظلم حقيقي… وفي أخطاء… وفي تصرّفات لازم… (A09.1) | همزة (حسب كلامك) | بحاجة إلى اختبار | — | حقيقي | — | — |
| 27 | نوقف | … وفي أخطاء… وفي تصرّفات لازم نوقف عندها… (A09.1) | همزة (حسب كلامك) | بحاجة إلى اختبار | — | نوقف | — | — |
| 28 | نوافقه | وممكن نفهم الإنسان من غير ما نوافقه… ونحبّه ونحط حدود بنفس الوقت… (A10.1) | همزة (حسب كلامك) | بحاجة إلى اختبار | — | نوافقه | — | — |
| 29 | الوقت | …نوافقه… ونحبّه ونحط حدود بنفس الوقت… ونراجع رأينا من غير ما نخسر… (A10.1) | همزة (حسب كلامك) | بحاجة إلى اختبار | — | الوقت | — | — |
| 30 | هيك | وعشان هيك صرت أشوف إنه أصعب الحوارات مش… (A10.2) | عامي أردني طبيعي | بحاجة إلى اختبار | — | هيك | — | — |
| 31 | بقناعاتنا | وهل إحنا متمسّكين بقناعاتنا لأنّا لسّه مؤمنين فيها؟ ولا ل… (A11.2) | همزة (حسب كلامك) | بحاجة إلى اختبار | — | بقناعاتنا | — | — |
| 32 | نلاقي | …هم الناس فعلاً؟ ولا بس بنحاول نلاقي تفسير يخلّينا مرتاحين… (A11.3) | همزة (حسب كلامك) | بحاجة إلى اختبار | — | نلاقي | — | — |
| 33 | وقبل | …عمرنا مفكّرين إنّا فاهمينها… وقبل ما تروح… خلّيني أتركك مع فكرة… (A12.2) | همزة (حسب كلامك) | بحاجة إلى اختبار | — | وقبل | — | — |
| 34 | قصة | يمكن في قصة أو انطباع بحياتك… لليوم بتحكي… (A12.3) | همزة (حسب كلامك) | بحاجة إلى اختبار | — | قصة | — | — |
| 35 | الطريقة | …اع بحياتك… لليوم بتحكيها بنفس الطريقة، عن شخص… أو عن موقف… أو حتى ع… (A12.3) | همزة (حسب كلامك) | بحاجة إلى اختبار | — | الطريقة | — | — |

«يُقال» (اسم البودكاست) مستثناة: فصحى بالقاف.


### عينات اختبار اللهجة الإلزامية (من مكتبة اللهجة — مش من الحلقة)

هالجمل للاختبار بس، وما بتدخل الحلقة. ولّدها بأمر A08.1 نفسه بعد ما تبدّل الحوار، والإطار الأول K_front_a.jpg. هي بتقيس النموذج، مش كلامك.

- **القاف:** «قلتله: بتقدر تراجع قرارك، حتى لو كنت مقتنع فيه من زمان؟»
- **المفردات الأردنية:** «خلّيني أحكيلك شغلة. مش كل إشي بنسمعه بنفهمه، ومش كل تفسير بنوصل إله بكون صحيح.»
- **الأسلوب التأملي:** «يمكن المشكلة مش باللي صار… يمكن بالطريقة اللي فهمنا فيها اللي صار.»

اسمعها مقابل تسجيلك الحقيقي. ارفض أي عينة فيها نبرة سورية أو لبنانية، أو قاف بتتذبذب بين همزة وقاف بنفس المقطع، حتى لو الصوت واضح.

---

## القسم السادس: اختبار الصوت (3 لقطات)

ولّد هالثلاث لقطات بنفس الأوامر اللي بالقسم الثالث، واسمع كل وحدة مقابل مقطع تسجيلك بنفس الاسم من `lipsync_audio/`. ولا تعتبر النطق ناجح قبل ما تسمعه.

**كلام تأملي هادئ — A08.1** (4.5 ث): «بس التغيير كمان مش إنك ترفض حالك… أو تعتبر كل اللي كنت عليه غلط»

**أسئلة متتابعة — A05.1** (7.7 ث): «شو اللي صار وخلّاني أتصرّف بهالطريقة؟ وهل هاي فعلاً طبيعتي؟ ولا طريقة تعلّمتها بوقت كنت محتاج فيها أحمي حالي؟»

**مفردات أردنية — A07.1** (3.7 ث): «لأنه مش كل إشي تعوّدنا عليه بناسبنا»


**شو تسمع بكل لقطة:**
| البند | ناجح | فاشل |
|---|---|---|
| اللهجة | عمّانية: «مش»، «إشي»، «هيك» طبيعية | شامي، فصحى، مصري، خليجي |
| الحروف | واضحة ومتصلة | مقاطع مقطّعة أو آلية |
| الإيقاع | قريب من تسجيلك (المدة ± 1 ث) | أسرع أو أبطأ بكثير |
| الوقفات | عند «…» بس | بعد كل كلمة، أو ما في ولا وقفة |
| الأسئلة | النبرة بترتفع بآخر السؤال بشكل طبيعي | نبرة إخبارية أو مسرحية |
| الكلمات | نفس النص بالضبط | كلمة زايدة، ناقصة، مكررة، أو مترجمة |
| الفم والوجه | الفم ظاهر، والشامة على يمين الشاشة | المايك أو الإيد بتغطي الفم، أو الصورة مقلوبة |

**بالمسار أ** بيكفي البند الأخير، لأنه الفم رح ينعاد بالمزامنة.

