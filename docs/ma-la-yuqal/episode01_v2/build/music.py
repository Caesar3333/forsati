import numpy as np, wave, sys
SR=48000; T=52.6; N=int(SR*T); out=np.zeros((N,2))
rng=np.random.default_rng(7)
def hz(m): return 440*2**((m-69)/12)
def env(n,a,r,sus=1.0):
    e=np.ones(n)*sus; ai=int(a*SR); ri=int(r*SR)
    if ai>0: e[:ai]=np.linspace(0,sus,ai)
    if ri>0 and ri<n: e[-ri:]*=np.linspace(1,0,ri)
    return e
def add(sig,t0,pan=0.0,g=1.0):
    i=int(t0*SR); j=min(N,i+len(sig)); s=sig[:j-i]*g
    out[i:j,0]+=s*np.sqrt(0.5*(1-pan)); out[i:j,1]+=s*np.sqrt(0.5*(1+pan))
def piano(m,t0,dur=3.5,vel=0.5,pan=0.0):
    n=int(dur*SR); t=np.arange(n)/SR; f=hz(m); s=np.zeros(n)
    for k,a in [(1,1),(2,.42),(3,.18),(4,.08),(5,.04)]:
        fk=f*k*np.sqrt(1+0.0004*k*k); s+=a*np.sin(2*np.pi*fk*t+rng.random()*6)*np.exp(-t*(1.1+0.9*k))
    s*=(1-np.exp(-t*400))  # soft hammer (felt)
    s=np.convolve(s,np.ones(24)/24,'same')  # felt: dull the top
    add(s*vel*0.5,t0,pan)
def pad(ms,t0,dur,g=0.12,a=1.5,r=2.0):
    n=int(dur*SR); t=np.arange(n)/SR; s=np.zeros(n)
    for m in ms:
        for d in (-0.07,0.0,0.06):
            f=hz(m)*2**(d/12); s+=np.sin(2*np.pi*f*t+rng.random()*6)+0.18*np.sin(4*np.pi*f*t)
    s/=len(ms)*3; s*=env(n,a,r)*(1+0.08*np.sin(2*np.pi*0.15*t)); add(s*g,t0,0.0)
def cello(m,t0,dur,g=0.10,a=0.9,r=1.2,pan=-0.25):
    n=int(dur*SR); t=np.arange(n)/SR; f=hz(m)*(1+0.004*np.sin(2*np.pi*5.2*t)*np.clip(t/1.5,0,1))
    ph=2*np.pi*np.cumsum(f)/SR; s=np.sin(ph)+0.45*np.sin(2*ph)+0.22*np.sin(3*ph)+0.1*np.sin(4*ph)
    s*=env(n,a,r); add(s*g,t0,pan)
D3,F3,A3,Bb2,C3,G3,E3=50,53,57,46,48,55,52
Dm=[50,53,57]; Bb=[46,50,53]; F=[53,57,60]; C=[48,52,55]; Gm=[43,50,55]; Am=[45,52,57]
# Intro 0-3 pad swell + two notes
pad(Dm,0,7.0,g=0.10,a=2.5); piano(69,0.6,4,0.35,0.2); piano(65,1.9,4,0.3,-0.2)
# Verse 3-11 sparse piano
for t,m in [(3.4,62),(4.9,65),(6.4,69),(7.9,67),(9.3,65),(10.4,62)]: piano(m,t,4,0.28,0.15)
pad(Bb,6.2,5.6,g=0.09)
# Lift 11.3-20.8 cello enters (on 'بس أول ما تتطوّر')
pad(F,11.2,5.2,g=0.10); pad(C,16.0,5.0,g=0.10)
cello(57,11.6,4.6); cello(60,16.0,4.8,g=0.10)
for t,m in [(11.5,72),(12.9,69),(14.2,72),(15.6,74),(17.2,72),(18.8,69)]: piano(m,t,4,0.27,0.2)
# Thin out 20.8-26.6: low pad, tension
pad([38,45],20.6,6.3,g=0.11,a=1.2,r=1.6); piano(62,21.0,5,0.18,0.0)
# Pause 26.6-29.6: one held note
pad([57],26.5,3.4,g=0.06,a=0.4,r=1.2)
# Build 29.5-41.9 warmer
pad(Bb,29.4,4.3,g=0.10,a=1.0); pad(F,33.5,3.8,g=0.11); pad(Gm,37.1,3.6,g=0.11); pad(C,40.4,2.0,g=0.10,a=0.6,r=0.8)
cello(53,29.8,4.2,g=0.10); cello(57,34.0,3.4,g=0.11); cello(58,37.2,3.4,g=0.11); cello(60,40.3,1.9,g=0.10)
for t,m in [(29.7,65),(31.0,69),(32.3,70),(34.1,72),(35.4,69),(37.3,70),(38.6,74),(40.4,72)]: piano(m,t,4,0.3,0.15)
# Resolve 42.0-52.6 major, hopeful, long final chord
pad(F,42.0,4.4,g=0.12,a=0.8); pad(C,46.2,2.0,g=0.11,a=0.5); pad([46,50,53,57],48.0,4.6,g=0.11,a=0.6,r=3.6)
cello(57,42.1,4.0,g=0.11); cello(60,46.1,2.0,g=0.10); cello(53,48.1,4.5,g=0.11,r=3.5)
for t,m in [(42.1,72),(43.3,77),(44.4,76),(45.7,72),(47.1,69),(48.3,72),(49.6,77),(50.9,81)]: piano(m,t,4,0.32,0.2)
pad([53,57,60,65],50.6,2.0,g=0.07,a=0.4,r=1.8)
out/=np.abs(out).max()*1.12
w=wave.open(sys.argv[1],'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out*32767).astype(np.int16).tobytes()); w.close()
# impulse response for a warm room
n=int(2.6*SR); t=np.arange(n)/SR; ir=rng.standard_normal((n,2))*np.exp(-t*2.4)[:,None]
ir=np.apply_along_axis(lambda c: np.convolve(c,np.ones(12)/12,'same'),0,ir); ir[0]=1.0; ir/=np.abs(ir).max()
w=wave.open(sys.argv[2],'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((ir*32767*0.9).astype(np.int16).tobytes()); w.close()
