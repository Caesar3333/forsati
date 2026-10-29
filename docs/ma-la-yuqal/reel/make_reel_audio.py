"""Facebook reel: picks the strongest excerpts of the real voice into one story arc.
Writes voice_reel.wav (48 kHz mono, untouched voice, short fades at cut points) and reel_timeline.json."""
import json, subprocess, sys, numpy as np, soundfile as sf
sys.path.insert(0, "../full")
from phrases import P
SR = 48000
SRC = "../full/voice_full_-14LUFS.mp3"
# (phrase index range, story role) — narrative: question → old story → labels → turn → climax → wound → new question → resolution → sign-off
SEGS = [((7, 8), "hook"), ((15, 16), "old_story"), ((28, 32), "labels"), ((33, 35), "climax"),
        ((38, 39), "wound"), ((42, 43), "new_question"), ((75, 76), "resolve"), ((77, 77), "sign")]
GAP = {"climax": 1.35, "sign": 0.7}          # silence after a segment (default 0.45); 1.35 s holds the climax question
PRE, POST, FADE = 0.06, 0.14, 0.012
raw = subprocess.run(["ffmpeg", "-v", "error", "-i", SRC, "-f", "f32le", "-ac", "1", "-ar", str(SR), "-"], capture_output=True).stdout
x = np.frombuffer(raw, np.float32)

def rms_db(t0, w=0.06):
    i = int(t0 * SR); seg = x[max(0, i):i + int(w * SR)]
    return 20 * np.log10(np.sqrt(np.mean(seg ** 2)) + 1e-9) if len(seg) else -120
def quiet(t0, limit, direction):
    """Walk from t0 toward limit (phrase timestamps can be early or late) to the first sustained silence
    (120 ms below -58 dB) and cut 50 ms into it; if speech never stops, take the quietest 120 ms in between."""
    W, ts, t_ = 0.12, [], t0
    while (t_ + W < limit) if direction > 0 else (t_ - W > limit):
        st = t_ if direction > 0 else t_ - W
        d = rms_db(st, W); ts.append((d, st))
        if d < -58: return st + 0.05 if direction > 0 else st + W - 0.05
        t_ += 0.01 * direction
    return (min(ts)[1] + W / 2) if ts else t0
out, tl, cur = [], [], 0.0
for (i0, i1), role in SEGS:
    prev_end = P[i0 - 1][1] if i0 > 0 else 0.0
    next_start = P[i1 + 1][0] if i1 + 1 < len(P) else len(x) / SR
    a = quiet(P[i0][0] - PRE, prev_end, -1)
    b = quiet(P[i1][1] + 0.02, next_start, +1)
    seg = x[int(a * SR):int(b * SR)].copy(); n = int(FADE * SR)
    seg[:n] *= np.linspace(0, 1, n); seg[-n:] *= np.linspace(1, 0, n)
    phrases = [dict(t0=round(cur + p[0] - a, 3), t1=round(cur + p[1] - a, 3), text=p[2].replace(" [؟]", "")) for p in P[i0:i1 + 1]]
    tl.append(dict(role=role, src=[round(a, 3), round(b, 3)], start=round(cur, 3), end=round(cur + b - a, 3), phrases=phrases))
    out.append(seg); cur += b - a
    g = GAP.get(role, 0.45); out.append(np.zeros(int(g * SR), np.float32)); cur += g
lead = 0.35                                    # breath of music before the first word
y = np.concatenate([np.zeros(int(lead * SR), np.float32)] + out)
for s in tl:
    s["start"] = round(s["start"] + lead, 3); s["end"] = round(s["end"] + lead, 3)
    for p in s["phrases"]: p["t0"] = round(p["t0"] + lead, 3); p["t1"] = round(p["t1"] + lead, 3)
y = np.concatenate([y, np.zeros(int(1.6 * SR), np.float32)])   # room for the logo tail
sf.write("voice_reel.wav", y, SR)
json.dump(dict(duration=round(len(y) / SR, 3), segments=tl), open("reel_timeline.json", "w"), ensure_ascii=False, indent=1)
print(round(len(y) / SR, 2), "s")
for s in tl: print(s["role"], s["start"], s["end"], s["src"])
