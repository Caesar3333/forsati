# قفل الستايل: استوديو «ما لا يُقال»

المرجع: `refs/style/studio_front.jpg` (أمامية) و`refs/style/studio_side.jpg` (جانبية).

## العناصر الثلاثة القابلة للتبديل
كل أمر مبني من ثلاث خانات، والباقي ثابت:

| الخانة | القيمة الحالية | كيف تغيّرها |
|---|---|---|
| `[FACE: …]` | الرجل في الصورة المرجعية `{REF_ID}` | ضع معرّفاً جديداً للوجه، أو ارفع صورة جديدة كـ Ingredient |
| `[WARDROBE: …]` | a navy-blue unstructured wool blazer over a heather warm-grey crew-neck t-shirt | استبدل النص بين القوسين في كل الأوامر دفعة واحدة |
| `SET` | الاستوديو أدناه | لا يتغير، وهو هوية البرنامج |

## الاستوديو الثابت (لا تعدّله)
```
warm, intimate podcast studio: dark walnut vertical-slat acoustic wall, wooden shelves with a few books, an amber glass globe lamp with a glowing Edison filament, light walnut desk in the foreground, black dynamic podcast microphone on a boom arm at chin height beside his mouth (never covering it). Lighting: soft warm key light from camera-left, gentle falloff into shadow, amber practical glow, warm walnut tones with deep navy, natural skin, shallow depth of field (f/2), fine film grain, photographic realism.
```

## الملامح الثابتة (تبقى حتى لو تغيّر الوجه المرجعي)
المواصفات الكاملة في `refs/IDENTITY_SPEC.md`. النسخة المختصرة للأوامر:
```
Keep his exact identity from the reference (unmirrored): oval, moderately long face with natural full cheeks, medium-defined jaw, rounded chin; broad, fairly high forehead with natural recession at both temples; short black hair, slightly wavy on top, light taper on the sides with a few grey hairs; thick, dark, broad, almost straight eyebrows with a slight outer arch; almond-shaped dark-brown eyes with slightly heavy upper lids and a calm gaze; straight, medium-width, slightly prominent nose with a rounded tip; fuller lower lip; connected Van Dyke beard — full defined moustache joined to a dense chin beard with a soul patch, lighter tapered stubble on the cheeks and jaw, scattered grey hairs in the chin beard; ONE small dark round mole directly above the LEFT corner of his upper lip, above the left end of the moustache (it appears on the viewer's RIGHT in a front shot) — never remove, move, resize or mirror it; warm olive / medium-tan skin with natural pores, not beautified, no smoothing, no symmetry correction. Athletic-medium build, broad straight shoulders, watch on the left wrist.
```

---

## أمر واحد لتغيير اللبس في لقطة موجودة (وضع التعديل في Flow)
```
Edit this shot. Change ONLY his clothes to: [NEW WARDROBE]. Keep exactly the same face, beard, goatee and the mole above the left corner of his upper lip, the same pose, hand gestures, lip movement, camera angle, framing, studio, microphone, lamp, lighting and timing. Match the original seamlessly.
```
**بدائل جاهزة للبس** (انسخ واحداً مكان `[NEW WARDROBE]`):
- `a black crew-neck t-shirt under a charcoal blazer`
- `a dark charcoal turtleneck under a camel blazer`
- `a deep-olive overshirt over a white t-shirt`
- `a black knit polo shirt, no jacket`

## أمر واحد لتغيير الوجه مع الحفاظ على كل شيء
```
Edit this shot. Replace the person's face and identity with the man in reference [NEW_REF_ID], keeping his own beard, goatee and facial features exactly as in that reference. Keep everything else identical: clothes, pose, gestures, lip movement, camera, studio, microphone, lamp, lighting and timing.
```
**تنبيه:** إذا تغيّر الوجه، فقرة الملامح الثابتة أعلاه تصف ملامحك أنت. عدّلها لتطابق الوجه الجديد، وإلا سيخلط النموذج بين الاثنين.

## صورة أساس جديدة للاستوديو (للبدء من لبس آخر)
```
Using the attached references: reference 1 is the man's identity (face, beard, goatee, the mole above the left corner of his upper lip); references 2–3 are the studio style.
Create a vertical 9:16 photorealistic still of this same man [WARDROBE: …] seated at a light walnut desk in the same studio: dark walnut vertical-slat acoustic wall, wooden shelves with a few books, an amber glass globe Edison lamp. A black dynamic podcast microphone on a boom arm at chin height beside his mouth, not covering it. Front medium close-up, eye level, 50mm, soft warm key light from camera-left, shallow depth of field, natural skin texture, not beautified. Calm, thoughtful expression, mid-sentence, one hand in a relaxed open gesture. No text, no logos.
```
