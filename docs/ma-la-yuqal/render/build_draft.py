"""Assemble the 9:16 draft: Ken Burns stills + real footage, Arabic text cards, voice + drone."""
import json, subprocess, sys, os
D, W = sys.argv[1], sys.argv[2]          # D = docs/ma-la-yuqal, W = work dir (has cards.js + node_modules)
U = sys.argv[3]                          # uploads dir (original .mov clips)
FPS, XF = 30, 0.4
tl = json.load(open(f"{D}/timeline.json"))
TOTAL = tl["total_seconds"]
L = f"{D}/backgrounds/likeness"
# (start, end, source, kind, motion)  motion: "in" push-in, "out" pull-back
SEG = [
 (0.00,  3.37, f"{L}/hook_wood_portrait.jpg", "img", "in"),
 (3.37, 12.05, f"{L}/1_train.jpg", "img", "in"),
 (12.05, 23.77, f"{L}/2_old_room.jpg", "img", "in"),
 (23.77, 37.29, f"{L}/3_mirror.jpg", "img", "in"),
 (37.29, 43.58, f"{L}/4b_corridor_back.jpg", "img", "in"),
 (43.58, 46.07, f"{L}/4a_eyes.jpg", "img", "still"),
 (46.07, 48.57, f"{D}/footage/4b_corridor_walk.mp4", "vid", 0.8),
 (48.57, 54.47, f"{L}/hook_wood_portrait_alt.jpg", "img", "out"),
 (54.47, 59.80, f"{L}/5_outro_dust.jpg", "img", "in"),
 (59.80, 62.72, f"{D}/footage/5_face_signature.mp4", "vid", 1.0),
 (62.72, TOTAL, f"{L}/5_outro_dust.jpg", "img", "still"),
]
# text y (top, px) per background so cards sit in the negative space
def card_y(t):
    for (a, b, src, *_), y in zip(SEG, [230, 300, 330, 260, 300, 250, 300, 230, 760, 300, 700]):
        if a - 0.2 <= t < b: return y
    return 300
GRADE = "eq=brightness=-0.03:contrast=1.06:saturation=0.82,colorbalance=rs=-0.04:bs=0.04:rh=0.04:bh=-0.03"
def run(*a): subprocess.run(a, check=True)
os.makedirs(f"{W}/seg", exist_ok=True); os.makedirs(f"{W}/cards", exist_ok=True)

# 1) background segments (skipped when bg.mp4 already exists and SKIP_BG=1)
REBUILD_BG = not (os.environ.get("SKIP_BG") and os.path.exists(f"{W}/bg.mp4"))
for i, (a, b, src, kind, mo) in enumerate(SEG):
    if not REBUILD_BG: break
    dur = (b - a) + (XF if i < len(SEG) - 1 else 0)
    n = int(round(dur * FPS)); out = f"{W}/seg/{i:02}.mp4"
    if kind == "img":
        z0, z1 = {"in": (1.0, 1.07), "out": (1.09, 1.0), "still": (1.0, 1.015)}[mo]
        zexp = f"{z0}+({z1}-{z0})*on/{max(n-1,1)}"
        vf = (f"crop=iw:iw*16/9,scale=2160:3840,zoompan=z='{zexp}':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2'"
              f":d={n}:s=1080x1920:fps={FPS},{GRADE}")
        run("ffmpeg", "-v", "error", "-y", "-loop", "1", "-i", src, "-vf", vf, "-frames:v", str(n),
            "-c:v", "libx264", "-crf", "16", "-pix_fmt", "yuv420p", out)
    else:
        sp = mo
        vf = (f"setpts=PTS/{sp},scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps={FPS},"
              "eq=brightness=-0.06:contrast=1.08:saturation=0.75,colorbalance=rs=-0.05:bs=0.05:rh=0.05:bh=-0.04")
        run("ffmpeg", "-v", "error", "-y", "-i", src, "-vf", vf, "-frames:v", str(n), "-an",
            "-c:v", "libx264", "-crf", "16", "-pix_fmt", "yuv420p", out)

# 2) chain with crossfades (each segment carries XF extra seconds, so offsets = timeline starts)
inputs, fc, last = [], [], "[0:v]"
for i in range(len(SEG)): inputs += ["-i", f"{W}/seg/{i:02}.mp4"]
for i in range(1, len(SEG)):
    lab = f"[x{i}]"
    fc.append(f"{last}[{i}:v]xfade=transition=fade:duration={XF}:offset={SEG[i][0]:.3f}{lab}")
    last = lab
fc.append(f"{last}vignette=PI/4.5,noise=alls=5:allf=t,format=yuv420p[v]")
if REBUILD_BG: run("ffmpeg", "-v", "error", "-y", *inputs, "-filter_complex", ";".join(fc), "-map", "[v]",
    "-c:v", "libx264", "-crf", "16", "-r", str(FPS), f"{W}/bg.mp4")

# 3) text cards
spec, cues = [], []
srt = open(f"{D}/subtitles.srt").read().strip().split("\n\n")
def tsec(s): h, m, r = s.split(":"); s, ms = r.split(","); return int(h)*3600+int(m)*60+int(s)+int(ms)/1000
for blk, ph in zip(srt, tl["phrases"]):
    _, times, text = blk.split("\n", 2)
    a, b = [tsec(x.strip()) for x in times.split("-->")]
    if "ما لا يُقال" in text: continue                  # replaced by the logo card
    html = text
    if ph["emphasis"]: html = html.replace(ph["emphasis"], f"<b>{ph['emphasis']}</b>", 1)
    cls = "big" if ph["emphasis"] == "من متى" else ""
    cid = f"c{len(spec):02}"; spec.append(dict(id=cid, html=html, y=card_y(a), cls=cls)); cues.append((cid, a, b))
spec.append(dict(id="logo", html='<div class="logo">ما لا يُقال</div><div class="name">همام ديك</div>', y=700))
cues.append(("logo", 62.95, TOTAL))
json.dump(spec, open(f"{W}/cards.json", "w"), ensure_ascii=False)
run("node", f"{W}/cards.js", f"{W}/cards.json", f"{W}/cards")

# 4) overlay cards: 0.5s fade-in with 8px upward drift, 0.4s fade-out
inputs, fc, last = ["-i", f"{W}/bg.mp4"], [], "[0:v]"
for k, (cid, a, b) in enumerate(cues, 1):
    d = b - a
    inputs += ["-loop", "1", "-framerate", str(FPS), "-t", f"{d:.3f}", "-i", f"{W}/cards/{cid}.png"]
    fo = 0.8 if cid == "logo" else 0.4
    fc.append(f"[{k}:v]format=rgba,fade=t=in:st=0:d=0.5:alpha=1,fade=t=out:st={max(0,d-fo):.3f}:d={fo}:alpha=1,"
              f"setpts=PTS-STARTPTS+{a:.3f}/TB[t{k}]")
    fc.append(f"{last}[t{k}]overlay=x=0:y='8*max(0,1-(t-{a:.3f})/0.5)':eof_action=pass[o{k}]")
    last = f"[o{k}]"

# 5) audio: voice + synthesized drone (silent during the climax pause) + low outro note
drone = ("aevalsrc='0.5*sin(2*PI*55*t)+0.35*sin(2*PI*82.41*t)+0.25*sin(2*PI*130.81*t)*(0.6+0.4*sin(2*PI*0.07*t))"
         f"+0.18*sin(2*PI*164.81*t)*(0.5+0.5*sin(2*PI*0.05*t+1))':s=48000:d={TOTAL}")
note = (f"aevalsrc='(0.6*sin(2*PI*110*t)+0.3*sin(2*PI*220*t)+0.1*sin(2*PI*330*t))*exp(-1.1*t)':s=48000:d=3.5")
inputs += ["-i", f"{D}/voice_cut_-14LUFS.mp3", "-f", "lavfi", "-i", drone,
           "-f", "lavfi", "-i", "anoisesrc=color=brown:amplitude=0.4:d=%s:r=48000" % TOTAL, "-f", "lavfi", "-i", note]
nv = len(cues) + 1
fc.append(f"[{nv+1}:a][{nv+2}:a]amix=inputs=2:weights='1 0.25':normalize=0,lowpass=f=900,highpass=f=40,"
          f"volume='if(between(t,44.55,46.10),0,if(lt(t,46.1),0.055,0.055+0.02*min(1,(t-46.1)/10)))':eval=frame,"
          f"afade=t=in:d=3,afade=t=out:st={TOTAL-2.5:.2f}:d=2.5[dr]")
fc.append(f"[{nv+3}:a]volume=0.12,adelay=62720|62720,apad[nt]")
fc.append(f"[{nv}:a][dr][nt]amix=inputs=3:normalize=0:duration=first,alimiter=limit=0.89[a]")
run("ffmpeg", "-v", "error", "-y", *inputs, "-filter_complex", ";".join(fc), "-map", last, "-map", "[a]",
    "-t", f"{TOTAL}", "-c:v", "libx264", "-b:v", "6M", "-maxrate", "8M", "-bufsize", "12M", "-preset", "medium", "-pix_fmt", "yuv420p",
    "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", f"{D}/draft_v1.mp4")
print("done")
