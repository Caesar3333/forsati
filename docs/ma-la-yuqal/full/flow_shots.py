"""Write FLOW_SHOTS_FULL.md: every A-roll and B-roll shot of the full episode as a Google Flow prompt
(<= 8 s each, chained: shot N+1 starts from the last frame of shot N inside the same scene)."""
import json
from phrases import P
plan = json.load(open("plan.json"))
REF = "{REF_ID}"                       # the approved character image / media_id in Flow
WARDROBE = "{WARDROBE}"
IDENT = ("Keep his exact identity from the reference: short dark hair with receding temples, trimmed beard, "
         "moustache with goatee, grey hairs in the beard, small dark mole above the LEFT corner of his upper lip "
         "(image-right when he faces camera). Natural skin texture, not beautified.")
SET = ("dark mahogany podcast studio, burnt-walnut desk, black broadcast microphone on a boom arm beside his mouth "
       "(never covering it), shelves of books softly out of focus, warm amber tungsten practical lamp, gentle haze")
LOOK = "cinematic low-key warm lighting, amber bokeh, teal-black shadows, rich earth tones, fine film grain, shallow depth of field"
CONT = "Begin exactly from the provided first frame (last frame of the previous shot): same person, clothes, set, light and lens; continue the motion with no cut."
ANGLES = [("Medium close-up, eye level, very slow push-in", "أمامية"), ("Three-quarter side angle from his left, 85mm, slow lateral drift", "جانبية")]
B = {
 "B01": "Abstract dark space; a single glowing copper question-mark outline slowly forms from drifting dust, then a second fainter question mark appears behind it like a reflection, as if a memory is being re-examined. Slow push-in.",
 "B02": "Old faded photographs float slowly in a dark void like memories, gently rotating; one by one they lose colour and dissolve into warm dust, while a soft amber light remains where they were. Slow drift.",
 "B03": "Close-up of a single old sepia photograph of an empty room lying on dark wood; its edges begin to burn slowly with glowing embers, the image curling but never fully disappearing. Macro, slow push-in.",
 "B04": "Split vertical composition: on one side a man's hand opens slowly, letting light through (humility); on the other a hand closes into a fist around a small glowing card (certainty). Dark background, warm light. Locked-off.",
 "B05": "Paper cards flutter down in slow motion onto a dark desk and pile up, each card blank and slightly worn, warm side light; at the end the pile slides and falls off the edge. Slow motion.",
 "B06": "The camera pulls back slowly down a dark corridor away from a man standing still in front of a tall doorway glowing with soft golden light and haze; the man stays small in the frame.",
 "B07": "A fogged bathroom mirror in a dim room; a hand wipes one streak through the condensation, revealing a blurred reflection of a younger version of the same man, which slowly fades back into fog. One warm bulb.",
 "B08": "A single word-shaped ribbon of warm light twists slowly in a dark void, tightening into a knot and then loosening into a straight line moving forward. Abstract, elegant.",
 "B09": "A thin glowing copper thread runs across a dark landscape of shadowy hills, carrying a tiny light safely across a crack in the ground; once across, the thread gently loosens and fades.",
 "B10": "A dark human silhouette in profile; inside it, a galaxy of warm particles, tiny glowing fragments of memories (blurry rooms, faces, hands) drift slowly like stars. Slow push-in into the silhouette.",
 "B11": "An old jigsaw-like photograph on dark wood is missing several pieces; the missing pieces drift in slowly from the darkness and settle, but one corner stays incomplete. Overhead, slow push-in.",
 "B12": "Two identical men sit facing each other across a dark desk like reflections in a mirror, both silent, warm lamp between them; the camera slowly circles them. Same man, same clothes on both sides.",
 "B13": "A large glass lens shaped like a question mark hangs in a dark room; behind it the world is blurred, and as the camera moves through the lens the room behind becomes sharp and warmer. Slow push-through.",
 "B14": "Fast cinematic rewind of moments: a train window at night, a covered living room, a fogged mirror, a lit doorway, each flickering backwards in reverse motion, then stopping on a single still warm frame.",
 "B15": "A black chalk-like line slowly strikes across a faded old photograph on dark wood; then a warm light grows from beneath it, illuminating the photo gently. Slow push-in.",
}
def phr(a, b): return [p for p in P if p[0] >= a - 0.05 and p[0] < b]
def chunks(a, b, limit=8.0):
    ps = phr(a, b); out, s, cur = [], a, []
    for p in ps:
        if cur and p[1] - s > limit: out.append((s, cur[-1][1] + 0.1, cur)); s, cur = p[0], []
        cur.append(p)
    out.append((s, b, cur)); return out
items = [("A", a) for a in plan["aroll"]] + [("B", b) for b in plan["broll"]]
items.sort(key=lambda x: x[1]["start"])
mm = lambda x: f"{int(x // 60)}:{x % 60:04.1f}"
L = []
n = 0
for kind, it in items:
    sid = it["id"]
    if kind == "A":
        ang, tag = ANGLES[(int(sid[1:]) - 1) % 2]
        parts = chunks(it["start"], it["end"])
        L.append(f"\n### {sid} — {mm(it['start'])}–{mm(it['end'])} · بودكاست ({tag}) · {len(parts)} {"لقطة" if len(parts) == 1 else "لقطات"}\n")
        for k, (a, b, ps) in enumerate(parts, 1):
            n += 1; line = " ".join(p[2].replace(" [؟]", "") for p in ps)
            L.append(f"**{sid}.{k}** ({b - a:.1f} ث) {'— Ingredients: ' + REF if k == 1 else '— Frames to Video: أول إطار = آخر إطار من ' + sid + '.' + str(k - 1)}\n")
            L.append("```\n" + " ".join(filter(None, [
                f"{ang}, vertical 9:16, 8 seconds.",
                f"Hammam Deek (the man in reference {REF}), a calm, thoughtful podcast host in {WARDROBE}, seated in a {SET}.",
                "He speaks to an unseen listener just off-camera with calm, sincere delivery: subtle head tilts, slow blinks, occasional restrained hand gesture, expressive eyes; lip movement natural and unhurried.",
                f'He says in Levantine Arabic: "{line}"',
                CONT if k > 1 else "",
                f"Lighting & atmosphere: {LOOK}.", IDENT,
                "Style: photorealistic cinematic podcast film still in motion. No on-screen text, no subtitles, no logos."])) + "\n```\n")
    else:
        parts = [(it["start"], it["end"])] if it["end"] - it["start"] <= 8.5 else \
                [(it["start"] + i * (it["end"] - it["start"]) / ((it["end"] - it["start"]) // 8 + 1),
                  it["start"] + (i + 1) * (it["end"] - it["start"]) / ((it["end"] - it["start"]) // 8 + 1))
                 for i in range(int((it["end"] - it["start"]) // 8 + 1))]
        line = " ".join(p[2].replace(" [؟]", "") for p in phr(it["start"], it["end"]))
        L.append(f"\n### {sid} — {mm(it['start'])}–{mm(it['end'])} · موشن · {len(parts)} {"لقطة" if len(parts) == 1 else "لقطات"}\n> الجملة على الشاشة (تُضاف في المونتاج، لا في الفيديو): {line}\n")
        for k, (a, b) in enumerate(parts, 1):
            n += 1
            L.append(f"**{sid}.{k}** ({b - a:.1f} ث){' — Frames to Video: أول إطار = آخر إطار من ' + sid + '.' + str(k - 1) if k > 1 else ''}\n")
            L.append("```\n" + " ".join(filter(None, [
                "Vertical 9:16, 8 seconds, cinematic motion-graphic B-roll.", B[sid],
                CONT if k > 1 else ("Continue the motion slowly and evolve the same scene; do not introduce new objects." if False else ""),
                f"Lighting & atmosphere: {LOOK}. Palette: near-black #0B0D10, ivory, muted copper #B8835A.",
                "No people unless described. No readable text, letters or numbers anywhere in the image (Arabic typography is added in the edit).",
                "Calm, slow, elegant motion; no flashes, no shake."])) + "\n```\n")
head = f"""# أوامر Google Flow للحلقة الكاملة ({n} لقطة)

**قبل النسخ، استبدل:**
- `{REF}` ← معرّف صورة الشخصية المعتمدة في Flow (media_id) أو ارفعها كـ Ingredient.
- `{WARDROBE}` ← لبس واحد ثابت لكل الحلقة، مثل: `a dark charcoal turtleneck under a dark camel blazer` أو `a black t-shirt under a charcoal blazer`.

**قواعد التسلسل:**
- **أول لقطة في كل مشهد:** وضع Ingredients to Video، مع الصورة المرجعية.
- **اللقطات التالية في نفس المشهد:** وضع Frames to Video، وأول إطار فيها = آخر إطار من اللقطة السابقة. استخرجه بأمر:
  `ffmpeg -sseof -0.1 -i prev.mp4 -frames:v 1 last.jpg`
  أو استخدم Extend في Flow.
- **صوت Flow يُكتم دائماً.** الصوت النهائي هو تسجيلك. الجملة العربية في أوامر البودكاست هدفها حركة الشفاه فقط.
- **النص العربي لا يُطلب من نموذج الفيديو أبداً.** يُضاف في المونتاج من `subtitles_full.srt`.
- **افحص كل لقطة:** الشامة فوق يسار الشفة (يمين الصورة)، والسكسوكة، وأن المايك لا يغطي الفم، وثبات اللبس.
"""
open("FLOW_SHOTS_FULL.md", "w").write(head + "".join(L))
print(n, "shots")
