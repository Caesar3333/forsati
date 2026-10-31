"""Short reels: cut each reel's excerpts from the real voice at true silences (no word is clipped),
join them with short gaps, and write voice/<id>.wav + timelines.json (global phrase index -> reel time)."""
import json, subprocess, sys, numpy as np, soundfile as sf
sys.path.insert(0, "../full")
from phrases import P
SR, LEAD, GAP, TAIL = 48000, 0.25, 0.45, 2.6           # music breath before the first word; gap between excerpts; logo tail
x = np.frombuffer(subprocess.run(["ffmpeg", "-v", "error", "-i", "../full/voice_full_-14LUFS.mp3", "-f", "f32le", "-ac", "1",
                                  "-ar", str(SR), "-"], capture_output=True).stdout, np.float32)
def rms_db(t0, w):
    seg = x[max(0, int(t0 * SR)):int((t0 + w) * SR)]
    return 20 * np.log10(np.sqrt(np.mean(seg ** 2)) + 1e-9) if len(seg) else -120
def quiet(t0, limit, d):
    """Walk from t0 toward limit to the first sustained silence (120 ms below -58 dB) and cut 50 ms into it;
    if speech never stops, take the quietest 120 ms in between."""
    W, ts, t_ = 0.12, [], t0
    while (t_ + W < limit) if d > 0 else (t_ - W > limit):
        st = t_ if d > 0 else t_ - W
        v = rms_db(st, W); ts.append((v, st))
        if v < -58: return st + 0.05 if d > 0 else st + W - 0.05
        t_ += 0.01 * d
    return (min(ts)[1] + W / 2) if ts else t0
cfg = json.load(open("reels.json")); out = {}
import os; os.makedirs("voice", exist_ok=True)
for rid, c in cfg.items():
    parts, cur, phrases, segs = [np.zeros(int(LEAD * SR), np.float32)], LEAD, {}, []
    for k, (i0, i1) in enumerate(c["segs"]):
        a = quiet(P[i0][0] - 0.06, P[i0 - 1][1] if i0 else 0.0, -1)
        b = quiet(P[i1][1] + 0.02, P[i1 + 1][0] if i1 + 1 < len(P) else len(x) / SR, +1)
        seg = x[int(a * SR):int(b * SR)].copy(); n = int(0.012 * SR)
        seg[:n] *= np.linspace(0, 1, n); seg[-n:] *= np.linspace(1, 0, n)
        for i in range(i0, i1 + 1):
            phrases[i] = dict(t0=round(cur + P[i][0] - a, 3), t1=round(cur + P[i][1] - a, 3), text=P[i][2].replace(" [؟]", ""))
        segs.append(dict(start=round(cur, 3), end=round(cur + b - a, 3), src=[round(a, 3), round(b, 3)]))
        parts.append(seg); cur += b - a
        if k < len(c["segs"]) - 1: parts.append(np.zeros(int(GAP * SR), np.float32)); cur += GAP
    voice_end = cur
    hold = c.get("hold_after", 0.0)
    parts.append(np.zeros(int((hold + TAIL) * SR), np.float32)); cur += hold + TAIL
    sf.write(f"voice/{rid}.wav", np.concatenate(parts), SR)
    out[rid] = dict(title=c["title"], duration=round(cur, 3), voice_end=round(voice_end, 3), logo_at=round(voice_end + hold + 0.3, 3),
                    segs=segs, phrases=phrases, hit=c["hit"], chords=c["chords"])
    print(rid, round(cur, 2), "s", [s["src"] for s in segs])
json.dump(out, open("timelines.json", "w"), ensure_ascii=False, indent=1)
