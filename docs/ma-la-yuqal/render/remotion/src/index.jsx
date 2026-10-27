import React from 'react';
import {
  registerRoot, Composition, AbsoluteFill, Sequence, Img, OffthreadVideo, Audio,
  staticFile, useCurrentFrame, useVideoConfig, interpolate, Easing, random,
} from 'remotion';
import '@fontsource/ibm-plex-sans-arabic/300.css';
import '@fontsource/ibm-plex-sans-arabic/600.css';
import '@fontsource/aref-ruqaa-ink/700.css';
import data from './data.json';
import {FilmV2} from './v2.jsx';

const IVORY = '#EDE6D6';
const COPPER = '#B8835A';
const XF = 0.6; // scene cross-dissolve, seconds
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'};
const ease = Easing.bezier(0.33, 0, 0.2, 1);

// ---------- scene backgrounds ----------
const Grade = ({children, video, grade}) => (
  <AbsoluteFill style={{filter: grade ? grade : video
    ? 'brightness(0.86) contrast(1.08) saturate(0.74) sepia(0.08)'
    : 'brightness(0.97) contrast(1.05) saturate(0.86)'}}>{children}</AbsoluteFill>
);

const zoomFor = (motion, p) => (motion === 'hold' ? 1 + 0.015 * p : motion === 'out' ? 1.08 - 0.08 * p : 1 + 0.07 * p);

const Still = ({scene, dur}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  let p = interpolate(f / fps, [0, dur], [0, 1], clamp);
  // "لحظة": the train shot stops moving and dims
  let dim = 1;
  if (scene.id === 'train') {
    const tf = data.freezeAt - scene.start;
    p = Math.min(p, tf / dur);
    dim = interpolate(f / fps, [tf, tf + 0.4], [1, 0.8], clamp);
  }
  return (
    <AbsoluteFill style={{filter: `brightness(${dim})`}}>
      <Img src={staticFile(`${scene.asset}_full.jpg`)}
        style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${zoomFor(scene.motion, ease(p))})`}} />
    </AbsoluteFill>
  );
};

const Parallax = ({scene, dur}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const p = ease(interpolate(f / fps, [0, dur], [0, 1], clamp));
  const bg = 1.03 + 0.035 * p;              // far layer: slow
  const fg = 1.03 + 0.09 * p;               // near layer: faster, drifts slightly up
  return (
    <AbsoluteFill>
      <Img src={staticFile(`${scene.asset}_bg.jpg`)}
        style={{position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${bg})`}} />
      <Img src={staticFile(`${scene.asset}_fg.png`)}
        style={{position: 'absolute', width: '100%', height: '100%', objectFit: 'cover',
          transform: `scale(${fg}) translateY(${-14 * p}px)`, transformOrigin: '50% 60%'}} />
    </AbsoluteFill>
  );
};

const Footage = ({scene}) => (
  <OffthreadVideo src={staticFile(scene.asset)} playbackRate={scene.motion} muted
    style={{width: '100%', height: '100%', objectFit: 'cover'}} />
);

// ---------- atmosphere ----------
const Dust = ({count = 70, warm = true, seed = 's'}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{mixBlendMode: 'screen'}}>
      {new Array(count).fill(0).map((_, i) => {
        const x0 = random(`${seed}x${i}`) * 1080, y0 = random(`${seed}y${i}`) * 1920;
        const sp = 0.15 + random(`${seed}v${i}`) * 0.45, size = 2 + random(`${seed}r${i}`) * 5;
        const x = x0 + Math.sin(f / 90 + i) * 30, y = (y0 - f * sp + 1920 * 4) % 1920;
        const tw = 0.35 + 0.65 * Math.abs(Math.sin(f / 40 + i * 1.7));
        return <div key={i} style={{position: 'absolute', left: x, top: y, width: size, height: size, borderRadius: '50%',
          background: warm ? '#E9B47A' : '#CFE3E8', opacity: 0.55 * tw, filter: `blur(${size > 5 ? 2 : 1}px)`}} />;
      })}
    </AbsoluteFill>
  );
};

const Rain = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      {new Array(36).fill(0).map((_, i) => {
        const x = random(`rx${i}`) * 1080, speed = 1.5 + random(`rs${i}`) * 5, len = 18 + random(`rl${i}`) * 40;
        const start = random(`ro${i}`) * 1920; const y = (start + f * speed) % 2100 - 100;
        return <div key={i} style={{position: 'absolute', left: x, top: y, width: 3, height: len, borderRadius: 3,
          background: 'linear-gradient(180deg, rgba(255,255,255,0), rgba(230,240,255,.45))', filter: 'blur(.6px)'}} />;
      })}
      {new Array(90).fill(0).map((_, i) => (
        <div key={`d${i}`} style={{position: 'absolute', left: random(`dx${i}`) * 1080, top: random(`dy${i}`) * 1920,
          width: 4 + random(`ds${i}`) * 6, height: 5 + random(`ds${i}`) * 7, borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,.55), rgba(255,255,255,.05) 70%)'}} />
      ))}
    </AbsoluteFill>
  );
};

const Fog = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{mixBlendMode: 'screen', opacity: 0.32}}>
      {[0, 1, 2, 3].map(i => (
        <div key={i} style={{position: 'absolute', width: 900, height: 700, borderRadius: '50%',
          left: 150 + Math.sin(f / 150 + i * 2) * 160 - 200 + i * 60, top: 60 + i * 140 + Math.cos(f / 170 + i) * 60,
          background: 'radial-gradient(closest-side, rgba(220,228,230,.55), rgba(220,228,230,0))', filter: 'blur(40px)'}} />
      ))}
    </AbsoluteFill>
  );
};

const Beam = ({left = -200, top = -300, angle = 32, color = '200,215,220'}) => {
  const f = useCurrentFrame();
  const o = 0.16 + 0.05 * Math.sin(f / 50) + 0.03 * Math.sin(f / 13);
  return (
    <AbsoluteFill style={{mixBlendMode: 'screen'}}>
      <div style={{position: 'absolute', left, top, width: 520, height: 2600, transform: `rotate(-${angle}deg)`,
        background: `linear-gradient(90deg, rgba(${color},0), rgba(${color},${o}), rgba(${color},0))`, filter: 'blur(30px)'}} />
    </AbsoluteFill>
  );
};

const DoorGlow = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{mixBlendMode: 'screen'}}>
      <div style={{position: 'absolute', left: 240, top: 640, width: 600, height: 900, borderRadius: '50%',
        background: 'radial-gradient(closest-side, rgba(255,214,150,.38), rgba(255,214,150,0))',
        opacity: 0.7 + 0.3 * Math.sin(f / 45), filter: 'blur(30px)'}} />
    </AbsoluteFill>
  );
};

const Leak = ({dur}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const o = interpolate(f / fps, [0, 0.35, 1.2], [0, 0.55, 0], clamp);
  return <AbsoluteFill style={{mixBlendMode: 'screen', opacity: o,
    background: 'radial-gradient(ellipse at 85% 40%, rgba(255,170,90,.9), rgba(255,120,40,.2) 45%, rgba(0,0,0,0) 70%)'}} />;
};

const Grain = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{mixBlendMode: 'overlay', opacity: 0.22, pointerEvents: 'none'}}>
      <svg width="1080" height="1920">
        <filter id="g"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={f % 12} /></filter>
        <rect width="100%" height="100%" filter="url(#g)" />
      </svg>
    </AbsoluteFill>
  );
};

const Vignette = () => (
  <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 45%, rgba(0,0,0,.62) 100%)'}} />
);

const SceneLayer = ({scene}) => {
  const {fps} = useVideoConfig();
  const dur = scene.end - scene.start + XF;
  const f = useCurrentFrame();
  const fadeIn = scene.start === 0 ? 1 : interpolate(f / fps, [0, XF], [0, 1], clamp);
  const blurIn = scene.start === 0 ? 0 : interpolate(f / fps, [0, XF], [6, 0], clamp);
  const body = scene.kind === 'parallax' ? <Parallax scene={scene} dur={dur} />
    : scene.kind === 'video' ? <Footage scene={scene} /> : <Still scene={scene} dur={dur} />;
  return (
    <AbsoluteFill style={{opacity: fadeIn, filter: blurIn ? `blur(${blurIn}px)` : undefined}}>
      <Grade video={scene.kind === 'video'} grade={scene.grade}>{body}</Grade>
      {scene.fx.includes('rain') && <Rain />}
      {scene.fx.includes('fog') && <Fog />}
      {scene.fx.includes('beam') && <Beam left={-260} top={-420} angle={34} />}
      {scene.fx.includes('door') && <DoorGlow />}
      {scene.fx.includes('dust') && <Dust seed={scene.id} count={scene.id === 'eyes' ? 30 : 70} />}
      {scene.fx.includes('leak') && <Leak dur={dur} />}
    </AbsoluteFill>
  );
};

// ---------- typography ----------
const textShadow = '0 2px 18px rgba(0,0,0,.85), 0 0 42px rgba(0,0,0,.55)';

const Card = ({card}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const t = card.show + f / fps;                         // absolute time
  const local = f / fps, dur = card.hide - card.show;
  const isLabel = card.style === 'label', isClimax = card.style === 'climax';
  const outLen = isLabel ? 0.9 : 0.4;
  const inP = interpolate(local, [0, 0.5], [0, 1], {...clamp, easing: ease});
  const outP = interpolate(local, [dur - outLen, dur], [0, 1], {...clamp, easing: Easing.in(Easing.quad)});
  const opacity = inP * (1 - outP);
  const blur = (1 - inP) * 8 + outP * (isLabel ? 14 : 4);
  const y = (1 - inP) * 8 - (isLabel ? outP * 30 : 0);
  return (
    <div dir="rtl" lang="ar" style={{position: 'absolute', left: 100, right: 100, top: card.top, direction: 'rtl', textAlign: 'center',
      fontFamily: 'IBM Plex Sans Arabic', fontWeight: 300, fontSize: isClimax ? 88 : isLabel ? 60 : 66, lineHeight: 1.55,
      color: IVORY, textShadow, opacity, filter: `blur(${blur}px)`, transform: `translateY(${y}px) scale(${1 + outP * (isLabel ? 0.06 : 0)})`}}>
      {card.words.map((w, i) => {
        // calm karaoke: the whole phrase sits at 55%, each spoken word rises to 100%
        const k = interpolate(t, [w.t - 0.05, w.t + 0.25], [0.55, 1], clamp);
        return (
          <React.Fragment key={i}>
            <span style={{opacity: k, fontWeight: w.em ? 600 : 300, color: w.em ? COPPER : IVORY}}>{w.w}</span>
            {i < card.words.length - 1 ? ' ' : ''}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const Logo = () => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const p = interpolate(f / fps, [0, 1.2], [0, 1], {...clamp, easing: ease});
  const nameP = interpolate(f / fps, [0.7, 1.6], [0, 1], {...clamp, easing: ease});
  const dur = data.logo.hide - data.logo.show;
  const out = interpolate(f / fps, [dur - 0.8, dur], [1, 0], clamp);
  return (
    <AbsoluteFill dir="rtl" lang="ar" style={{alignItems: 'center', justifyContent: 'center', direction: 'rtl', opacity: out}}>
      <div style={{fontFamily: 'Aref Ruqaa Ink', fontWeight: 700, fontSize: 158, color: IVORY, opacity: p,
        filter: `blur(${(1 - p) * 10}px)`, transform: `scale(${0.96 + 0.04 * p})`, textShadow: '0 0 60px rgba(184,131,90,.35)'}}>
        ما لا يُقال
      </div>
      <div style={{width: 160 * nameP, height: 1, background: COPPER, opacity: 0.7, margin: '18px 0 22px'}} />
      <div style={{fontFamily: 'IBM Plex Sans Arabic', fontWeight: 300, fontSize: 44, color: '#9A9590', opacity: nameP, letterSpacing: 0}}>
        همام ديك
      </div>
    </AbsoluteFill>
  );
};

// ---------- composition ----------
const Film = () => {
  const {fps} = useVideoConfig();
  const fr = s => Math.round(s * fps);
  return (
    <AbsoluteFill style={{background: '#0B0D10'}}>
      {data.scenes.map((s, i) => {
        const from = i === 0 ? 0 : fr(s.start - XF / 2);
        const to = i === data.scenes.length - 1 ? fr(data.total) : fr(s.end + XF / 2);
        return <Sequence key={s.id} from={from} durationInFrames={to - from}><SceneLayer scene={s} /></Sequence>;
      })}
      <Vignette />
      <Grain />
      {data.cards.map((c, i) => (
        <Sequence key={i} from={fr(c.show)} durationInFrames={Math.max(1, fr(c.hide) - fr(c.show))}><Card card={c} /></Sequence>
      ))}
      <Sequence from={fr(data.logo.show)} durationInFrames={fr(data.logo.hide) - fr(data.logo.show)}><Logo /></Sequence>
      <Audio src={staticFile('final_mix.wav')} />
    </AbsoluteFill>
  );
};

registerRoot(() => (
  <>
    <Composition id="MaLaYuqal" component={Film} durationInFrames={Math.round(data.total * data.fps)}
      fps={data.fps} width={1080} height={1920} />
    <Composition id="MaLaYuqalV2" component={FilmV2} durationInFrames={Math.round(data.total * data.fps)}
      fps={data.fps} width={1080} height={1920} />
  </>
));
