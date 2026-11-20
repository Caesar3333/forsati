import wave,numpy as np,subprocess,re,json,sys
M=sys.argv[1]; TEMPO=0.93; LEAD=0.5; TAIL=0.8
w=wave.open(M+'/aud/voice_stretch.wav'); sr=w.getframerate(); ch=w.getnchannels()
x=np.frombuffer(w.readframes(w.getnframes()),np.int16).reshape(-1,ch)[:,0].astype(np.float32)
out=subprocess.run(['ffmpeg','-i',M+'/aud/voice_stretch.wav','-af','silencedetect=n=-40dB:d=0.15','-f','null','-'],capture_output=True,text=True).stderr
ss=[float(v) for v in re.findall(r'silence_start: ([0-9.]+)',out)]; se=[float(v) for v in re.findall(r'silence_end: ([0-9.]+)',out)]
pieces=[np.zeros(int(LEAD*sr),np.float32)]; bp=[(0.0,LEAD)]; pos=0; added=LEAD
for a,b in zip(ss,se):
    L=b-a
    if a<0.05 or b>len(x)/sr-0.05: continue
    extra=0.26 if L>=0.36 else (0.08 if L>=0.24 else 0.0)
    if extra==0: continue
    mid=(a+b)/2; i=int(mid*sr)
    pieces.append(x[pos:i]); pieces.append(np.zeros(int(extra*sr),np.float32)); pos=i
    bp.append((mid,mid+added)); added+=extra; bp.append((mid,mid+added))
pieces.append(x[pos:]); pieces.append(np.zeros(int(TAIL*sr),np.float32))
y=np.concatenate(pieces); end=len(x)/sr; bp.append((end,end+added))
w2=wave.open(M+'/aud/voice_slow.wav','wb'); w2.setnchannels(1); w2.setsampwidth(2); w2.setframerate(sr); w2.writeframes(y.astype(np.int16).tobytes()); w2.close()
# map old time -> new time: old t -> stretched t/TEMPO -> piecewise
json.dump({'tempo':TEMPO,'bp':bp,'total':len(y)/sr},open(M+'/map.json','w'))
print('stretched',round(end,2),'new total',round(len(y)/sr,2),'pauses extended',len(bp)//2-1)
