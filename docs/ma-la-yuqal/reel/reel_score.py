"""Reel score: original procedural music + sound design under the real voice, arranged on reel_timeline.json.
Usage: reel_score.py <voice_reel.wav> <out_dir>. Writes music_stem.wav, sfx_stem.wav, final_mix.wav (48 kHz stereo)."""
import sys, json, subprocess, numpy as np, soundfile as sf
VOICE, OUT = sys.argv[1], sys.argv[2]
TL = json.load(open("reel_timeline.json"))
SR, T = 48000, TL["duration"]
N = int(SR * T); t = np.arange(N) / SR
rng = np.random.default_rng(11)
S = {s["role"]: s for s in TL["segments"]}
CUTS = [s["start"] for s in TL["segments"][1:]]
SIL0 = S["climax"]["end"]; SIL1 = S["wound"]["start"] - 0.05      # silence after "من متى أنا هيك؟"
LAB = [p["t0"] for p in S["labels"]["phrases"][1:]]                   # «أنا عصبي» … «أنا هيك»
STRIKE = S["climax"]["phrases"][0]["t0"] + 2.4                        # around "تعريف نهائي"
Q = S["climax"]["phrases"][-1]["t0"]                                  # "من متى أنا هيك؟"
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
h, o, l, c, w = S["hook"]["start"], S["old_story"]["start"], S["labels"]["start"], S["climax"]["start"], S["wound"]["start"]
nq, rs, sg = S["new_question"]["start"], S["resolve"]["start"], S["sign"]["start"]
mus = np.zeros(N)
mus += pad([A1], 0, SIL0, 2, 0.05, 0.10) + pad([A1], w, T, 3, 3, 0.07)                # sub bed
mus += pad([A2, E3, B3, C4], 0, o + 0.8, 1.2, 1.2, 0.11)                              # Am(add9) — the question
mus += pad([F2, C3, E3, A3], o - 0.4, l + 0.8, 1.2, 1.2, 0.11)                        # Fmaj7 — old story
mus += pad([A2, D3, F3, E4], l - 0.4, c + 0.8, 1.0, 1.2, 0.10)                        # Dm(add9) — labels, tension
mus += pad([E2, A2, B2, E3, B3], c - 0.4, SIL0, 1.0, 0.04, 0.12) * np.clip(1 + (t - c) / 4, 1, 2.3)  # Esus swell
mus += pad([C3, E3, G3, B3], w, nq + 0.8, 2.0, 1.5, 0.11)                             # Cmaj7 — release, the wound
mus += pad([F2, A2, C3, E3, G3], nq - 0.4, rs + 0.8, 1.5, 1.5, 0.12)                  # Fmaj9 — new question
mus += pad([A2, E3, A3, C4, E4], rs - 0.4, T, 1.5, 2.5, 0.10)                         # Am open — resolution
for f, s in [(E4, h + 0.05), (C4, o), (D4, l), (G4, w + 0.05), (E4, w + 1.6), (C4, nq), (A3, rs)]:
    mus += piano(f, s, 0.07)
for s in LAB:                                                                          # a soft low note under each label
    mus += piano(A2, s, 0.05, 2.0)
mus += piano(A2, sg + 2.9, 0.16, 5) + piano(A3, sg + 2.92, 0.08, 5) + piano(E4, sg + 2.95, 0.05, 5)  # outro note on the logo
for b in np.arange(l, Q - 0.2, 60 / 56):                                               # heartbeat building into the climax
    k = (b - l) / max(Q - l, 1)
    mus += sub_hit(b, 0.04 + 0.07 * k, 0.35) + sub_hit(b + 0.27, 0.025 + 0.045 * k, 0.3)
mus = fft_filter(mus, 30, 2600)
mus[(t >= SIL0) & (t < SIL1)] = 0
music = reverb(mus, 4.0, 0.45, 3)
music[(t >= SIL0 + 0.25) & (t < SIL1 - 0.02)] *= 0.0
music *= np.clip(1 - np.maximum(0, t - (T - 2.0)) / 2.0, 0, 1)[:, None]

# ---------------- sound design ----------------
fx = np.zeros(N)
for cu in CUTS:                                                                        # whoosh into every section
    if abs(cu - w) > 0.1: fx += shaped_noise(cu - 0.5, 0.85, 400, 3200, 0.7, 0.12, seed=int(cu * 10))
for s_ in LAB:                                                                         # each label lands
    m = (t >= s_) & (t < s_ + 0.8); tt = t[m] - s_
    fx[m] += (np.sin(2 * np.pi * 1320 * tt) + .35 * np.sin(2 * np.pi * 1980 * tt)) * np.exp(-tt * 9) * 0.025
    fx += sub_hit(s_, 0.06, 0.4)
for k in range(4):                                                                     # strike-through scratches
    fx += shaped_noise(STRIKE + k * 0.12, 0.22, 3500, 2200, 0.4, 0.035, seed=70 + k, curve="fall")
fx += shaped_noise(c + 3.6, 4.0, 250, 700, 1.0, 0.03, seed=21)                         # air as the camera pulls back
fx += shaped_noise(Q - 1.75, 1.75, 200, 5000, 0.9, 0.16, seed=9, curve="rise")         # reverse swell into the question
fx += sub_hit(Q + 0.02, 0.32, 0.95)                                                    # impact on "من متى"
fx += shaped_noise(o, 6.5, 300, 900, 1.0, 0.02, seed=31)                               # film-burn crackle (old story)
fx += shaped_noise(sg + 1.4, 1.5, 3000, 9000, 0.5, 0.05, seed=12, curve="rise")        # shimmer into the logo
fx[(t >= SIL0) & (t < SIL1)] = 0
sfx = reverb(fx, 2.2, 0.3, 5)
sfx[(t >= SIL0 + 0.2) & (t < SIL1 - 0.02)] = 0

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
sf.write(f"{OUT}/music_stem.wav", music.astype(np.float32), SR)
sf.write(f"{OUT}/sfx_stem.wav", sfx.astype(np.float32), SR)
sf.write(f"{OUT}/final_mix.wav", mix.astype(np.float32), SR)
print("music", round(lufs(music), 1), "sfx", round(lufs(sfx), 1), "mix", round(lufs(mix), 1), "peak", round(20 * np.log10(np.abs(mix).max()), 2))
