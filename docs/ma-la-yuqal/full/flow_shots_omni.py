"""FLOW_SHOTS_OMNI.md — shot list rebuilt on what Flow reported: Omni 1.1 Flash, <= 10 s per generation,
avatar @me, compact prompts (<= ~150 words) in Flow's preferred order:
[Subject & Action] + [Camera & Composition] + [Environment & Lighting] + [Style & Mood] + [Strict Constraints]."""
import json, re
from phrases import P
plan = json.load(open("plan.json"))
LIMIT = 10.0
WARDROBE = "a navy blazer over a heather warm-grey t-shirt"
SET = ("dark walnut vertical-slat wall, wooden shelves with a few books, a warm amber globe Edison lamp glowing in soft bokeh, "
       "light walnut desk, black dynamic microphone on a boom arm positioned slightly to the side of his mouth")
LIGHT = "moody low-key lighting, soft warm tungsten key from camera-left, gentle shadows"
STYLE = "photorealistic cinematic podcast footage, natural skin texture, shallow depth of field, calm and reflective"
GUARD = ("Never mirror the image. Never flip the image horizontally. Keep the small dark mole above the LEFT corner of his upper lip (viewer's right) "
         "and his connected moustache-goatee beard with grey hairs. Mouth always visible. No on-screen text. No overlays. No titles.")
CAM = {"front": "Medium close-up, eye level, slow 2% push-in", "side": "Three-quarter close-up from his right side (about 30 degrees), both eyes and the full mouth visible, slow subtle pan"}
REFLECT = ["حالك", "حالنا", "طبيعتي", "من متى", "بتتعبك", "تسكت", "أصعب حوار", "مع حالنا"]
B = {
 "B01": "A single glowing copper question mark slowly forms from drifting golden dust in a dark void, a fainter reflection appearing behind it.",
 "B02": "Old faded photographs float slowly in darkness like memories, gently turning, then dissolving into warm dust while a soft amber glow remains.",
 "B03": "A vintage sepia photograph of an empty room on dark wood slowly catches fire at one corner, glowing embers curling the edge.",
 "B04": "Split vertical frame: one hand slowly opens letting warm light through, the other closes into a fist around a small glowing card.",
 "B05": "Blank worn paper cards flutter down in slow motion onto a dark desk and pile up, then the pile slides off the edge.",
 "B06": "The camera slowly pulls back down a dark corridor from a man standing before a tall doorway glowing with golden light and haze.",
 "B07": "A hand wipes a streak through a fogged bathroom mirror in a dim room, revealing a blurred younger reflection that fades back into fog.",
 "B08": "A ribbon of warm light twists into a knot in a dark void, then slowly loosens into a straight line moving forward.",
 "B09": "A thin glowing copper thread carries a tiny light across a dark crack in the ground, then gently loosens and fades.",
 "B10": "A dark human silhouette in profile filled with a slow galaxy of warm particles and faint glowing fragments of memories.",
 "B11": "An old photograph on dark wood is missing several jigsaw pieces; the pieces drift in from darkness, one corner stays empty.",
 "B12": "Two identical men sit facing each other across a dark desk like mirror reflections, silent, a warm lamp between them; the camera slowly circles.",
 "B13": "A large glass lens shaped like a question mark hangs in a dark room; as the camera moves through it the blurred room behind becomes sharp and warm.",
 "B14": "Fast reverse-motion flicker of moments (a rainy train window, a covered living room, a fogged mirror, a lit doorway), stopping on one still warm frame.",
 "B15": "A dark line slowly strikes across a faded photograph on dark wood, then warm light grows from beneath it.",
}
BLOOK = "Macro / cinematic lens, shallow depth of field, warm tungsten light against deep teal-black shadows, slow elegant motion, 24fps. No people unless described. No readable text. No letters. No numbers."
# urban Jordanian: qaf pronounced as a glottal stop; the title phrase «يُقال» stays as is
QAF = {"موقف": "موأف", "بموقف": "بموأف", "الموقف": "الموأف", "لمواقف": "لمواأف", "حق": "حأ", "قاعد": "آعد",
       "وقتها": "وأتها", "بوقت": "بوأت", "الوقت": "الوأت", "طريقة": "طريئة", "بطريقة": "بطريئة", "الطريقة": "الطريئة",
       "بهالطريقة": "بهالطريئة", "القصة": "الأصة", "قصة": "أصة", "وقف": "وأف", "نوقف": "نوأف", "استوقفني": "استوأفني",
       "قديمة": "أديمة", "مقتنع": "مأتنع", "قابلنا": "آبلنا", "الحقيقة": "الحئيئة", "لحقيقة": "لحئيئة", "حقيقي": "حئيئي",
       "القدر": "الأدر", "نوافقه": "نوافأه", "بقناعاتنا": "بأناعاتنا", "نلاقي": "نلائي", "وقبل": "وأبل"}
QAF_AS_HAMZA = False  # the tested A01.1 prompt worked with normal spelling (قاعد)
def jo(t): return re.sub(r"[\u0621-\u0652]+", lambda m: QAF.get(m.group(), m.group()), t)
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
mm = lambda x: f"{int(x // 60)}:{x % 60:04.1f}"
items = sorted([("A", a) for a in plan["aroll"]] + [("B", b) for b in plan["broll"]], key=lambda x: x[1]["start"])
L, n, secs, LS, KC = [], 0, 0.0, [], {"front": 0, "side": 0}
for kind, it in items:
    sid = it["id"]
    if kind == "A":
        parts = chunks(it["start"], it["end"])
        L.append(f"\n### {sid} — {mm(it['start'])}–{mm(it['end'])} · بودكاست · {len(parts)} {'لقطة' if len(parts) == 1 else 'لقطات'}\n")
        for k, (a, b, ps) in enumerate(parts, 1):
            n += 1; secs += 10; LS.append((f"{sid}.{k}", a, b))
            line = " ".join(p[2].replace(" [؟]", "") for p in ps)
            ang = "side" if any(w in line for w in REFLECT) else ("front" if k % 2 else "side")
            # every podcast shot starts from an approved master keyframe (KEYFRAMES.md); variants a/b alternate so cuts don't repeat a pose
            kf = f"K_{ang}_{'ab'[KC[ang] % 2]}.jpg"; KC[ang] += 1
            mode = f"Frames to Video — First frame: {kf} + @me"
            L.append(f"**{sid}.{k}** ({b - a:.1f} ث → ولّد 10 ث) — {mode} — زاوية: {'جانبية' if ang == 'side' else 'أمامية'}\n```\n"
                     f"9:16 vertical. @me, a calm thoughtful podcast host in {WARDROBE}, speaks naturally to an unseen listener with subtle head tilts and slow blinks, "
                     f"saying in spoken urban Jordanian (Ammani) Levantine Arabic: \"{jo(line) if QAF_AS_HAMZA else line}\". {CAM[ang]}. "
                     + "Start from the provided first frame and keep its exact framing, set, wardrobe and light; move only the head, face and hands. "
                     + f"Set: {SET}. {LIGHT}. {STYLE}. {GUARD}\n```\n")
    else:
        parts = split_even(it["start"], it["end"])
        line = " ".join(p[2].replace(" [؟]", "") for p in phr(it["start"], it["end"]))
        L.append(f"\n### {sid} — {mm(it['start'])}–{mm(it['end'])} · موشن · {len(parts)} {'لقطة' if len(parts) == 1 else 'لقطات'}\n> النص على الشاشة (يُضاف في المونتاج): {line}\n")
        for k, (a, b) in enumerate(parts, 1):
            n += 1; dur = 10 if b - a > 8 else (8 if b - a > 6 else 6); secs += dur
            L.append(f"**{sid}.{k}** ({b - a:.1f} ث → ولّد {dur} ث){' — First frame = آخر إطار من ' + sid + '.' + str(k - 1) if k > 1 else ''}\n```\n"
                     f"9:16 vertical cinematic B-roll metaphor. {B[sid]} "
                     + ("Continue the same scene from the provided first frame, evolving slowly. No cut. " if k > 1 else "")
                     + f"{BLOOK}\n```\n")
credits = secs / 10 * 15
head = f"""# أوامر Google Flow — Omni 1.1 Flash (حتى 10 ث للقطة) — {n} لقطة

مبنية على إجابة Flow: الأفتار `@me`، و10 ثوانٍ كحد أقصى للتوليد الواحد، و720p، وأوامر من 100 إلى 180 كلمة، والقيود مكتوبة كجمل داخل الأمر لأن خانة الأوامر السلبية غير مدعومة.

- **أول لقطة في كل مقطع بودكاست:** وضع Ingredients مع `@me` وصورة `studio_front.jpg`.
- **كل لقطة بودكاست تبدأ من صورة أساسية معتمدة** (`KEYFRAMES.md`): Frames to Video، والإطار الأول هو `K_front_a/b.jpg` أو `K_side_a/b.jpg` حسب الزاوية، مع `@me`.
- **ولّد كل لقطة بطول 10 ثوانٍ أو أكثر من مدتها**، وتُقص لاحقاً في المونتاج على توقيت الخطة.
- **صوت Flow يُكتم.** الصوت النهائي هو تسجيلك.
- **التقدير بدون إعادات:** ‎{secs:.0f} ثانية توليد ≈ **{credits:.0f} رصيد** بدقة 720p. احسب ×1.5 إلى ×2 للإعادات ≈ **{credits * 1.5:.0f}–{credits * 2:.0f} رصيد**.
"""
open("FLOW_SHOTS_OMNI.md", "w").write(head + "".join(L))
print(n, "shots", secs, "s", credits, "credits")

# lip-sync audio: one slice of the real voice per A-roll shot, same range as the shot
import os, subprocess
os.makedirs("lipsync_audio", exist_ok=True)
for sid, a, b in LS:
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", f"{a:.3f}", "-to", f"{b:.3f}", "-i", "voice_full_-14LUFS.mp3",
                    "-ac", "1", "-ar", "48000", f"lipsync_audio/{sid}.wav"], check=True)
json.dump([{"shot": sid, "start": round(a, 3), "end": round(b, 3), "dur": round(b - a, 3)} for sid, a, b in LS],
          open("lipsync_audio/manifest.json", "w"), ensure_ascii=False, indent=1)
print(len(LS), "lip-sync slices")
