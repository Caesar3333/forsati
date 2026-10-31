"""Short-reel score: original procedural music + sound design under the real voice, arranged from timelines.json.
Usage: short_score.py <reel_id> <out_dir>. Writes <out_dir>/<reel_id>.wav (48 kHz stereo, -14 LUFS)."""
import sys, json, re, subprocess, numpy as np, soundfile as sf
RID, OUT = sys.argv[1], sys.argv[2]
VOICE = f"voice/{RID}.wav"
TL = json.load(open("timelines.json"))[RID]
VIS = json.load(open("visuals.json"))[RID]
SR, T = 48000, TL["duration"]
N = int(SR * T); t = np.arange(N) / SR
rng = np.random.default_rng(abs(hash(RID)) % 1000)
strip = lambda w: re.sub(r"[…؟،.:«»!]", "", w)
def word_t(pi, word):
    p = TL["phrases"][str(pi)]; ws = p["text"].split(); wt = [len(strip(x)) + 1 for x in ws]; tot = sum(wt); acc = 0
    for x, k in zip(ws, wt):
        if strip(x) == strip(word): return p["t0"] + (p["t1"] - p["t0"]) * acc / tot
        acc += k
    raise KeyError(word)
def ref(r):
    if r == "logo": return TL["logo_at"]
    pi, w = r; return TL["phrases"][str(pi)]["t0"] if w is None else word_t(pi, w)
def env(t0, t1, a, r):
    e = np.clip((t - t0) / max(a, 1e-3), 0, 1) * np.clip((t1 - t) / max(r, 1e-3), 0, 1)
    return np.sin(e * np.pi / 2) ** 2
def fft_filter(x, lo=20, hi=20000, tilt=0.0):
    X = np.fft.rfft(x); f = np.fft.rfftfreq(len(x), 1 / SR)
    g = 1 / (1 + (f / hi) ** 4) * (1 - 1 / (1 + (f / lo) ** 4))
    if tilt: g = g * (np.maximum(f, 20) / 1000) ** tilt
    return np.fft.irfft(X * g, len(x))
def reverb(x, secs=3.2, wet=0.35, seed=1):
    r = np.random.default_rng(seed); n = int(secs * SR); ti = np.arange(n) / SR
    out = []
    for ch in range(2):
        ir = r.standard_normal(n) * np.exp(-ti / (secs / 5)); ir = fft_filter(ir, 120, 6000); ir /= np.abs(ir).sum() ** 0.5 * 40
        L = len(x) + n; y = np.fft.irfft(np.fft.rfft(x, L) * np.fft.rfft(ir, L), L)[:len(x)]
        out.append(x * (1 - wet) + y * wet * 6)
    return np.stack(out, 1)
def pad(freqs, t0, t1, a=3.0, r=3.0, amp=0.1):
    y = np.zeros(N); e = env(t0, t1, a, r); m = e > 0
    for i, f in enumerate(freqs):
        for d in (-0.0016, 0, 0.0021):
            ph = rng.uniform(0, 2 * np.pi)
            y[m] += np.sin(2 * np.pi * f * (1 + d) * t[m] + ph) * (0.6 + 0.4 * np.sin(2 * np.pi * (0.05 + 0.02 * i) * t[m] + ph))
            y[m] += 0.18 * np.sin(4 * np.pi * f * (1 + d) * t[m] + ph)
    return y * e * amp / max(1, len(freqs))
def piano(f, t0, amp=0.12, decay=3.5):
    y = np.zeros(N); m = (t >= t0) & (t < t0 + decay * 2); tt = t[m] - t0
    for k, (h, a) in enumerate([(1, 1), (2, .45), (3, .22), (4, .12), (5.02, .06), (6.05, .04)]):
        y[m] += a * np.sin(2 * np.pi * f * h * (1 + 0.0004 * h * h) * tt) * np.exp(-tt * (1.2 + 0.7 * k) / decay * 2.2)
    y[m] *= np.minimum(tt / 0.012, 1)
    return y * amp
def shaped_noise(t0, dur, f0, f1, bw=0.6, amp=0.1, seed=0, curve="rise_fall"):
    """Band-limited noise whose centre sweeps f0->f1 (log), via STFT masking."""
    n = int(dur * SR); x = np.random.default_rng(seed).standard_normal(n + 2048)
    hop, win = 256, np.hanning(1024); y = np.zeros(len(x))
    fr = np.fft.rfftfreq(1024, 1 / SR)
    for i, s in enumerate(range(0, n, hop)):
        p = min(1, s / n); fc = f0 * (f1 / f0) ** p
        g = np.exp(-0.5 * (np.log2(np.maximum(fr, 1) / fc) / bw) ** 2)
        y[s:s + 1024] += np.fft.irfft(np.fft.rfft(x[s:s + 1024] * win) * g, 1024) * win
    y = y[:n]; p = np.linspace(0, 1, n)
    e = {"rise_fall": np.sin(np.pi * p) ** 2 * (0.3 + 0.7 * p), "rise": p ** 3, "fall": (1 - p) ** 2}[curve]
    out = np.zeros(N); i0 = int(t0 * SR); i1 = min(N, i0 + n); out[i0:i1] = (y * e)[:i1 - i0]
    return out / (np.abs(out).max() + 1e-9) * amp
def sub_hit(t0, amp=0.35, dur=2.0):
    y = np.zeros(N); m = (t >= t0) & (t < t0 + dur); tt = t[m] - t0
    f = 52 * np.exp(-tt * 0.6) + 30; y[m] = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 2.2) * np.minimum(tt / 0.01, 1)
    return y * amp
def at(x, t0): y = np.zeros(N); i = int(t0 * SR); y[i:i + len(x)] = x[:N - i]; return y

# ---------------- music ----------------
A1, A2, B2, C3, D3, E3, F2, F3, G3, A3, B3, C4, D4, E4, G4, B4, E2 = 55, 110, 123.47, 130.81, 146.83, 164.81, 87.31, 174.61, 196, 220, 246.94, 261.63, 293.66, 329.63, 392, 493.88, 82.41
PROG = {"tension": [[A2, E3, B3, C4], [F2, C3, E3, A3], [A2, D3, F3, E4], [E2, A2, B2, E3, B3]],
        "tender":  [[C3, E3, G3, B3], [A2, E3, A3, C4], [F2, A2, C3, E3, G3], [C3, G3, B3, E4]],
        "warm":    [[F2, A2, C3, E3, G3], [C3, E3, G3, B3], [A2, E3, A3, C4], [F2, C3, E3, A3]]}[TL["chords"]]
LO = ref(VIS["logo"]) if "logo" in VIS else TL["logo_at"]
screens = [ref(s["at"]) for s in VIS["screens"]] + [LO]
hit = ref(TL["hit"]); VE = TL["voice_end"]
mus = pad([A1], 0, T, 1.0, 2.0, 0.08)
for k, (a, b) in enumerate(zip(screens, screens[1:])):
    ch = PROG[k % len(PROG)]
    mus += pad(ch, max(0, a - 0.5), b + 0.8, 0.8, 1.2, 0.11) * (np.clip(1 + (t - a) / 6, 1, 1.8) if TL["chords"] == "tension" else 1)
    mus += piano(ch[-1] * 2 if ch[-1] < 200 else ch[-1], a + 0.02, 0.065)
lo = LO
mus += pad([A2, E3, A3, C4, E4], lo - 0.3, T, 0.6, 1.6, 0.09)
mus += piano(A2, lo + 0.05, 0.15, 4) + piano(A3, lo + 0.07, 0.08, 4) + piano(E4, lo + 0.1, 0.05, 4)
if TL["chords"] == "tension":                                   # faint heartbeat building into the hit
    for b in np.arange(max(0.5, hit - 9), hit - 0.25, 60 / 58):
        k = 1 - (hit - b) / 9
        mus += sub_hit(b, 0.03 + 0.06 * k, 0.35) + sub_hit(b + 0.27, 0.02 + 0.04 * k, 0.3)
mus = fft_filter(mus, 30, 2600)
hold0, hold1 = (VE + 0.15, lo - 0.25) if lo - VE > 1.0 else (None, None)   # a held silence after the last word
if hold0: mus[(t >= hold0) & (t < hold1)] = 0
music = reverb(mus, 3.6, 0.45, 3)
if hold0: music[(t >= hold0 + 0.25) & (t < hold1)] = 0
music *= np.clip(1 - np.maximum(0, t - (T - 1.4)) / 1.4, 0, 1)[:, None]

# ---------------- sound design ----------------
fx = np.zeros(N)
for a in screens[1:]:                                           # soft whoosh into each new screen and the logo
    fx += shaped_noise(max(0, a - 0.45), 0.8, 400, 3200, 0.7, 0.10, seed=int(a * 10) + 3)
fx += shaped_noise(max(0, hit - 1.5), 1.5, 200, 5000, 0.9, 0.13, seed=9, curve="rise")   # reverse swell into the key word
fx += sub_hit(hit + 0.02, 0.28, 0.9)
for s in VIS["screens"]:
    for f in s.get("fx", []):
        for it in f.get("items", []):                            # paper tick when a tag lands
            s_ = ref(it["at"]); m = (t >= s_) & (t < s_ + 0.8); tt = t[m] - s_
            fx[m] += (np.sin(2 * np.pi * 1320 * tt) + .35 * np.sin(2 * np.pi * 1980 * tt)) * np.exp(-tt * 9) * 0.022
        if "strike" in f:
            for k in range(len(f.get("items", [])) or 1):
                fx += shaped_noise(ref(f["strike"]) + k * 0.12, 0.22, 3500, 2200, 0.4, 0.03, seed=70 + k, curve="fall")
    for ln in s["lines"]:
        if "strike" in ln:
            fx += shaped_noise(word_t(ln["p"], ln["strike"]) + 0.45, 0.22, 3500, 2200, 0.4, 0.035, seed=77, curve="fall")
fx += shaped_noise(lo - 0.6, 1.4, 3000, 9000, 0.5, 0.05, seed=12, curve="rise")         # shimmer into the logo
if hold0: fx[(t >= hold0) & (t < hold1)] = 0
sfx = reverb(fx, 2.0, 0.3, 5)
if hold0: sfx[(t >= hold0 + 0.2) & (t < hold1)] = 0

# ---------------- mix with ducking ----------------
v = subprocess.run(["ffmpeg", "-v", "error", "-i", VOICE, "-f", "f32le", "-ac", "1", "-ar", str(SR), "-"], capture_output=True).stdout
voice = np.frombuffer(v, np.float32)[:N]; voice = np.pad(voice, (0, N - len(voice)))
blk = 480; rms = np.sqrt(np.convolve(voice ** 2, np.ones(blk) / blk, "same"))
act = (rms > 0.02).astype(float)
duck = np.empty(N); g = 0.0
a_up, a_dn = 1 - np.exp(-1 / (0.03 * SR)), 1 - np.exp(-1 / (0.45 * SR))
for i in range(0, N, blk):                                       # block-wise envelope follower
    g += ((a_up if act[i] > g else a_dn) * blk) * (act[i] - g); g = min(max(g, 0), 1); duck[i:i + blk] = g
gain = 10 ** (-5.5 * duck / 20)
music *= gain[:, None]
def lufs(x):
    sf.write(f"{OUT}/_tmp.wav", x, SR)
    r = subprocess.run(["ffmpeg", "-hide_banner", "-i", f"{OUT}/_tmp.wav", "-af", "ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr
    return float([l for l in r.splitlines() if l.strip().startswith("I:")][-1].split()[1])
music *= 10 ** ((-29 - lufs(music)) / 20)                        # music bed ~15 LU under the voice
sfx *= 10 ** ((-31 - lufs(sfx)) / 20)
mix = np.stack([voice, voice], 1) * 1.0 + music + sfx
peak = np.abs(mix).max(); mix *= min(1, 0.89 / peak)
mix *= 10 ** ((-14.0 - lufs(mix)) / 20); mix *= min(1, 0.85 / np.abs(mix).max())   # programme loudness -14 LUFS, peak < -1.4 dBFS
sf.write(f"{OUT}/{RID}.wav", mix.astype(np.float32), SR)
print("music", round(lufs(music), 1), "sfx", round(lufs(sfx), 1), "mix", round(lufs(mix), 1), "peak", round(20 * np.log10(np.abs(mix).max()), 2))
