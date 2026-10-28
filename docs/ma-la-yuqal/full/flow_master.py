"""FLOW_MASTER.md — the full reviewed shot list for Google Flow: audit, edit log, every prompt in a fixed
template (A-roll / B-roll), timeline, open decisions and a 3-shot voice test.
Dialogue comes from phrases.py (transcribed from the real recording); only punctuation is changed here."""
import json, re
from phrases import P
plan = json.load(open("plan.json"))
LIMIT = 10.0
REFLECT = ["حالك", "حالنا", "طبيعتي", "من متى", "بتتعبك", "تسكت", "أصعب حوار", "مع حالنا"]
JO = ["إشي", "مش", "هيك", "شو", "بدّي", "هالطريقة", "منحاول", "رح"]

# every negative is its own sentence starting with No / Do not / Never, so no item can be read as something to add
def no(*items): return " ".join(f"No {x}." for x in items)
VOICE = ("A natural adult male voice, warm, grounded and clear, speaking to one listener in a natural urban Ammani Jordanian Arabic dialect. "
         "Do not use generic Levantine Arabic. Do not imitate a Lebanese accent. Do not imitate a Syrian accent. "
         "Do not switch to Modern Standard Arabic. Do not exaggerate the dialect. "
         "The speaker himself pronounces qaf as a glottal stop in everyday colloquial words, as urban Ammani speakers do; keep this consistent "
         "across the clip. Do not change the written spelling. Do not force a hard qaf. "
         "Natural Jordanian word linking, conversational rhythm, short pauses only where the meaning requires them. "
         + no("theatrical acting", "whispering", "robotic delivery") + " Speak only the supplied dialogue. "
         + no("added words", "omitted words", "repeated words", "translation", "paraphrasing")
         + " Treat punctuation as pacing guidance only. Do not read punctuation aloud.")
PERF = ("Subtle facial expressions, natural blinking, small head movements, restrained hand gestures below the chin, realistic "
        "speech-aligned mouth movement. Keep the whole mouth visible at all times.")
CAM = {
    "front": ("Vertical 9:16. Medium close-up at eye level, exactly matching the reference frame's composition (head in the upper third, "
              "microphone entering from frame-right below mouth level). Very slow push-in of no more than 2%, otherwise locked-off."),
    "side": ("Vertical 9:16. Three-quarter angle from his right side, exactly matching the reference frame's composition and eyeline "
             "(he looks slightly off-camera toward frame-right). Both eyes and the full mouth visible. Locked-off or a barely perceptible drift."),
}
ENV = {
    "front": ("Navy unstructured blazer over a heather warm-grey crew-neck T-shirt. Dark walnut slatted wall, wooden shelves with a few "
              "books, warm amber globe lamp in soft bokeh, light walnut desk, black dynamic microphone on a boom arm beside the mouth. "
              "The microphone never covers the mouth."),
    "side": ("Navy unstructured blazer over a heather warm-grey crew-neck T-shirt. The same studio as the reference frame: walnut slatted wall, "
             "wooden shelves with a few books, warm amber Edison lamp in soft bokeh, light walnut desk, black dynamic microphone in the "
             "foreground at frame-left, below the mouth. The microphone never covers the mouth."),
}
LIGHT = {
    "front": ("Photorealistic cinematic podcast footage. Low-key warm tungsten key light from camera-left, gentle natural shadows, subtle "
              "teal-black shadows with amber highlights, shallow depth of field, natural skin texture."),
    "side": ("Photorealistic cinematic podcast footage. Keep the reference frame's light direction and warmth exactly, gentle natural shadows, "
             "subtle teal-black shadows with amber highlights, shallow depth of field, natural skin texture."),
}
IDENT = ("Use the exact identity from @me and the provided reference frame. Preserve the real facial structure, natural skin texture, "
         "short dark hair with receding temples, connected moustache and goatee with grey hairs in the chin, and the small dark mole above "
         "the LEFT corner of the upper lip (viewer's right in a frontal view). Never mirror the image. Never flip the image horizontally. "
         "Do not beautify the face. Do not de-age the face. Do not reshape the face. Do not slim the face. Do not replace the person. "
         "Do not change the nose. Do not change the jaw. Do not change the eyes. Do not change the mouth.")
NEG_A = no("on-screen text", "subtitles", "captions", "titles", "logos", "watermarks", "letters", "numbers", "extra people",
           "mirrored identity", "facial changes", "obscured mouth", "exaggerated gestures", "sudden camera movement", "cuts",
           "scene changes", "invented dialogue", "duplicated dialogue", "music", "sound effects")
LOOK_B = "Cinematic warm amber highlights, deep teal-black shadows, soft atmospheric light, shallow depth of field, restrained contrast. Photorealistic."
NEG_B = no("readable text", "letters", "numbers", "captions", "subtitles", "titles", "logos", "watermarks", "random people",
           "distracting objects", "abrupt cuts", "excessive motion", "unrelated elements", "dialogue", "music", "sound effects")
# B-roll: meaning, main visual, camera, avoid, and one phase per generated part (start -> end)
B = {
 "B01": ("سؤال صغير بيخلخل اليقين: «بعرف شو صار فعلاً؟ ولا كيف فسّرته؟»",
         "A single glowing copper question mark in a dark void, with a fainter reflection of it behind.",
         "Slow push-in from a medium shot to a close shot, centred.",
         "a sci-fi or magical look, sparks, fast swirls, more than one question mark",
         ["Golden dust drifts in darkness and slowly gathers into a glowing copper question mark; a fainter reflection forms behind it; the shot ends on the still, fully formed shape."]),
 "B02": ("المعنى اللي بنعطيه للتجربة بيضل أطول من التجربة نفسها، وبيصير «حقيقة»",
         "Old faded photographs (images inside them blurred and unrecognisable) floating in darkness like memories.",
         "Slow forward drift between the floating photographs.",
         "recognisable faces, readable writing on the photos, explosions",
         ["Old faded photographs float slowly in darkness, gently turning, lit by warm amber light; the shot ends with one photograph drifting closer to the lens.",
          "The floating photographs slowly crumble into warm golden dust; the dust settles and only a soft amber glow remains in the dark; the shot ends on that glow."]),
 "B03": ("نضل عايشين جوّا تفسير قديم حتى لما تتغيّر الظروف",
         "A vintage sepia photograph of an empty room lying on dark wood.",
         "Top-down macro, very slow push-in.",
         "big flames, smoke filling the frame, people inside the photo",
         ["A vintage sepia photograph of an empty room lies on dark wood; one corner slowly catches a small flame and the edge begins to glow and curl; the shot ends with the burn reaching a quarter of the photo.",
          "The slow burn continues across the old photograph, glowing embers curling the edge, while the empty room inside it is still visible; the shot ends with half the photo turned to soft ash and warm embers."]),
 "B04": ("الفرق بين إنك تعترف إنك ما بتعرف القصة كاملة، وإنك تتصرّف كأنك عارفها",
         "A man's hand on dark wood, tightly closed around a small glowing card.",
         "Close-up, locked-off, shallow depth of field.",
         "split screens, two images in one frame, readable text on the card",
         ["A man's hand rests on dark wood, tightly closed around a small glowing card; the fingers slowly relax and the palm opens upward, releasing soft warm light into the dark; the shot ends on the open, empty palm."]),
 "B05": ("الجمل الجاهزة اللي بنعرّف حالنا فيها: «أنا عصبي»، «أنا هيك»",
         "Blank worn paper cards falling onto a dark desk. No writing on the cards.",
         "Medium close-up at desk height, slow lateral drift.",
         "any writing on the cards, chaotic motion",
         ["Blank worn paper cards flutter down in slow motion onto a dark desk and pile up one after another; the pile slowly slides off the desk edge into darkness; the shot ends on the empty desk."]),
 "B06": ("نرجع خطوة لورا ونسأل: من متى أنا هيك؟",
         "A dark corridor ending in a tall doorway glowing with golden light and haze; a man seen only from behind, as a silhouette.",
         "Slow pull-back down the corridor.",
         "a visible face, fast camera movement, horror mood",
         ["A man stands still in front of a tall doorway glowing with golden light at the end of a dark corridor, seen only from behind as a silhouette; the camera slowly pulls back away from him; the shot ends with him small in the frame."]),
 "B07": ("نسخة قديمة منّا كانت تحكي قبل ما تتعلّم تسكت",
         "A fogged mirror in a dim room; behind the fog, a blurred, unrecognisable reflection.",
         "Close-up on the mirror, locked-off.",
         "a clear or recognisable face, horror mood, broken glass",
         ["A hand slowly wipes a streak through a fogged mirror in a dim warm room, revealing a blurred, unrecognisable reflection behind the glass; the shot ends with the streak still clear.",
          "The fog slowly returns over the wiped streak until the blurred reflection fades away completely; the shot ends on the evenly fogged mirror glowing softly."]),
 "B08": ("من «ليش أنا هيك؟» إلى «هل بدّي أضل هيك؟»",
         "A ribbon of warm light in a dark void.",
         "Medium shot, slow push-in.",
         "neon colours, fast motion",
         ["A ribbon of warm light twists into a tight knot in a dark void, then slowly loosens and straightens into a calm line moving forward; the shot ends on the straight line."]),
 "B09": ("إشي تعلّمناه حتى ننجو من مرحلة، مش لازم يرافقنا طول العمر",
         "A thin glowing copper thread stretched across a dark crack in the ground.",
         "Low macro angle, slow lateral move along the thread.",
         "a dramatic snap, sparks",
         ["A tiny warm light travels along a thin glowing copper thread across a dark crack in the ground; once it reaches the other side, the thread gently loosens and fades; the shot ends on the soft glow left behind."]),
 "B10": ("كل إنسان عنده عالم كامل جوّا ما منعرفه",
         "A dark human silhouette in profile filled with a slow galaxy of warm particles.",
         "Slow push-in toward the silhouette's chest.",
         "facial details, readable images, cosmic clichés with planets",
         ["A dark human silhouette in profile stands against a deep teal-black background; inside it a slow galaxy of warm golden particles swirls gently; the shot ends with the particles glowing brighter.",
          "Inside the silhouette, among the warm particles, faint blurred fragments of memories glow and fade softly; the shot ends on a calm, glowing inner galaxy."]),
 "B11": ("ما منشوف الصورة كاملة",
         "An old photograph on dark wood with several jigsaw pieces missing.",
         "Top-down, very slow push-in.",
         "completing the picture fully, readable details",
         ["Missing jigsaw pieces drift in from the darkness and settle into an old photograph on dark wood; one corner stays empty; the shot ends on that empty corner."]),
 "B12": ("أصعب حوار هو اللي بنخوضه مع حالنا",
         "A man's backlit silhouette sitting opposite his own blurred reflection in a dark window, a warm lamp between them.",
         "Medium shot, very slow arc.",
         "two clear identical faces, a recognisable face, mirror tricks that look fake",
         ["A man's backlit silhouette sits facing his own blurred reflection in a dark window, a warm lamp glowing between them; both stay still and silent while the camera slowly arcs; the shot ends on the lamp between them."]),
 "B13": ("سؤال واحد بيغيّر الطريقة اللي بنشوف فيها الأمور",
         "A large clear glass lens shaped like a question mark hanging in a dark room.",
         "Slow dolly forward through the lens.",
         "readable text, cartoon look",
         ["A large glass lens shaped like a question mark hangs in a dark room; the camera moves slowly through it and the blurred room behind becomes sharp and warm; the shot ends on the sharp, warmly lit room."]),
 "B14": ("نرجع نفكّر فيها مرّة تانية، يمكن نكتشف إشي ما انتبهنا له",
         "A sequence of quiet moments from the episode's world: a rainy train window, a covered living room, a fogged mirror, a lit doorway.",
         "Reverse motion that slows down and stops.",
         "jarring strobe, readable text, people's faces",
         ["Quiet moments play in reverse motion — a rainy train window, a covered living room, a fogged mirror — gradually slowing down; the shot ends just before stopping.",
          "The reverse motion slows to a stop on one still frame of a softly lit doorway; the light slowly warms; the shot ends on that still warm frame."]),
 "B15": ("ما بنحتاج نغيّر الماضي قد ما بنحتاج نفهم شو عمل فينا",
         "A faded photograph on dark wood.",
         "Top-down macro, locked-off.",
         "violent tearing, readable writing",
         ["A dark line slowly strikes across a faded photograph on dark wood, then warm light grows from beneath it; the shot ends with the photograph glowing softly."]),
}

def phr(a, b): return [p for p in P if p[0] >= a - 0.05 and p[0] < b]
def chunks(a, b):
    ps, out, s, cur = phr(a, b), [], a, []
    for p in ps:
        if cur and p[1] - s > LIMIT - 0.6: out.append((s, cur[-1][1] + 0.1, cur)); s, cur = p[0], []
        cur.append(p)
    out.append((s, b, cur)); return out
def split_even(a, b):
    n = max(1, int(-(-(b - a) // LIMIT))); d = (b - a) / n
    return [(a + i * d, a + (i + 1) * d) for i in range(n)]
def clean(t): return t.replace(" [؟]", "").strip()
def join(ps):
    # punctuation only: a pause of >= 0.3 s between phrases becomes «…», a shorter one «،»; words are never touched
    out = clean(ps[0][2])
    for q, p in zip(ps, ps[1:]):
        if not out.endswith(("…", "؟", "،", ".")): out += "… " if p[0] - q[1] >= 0.3 else "، "
        else: out += " "
        out += clean(p[2])
    return out
words = lambda t: len(re.findall(r"[ء-ْ]+", t))
mm = lambda x: f"{int(x // 60)}:{x % 60:04.1f}"

items = sorted([("A", a) for a in plan["aroll"]] + [("B", b) for b in plan["broll"]], key=lambda x: x[1]["start"])
shots, KC = [], {"front": 0, "side": 0}
for kind, it in items:
    if kind == "A":
        parts = chunks(it["start"], it["end"])
        for k, (a, b, ps) in enumerate(parts, 1):
            raw = " ".join(clean(p[2]) for p in ps); line = join(ps)
            ang = "side" if any(w in raw for w in REFLECT) else ("front" if k % 2 else "side")
            kf = f"K_{ang}_{'ab'[KC[ang] % 2]}.jpg"; KC[ang] += 1
            spoken = sum(p[1] - p[0] for p in ps)
            shots.append(dict(kind="A", seg=it["id"], id=f"{it['id']}.{k}", a=a, b=b, seg_a=it["start"], seg_b=it["end"], raw=raw, line=line,
                              ang=ang, kf=kf, spoken=spoken, unsure=any("[؟]" in p[2] for p in ps)))
    else:
        parts = split_even(it["start"], it["end"])
        for k, (a, b) in enumerate(parts, 1):
            shots.append(dict(kind="B", seg=it["id"], id=f"{it['id']}.{k}", a=a, b=b, seg_a=it["start"], seg_b=it["end"], k=k, n=len(parts),
                              cover=join(phr(it["start"], it["end"]))))

def gen_secs(s):
    d = s["b"] - s["a"]
    return 10 if s["kind"] == "A" else (6 if d <= 6 else 8 if d <= 8 else 10)

def a_prompt(s):
    return "\n".join([
        f"SHOT ID: {s['id']}",
        f"Duration: {s['b'] - s['a']:.1f} s in the edit ({mm(s['a'])}–{mm(s['b'])}) — generate {gen_secs(s)} s, trim in the edit",
        "Generation Mode: Frames to Video",
        f"Reference Frame: {s['kf']} + @me",
        "",
        "EXACT SPOKEN DIALOGUE:",
        f"\"{s['line']}\"",
        "",
        f"Voice and Delivery: {VOICE}",
        f"Performance: {PERF}",
        f"Camera and Framing: {CAM[s['ang']]}",
        f"Identity Lock: {IDENT}",
        f"Wardrobe and Environment: {ENV[s['ang']]}",
        f"Lighting and Style: {LIGHT[s['ang']]}",
        f"Negative Constraints: {NEG_A}",
    ])

def b_prompt(s, prev, nxt):
    meaning, main, cam, avoid, phases = B[s["seg"]]
    phase = phases[min(s["k"], len(phases)) - 1]
    if s["k"] > 1: cont = f"Continue the same scene from the provided first frame (the last frame of {s['seg']}.{s['k'] - 1}), no cut, same light and palette."
    else: cont = f"Stand-alone opening of this metaphor; it follows {prev} and is joined to it in the edit with a soft dissolve."
    if s["k"] < s["n"]: cont += f" It must end in a calm state that {s['seg']}.{s['k'] + 1} can continue from."
    elif nxt: cont += f" It is followed by {nxt}."
    return "\n".join([
        f"SHOT ID: {s['id']}",
        f"Duration: {s['b'] - s['a']:.1f} s in the edit ({mm(s['a'])}–{mm(s['b'])}) — generate {gen_secs(s)} s",
        f"Generation Mode: {'Frames to Video — First frame: last frame of ' + s['seg'] + '.' + str(s['k'] - 1) if s['k'] > 1 else 'Text to Video (no @me, no reference images)'}",
        f"Visual Meaning: {meaning}",
        "",
        "9:16 vertical cinematic B-roll metaphor.",
        f"Main Visual: {main}",
        f"Motion: {phase}",
        f"Camera: {cam}",
        f"Lighting and Color: {LOOK_B}",
        f"Continuity: {cont}",
        f"Negative Constraints: {NEG_B} " + no(*[re.sub(r"^(a|an) ", "", x.strip()) for x in avoid.split(", ")]),
    ])

# ---------- timeline checks ----------
issues = []
for s, t in zip(shots, shots[1:]):
    gap = t["a"] - s["b"]
    if gap > 0.05: issues.append(f"{s['id']} → {t['id']}: فجوة {gap:.2f} ث (صمت بين جملتين؛ تُغطّى بتمديد {s['id']} في المونتاج)")
    elif gap < -0.05: issues.append(f"{s['id']} → {t['id']}: تداخل {-gap:.2f} ث")
if shots[0]["a"] > 0.05: issues.insert(0, f"البداية عند {shots[0]['a']:.2f} ث")
end = plan["duration"]
if end - shots[-1]["b"] > 0.05: issues.append(f"بعد {shots[-1]['id']}: ذيل {end - shots[-1]['b']:.2f} ث حتى نهاية الصوت ({end:.2f}) — تمديد بصري للّقطة الأخيرة")

A = [s for s in shots if s["kind"] == "A"]; Bs = [s for s in shots if s["kind"] == "B"]
gen_total = sum(gen_secs(s) for s in shots)

# ---------- voice test picks ----------
def pick(cond): return min((s for s in A if cond(s)), key=lambda s: s["b"] - s["a"])
t1 = pick(lambda s: any(w in s["raw"] for w in REFLECT) and s["raw"].count("؟") == 0)
t2 = pick(lambda s: s["raw"].count("؟") >= 2 and s is not t1)
t3 = pick(lambda s: sum(w in s["raw"] for w in JO) >= 2 and s not in (t1, t2))

L = []
w = L.append
w(f"""# «ما لا يُقال» — المراجعة الشاملة لأوامر Google Flow

{len(shots)} لقطة ({len(A)} بودكاست + {len(Bs)} موشن) · مدة الحلقة {mm(end)} · مجموع التوليد {gen_total} ث

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
- {sum(s['unsure'] for s in A)} لقطات فيها علامة «[؟]» كانت تعني «مش متأكد إذا الجملة سؤال». شلت العلامة من الحوار وحطيت الجمل بالقسم الخامس للقرار.
- المفردات أردنية مقبولة: «مش» ×10، «إشي» ×4، «هيك»، «شو»، «بدّي». ما في كلمات شامية واضحة مثل «هلّق» أو «مشان». سبب اللهجة الشامية بالاختبار على الأغلب كلمة «Levantine» بالأمر القديم، فشلتها.
- التشكيل: ما أضفت تشكيل جديد. الموجود («بفكّر»، «إنّي») من التفريغ الأصلي.

### التوقيت
- مدة كل لقطة بودكاست **مقاسة من التسجيل** (بداية ونهاية الجمل الفعلية)، مش تقدير من عدد الكلمات.
- كل لقطة بودكاست ≤ 9.7 ث، والتوليد 10 ث ثم قص. اللقطات القصيرة (أقل من 6 ث، {sum(1 for s in A if s['b'] - s['a'] < 6)} لقطات): لو Flow بيسمح بمدة أقصر (4 أو 6 أو 8 ث)، استخدم أقصر مدة أطول من اللقطة. هاد بيحتاج تحقق بالواجهة.
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
""")
for s in A:
    if s["line"] != s["raw"]:
        w(f"| {s['id']} | {s['raw'][:60]}… | ترقيم فقط: {s['line'][:60]}… | وقفات من التسجيل | مؤكد (ترقيم) |")

w("\n---\n\n## القسم الثالث: جميع الأوامر المنقّحة (بالترتيب)\n")
w("كل أمر مستقل وكامل. انسخ من `SHOT ID` لآخر سطر. لقطات البودكاست: Frames to Video، والإطار الأول هو الصورة المذكورة، مع `@me`.\n")
segs = [s["seg"] for s in shots]
for i, s in enumerate(shots):
    if i == 0 or s["seg"] != shots[i - 1]["seg"]:
        kind = "بودكاست" if s["kind"] == "A" else "موشن"
        w(f"\n### {s['seg']} — {mm(s['seg_a'])}–{mm(s['seg_b'])} · {kind}\n")
        if s["kind"] == "B": w(f"> ملاحظة مونتاج فقط (ما بيظهر بالتوليد): الكلام اللي بتغطيه اللقطة: «{s['cover']}»\n")
    if s["kind"] == "A":
        w(f"**{s['id']}** — {s['spoken']:.1f} ث كلام · {words(s['line'])} كلمة · زاوية {'أمامية' if s['ang'] == 'front' else 'جانبية'} · صوت المزامنة: `lipsync_audio/{s['id']}.wav`\n")
        w("```\n" + a_prompt(s) + "\n```\n")
    else:
        prev = next((t["id"] for t in reversed(shots[:i]) if t["seg"] != s["seg"]), "the episode opening")
        nxt = next((t["id"] for t in shots[i + 1:] if t["seg"] != s["seg"]), None)
        w(f"**{s['id']}**\n")
        w("```\n" + b_prompt(s, prev, nxt) + "\n```\n")

w("\n---\n\n## القسم الرابع: جدول التوقيت النهائي\n")
w("| المقطع | اللقطة | النوع | المقطع بالخطة | اللقطة بالمونتاج | المدة | كلمات | كلام فعلي | توليد | الإجراء | المرجع |")
w("|---|---|---|---|---|---|---|---|---|---|---|")
for s in shots:
    d = s["b"] - s["a"]
    if s["kind"] == "A":
        act = "إبقاء؛ قص من 10 ث" + (" (أو أقصر مدة متاحة)" if d < 6 else "")
        w(f"| {s['seg']} | {s['id']} | بودكاست | {mm(s['seg_a'])}–{mm(s['seg_b'])} | {mm(s['a'])}–{mm(s['b'])} | {d:.1f} | {words(s['line'])} | {s['spoken']:.1f} | 10 | {act} | {s['kf']} |")
    else:
        ref = f"آخر إطار {s['seg']}.{s['k'] - 1}" if s["k"] > 1 else "—"
        w(f"| {s['seg']} | {s['id']} | موشن | {mm(s['seg_a'])}–{mm(s['seg_b'])} | {mm(s['a'])}–{mm(s['b'])} | {d:.1f} | — | — | {gen_secs(s)} | إبقاء | {ref} |")
w("\n**فحص التسلسل:**\n")
w("\n".join(f"- {x}" for x in issues) if issues else "- لا فجوات ولا تداخلات.")
w("\n\nالفجوات كلها صمت بين جمل (أقل من ثانية تقريباً) والصوت مستمر تحتها، فما في إشي بينقص من الكلام.")

w("\n---\n\n## القسم الخامس: قرارات بتحتاجك\n")
w("1. **الجمل المعلّمة «[؟]»** (هل هي سؤال؟). الترقيم بالأوامر حالياً بدون علامة سؤال. هاد بيأثر على نبرة الصوت بالمسار ب بس، وما إله أي أثر بالمسار أ:")
for p in P:
    if "[؟]" in p[2]: w(f"   - {mm(p[0])}: «{clean(p[2])}» — سؤال؟ نعم / لا")
w("2. **B12:** موافق على «ظل مقابل انعكاسه» بدل «رجلين متطابقين»؟")
w("3. **ديكور الزاوية الجانبية:** اللمبة أسطوانية بالجانبية وكروية بالأمامية. بتقبل الفرق (زاوية تانية من الغرفة)، ولا منعدّل الصور الأمامية أو الجانبية لنفس اللمبة؟")
w("4. **المسار:** أ (صوتك + مزامنة) ولا ب (صوت Flow)؟ أنا بنصح بـ أ.")
w("5. **طول الأمر:** نجرّب النسخة الكاملة هون، ولا المختصرة (`FLOW_SHOTS_OMNI.md`) مع الاعتماد على بطاقات الوكيل؟")
w("6. **مدد التوليد الأقصر:** شوف إذا Omni Flash بيعطي خيار أقل من 10 ث.")

w("\n---\n\n## القسم الخامس-ب: Jordanian Pronunciation Test Bank\n")
w("الكتابة بتضل متل ما هي بالتفريغ (القاف مكتوبة قاف). العمود 3 مأخوذ من كلامك أنت («بلفظ القاف همزة»)، مش من تحليل صوتي، فبيحتاج تأكيدك. الأعمدة 4–8 بتنعبّى بعد ما تسمع التوليد، وما في ولا نتيجة مخترعة.\n")
w("| # | الكلمة | الجملة (اللقطة) | نطق همّام المفضّل | نطق النموذج فعلياً | نوع الخطأ | الصيغة المختبرة | النتيجة | الصيغة المعتمدة |")
w("|---|---|---|---|---|---|---|---|---|")
seen, n = set(), 0
for s_ in A:
    for wd in re.findall(r"[\u0621-\u0652]+", s_["line"]):
        key = wd
        if key in seen: continue
        if "ق" in wd and wd != "يُقال": kind = "همزة (حسب كلامك)"
        elif wd in JO: kind = "عامي أردني طبيعي"
        else: continue
        seen.add(key); n += 1
        ctx = s_["line"]; k = ctx.find(wd); ctx = (("…" if k > 30 else "") + ctx[max(0, k - 30):k + len(wd) + 30].strip() + "…").replace("……", "…").replace("… …", "…")
        w(f"| {n} | {wd} | {ctx} ({s_['id']}) | {kind} | بحاجة إلى اختبار | — | {wd} | — | — |")
w("\n«يُقال» (اسم البودكاست) مستثناة: فصحى بالقاف.\n")
w("\n### عينات اختبار اللهجة الإلزامية (من مكتبة اللهجة — مش من الحلقة)\n")
w("هالجمل للاختبار بس، وما بتدخل الحلقة. ولّدها بأمر A08.1 نفسه بعد ما تبدّل الحوار، والإطار الأول K_front_a.jpg. هي بتقيس النموذج، مش كلامك.\n")
for nm, ln in (("القاف", "قلتله: بتقدر تراجع قرارك، حتى لو كنت مقتنع فيه من زمان؟"),
               ("المفردات الأردنية", "خلّيني أحكيلك شغلة. مش كل إشي بنسمعه بنفهمه، ومش كل تفسير بنوصل إله بكون صحيح."),
               ("الأسلوب التأملي", "يمكن المشكلة مش باللي صار… يمكن بالطريقة اللي فهمنا فيها اللي صار.")):
    w(f"- **{nm}:** «{ln}»")
w("\nاسمعها مقابل تسجيلك الحقيقي. ارفض أي عينة فيها نبرة سورية أو لبنانية، أو قاف بتتذبذب بين همزة وقاف بنفس المقطع، حتى لو الصوت واضح.")
w("\n---\n\n## القسم السادس: اختبار الصوت (3 لقطات)\n")
w("ولّد هالثلاث لقطات بنفس الأوامر اللي بالقسم الثالث، واسمع كل وحدة مقابل مقطع تسجيلك بنفس الاسم من `lipsync_audio/`. ولا تعتبر النطق ناجح قبل ما تسمعه.\n")
for tag, s in (("كلام تأملي هادئ", t1), ("أسئلة متتابعة", t2), ("مفردات أردنية", t3)):
    w(f"**{tag} — {s['id']}** ({s['b'] - s['a']:.1f} ث): «{s['line']}»\n")
w("""
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
""")
open("FLOW_MASTER.md", "w", encoding="utf-8").write("\n".join(L) + "\n")
print(len(shots), "shots", len(A), "A", len(Bs), "B", gen_total, "s; issues:", len(issues), "; tests:", t1["id"], t2["id"], t3["id"])
