import subprocess, sys, json, concurrent.futures as cf
S=sys.argv[1]; FPS=24
# name, clip, out_start, out_end, src_start, speed, zoom0, zoom1, ycenter, fix, ambient_gain
SEG=[
("A1","c04",0.00,2.80,0.90,1.00,1.00,1.05,0.42,"",0),
("B1","c05",2.80,6.25,0.45,1.00,1.00,1.00,0.5,"",0.30),
("B2","c06",6.25,11.30,0.60,1.00,1.00,1.00,0.5,"colortemperature=temperature=5200:mix=0.7,eq=saturation=0.95",0.30),
("B3","c07",11.30,15.25,0.50,1.00,1.00,1.00,0.5,"",0.35),
("A2","c01",15.25,17.10,1.18,1.08,1.00,1.00,0.42,"",0),
("B4a","c08",17.10,18.00,1.20,1.00,1.00,1.00,0.5,"eq=gamma=1.10",0.35),
("B4b","c09",18.00,18.92,1.20,1.00,1.00,1.00,0.5,"",0.20),
("B4c","c10",18.92,20.75,1.70,1.00,1.00,1.00,0.5,"",0.25),
("A3a","c02",20.75,23.25,0.49,1.08,1.00,1.00,0.42,"",0),
("A3b","c02",23.25,26.75,3.78,1.08,1.14,1.14,0.30,"",0),
("A4a","c03",26.75,27.68,0.22,1.00,1.22,1.22,0.28,"",0),
("A4b","c03",27.68,29.55,1.74,1.04,1.34,1.34,0.26,"",0),
("B5","c07",29.55,34.05,2.45,0.79,1.12,1.24,0.55,"",0.20),
("B6","c11",34.05,37.10,0.45,1.00,1.00,1.00,0.5,"",0.35),
("B7","c12",37.10,40.40,1.40,1.00,1.00,1.00,0.5,"eq=gamma=1.12",0.25),
("B8","c14",40.40,44.20,2.50,1.20,1.00,1.00,0.5,"",0.25),
("B9","c13",44.20,47.05,2.40,1.00,1.00,1.00,0.5,"colortemperature=temperature=5200:mix=0.7,eq=saturation=0.95",0.30),
("A5a","c04",47.05,47.95,0.95,1.00,1.06,1.06,0.42,"",0),
("A5b","c04",47.95,48.43,1.85,1.60,1.06,1.06,0.42,"",0),
("A5c","c04",48.43,51.80,2.62,1.00,1.06,1.06,0.42,"",0),
]
def frames(t): return int(round(t*FPS))
def job(s):
    n,c,o0,o1,ss,sp,z0,z1,yc,fix,amb=s
    nf=frames(o1)-frames(o0); od=nf/FPS; sd=od*sp+0.1
    v=f"setpts=(PTS-STARTPTS)/{sp}"+(f",minterpolate=fps={FPS}:mi_mode=blend" if sp<0.95 else f",fps={FPS}")
    if z0!=z1:
        v+=(f",scale=2160:3840:flags=lanczos,zoompan=z='{z0}+({z1}-{z0})*on/{nf}':x='iw/2-(iw/zoom/2)':y='(ih-ih/zoom)*{yc}':d=1:s=1080x1920:fps={FPS}")
    elif z0!=1.0:
        W=int(1080*z0)//2*2; H=int(1920*z0)//2*2
        v+=f",scale={W}:{H}:flags=lanczos,crop=1080:1920:({W}-1080)/2:({H}-1920)*{yc}"
    else:
        v+=",scale=1080:1920:flags=lanczos"
    v+=",unsharp=5:5:0.45:5:5:0,tpad=stop_mode=clone:stop_duration=0.5"
    if fix: v+=","+fix
    v+=",format=yuv420p"
    cmd=["ffmpeg","-v","error","-y","-ss",str(ss),"-t",f"{sd:.3f}","-i",f"{S}/clips/{c}.mp4","-vf",v,"-frames:v",str(nf),"-an","-c:v","libx264","-preset","slow","-crf","10","-pix_fmt","yuv420p",f"{S}/seg/{n}.mp4"]
    subprocess.run(cmd,check=True)
    # ambient audio for B-roll
    a=f"atrim=0:{sd:.3f},asetpts=PTS-STARTPTS,atempo={sp},atrim=0:{od:.4f},aformat=sample_rates=48000:channel_layouts=stereo,volume={amb},afade=t=in:d=0.08,afade=t=out:st={max(0,od-0.12):.3f}:d=0.12"
    if amb==0: a=f"aevalsrc=0:d={od:.4f}:s=48000:c=stereo"
    if amb==0:
        subprocess.run(["ffmpeg","-v","error","-y","-f","lavfi","-i",a,f"{S}/seg/{n}.wav"],check=True)
    else:
        subprocess.run(["ffmpeg","-v","error","-y","-ss",str(ss),"-i",f"{S}/clips/{c}.mp4","-af",a,"-t",f"{od:.4f}",f"{S}/seg/{n}.wav"],check=True)
    return n,nf
ONLY=sys.argv[2:]
SEGR=[s for s in SEG if not ONLY or s[0] in ONLY]
with cf.ThreadPoolExecutor(4) as ex:
    for r in ex.map(job,SEGR): print(*r,flush=True)
open(f"{S}/seg/list.txt","w").write("".join(f"file '{S}/seg/{s[0]}.mp4'\n" for s in SEG))
open(f"{S}/seg/alist.txt","w").write("".join(f"file '{S}/seg/{s[0]}.wav'\n" for s in SEG))
