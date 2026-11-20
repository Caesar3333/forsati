import json,subprocess,sys
S=sys.argv[1]; OUT=sys.argv[2]
caps=json.load(open(S+'/captions.json'))
inp=['-i',S+'/concat_raw.mp4','-i',S+'/aud/mix_final.wav']
fc=["[0:v]curves=all='0/0.025 0.25/0.225 0.5/0.5 0.75/0.785 1/0.975',eq=saturation=0.97,vignette=angle=PI/5,noise=alls=4:allf=t+u,format=yuv420p[b0]"]
items=[(a,b,f'{S}/cap/cap_{i:02d}.png') for i,(a,b,_) in enumerate(caps)]+[(0.15,2.55,f'{S}/cap/title.png')]
cur='b0'
for k,(a,b,p) in enumerate(items):
    idx=k+2; inp+=['-loop','1','-framerate','24','-t','51.80','-i',p]
    fi=0.18 if p.endswith('title.png') else 0.12
    fc.append(f"[{idx}:v]format=rgba,fade=t=in:st={a}:d={fi}:alpha=1,fade=t=out:st={b-fi:.3f}:d={fi}:alpha=1[o{k}]")
    nxt=f'v{k}'; fc.append(f"[{cur}][o{k}]overlay=0:0:enable='between(t,{a},{b})':format=auto[{nxt}]"); cur=nxt
fc.append(f"[{cur}]format=yuv420p,setsar=1[vout]")
subprocess.run(['ffmpeg','-v','error','-y']+inp+['-filter_complex',';'.join(fc),'-map','[vout]','-map','1:a','-t','51.80',
 '-c:v','libx264','-preset','slow','-crf','15','-profile:v','high','-level','4.2','-pix_fmt','yuv420p',
 '-color_primaries','bt709','-color_trc','bt709','-colorspace','bt709','-x264-params','keyint=48:min-keyint=24',
 '-c:a','aac','-b:a','320k','-ar','48000','-movflags','+faststart',OUT],check=True)
