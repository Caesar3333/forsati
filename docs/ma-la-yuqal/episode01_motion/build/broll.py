import subprocess,sys,json,concurrent.futures as cf
M=sys.argv[1]; C=M+'/../clips'; FPS=24
tl=json.load(open(M+'/timeline.json')); sc={s['name']:s for s in tl['scenes']}
# name: clip, src_start, speed, zoom0, zoom1, ycenter, fix, ambient
B={"B1":("c05",0.02,0.88,1,1,.5,"",0.30),
"B2":("c06",0.08,1.0,1,1,.5,"colortemperature=temperature=5200:mix=0.7,eq=saturation=0.95",0.30),
"B3":("c07",0.70,0.88,1,1,.5,"",0.35),
"B4a":("c08",1.15,1.0,1,1,.5,"eq=gamma=1.10",0.35),
"B4b":("c09",1.20,1.0,1,1,.5,"",0.20),
"B4c":("c10",1.60,1.0,1,1,.5,"",0.25),
"B5":("c07",2.45,0.69,1.10,1.24,.55,"",0.18),
"B6":("c11",0.30,1.0,1,1,.5,"",0.35),
"B7":("c12",1.20,1.0,1,1,.5,"eq=gamma=1.12",0.25),
"B8":("c14",1.80,1.10,1,1,.5,"",0.25),
"B9":("c13",2.20,1.0,1,1,.5,"colortemperature=temperature=5200:mix=0.7,eq=saturation=0.95",0.30)}
def job(n):
    c,ss,sp,z0,z1,yc,fix,amb=B[n]; s=sc[n]
    nf=round(s['end']*FPS)-round(s['start']*FPS); od=nf/FPS; sd=od*sp+0.15
    if sp<0.8: interp=f",minterpolate=fps={FPS}:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1"
    elif sp<0.97: interp=f",minterpolate=fps={FPS}:mi_mode=blend"
    else: interp=f",fps={FPS}"
    v=f"setpts=(PTS-STARTPTS)/{sp}"+interp
    if z0!=z1: v+=f",scale=2160:3840:flags=lanczos,zoompan=z='{z0}+({z1}-{z0})*on/{nf}':x='iw/2-(iw/zoom/2)':y='(ih-ih/zoom)*{yc}':d=1:s=1080x1920:fps={FPS}"
    else: v+=",scale=1080:1920:flags=lanczos"
    v+=",unsharp=5:5:0.45:5:5:0,tpad=stop_mode=clone:stop_duration=0.6"+(","+fix if fix else "")+",format=yuv420p"
    subprocess.run(["ffmpeg","-v","error","-y","-ss",str(ss),"-t",f"{sd:.3f}","-i",f"{C}/{c}.mp4","-vf",v,"-frames:v",str(nf),"-an","-c:v","libx264","-preset","slow","-crf","10",f"{M}/seg/{n}.mp4"],check=True)
    a=f"asetpts=PTS-STARTPTS,atempo={max(sp,0.5)},atrim=0:{od:.4f},aformat=sample_rates=48000:channel_layouts=stereo,volume={amb},afade=t=in:d=0.1,afade=t=out:st={max(0,od-0.15):.3f}:d=0.15,apad=whole_dur={od:.4f}"
    subprocess.run(["ffmpeg","-v","error","-y","-ss",str(ss),"-t",f"{sd:.3f}","-i",f"{C}/{c}.mp4","-af",a,"-t",f"{od:.4f}",f"{M}/seg/{n}.wav"],check=True)
    return n,nf
with cf.ThreadPoolExecutor(4) as ex:
    for r in ex.map(job,list(B)): print(*r,flush=True)
# ambient track on the full timeline
ins=[];fc=[];k=0
for n in B:
    ins+=["-i",f"{M}/seg/{n}.wav"]; d=int(round(sc[n]['start']*1000)); fc.append(f"[{k}]adelay={d}|{d}[a{k}]"); k+=1
fc.append("".join(f"[a{i}]" for i in range(k))+f"amix=inputs={k}:normalize=0:duration=longest,apad=whole_dur={tl['total']},atrim=0:{tl['total']}[o]")
subprocess.run(["ffmpeg","-v","error","-y"]+ins+["-filter_complex",";".join(fc),"-map","[o]",f"{M}/aud/ambient.wav"],check=True)
