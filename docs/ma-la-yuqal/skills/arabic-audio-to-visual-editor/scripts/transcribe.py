"""Phrase-level Arabic transcription with timestamps, fully offline.

Splits the recording at pauses (ffmpeg silencedetect) and transcribes each phrase with
Whisper large-v3-turbo through sherpa-onnx. Phrase boundaries = natural pauses, which is
exactly the unit on-screen captions want.

Setup (once):
  pip install sherpa-onnx soundfile numpy
  curl -L -o turbo.tar.bz2 https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/sherpa-onnx-whisper-turbo.tar.bz2
  tar xjf turbo.tar.bz2          # -> sherpa-onnx-whisper-turbo/

Usage: transcribe.py <audio> <model_dir> <out.json> [--noise -38] [--min-pause 0.25]
Writes [{"start", "end", "text"}] and prints one line per phrase.
Whisper tends to clip the last word of a phrase: re-run a padded window over any phrase
you will put on screen (see --window) and correct by ear before it becomes a caption.
"""
import argparse, json, re, subprocess, tempfile, os
import soundfile as sf, sherpa_onnx

ap = argparse.ArgumentParser()
ap.add_argument("audio"); ap.add_argument("model_dir"); ap.add_argument("out")
ap.add_argument("--noise", type=float, default=-38); ap.add_argument("--min-pause", type=float, default=0.25)
ap.add_argument("--window", nargs=2, type=float, metavar=("START", "END"),
                help="transcribe one padded window only (for checking clipped words)")
a = ap.parse_args()

wav = os.path.join(tempfile.mkdtemp(), "a16k.wav")
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", a.audio, "-ac", "1", "-ar", "16000", wav], check=True)
audio, sr = sf.read(wav, dtype="float32"); dur = len(audio) / sr
M = a.model_dir.rstrip("/") + "/"
rec = sherpa_onnx.OfflineRecognizer.from_whisper(
    encoder=M + "turbo-encoder.int8.onnx", decoder=M + "turbo-decoder.int8.onnx", tokens=M + "turbo-tokens.txt",
    language="ar", task="transcribe", num_threads=os.cpu_count() or 4)

def run(p, q):
    st = rec.create_stream(); st.accept_waveform(sr, audio[int(max(0, p) * sr):int(min(dur, q) * sr)])
    rec.decode_stream(st); return st.result.text.strip()

if a.window:
    print(run(*a.window)); raise SystemExit

log = subprocess.run(["ffmpeg", "-hide_banner", "-i", wav, "-af", f"silencedetect=noise={a.noise}dB:d={a.min_pause}",
                      "-f", "null", "-"], capture_output=True, text=True).stderr
marks = [(k, float(v)) for k, v in re.findall(r"silence_(start|end): ([0-9.]+)", log)]
segs, t, cur = [], 0.0, None
for k, v in marks:
    if k == "start": cur = v
    else:
        if cur is not None and cur > t + 0.05: segs.append((t, cur))
        t = v
if t < dur - 0.05: segs.append((t, dur))
out = []
for p, q in segs:
    x = p
    while q - x > 28:                     # Whisper's window is 30 s
        out.append(dict(start=round(x, 2), end=round(x + 28, 2), text=run(x - 0.1, x + 28.1))); x += 28
    out.append(dict(start=round(x, 2), end=round(q, 2), text=run(x - 0.1, q + 0.1)))
    print(f"{out[-1]['start']:7.2f}-{out[-1]['end']:7.2f} {out[-1]['text']}", flush=True)
json.dump(out, open(a.out, "w"), ensure_ascii=False, indent=1)
