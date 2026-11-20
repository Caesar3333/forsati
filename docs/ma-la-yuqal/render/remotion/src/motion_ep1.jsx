// «ما لا يُقال» — الحلقة 1، نسخة موشن بدون الوجه
import React from 'react';
import {registerRoot, Composition, AbsoluteFill, Sequence, OffthreadVideo, Img, staticFile, useCurrentFrame, interpolate, Easing, random} from 'remotion';
import '@fontsource/ibm-plex-sans-arabic/400.css';
import '@fontsource/ibm-plex-sans-arabic/600.css';
import '@fontsource/aref-ruqaa-ink/700.css';
import T from './motion_ep1.json';

const FPS = T.fps;
const IVORY = '#EDE6D6', AMBER = '#E9B47A', COPPER = '#B8835A', BG = '#0B0D10';
const PLEX = 'IBM Plex Sans Arabic', RUQAA = 'Aref Ruqaa Ink';
const fr = t => Math.round(t * FPS);
const ease = Easing.bezier(0.22, 1, 0.36, 1);
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'};

// يدخل بنعومة (شفافية + ضباب + حركة) ويطلع بنعومة
const appear = (f, tIn, tOut, dIn = 0.55, dOut = 0.35) => {
  const a = interpolate(f, [fr(tIn), fr(tIn + dIn)], [0, 1], {...clamp, easing: ease});
  const b = tOut == null ? 1 : interpolate(f, [fr(tOut - dOut), fr(tOut)], [1, 0], clamp);
  return Math.min(a, b);
};

const Stage = ({bloom = 0}) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const breathe = 0.85 + 0.15 * Math.sin(t * 0.9);
  const bokeh = Array.from({length: 9}, (_, i) => {
    const s = 70 + random(`s${i}`) * 170;
    const x = random(`x${i}`) * 1080 + Math.sin(t * 0.18 + i) * 40;
    const y = 300 + random(`y${i}`) * 1300 + Math.cos(t * 0.15 + i * 2) * 50;
    return <div key={i} style={{position: 'absolute', left: x - s / 2, top: y - s / 2, width: s, height: s, borderRadius: '50%',
      background: `rgba(233,180,122,${0.07 + random(`a${i}`) * 0.12})`, filter: `blur(${24 + random(`b${i}`) * 30}px)`}} />;
  });
  const dust = Array.from({length: 46}, (_, i) => {
    const sp = 10 + random(`d${i}`) * 26;
    const y = (random(`dy${i}`) * 2100 - t * sp) % 2100;
    const yy = y < 0 ? y + 2100 : y;
    const x = random(`dx${i}`) * 1080 + Math.sin(t * 0.6 + i) * 14;
    const r = 1.5 + random(`dr${i}`) * 2.5;
    return <div key={i} style={{position: 'absolute', left: x, top: yy - 90, width: r, height: r, borderRadius: '50%',
      background: 'rgba(237,230,214,0.55)', opacity: 0.25 + 0.5 * random(`do${i}`), filter: 'blur(0.6px)'}} />;
  });
  return (
    <AbsoluteFill style={{background: BG, overflow: 'hidden'}}>
      <AbsoluteFill style={{background: 'radial-gradient(ellipse 70% 48% at 50% 46%, rgba(122,74,34,0.62) 0%, rgba(40,26,16,0.75) 45%, rgba(9,10,12,1) 100%)', opacity: breathe}} />
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(233,180,122,0.10) 0%, rgba(233,180,122,0) 38%)',
        transform: `skewX(${Math.sin(t * 0.25) * 3}deg)`}} />
      {bokeh}
      {dust}
      <AbsoluteFill style={{background: `radial-gradient(circle at 50% 50%, rgba(233,180,122,${0.55 * bloom}) 0%, rgba(233,180,122,0) ${30 + 30 * bloom}%)`}} />
    </AbsoluteFill>
  );
};

const Lamp = ({dur}) => {
  const f = useCurrentFrame();
  const z = interpolate(f, [0, fr(dur)], [1.0, 1.07], clamp);
  const flick = 0.9 + 0.1 * Math.sin(f / FPS * 2.1) * Math.sin(f / FPS * 0.7 + 1);
  return (
    <AbsoluteFill style={{background: BG, overflow: 'hidden'}}>
      <Img src={staticFile('ep1m/lamp.png')} style={{width: 1080, height: 1920, transform: `scale(${z})`, transformOrigin: '38% 30%'}} />
      <AbsoluteFill style={{background: `radial-gradient(circle at 33% 18%, rgba(255,200,130,${0.22 * flick}) 0%, rgba(255,200,130,0) 35%)`}} />
      <AbsoluteFill style={{background: 'radial-gradient(ellipse 85% 34% at 50% 56%, rgba(8,8,10,0.72) 0%, rgba(8,8,10,0.35) 60%, rgba(8,8,10,0) 100%)'}} />
    </AbsoluteFill>
  );
};

const STY = {
  lead: {fontFamily: PLEX, fontWeight: 600, fontSize: 60, color: IVORY, lineHeight: 1.45},
  small: {fontFamily: PLEX, fontWeight: 400, fontSize: 44, color: '#CFC6B5', letterSpacing: 1},
  hero: {fontFamily: RUQAA, fontWeight: 700, fontSize: 124, color: IVORY, lineHeight: 1.35},
};

const Line = ({l, sceneStart, out, f}) => {
  const tIn = l.t - sceneStart;
  const p = appear(f, tIn, out);
  const y = interpolate(p, [0, 1], [28, 0]);
  const blur = interpolate(p, [0, 1], [10, 0]);
  let scale = 1;
  if (l.grow) scale = interpolate(f, [fr(tIn), fr(tIn + 1.4)], [0.72, 1], {...clamp, easing: ease});
  const st = {...STY[l.style]};
  if (l.em) st.color = AMBER;
  const glow = l.style === 'hero' ? `0 0 ${l.em ? 46 : 30}px rgba(233,180,122,${l.em ? 0.45 : 0.22}), 0 4px 18px rgba(0,0,0,.7)` : '0 2px 14px rgba(0,0,0,.75)';
  const html = l.text.replace(/<em>(.*?)<\/em>/g, `<span style="color:${AMBER}">$1</span>`);
  return <div style={{...st, opacity: p, transform: `translateY(${y}px) scale(${scale})`, filter: `blur(${blur}px)`, textShadow: glow, margin: '8px 0'}}
    dangerouslySetInnerHTML={{__html: html}} />;
};

const MotionScene = ({name, s}) => {
  const f = useCurrentFrame();
  const m = T.motion[name];
  const dur = s.end - s.start;
  const endOut = dur - 0.05;
  const phases = m.phases || [[s.start, null]];
  const bloomLine = m.lines.find(l => l.bloom);
  const bloom = bloomLine ? interpolate(f, [fr(bloomLine.t - s.start), fr(bloomLine.t - s.start + 1.6)], [0, 1], {...clamp, easing: ease}) : 0;
  const fadeIn = interpolate(f, [0, 6], [0, 1], clamp);
  return (
    <AbsoluteFill style={{opacity: fadeIn}}>
      {m.kind === 'lamp' ? <Lamp dur={dur} /> : <Stage bloom={bloom} />}
      {m.title && <div style={{position: 'absolute', top: 600, left: 0, right: 0, textAlign: 'center', fontFamily: RUQAA, fontWeight: 700, fontSize: 76,
        color: IVORY, opacity: appear(f, m.title[0], m.title[1] - s.start, 0.6, 0.5), textShadow: '0 4px 30px rgba(0,0,0,.8)'}}>ما لا يُقال</div>}
      {phases.map((ph, k) => {
        const lines = m.lines.filter(l => (l.phase ?? 0) === k);
        const out = ph[1] == null ? endOut : ph[1] - s.start;
        return <div key={k} dir="rtl" style={{position: 'absolute', left: 80, width: 860, top: 0, bottom: 0, display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'center', textAlign: 'center', paddingBottom: 120, textWrap: 'balance'}}>
          {lines.map((l, i) => <Line key={i} l={l} sceneStart={s.start} out={m.endlogo ? m.linesOut : out} f={f} />)}
        </div>;
      })}
      {m.endlogo && <div style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: RUQAA, fontWeight: 700, fontSize: 132, color: IVORY, opacity: appear(f, m.linesOut - 0.1, null, 0.8),
        textShadow: '0 0 40px rgba(233,180,122,.35), 0 4px 30px rgba(0,0,0,.8)'}}>ما لا يُقال</div>}
    </AbsoluteFill>
  );
};

const Caption = ({text, dur}) => {
  const f = useCurrentFrame();
  const p = Math.min(interpolate(f, [0, 3], [0, 1], clamp), interpolate(f, [fr(dur) - 3, fr(dur)], [1, 0], clamp));
  return <div dir="rtl" style={{position: 'absolute', left: 96, width: 820, bottom: 470, textAlign: 'center', fontFamily: PLEX, fontWeight: 600,
    fontSize: 50, lineHeight: 1.55, color: '#F4EFE6', opacity: p, textWrap: 'balance',
    textShadow: '0 2px 3px rgba(0,0,0,.85), 0 0 22px rgba(0,0,0,.65), 0 0 44px rgba(0,0,0,.4)'}}>{text}</div>;
};

const Film = () => (
  <AbsoluteFill style={{background: BG}}>
    {T.scenes.map(s => (
      <Sequence key={s.name} from={fr(s.start)} durationInFrames={fr(s.end) - fr(s.start)}>
        {s.name.startsWith('B')
          ? <OffthreadVideo src={staticFile(`ep1m/${s.name}.mp4`)} muted />
          : <MotionScene name={s.name} s={s} />}
      </Sequence>
    ))}
    {T.small.map(i => {
      const [a, b, text] = T.captions[i];
      return <Sequence key={`c${i}`} from={fr(a)} durationInFrames={fr(b) - fr(a)}><Caption text={text} dur={b - a} /></Sequence>;
    })}
  </AbsoluteFill>
);

registerRoot(() => (
  <Composition id="MotionEp1" component={Film} durationInFrames={fr(T.total)} fps={FPS} width={1080} height={1920} />
));
