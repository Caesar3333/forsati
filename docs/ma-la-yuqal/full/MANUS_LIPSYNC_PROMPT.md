# أمر Manus — حلقة «ما لا يُقال» كاملة من الصوت الحقيقي مع مزامنة الشفايف

انسخ كل اللي تحت الخط لـ Manus، وارفق الملفات المذكورة بالقسم 2.

---

You are a senior video producer and editor. Build the complete vertical episode «ما لا يُقال» (Arabic podcast by Hammam Deek) from **his real recorded voice**. Generate **new** footage of him speaking at a podcast microphone, **lip-synced to that voice**, plus cinematic B-roll, then edit everything into one finished video.

## 1. The three non-negotiable rules
1. **The voice is the master.** Use the attached `voice_full_-14LUFS.mp3` exactly as it is: 293.18 s, already mastered to −14 LUFS. Do not re-record it. Do not clone it. Do not regenerate it. Do not shorten it. Do not speed it up. Do not denoise it. Do not re-order it. The finished video's voice must be this file, sample-aligned (0 ms offset).
2. **Attached images and videos are references only.** Use them to learn the face, the studio, the lighting, the framing and the body language. Use them as identity or style conditioning for the generators. Never place an attached image or video on the final timeline. No stills with pan or zoom. No attached clip reused as footage. No crop of an attached file. Every frame of the final video must come from footage you generated in this job.
3. **Lip-sync comes from the audio.** Every podcast shot is driven by the slice of the real voice for that shot. Mouth, jaw, head and breathing follow that audio. Do not drive the mouth from text. Do not use text-to-speech anywhere, even as a temporary track.

## 2. Attached files and what each one is for
| File | Role | Use it how |
|---|---|---|
| `voice_full_-14LUFS.mp3` | **Master audio** | The only voice in the final video |
| `lipsync_audio.zip` | 25 audio slices + `manifest.json` | One slice per podcast shot, cut from the master at the exact times in section 5. Drive each shot's lip-sync with its slice |
| `subtitles_full.srt` | 152 Arabic caption cards, timed to the master | Burned-in captions (section 7). Do not retime or rewrite them |
| `hammam_ref_portrait.jpg`, `hammam_ref_mole.jpg` | **Identity reference** | Face conditioning only |
| `K_front_a.jpg`, `K_front_b.jpg` | **Framing reference — front angle** | Composition, set, light and wardrobe for front shots |
| `K_side_a.jpg`, `K_side_b.jpg` | **Framing reference — side angle** | Composition, set, light and wardrobe for side shots |
| `studio_front.jpg`, `studio_side.jpg` | Studio style reference | Set and light only |
| Flow test clips (`A01.1…mp4` etc., if attached) | **Motion reference** | Body language and pacing only |
| B-roll test clips (`B01.1…mp4`, `B02.1…mp4`, if attached) | **Look reference for B-roll** | Palette and motion style only |

## 3. Identity lock (every podcast shot)
- Short dark hair with receding temples.
- Connected Van Dyke beard (moustache + goatee + soul patch) with grey hairs in the chin.
- A small dark mole above the **LEFT** corner of his upper lip. In a front shot it appears on the **viewer's right**.
- Never mirror the image. Never flip the image horizontally. The mole never moves. The mole never changes side.
- Do not beautify the face. Do not de-age the face. Do not slim the face. Do not change the skin tone.
- Mouth always visible. The microphone never covers the mouth. A hand never covers the mouth.

## 4. Look of the podcast footage
- Navy unstructured wool blazer over a heather warm-grey crew-neck T-shirt.
- Dark walnut slatted wall, wooden shelves with a few books, warm amber Edison lamp in soft bokeh, light walnut desk, black dynamic microphone on a boom arm beside the mouth.
- Moody low-key warm tungsten light, gentle shadows, teal-black shadows with amber highlights, shallow depth of field, natural skin texture, light film grain.
- Seated, calm, small head movements, natural blinks, restrained hand gestures below the chin.
- Front angle: medium close-up at eye level, very slow push-in (≤ 2%) or locked-off.
- Side angle: three-quarter from his right side, both eyes and the full mouth visible, locked-off or a barely perceptible drift.
- No on-screen text inside generated footage. No logos. No watermarks. No extra people.

## 5. Shot list — exact timeline (45 shots)
Each shot stays on screen from its start to the next shot's start. Short silences between phrases are covered by the previous shot. Podcast shots: generate audio-driven lip-sync from the named slice, matching the named framing reference. B-roll: generate new footage from the description.

| # | Shot | Type | Start (s) | End (s) | Length (s) | Framing ref | Audio slice / description |
|---|---|---|---|---|---|---|---|
| 1 | A01.1 | Podcast — front | 0.00 | 8.65 | 8.65 | K_front_a.jpg | `A01.1.wav` — «في يوم وأنا قاعد بفكّر بموقف صار معي من فترة… موقف… لو سألتني عنه وقتها، كنت رح أحكيلك إنّي فاهمه منيح… فاهم شو صار» |
| 2 | A01.2 | Podcast — side | 8.65 | 16.13 | 7.48 | K_side_a.jpg | `A01.2.wav` — «وليش صار… ومين كان معه حق، ومين كان لازم يتصرّف بطريقة تانية… كنت مرتّب القصة براسي… من أولها لآخرها» |
| 3 | B01.1 | B-roll | 16.13 | 24.00 | 7.87 | — | A single glowing copper question mark in a dark void, with a fainter reflection of it behind. Golden dust drifts in darkness and slowly gathers into a glowing copper question mark; a fainter reflection forms behind it; the shot ends on the still, fully formed shape. |
| 4 | A02.1 | Podcast — front | 24.00 | 33.66 | 9.66 | K_front_b.jpg | `A02.1.wav` — «الغريب إنه السؤال ما وقف عند الموقف نفسه… بلّش ياخدني لمواقف قديمة… وأشخاص اختلفت معهم، وأشياء كنت مقتنع فيها من سنين» |
| 5 | B02.1 | B-roll | 33.66 | 40.57 | 6.91 | — | Old faded photographs (images inside them blurred and unrecognisable) floating in darkness like memories. Old faded photographs float slowly in darkness, gently turning, lit by warm amber light; the shot ends with one photograph drifting closer to the lens. |
| 6 | B02.2 | B-roll | 40.57 | 47.48 | 6.91 | — | Old faded photographs (images inside them blurred and unrecognisable) floating in darkness like memories. The floating photographs slowly crumble into warm golden dust; the dust settles and only a soft amber glow remains in the dark; the shot ends on that glow. |
| 7 | B03.1 | B-roll | 47.48 | 52.80 | 5.32 | — | A vintage sepia photograph of an empty room lying on dark wood. A vintage sepia photograph of an empty room lies on dark wood; one corner slowly catches a small flame and the edge begins to glow and curl; the shot ends with the burn reaching a quarter of the photo. |
| 8 | B03.2 | B-roll | 52.80 | 58.11 | 5.31 | — | A vintage sepia photograph of an empty room lying on dark wood. The slow burn continues across the old photograph, glowing embers curling the edge, while the empty room inside it is still visible; the shot ends with half the photo turned to soft ash and warm embers. |
| 9 | A03.1 | Podcast — front | 58.11 | 64.12 | 6.01 | K_front_a.jpg | `A03.1.wav` — «وبتذكّرني هاي الفكرة بشغلة تانية… كم مرّة قابلنا شخص وطلعنا من عنده بانطباع معيّن» |
| 10 | A03.2 | Podcast — side | 64.12 | 72.22 | 8.10 | K_side_b.jpg | `A03.2.wav` — «حكينا إنه مغرور… بارد… عصبي… أو أسلوبه سيّئ، وحطّيناه بمكان معيّن براسنا… مع إنّا ما شفنا منه غير لحظة» |
| 11 | A03.3 | Podcast — front | 72.22 | 78.47 | 6.25 | K_front_b.jpg | `A03.3.wav` — «ويمكن فعلاً كان عنده تصرّف غلط لازم يتحمّل مسؤوليته… بس إحنا ما منعرف شو الحقيقة حتى نحكم عليه» |
| 12 | B04.1 | B-roll | 78.47 | 83.85 | 5.38 | — | A man's hand on dark wood, tightly closed around a small glowing card. A man's hand rests on dark wood, tightly closed around a small glowing card; the fingers slowly relax and the palm opens upward, releasing soft warm light into the dark; the shot ends on the open, empty palm. |
| 13 | A04.1 | Podcast — front | 83.85 | 88.14 | 4.29 | K_front_a.jpg | `A04.1.wav` — «مش مطلوب منك تبرّر للناس… ولا تعطي كل شخص فرصة بلا حدود» |
| 14 | A04.2 | Podcast — side | 88.14 | 94.91 | 6.77 | K_side_a.jpg | `A04.2.wav` — «بس يمكن المطلوب تضل واعي لحدود اللي شفته… وما تبني عليه أفكار وتفسيرات وتحوّله لحقيقة» |
| 15 | A04.3 | Podcast — side | 94.91 | 104.60 | 9.69 | K_side_b.jpg | `A04.3.wav` — «واللي استوقفني أكتر إنه نفس الإشي بيصير معنا إحنا… إحنا منحاول نفهم الناس… بس هل بنحاول نفهم حالنا بنفس القدر؟ ولا تعوّدنا نحكي عن حالنا بجمل جاهزة» |
| 16 | B05.1 | B-roll | 104.60 | 111.61 | 7.01 | — | Blank worn paper cards falling onto a dark desk. No writing on the cards. Blank worn paper cards flutter down in slow motion onto a dark desk and pile up one after another; the pile slowly slides off the desk edge into darkness; the shot ends on the empty desk. |
| 17 | B06.1 | B-roll | 111.61 | 118.90 | 7.29 | — | A dark corridor ending in a tall doorway glowing with golden light and haze; a man seen only from behind, as a silhouette. A man stands still in front of a tall doorway glowing with golden light at the end of a dark corridor, seen only from behind as a silhouette; the camera slowly pulls back away from him; the shot ends with him small in the frame. |
| 18 | A05.1 | Podcast — side | 118.90 | 126.57 | 7.67 | K_side_a.jpg | `A05.1.wav` — «شو اللي صار وخلّاني أتصرّف بهالطريقة؟ وهل هاي فعلاً طبيعتي؟ ولا طريقة تعلّمتها بوقت كنت محتاج فيها أحمي حالي؟» |
| 19 | B07.1 | B-roll | 126.57 | 134.46 | 7.89 | — | A fogged mirror in a dim room; behind the fog, a blurred, unrecognisable reflection. A hand slowly wipes a streak through a fogged mirror in a dim warm room, revealing a blurred, unrecognisable reflection behind the glass; the shot ends with the streak still clear. |
| 20 | B07.2 | B-roll | 134.46 | 142.35 | 7.89 | — | A fogged mirror in a dim room; behind the fog, a blurred, unrecognisable reflection. The fog slowly returns over the wiped streak until the blurred reflection fades away completely; the shot ends on the evenly fogged mirror glowing softly. |
| 21 | A06.1 | Podcast — front | 142.35 | 146.11 | 3.76 | K_front_b.jpg | `A06.1.wav` — «وهون بالنسبة إلي… بيبلّش نوع مختلف من الفهم» |
| 22 | B08.1 | B-roll | 146.11 | 150.60 | 4.49 | — | A ribbon of warm light in a dark void. A ribbon of warm light twists into a tight knot in a dark void, then slowly loosens and straightens into a calm line moving forward; the shot ends on the straight line. |
| 23 | A07.1 | Podcast — front | 150.60 | 154.29 | 3.69 | K_front_a.jpg | `A07.1.wav` — «لأنه مش كل إشي تعوّدنا عليه بناسبنا» |
| 24 | B09.1 | B-roll | 154.29 | 159.40 | 5.11 | — | A thin glowing copper thread stretched across a dark crack in the ground. A tiny warm light travels along a thin glowing copper thread across a dark crack in the ground; once it reaches the other side, the thread gently loosens and fades; the shot ends on the soft glow left behind. |
| 25 | A08.1 | Podcast — side | 159.40 | 164.23 | 4.83 | K_side_b.jpg | `A08.1.wav` — «بس التغيير كمان مش إنك ترفض حالك… أو تعتبر كل اللي كنت عليه غلط» |
| 26 | A08.2 | Podcast — side | 164.23 | 173.67 | 9.44 | K_side_a.jpg | `A08.2.wav` — «يمكن التغيير يبلّش لما تفهم حالك من غير ما تظلمها… وتتحمّل مسؤوليتها من غير ما تكرهها، وبين كل هاي الأفكار… برجع أتذكّر شغلة بسيطة» |
| 27 | B10.1 | B-roll | 173.67 | 180.55 | 6.88 | — | A dark human silhouette in profile filled with a slow galaxy of warm particles. A dark human silhouette in profile stands against a deep teal-black background; inside it a slow galaxy of warm golden particles swirls gently; the shot ends with the particles glowing brighter. |
| 28 | B10.2 | B-roll | 180.55 | 187.43 | 6.88 | — | A dark human silhouette in profile filled with a slow galaxy of warm particles. Inside the silhouette, among the warm particles, faint blurred fragments of memories glow and fade softly; the shot ends on a calm, glowing inner galaxy. |
| 29 | A09.1 | Podcast — front | 187.43 | 196.57 | 9.14 | K_front_b.jpg | `A09.1.wav` — «وهذا ما بيعني إنه كل الناس على حق… ولا إنه كل اختلاف سببه سوء فهم… في ظلم حقيقي… وفي أخطاء… وفي تصرّفات لازم نوقف عندها» |
| 30 | B11.1 | B-roll | 196.57 | 201.08 | 4.51 | — | An old photograph on dark wood with several jigsaw pieces missing. Missing jigsaw pieces drift in from the darkness and settle into an old photograph on dark wood; one corner stays empty; the shot ends on that empty corner. |
| 31 | A10.1 | Podcast — front | 201.08 | 210.09 | 9.01 | K_front_a.jpg | `A10.1.wav` — «وممكن نفهم الإنسان من غير ما نوافقه… ونحبّه ونحط حدود بنفس الوقت… ونراجع رأينا من غير ما نخسر كرامتنا» |
| 32 | A10.2 | Podcast — side | 210.09 | 214.94 | 4.85 | K_side_b.jpg | `A10.2.wav` — «وعشان هيك صرت أشوف إنه أصعب الحوارات مش دايماً اللي بنخوضها مع غيرنا» |
| 33 | B12.1 | B-roll | 214.94 | 217.53 | 2.59 | — | A man's backlit silhouette sitting opposite his own blurred reflection in a dark window, a warm lamp between them. A man's backlit silhouette sits facing his own blurred reflection in a dark window, a warm lamp glowing between them; both stay still and silent while the camera slowly arcs; the shot ends on the lamp between them. |
| 34 | A11.1 | Podcast — front | 217.53 | 221.51 | 3.98 | K_front_b.jpg | `A11.1.wav` — «لما نسأل إذا إحنا فعلاً مرتاحين بالاختيارات اللي عايشينها» |
| 35 | A11.2 | Podcast — side | 221.51 | 227.99 | 6.48 | K_side_a.jpg | `A11.2.wav` — «وهل إحنا متمسّكين بقناعاتنا لأنّا لسّه مؤمنين فيها؟ ولا لأنّا خايفين نكتشف إنها ما عادت إلنا» |
| 36 | A11.3 | Podcast — front | 227.99 | 235.26 | 7.27 | K_front_a.jpg | `A11.3.wav` — «وهل إحنا بنحاول نفهم الناس فعلاً؟ ولا بس بنحاول نلاقي تفسير يخلّينا مرتاحين» |
| 37 | A11.4 | Podcast — side | 235.26 | 240.19 | 4.93 | K_side_b.jpg | `A11.4.wav` — «يمكن ما عندي إجابات جاهزة عن كل هالأسئلة… بس بعرف إنه في أشياء بتتغيّر فينا» |
| 38 | B13.1 | B-roll | 240.19 | 247.35 | 7.16 | — | A large clear glass lens shaped like a question mark hanging in a dark room. A large glass lens shaped like a question mark hangs in a dark room; the camera moves slowly through it and the blurred room behind becomes sharp and warm; the shot ends on the sharp, warmly lit room. |
| 39 | A12.1 | Podcast — front | 247.35 | 253.63 | 6.28 | K_front_b.jpg | `A12.1.wav` — «وعشان هيك «ما لا يُقال» بالنسبة إلي مش مساحة نحكي فيها عن الأشياء اللي ما بنحكيها بس» |
| 40 | A12.2 | Podcast — side | 253.63 | 262.26 | 8.63 | K_side_a.jpg | `A12.2.wav` — «هي كمان مساحة نراجع فيها الأشياء اللي طول عمرنا مفكّرين إنّا فاهمينها… وقبل ما تروح… خلّيني أتركك مع فكرة واحدة» |
| 41 | A12.3 | Podcast — side | 262.26 | 269.59 | 7.33 | K_side_b.jpg | `A12.3.wav` — «يمكن في قصة أو انطباع بحياتك… لليوم بتحكيها بنفس الطريقة، عن شخص… أو عن موقف… أو حتى عن حالك» |
| 42 | B14.1 | B-roll | 269.59 | 277.21 | 7.62 | — | A sequence of quiet moments from the episode's world: a rainy train window, a covered living room, a fogged mirror, a lit doorway. Quiet moments play in reverse motion — a rainy train window, a covered living room, a fogged mirror — gradually slowing down; the shot ends just before stopping. |
| 43 | B14.2 | B-roll | 277.21 | 284.83 | 7.62 | — | A sequence of quiet moments from the episode's world: a rainy train window, a covered living room, a fogged mirror, a lit doorway. The reverse motion slows to a stop on one still frame of a softly lit doorway; the light slowly warms; the shot ends on that still warm frame. |
| 44 | B15.1 | B-roll | 284.83 | 289.65 | 4.82 | — | A faded photograph on dark wood. A dark line slowly strikes across a faded photograph on dark wood, then warm light grows from beneath it; the shot ends with the photograph glowing softly. |
| 45 | A13.1 | Podcast — front | 289.65 | 293.18 | 3.53 | K_front_a.jpg | `A13.1.wav` — «أنا همام ديك… وهذا ما لا يُقال» |

Notes on the table:
- The `.wav` slice for a podcast shot covers the spoken part only. If the shot is longer than its slice (silence before the next shot), keep the generated performance going with a closed, relaxed mouth and natural blinks. No mouth movement during silence.
- B-roll rules: 9:16, photorealistic, slow elegant motion, warm amber highlights against deep teal-black shadows. No readable text. No letters. No numbers. No faces unless the description says so. When a B-roll idea spans two shots, the second continues from the last frame of the first.
- Recommended order of preference for audio-driven lip-sync: any tool that animates a person from a reference image + an audio file at ≥ 720×1280 with accurate Arabic visemes (for example: Hedra Character-3, HeyGen Avatar IV, Kling Avatar/Lip Sync, Sync.so lipsync-2-pro on generated footage, OmniHuman). Pick by result quality, not by name. State which tool, model and settings you used for every shot.

## 6. Edit
- Canvas 1080×1920, 30 fps (or 24 fps), 9:16, the full 293.18 s.
- Podcast ↔ B-roll: soft blur dissolve 0.45 s. Podcast ↔ podcast (angle change): straight cut.
- Grade everything to one look (section 4). Same grain on all shots.
- Music: soft ambient (felt piano, warm low drone, airy pad), no beat, no vocals, about 15 LU under the voice, ducking −5.5 dB while he speaks (attack 30 ms, release 450 ms). Music drops to silence for about 1.2 s after «من متى أنا هيك؟» and 1.0 s after «هل بدّي أضل هيك؟». Ending: one low piano note.
- Sound effects at low level only: warm swoosh on podcast↔B-roll transitions; soft paper burn on B03; faint shimmer on B10. Never louder than the voice.
- Final mix: −14 LUFS integrated, true peak ≤ −1 dBTP. The voice itself is not processed.

## 7. Arabic captions
- Use `subtitles_full.srt` exactly: same text, same timing.
- Font: IBM Plex Sans Arabic (Light 300 for text, SemiBold 600 for emphasis), ivory #EDE6D6, emphasis copper #B8835A. Logo «ما لا يُقال» in Aref Ruqaa.
- Right-to-left, connected letters. Never split Arabic letters. Never letter-space Arabic.
- Max 2 lines, max width 900 px, lower third with a soft dark gradient behind. Never over the mouth or eyes. Keep 120 px clear on the right edge.

## 8. Deliverables
1. `ma_la_yuqal_full_9x16.mp4`: H.264 High, 1080×1920, yuv420p, bt709, tv range, AAC 48 kHz stereo, 293.18 s ± 0.04 s.
2. `ma_la_yuqal_full_9x16_nocaptions.mp4`: the same without captions.
3. `shots/`: every generated clip before editing, named by shot ID (`A01.1.mp4`, `B01.1.mp4` …).
4. `REPORT.md`: one row per shot with tool, model, settings, seed (if any), source slice, and which reference images were used as conditioning.
5. `qc/`: contact sheet of one frame every 2 s, and the measurements in section 9.

## 9. Acceptance tests (I will measure your files)
- Duration 293.18 s ± 0.04 s.
- Audio: cross-correlation with `voice_full_-14LUFS.mp3` gives 0 ms offset. Residual after removing music shows the voice untouched.
- Loudness −14.0 ± 0.5 LUFS, true peak ≤ −1.0 dBTP.
- Lip-sync: mouth closures (م، ب، ف) land within 2 frames of the audio on 10 random checks.
- Identity: on every podcast shot the mole is above the lip on the viewer's right in front shots. No mirrored shot.
- No attached image or clip appears in the final video (I will compare frames).
- Captions match the SRT text and timing; letters joined; nothing over the mouth.
- No visible text, letters or watermarks inside generated footage.

## 10. Honesty rules
- Report only what you actually produced and measured. Copy numbers from the measured files.
- If a tool cannot do something (for example Arabic lip-sync accuracy, or 1080p), say so and show the closest result. Never replace a missing shot with an attached reference, a still image or a placeholder without labelling it in the report.
- If you run out of credits or time, deliver what is finished, list exactly which shots are missing, and stop. Do not fake progress.

Start by confirming which lip-sync tool you will use and generating **one test shot (A01.1, 0.00–8.65 s)** for my approval before generating the rest.

