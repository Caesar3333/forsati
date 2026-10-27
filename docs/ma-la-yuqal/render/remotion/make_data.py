"""Build src/data.json (scenes + text cards with per-word timings) and stage assets in public/."""
import json, os, shutil, re
D = os.path.abspath("../..")
P = "public"; os.makedirs(P, exist_ok=True)
tl = json.load(open(f"{D}/timeline.json")); TOTAL = tl["total_seconds"]
for f in os.listdir(f"{D}/render/layers"):
    if f.endswith(("_bg.jpg", "_fg.png", "_full.jpg")): shutil.copy(f"{D}/render/layers/{f}", P)
for f in ["4b_corridor_walk.mp4", "5_face_signature.mp4", "talking_wood_listen.mp4"]: shutil.copy(f"{D}/footage/{f}", P)
shutil.copy(f"{D}/audio/final_mix.wav", P)

# scene list: id, start, end, kind, asset, motion, fx, text top (px)
S = [
 ("hook",     0.00,  3.37, "parallax", "hook_wood_portrait",     "in",   [],                 250),
 ("train",    3.37, 12.05, "still",    "1_train",                "in",   ["rain"],           300),
 ("oldroom", 12.05, 23.77, "parallax", "2_old_room",             "in",   ["dust", "beam"],   330),
 ("mirror",  23.77, 37.29, "parallax", "3_mirror",               "in",   ["fog"],            250),
 ("door",    37.29, 43.58, "parallax", "4b_corridor_back",       "in",   ["dust", "door"],   300),
 ("eyes",    43.58, 46.07, "still",    "4a_eyes",                "hold", ["dust"],           250),
 ("walk",    46.07, 48.57, "video",    "4b_corridor_walk.mp4",   0.8,    ["leak"],           200),
 ("listen",  48.57, 54.47, "video",    "talking_wood_listen.mp4", 0.45,  [],                 1300),
 ("past",    54.47, 59.80, "still",    "5_outro_dust",           "in",   ["dust"],           760),
 ("sign",    59.80, 62.72, "video",    "5_face_signature.mp4",   1.0,    [],                 300),
 ("logo",    62.72, TOTAL, "still",    "5_outro_dust",           "hold", ["dust"],           700),
]
scenes = [dict(id=a, start=b, end=c, kind=d, asset=e, motion=f, fx=g, textTop=h) for a, b, c, d, e, f, g, h in S]
# the wood-room clip is brighter than the rest of the film: pull it down to match
GRADES = {"listen": "brightness(0.7) contrast(1.12) saturate(0.66) sepia(0.12)"}
for s in scenes:
    if s["id"] in GRADES: s["grade"] = GRADES[s["id"]]
def top_at(t):
    for s in scenes:
        if s["start"] - 0.2 <= t < s["end"]: return s["textTop"]
    return 300

def tsec(s): h, m, r = s.split(":"); s, ms = r.split(","); return int(h) * 3600 + int(m) * 60 + int(s) + int(ms) / 1000
srt = open(f"{D}/subtitles.srt", encoding="utf8").read().strip().split("\n\n")
cards = []
for blk, ph in zip(srt, tl["phrases"]):
    _, times, text = blk.split("\n", 2)
    show, hide = [tsec(x.strip()) for x in times.split("-->")]
    if "ما لا يُقال" in text: continue
    # per-word timings, spread over the spoken span by letter count (phrases are 1-3 s long)
    words = text.split(" "); emph = ph["emphasis"].split(" ") if ph["emphasis"] else []
    letters = [len(re.sub(r"[^\w]", "", w)) or 1 for w in words]; tot = sum(letters)
    a, b, acc, ws = ph["start"], ph["end"], 0, []
    for w, n in zip(words, letters):
        ws.append(dict(w=w, t=round(a + (b - a) * acc / tot, 3), em=any(e and e in w for e in emph))); acc += n
    style = "climax" if ph["emphasis"] == "من متى" else ("label" if text.startswith("«") else "")
    cards.append(dict(show=round(show, 3), hide=round(hide, 3), top=top_at(show), words=ws, style=style))
# the four «labels» stack and dissolve together
labels = [c for c in cards if c["style"] == "label"]
for i, c in enumerate(labels): c["hide"] = labels[-1]["hide"]; c["top"] = 250 + i * 120
json.dump(dict(total=TOTAL, fps=30, scenes=scenes, cards=cards, freezeAt=9.58,
               logo=dict(show=62.95, hide=TOTAL)), open("src/data.json", "w"), ensure_ascii=False, indent=1)
print(len(scenes), "scenes,", len(cards), "cards")
