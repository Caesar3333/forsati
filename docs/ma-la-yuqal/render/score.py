"""Original procedural score + sound design for "ما لا يُقال", mixed under the voice.
Usage: score.py <voice.mp3> <out_dir>. Writes music_stem.wav, sfx_stem.wav, final_mix.wav (48 kHz stereo)."""
import sys, subprocess, numpy as np, soundfile as sf
VOICE, OUT = sys.argv[1], sys.argv[2]
SR, T = 48000, 65.25
N = int(SR * T); t = np.arange(N) / SR
rng = np.random.default_rng(7)
CUTS = [3.37, 12.05, 23.77, 37.29, 43.58, 46.07, 48.57, 54.47, 59.80, 62.72]
SIL0, SIL1 = 44.57, 46.07                      # the silence after "من متى أنا هيك؟"

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
mus = np.zeros(N)
mus += pad([A1], 0, 44.57, 4, 0.05, 0.10) + pad([A1], 54.47, T, 3, 3, 0.07)              # sub bed
mus += pad([A2, E3, B3, C4], 0, 12.6, 3.5, 1.5, 0.11)                                   # Am(add9)
mus += pad([F2, C3, E3, A3], 11.6, 24.3, 1.5, 1.5, 0.11)                                # Fmaj7
mus += pad([A2, D3, F3, E4], 23.3, 37.8, 1.5, 1.5, 0.10)                                # Dm(add9)/A — tension
mus += pad([E2, A2, B2, E3, B3], 36.8, 44.57, 1.5, 0.04, 0.12) * np.clip(1 + (t - 37.3) / 5, 1, 2.2)  # Esus swell
mus += pad([C3, E3, G3, B3], 46.07, 50.6, 1.2, 1.5, 0.12)                               # Cmaj7 — release
mus += pad([F2, A2, C3, E3, G3], 49.8, 55.0, 1.5, 1.5, 0.12)                            # Fmaj9
mus += pad([A3, E4, B4], 54.2, T, 2.0, 3.0, 0.08)                                       # open Am, airy
for f, s in [(E4, 0.4), (C4, 12.1), (D4, 23.9), (G4, 46.15), (E4, 47.4), (A3, 54.55)]:
    mus += piano(f, s, 0.07)
mus += piano(A2, 62.75, 0.16, 5) + piano(A3, 62.77, 0.08, 5) + piano(E4, 62.8, 0.05, 5)  # outro note
# slow heartbeat, barely there, building toward the climax
for b in np.arange(30.0, 43.4, 60 / 52):
    mus += sub_hit(b, 0.05 + 0.06 * (b - 30) / 13.4, 0.35) + sub_hit(b + 0.28, 0.03 + 0.04 * (b - 30) / 13.4, 0.3)
mus = fft_filter(mus, 30, 2600)
mus[(t >= SIL0) & (t < SIL1)] = 0
mus *= 1 - env(SIL0 - 0.03, SIL0 + 0.001, 0.03, 0.001) * 0                               # hard cut kept
music = reverb(mus, 4.0, 0.45, 3)
music[(t >= SIL0 + 0.25) & (t < SIL1 - 0.02)] *= 0.0                                     # true silence (tail clipped)
music *= np.clip(1 - np.maximum(0, t - (T - 2.5)) / 2.5, 0, 1)[:, None]

# ---------------- sound design ----------------
fx = np.zeros(N)
for c in [3.37, 12.05, 23.77, 37.29, 54.47]:                                            # soft transition whooshes
    fx += shaped_noise(c - 0.9, 1.4, 300, 2400, 0.7, 0.10, seed=int(c * 10))
fx += shaped_noise(48.2, 0.9, 1800, 400, 0.8, 0.06, seed=5, curve="fall")              # into the talking shot
fx += shaped_noise(41.6, 2.0, 200, 5000, 0.9, 0.16, seed=9, curve="rise")              # reverse swell into the eyes
fx += sub_hit(43.58, 0.30, 0.95)                                                          # soft impact on the question
fx += sub_hit(9.58, 0.18, 1.6)                                                            # "لحظة" — the freeze
fx += shaped_noise(59.4, 0.8, 600, 3000, 0.6, 0.05, seed=11)                            # into the signature
fx += shaped_noise(61.2, 1.6, 3000, 9000, 0.5, 0.05, seed=12, curve="rise")            # shimmer into the logo
# rain on the train window
rain = fft_filter(rng.standard_normal(N), 900, 9000, -0.4) * 0.018
drops = np.zeros(N); idx = rng.integers(int(3.2 * SR), int(12.3 * SR), 260); drops[idx] = rng.uniform(.2, 1, 260)
drops = fft_filter(np.convolve(drops, np.exp(-np.arange(300) / 40) * np.sin(np.arange(300) * 0.9), "same"), 1500, 8000) * 0.05
fx += (rain + drops) * env(3.2, 12.3, 0.8, 0.8)
fx += fft_filter(rng.standard_normal(N), 60, 500) * 0.012 * env(12.0, 23.9, 1, 1)         # old room air
hum = (np.sin(2 * np.pi * 100 * t) + 0.5 * np.sin(2 * np.pi * 200 * t) + 0.2 * np.sin(2 * np.pi * 300 * t))
fx += hum * 0.0045 * (0.8 + 0.2 * np.sin(2 * np.pi * 0.3 * t)) * env(23.7, 37.4, 1, 1)     # bulb hum at the mirror
for i, s in enumerate([30.27, 31.70, 32.93, 34.61]):                                     # glass ticks on «labels»
    m = (t >= s) & (t < s + 1.2); tt = t[m] - s
    fx[m] += (np.sin(2 * np.pi * 1760 * tt) + .4 * np.sin(2 * np.pi * 2637 * tt)) * np.exp(-tt * 7) * 0.02
fx += shaped_noise(37.2, 6.4, 250, 700, 1.0, 0.035, seed=21, curve="rise_fall")          # wind at the door
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
