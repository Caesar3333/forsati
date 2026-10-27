"""Split the corrected phrases into on-screen cards (<= 7 words) and write subtitles_full.srt + full.json."""
import json, re
from phrases import P
def ts(x):
    ms = int(round(x * 1000)); h, ms = divmod(ms, 3600000); m, ms = divmod(ms, 60000); s, ms = divmod(ms, 1000)
    return f"{h:02}:{m:02}:{s:02},{ms:03}"
cards = []
for a, b, text, emph in P:
    parts = [p.strip() for p in re.split(r"(?<=…)\s+|(?<=[؟:])\s+", text) if p.strip()]
    # merge tiny parts, split long ones at ~7 words
    out = []
    for p in parts:
        w = p.split()
        while len(w) > 8: out.append(" ".join(w[:6])); w = w[6:]
        if out and len(out[-1].split()) + len(w) <= 4: out[-1] += " " + " ".join(w)
        else: out.append(" ".join(w))
    i = 0                                 # a lone word never gets its own card: join it to the next part
    while i < len(out) - 1:
        if len(out[i].split()) == 1 and len(out[i + 1].split()) < 8: out[i:i + 2] = [out[i] + " " + out[i + 1]]
        else: i += 1
    n = sum(len(re.sub(r"\W", "", p)) for p in out) or 1; t = a
    for p in out:
        d = (b - a) * len(re.sub(r"\W", "", p)) / n
        cards.append(dict(start=round(t, 2), end=round(t + d, 2), text=p, emphasis=emph if emph and emph in p else ""))
        t += d
with open("subtitles_full.srt", "w") as f:
    for i, c in enumerate(cards, 1):
        nxt = cards[i]["start"] if i < len(cards) else c["end"] + 1
        f.write(f"{i}\n{ts(max(0, c['start'] - 0.1))} --> {ts(min(c['end'] + 0.3, nxt - 0.12))}\n{c['text']}\n\n")
json.dump(dict(duration=293.15, cards=cards), open("full.json", "w"), ensure_ascii=False, indent=1)
print(len(P), "phrases ->", len(cards), "cards;", sum(1 for _, _, t, _ in P if "[؟]" in t), "phrases with [؟]")
