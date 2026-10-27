import json, subprocess, sys
SRC, OUT, SCR = sys.argv[1], sys.argv[2], sys.argv[3]
# (scene, source_in, source_out, pause_after) ; pause = added room-tone seconds
SEGS = [
 ("1 الافتتاحية",   60.65,  72.10, 0.6),
 ("2 جوهر المشكلة", 47.38,  58.30, 0.8),
 ("3 مواجهة الذات + 4أ الذروة", 98.00, 118.80, 1.5),
 ("4ب ما بعد السؤال", 118.95, 126.35, 1.0),
 ("5 الخاتمة",     284.70, 292.95, 2.5),
]
# phrases: (source_start, source_end, text, emphasis-word or "")
PH = [
 (60.75,61.75,"كم مرّة قابلنا شخص",""),
 (62.14,63.75,"وطلعنا من عنده بانطباع معيّن","انطباع"),
 (64.12,67.94,"حكينا إنه مغرور… بارد… عصبي… أو أسلوبه سيّئ",""),
 (68.21,70.08,"وحطّيناه بمكان معيّن براسنا",""),
 (70.33,71.91,"مع إنّا ما شفنا منه غير لحظة","لحظة"),
 (47.48,49.50,"والمشكلة مش إنّا منحس",""),
 (49.67,51.24,"أو بنتأثر… أو حتى بنغلط بالتفسير",""),
 (51.56,54.47,"المشكلة إنّا مرّات منضل عايشين جوّا تفسير قديم","تفسير قديم"),
 (54.76,56.24,"حتى بعد ما تتغيّر الظروف","تتغيّر"),
 (56.51,58.00,"والناس… وحتى إحنا نفسنا",""),
 (98.10,99.32,"إحنا منحاول نفهم الناس",""),
 (99.73,101.82,"بس هل بنحاول نفهم حالنا بنفس القدر؟","حالنا"),
 (102.14,104.27,"ولا تعوّدنا نحكي عن حالنا بجمل جاهزة","جمل جاهزة"),
 (104.60,105.72,"«أنا عصبي»",""),
 (106.03,106.99,"«أنا ما بثق بحدا»",""),
 (107.26,108.55,"«أنا ما بحب أطلب مساعدة»",""),
 (108.94,110.46,"«أنا هيك… وما رح أتغيّر»",""),
 (111.62,112.68,"بس تخيّل لو إنّك",""),
 (112.98,115.46,"بدل ما تعتبر هاي الجمل تعريف نهائي إلك","تعريف نهائي"),
 (115.79,117.45,"رجعت خطوة لورا… وسألت حالك:",""),
 (117.91,118.65,"من متى أنا هيك؟","من متى"),
 (119.09,121.11,"شو اللي صار وخلّاني أتصرّف بهالطريقة؟",""),
 (121.55,122.90,"وهل هاي فعلاً طبيعتي؟","طبيعتي"),
 (123.11,126.16,"ولا طريقة تعلّمتها بوقت كنت محتاج فيها أحمي حالي؟",""),
 (284.83,287.43,"لأنه مرّات… إحنا ما بنحتاج نغيّر الماضي","الماضي"),
 (287.77,289.65,"قد ما بنحتاج نفهم شو عمل فينا","نفهم"),
 (290.15,292.81,"ما لا يُقال — همام ديك",""),
]
def tl_map():
    m=[]; t=0.0
    for sc,a,b,p in SEGS:
        m.append((sc,a,b,t)); t+=(b-a)+p
    return m,t
M,TOTAL=tl_map()
def to_tl(s):
    for sc,a,b,t in M:
        if a-0.01<=s<=b+0.01: return t+(s-a), sc
    raise ValueError(s)
def ts(x):
    ms=int(round(x*1000)); h,ms=divmod(ms,3600000); m,ms=divmod(ms,60000); s,ms=divmod(ms,1000)
    return f"{h:02}:{m:02}:{s:02},{ms:03}"
rows=[]
for s,e,txt,emp in PH:
    a,sc=to_tl(s); b,_=to_tl(e)
    rows.append(dict(scene=sc,src_start=s,src_end=e,start=round(a,2),end=round(b,2),text=txt,emphasis=emp))
# last title holds through the tail
rows[-1]["end"]=round(TOTAL-0.3,2)
with open(f"{OUT}/subtitles.srt","w") as f:
    for i,r in enumerate(rows,1):
        # appear ~100ms before speech, linger ~250ms after
        start=max(0,r['start']-0.1)
        end=r['end'] if i==len(rows) else min(r['end']+0.25, rows[i]['start']-0.15)
        if r['emphasis']=="من متى": end=rows[i]['start']-0.35  # hold through the added silence
        f.write(f"{i}\n{ts(start)} --> {ts(end)}\n{r['text']}\n\n")
json.dump(dict(total_seconds=round(TOTAL,2),segments=[dict(scene=sc,src_in=a,src_out=b,timeline_in=round(t,2),timeline_out=round(t+b-a,2),pause_after=p) for (sc,a,b,t),(_,_,_,p) in zip(M,SEGS)],phrases=rows),open(f"{OUT}/timeline.json","w"),ensure_ascii=False,indent=1)
# assemble voice: segments with 15ms fades + room tone (from 208.55-210.0) for pauses
rt=f"{SCR}/roomtone.wav"
subprocess.run(["ffmpeg","-v","error","-y","-ss","208.55","-to","210.0","-i",SRC,"-ar","48000","-ac","1",rt],check=True)
parts=[]
for i,(sc,a,b,p) in enumerate(SEGS):
    seg=f"{SCR}/seg{i}.wav"; d=b-a
    subprocess.run(["ffmpeg","-v","error","-y","-ss",str(a),"-to",str(b),"-i",SRC,"-af",f"afade=t=in:d=0.015,afade=t=out:st={d-0.03:.3f}:d=0.03","-ar","48000","-ac","1",seg],check=True)
    pad=f"{SCR}/pad{i}.wav"
    subprocess.run(["ffmpeg","-v","error","-y","-stream_loop","-1","-i",rt,"-t",str(p),"-af","afade=t=in:d=0.05","-ar","48000","-ac","1",pad],check=True)
    parts+= [seg,pad]
lst=f"{SCR}/concat.txt"; open(lst,"w").write("".join(f"file '{x}'\n" for x in parts))
raw=f"{SCR}/voice_raw.wav"
subprocess.run(["ffmpeg","-v","error","-y","-f","concat","-safe","0","-i",lst,"-c","copy",raw],check=True)
# voice chain: HPF, gentle compression, loudness normalisation to -14 LUFS / -1 dBTP
subprocess.run(["ffmpeg","-v","error","-y","-i",raw,"-af","highpass=f=80,acompressor=threshold=-24dB:ratio=2.5:attack=10:release=150:makeup=4,loudnorm=I=-14:TP=-1.5:LRA=7","-ar","48000",f"{SCR}/voice_assembled_-14LUFS.wav"],check=True)
print("TOTAL",round(TOTAL,2))
for sc,a,b,t in M: print(f"{sc}: src {a}-{b} -> tl {t:.2f}-{t+b-a:.2f}")
