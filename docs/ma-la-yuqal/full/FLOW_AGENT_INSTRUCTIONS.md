# تعليمات الوكيل في Google Flow (Agent instructions)

كل بطاقة: العنوان، ثم النص (انسخه كما هو). صور الهوية بتنرفق على البطاقة 4، ومرجع الحركة على البطاقة 5.
هذه التعليمات تنطبق على كل توليد، لذلك كل بطاقة تفرّق بين لقطات البودكاست (@me) ولقطات الموشن.
كل الممنوعات مكتوبة كجمل منفصلة تبدأ بـ No أو Do not أو Never.

## 1. لهجة عمّانية — Ammani Jordanian Dialect Lock
```
Speak in natural urban Ammani Jordanian Arabic. Match the pronunciation patterns of the supplied voice reference whenever one is available. Preserve the exact colloquial wording written in the prompt. Do not convert the dialogue into Modern Standard Arabic. Do not rewrite the dialogue into another Levantine dialect. Never use a Lebanese accent. Never use a Syrian accent. Never use an Egyptian accent. Never use a Gulf accent. Critical pronunciation rule: do not pronounce the written letter ق as the formal Modern Standard Arabic /q/. Pronounce it as a glottal stop /ʔ/, like the brief catch in the middle of the English expression “uh-oh”. Do not turn it into a deep back-of-the-throat /q/. Keep each word's pronunciation consistent across the clip. If the pronunciation cannot be rendered reliably from the written text, prioritise the colloquial Ammani pronunciation over formal Arabic pronunciation. Keep the original spelling of words such as قلتله، بتقدر، قاعد، قرار، الحقيقة، قناعة. Do not respell words to force a pronunciation. Use natural Ammani rhythm, connected speech and everyday Jordanian intonation. No exaggerated dialect imitation. No theatrical pronunciation. No artificial over-enunciation.
```

## 2. الحوار الحرفي — Exact Dialogue Preservation
```
The dialogue explicitly marked as spoken text is the only permitted spoken content. Preserve its exact wording, word order and intended pauses. Do not add words. Do not omit words. Do not merge adjacent phrases. Do not invent connecting words. Do not repeat a word accidentally. Do not complete an unfinished sentence. Do not improvise. A repeated word in the dialogue is intentional only when the prompt says so. The generated audio is temporary and will be replaced by the host's real recording during editing. No music. No sound effects. No ambience. No additional voices.
```

## 3. حركة الفم — Mouth Movement
```
Flow cannot lip-sync to an uploaded audio file. Do not try to lip-sync to an uploaded file. When @me speaks, generate restrained, believable mouth movement that broadly follows the written Arabic dialogue. Keep the lips visible and the jaw movement natural. Facial expression follows a calm, reflective, sincere tone. No exaggerated mouth opening. No chewing-like movement. No excessive smiling. No mouth movement during long pauses. No exaggerated gestures. Do not assume exact phoneme-level lip synchronization.
```

## 4. الهوية — Identity Lock  (أرفق صور الهوية هون)
```
Use the attached identity photos as the only source for the host's face. Use them for the face only. Do not use the identity photos as a reference for body movement. Do not replace these photos. Do not reorder these photos. Keep exactly: short dark hair with receding temples; connected Van Dyke beard (moustache + goatee + soul patch) with a few grey hairs in the chin; a small dark mole above the LEFT corner of his upper lip, which appears on the viewer's RIGHT in a front shot. Never mirror the image. Never flip the image horizontally. The mole never moves. The mole never disappears. The mole never changes side. Do not beautify the face. Do not de-age the face. Do not slim the face. Do not change the skin tone. Mouth always visible. The microphone never covers the mouth. A hand never covers the mouth.
```

## 5. الحركة والأداء — Motion & Performance  (أرفق مرجع الحركة هون)
```
Use the attached motion reference only for body language: seated at a desk, small natural head tilts, slow blinks, occasional light hand gestures below the chin, leaning slightly toward the microphone. Do not use the motion reference to change facial features. Do not replace this reference. Calm and grounded. No fast movements. No standing up. No walking. No looking around the room. Eyes mostly toward the listener slightly off-camera. Look into the lens only when the prompt asks.
```

## 6. الإطار الأول — First Frame Role
```
When a prompt names a first frame (a K_*.jpg keyframe or the last frame of a previous shot), it defines the starting composition, camera angle, wardrobe, set and lighting of the shot. The identity photos still define the face. The motion reference still defines body language only. Do not mix up these roles.
```

## 7. الملابس والديكور — Wardrobe & Set
```
Unless a prompt says otherwise, the host wears a navy-blue unstructured wool blazer over a heather warm-grey crew-neck t-shirt. Studio: dark walnut vertical-slat wall, wooden shelves with a few books, a warm amber Edison lamp glowing in soft bokeh exactly as it appears in the first frame, light walnut desk, black dynamic microphone on a boom arm placed slightly to the side of his mouth. Keep wardrobe, set layout, microphone position and lamp identical to the first frame in every podcast shot.
```

## 8. الكاميرا والإضاءة — Camera & Light
```
Vertical 9:16, cinematic, photorealistic, 24fps feel, shallow depth of field. Moody low-key lighting: soft warm tungsten key, gentle falloff into shadow, amber practical glow behind, with the light direction of the first frame. Grade: teal-black shadows, warm amber highlights, slightly desaturated, light film grain. Camera moves are slow and subtle only (2–5% push-in, gentle pan, or locked-off). No whip pans. No camera shake. No fast zoom. No Dutch angles. No neon colours. No saturated colours.
```

## 9. الاستمرارية — Shot-to-Shot Continuity Lock
```
If the shot starts from a provided first frame, preserve the established pose, facial identity, wardrobe, lighting, background, microphone placement and camera angle at the beginning of the shot. Do not introduce a new pose in the first moment. Do not introduce a new camera angle in the first moment. Do not introduce a new lighting setup in the first moment. If no first frame is provided, use the identity photos and the studio description to reproduce the established setup as closely as possible. Keep the host in the same seat and position across all podcast shots.
```

## 10. لقطات الموشن — B-roll Metaphors
```
If a prompt does not mention @me, it is a B-roll metaphor shot. Do not insert the host. Do not insert any person unless the prompt describes one. Show silhouettes and hands only when the prompt asks. Same warm amber and teal-black palette and slow elegant motion as the podcast shots.
```

## 11. ممنوعات عامة — Output Rules
```
No on-screen text. No captions. No subtitles. No titles. No logos. No watermarks. No letters. No numbers. Arabic captions are added later in the edit. No split screens. No picture-in-picture. No extra people in podcast shots. Ignore filler quality words such as 8k or masterpiece.
```

## ملاحظات
- **القاف:** البطاقة 1 بتقول إنك بتلفظ القاف همزة بالكلام اليومي، لأنك قلتلي هيك. الملاحظات اللي وصلتك بتنصح ما نعطي قاعدة عامة. إذا في كلمات بتلفظها قاف (مثلاً «قرار» أو «قناعة»)، بنحطها بالبطاقة بالاسم.
- **الصوت النهائي:** هاي البطاقات ما بتنسخ صوتك. بتنظّم الصوت المؤقت والأداء اللي بالصورة بس. الصوت النهائي تسجيلك، وحركة الفم الدقيقة بتيجي من أداة المزامنة.
