# لقطات البودكاست الواقعية (A-roll)

## الخطوة 1: صور الاستوديو (Gemini / Google Flow / Nano Banana)
ارفع معها: `refs/hammam_ref_portrait.jpg` + `refs/hammam_ref_mole.jpg`. المقاس 9:16.

### زاوية 1: متوسطة أمامية (الأساسية)
```
Using the attached references:
- Reference 1 is the man's identity: exact face shape, eyes, eyebrows, nose, short dark hair with receding temples, trimmed beard and moustache with goatee.
- Reference 2 shows the small dark mole above the left corner of his upper lip (image-right side when he faces camera) and his beard texture with grey hairs; keep them.

Create a vertical 9:16 photorealistic still of this same man recording a podcast in a dark, intimate studio. He sits at a walnut desk, a black Shure SM7B microphone on a boom arm in front of him at chin height, slightly to the side so his mouth stays fully visible. He looks just off-camera, calm and thoughtful, mouth relaxed and closed. He wears a black t-shirt under a charcoal blazer. Behind him: dark acoustic panels, one warm amber practical lamp, a shelf with a few books, soft teal-black shadows, gentle haze. Medium close-up from chest up, 50mm lens, shallow depth of field, cinematic, natural skin texture, not beautified. Head and shoulders in the middle of the frame, empty dark space above his head. No text, no logos.
```

### زاوية 2: جانبية 3/4 أقرب
```
[same reference block]
Same studio, same outfit and lighting. A closer three-quarter side angle from his left, 85mm lens: face, beard and the microphone in frame, background falling into soft dark bokeh with one warm lamp glow. He is mid-thought, eyes lowered slightly. Mouth fully visible, not covered by the microphone. Vertical 9:16, cinematic, natural skin, no text.
```

### زاوية 3: واسعة (للافتتاح أو الانتقال)
```
[same reference block]
Same studio, wide vertical shot: the man small in the lower half at the desk with the microphone, headphones around his neck, the whole room visible: acoustic panels, warm lamp, a subtle "ON AIR" light glowing red but out of focus, haze. Cinematic, moody, teal-black and amber. No readable text.
```
**افحص في كل صورة:** الشامة فوق يسار الشفة (يمين الصورة)، والسكسوكة، وأن المايك لا يغطي فمك.

## الخطوة 2: تحريك الصورة على صوتك (مزامنة الشفاه)
الملفات الصوتية جاهزة في هذا المجلد:

| الملف | المدة | الكلام | الزاوية المقترحة |
|---|---|---|---|
| `A1_hook.wav` | 11.5 ث | كم مرّة قابلنا شخص… ما شفنا منه غير لحظة | 1 (أمامية) |
| `A2_self.wav` | 6.7 ث | احنا منحاول نفهم الناس… بجمل جاهزة | 2 (جانبية) |
| `A3_nature.wav` | 7.6 ث | شو اللي صار… أحمي حالي؟ | 1 (أمامية) |
| `A4_signature.wav` | 3.1 ث | أنا همام ديك… وهذا ما لا يُقال | 1 أو 3 |

### الأدوات التي تقبل صوتك الحقيقي + صورة
- **HeyGen، Avatar IV:** Photo Avatar ← ارفع صورة الزاوية ← Upload audio (وليس كتابة نص). أفضل جودة لحركة الرأس والتعابير.
- **Hedra، Character-3:** صورة + ملف صوت ← Generate. جيد جداً للكلام الطبيعي.
- **CapCut / Dreamina، OmniHuman:** صورة + صوت. نفس النموذج المتاح في ElevenLabs.
- **ElevenLabs، OmniHuman 1.5:** بعد شحن الرصيد، ارفع الصوت والصورة إلى مساحة العمل وأنا أكمل.

**الإعدادات:** مقاس 9:16، دقة 1080p، وفي خانة التوجيه (إن وُجدت):
`Calm, reflective podcast delivery, subtle natural head movement, occasional slow blink, warm and sincere, no exaggerated gestures.`

## الخطوة 3
أرسل المقاطع الأربعة هنا (أو ضعها في Google Drive)، فأدمجها مع مقاطع الموشن جرافيك وأُخرج النسخة النهائية.

## عن Canva
- **ما لا يستطيعه:** حسب علمي، أدوات Canva لا تحرّك صورتك على ملف صوتك أنت. ميزة توليد الفيديو فيه تصنع صوتها الخاص، وتطبيقات الأفاتار داخله (مثل HeyGen أو D-ID) تعتمد غالباً على نص يُقرأ بصوت آلي. تأكد بنفسك إن كان التطبيق يقبل رفع ملف صوت.
- **ما يفيدنا فيه:** حفظ الهوية (Brand Kit: الألوان والخطوط والشعار)، وقوالب الأغلفة والمنشورات، وتعديلات سريعة على الفيديو النهائي إن أحببت.
