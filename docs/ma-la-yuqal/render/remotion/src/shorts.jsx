// Short reels (12–20 s) for «ما لا يُقال»: the real voice + kinetic Ruqaa type, one composition per reel.
// Timing comes from shorts_tl.json (cut from the recording), layout from shorts_vis.json (screens → lines + fx).
import React from 'react';
import {AbsoluteFill, Audio, staticFile, useCurrentFrame, useVideoConfig, interpolate, Easing, random} from 'remotion';
import TL from './shorts_tl.json';
import VIS from './shorts_vis.json';

const IVORY = '#EDE6D6', COPPER = '#B8835A', AMBER = '#E9B47A', BG = '#0B0D10', RUQAA = 'Aref Ruqaa Ink';
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'};
const out = Easing.bezier(0.16, 1, 0.3, 1);
const inOut = Easing.bezier(0.65, 0, 0.35, 1);
const useT = () => { const f = useCurrentFrame(); const {fps} = useVideoConfig(); return f / fps; };
const strip = (w) => w.replace(/[…؟،.:«»!]/g, '');

// word times inside a phrase, proportional to word length (phrase start/end come from the real recording)
const timed = (tl, pi) => {
  const p = tl.phrases[String(pi)]; const ws = p.text.split(/\s+/).filter(Boolean);
  const wt = ws.map(w => strip(w).length + 1), tot = wt.reduce((a, b) => a + b, 0);
  let acc = 0;
  return ws.map((w, i) => { const t = p.t0 + (p.t1 - p.t0) * acc / tot; acc += wt[i]; return {w, t}; });
};
const pick = (tl, pi, words) => {
  const all = timed(tl, pi); const key = words.split(' ').map(strip);
  for (let i = 0; i + key.length <= all.length; i++) if (key.every((k, j) => strip(all[i + j].w) === k)) return all.slice(i, i + key.length);
  throw new Error(`words not found: ${words}`);
};
const ref = (tl, r) => r === 'logo' ? tl.logo_at : (r[1] == null ? tl.phrases[String(r[0])].t0 : pick(tl, r[0], r[1])[0].t);

// ---------- atmosphere ----------
const Backdrop = ({seed}) => {
  const t = useT(); const s = random(seed) * 6;
  return (
    <AbsoluteFill style={{background: BG}}>
      <div style={{position: 'absolute', width: 1500, height: 1500, left: -380 + Math.sin(t * 0.23 + s) * 170, top: 120 + Math.cos(t * 0.19 + s) * 210,
        background: 'radial-gradient(closest-side, rgba(184,131,90,.24), rgba(184,131,90,0))', filter: 'blur(40px)'}} />
      <div style={{position: 'absolute', width: 1300, height: 1300, left: 260 + Math.cos(t * 0.17 + s) * 190, top: 820 + Math.sin(t * 0.21 + s) * 170,
        background: 'radial-gradient(closest-side, rgba(30,70,80,.3), rgba(30,70,80,0))', filter: 'blur(50px)'}} />
    </AbsoluteFill>
  );
};
const Dust = ({n = 50, seed = 'd', speed = 1, boost = 0}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{mixBlendMode: 'screen'}}>
      {new Array(n).fill(0).map((_, i) => {
        const x = random(`${seed}x${i}`) * 1080 + Math.sin(f / 80 + i) * 25;
        const y = (random(`${seed}y${i}`) * 1920 - f * (0.25 + random(`${seed}s${i}`) * 0.6) * speed + 19200) % 1920;
        const s = 2 + random(`${seed}r${i}`) * 4;
        return <div key={i} style={{position: 'absolute', left: x, top: y, width: s, height: s, borderRadius: '50%', background: AMBER,
          opacity: Math.min(1, 0.3 + boost + 0.35 * Math.abs(Math.sin(f / 37 + i))), filter: 'blur(1px)'}} />;
      })}
    </AbsoluteFill>
  );
};
const Grain = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{mixBlendMode: 'overlay', opacity: 0.22}}>
      <svg width="1080" height="1920"><filter id="sg"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={f % 12} /></filter>
        <rect width="100%" height="100%" filter="url(#sg)" /></svg>
    </AbsoluteFill>
  );
};
const Vignette = () => <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 42%, rgba(0,0,0,.7) 100%)'}} />;
const Sweep = ({at}) => {
  const t = useT(); const p = interpolate(t, [at - 0.35, at + 0.45], [0, 1], clamp);
  if (p <= 0 || p >= 1) return null;
  return <AbsoluteFill style={{mixBlendMode: 'screen', opacity: Math.sin(p * Math.PI) * 0.5,
    background: `linear-gradient(105deg, rgba(255,190,120,0) ${p * 140 - 40}%, rgba(255,190,120,.55) ${p * 140 - 20}%, rgba(255,190,120,0) ${p * 140}%)`}} />;
};

// ---------- kinetic Ruqaa ----------
// whole words only (Arabic letters always stay joined): right-to-left mask reveal + rise + unblur on the voice
const Word = ({w, t, size, em, dim, strikeAt}) => {
  const p = out(interpolate(t, [w.t - 0.1, w.t + 0.42], [0, 1], clamp));
  const glow = em ? `0 0 ${18 + 22 * p}px rgba(233,180,122,.55), 0 4px 30px rgba(0,0,0,.85)` : '0 4px 30px rgba(0,0,0,.85)';
  return (
    <span style={{display: 'inline-block', position: 'relative', margin: '0 0.14em', clipPath: `inset(-30% 0 -30% ${(1 - p) * 100}%)`,
      transform: `translateY(${(1 - p) * 40}px)`, filter: `blur(${(1 - p) * 8}px)`, color: em ? COPPER : IVORY,
      fontSize: size * (em ? 1.12 : 1), textShadow: glow, opacity: dim ?? 1}}>{w.w}
      {strikeAt != null && <span style={{position: 'absolute', right: '-4%', top: '50%', height: Math.max(5, size * 0.055), borderRadius: 4, background: COPPER,
        boxShadow: '0 0 14px rgba(233,180,122,.7)', width: `${out(interpolate(t, [strikeAt, strikeAt + 0.45], [0, 1], clamp)) * 108}%`}} />}
    </span>
  );
};
const Line = ({tl, ln}) => {
  const t = useT(); const words = pick(tl, ln.p, ln.w);
  return (
    <div dir="rtl" lang="ar" style={{position: 'absolute', left: 90, right: 150, top: ln.top, textAlign: 'center', direction: 'rtl', fontFamily: RUQAA,
      fontWeight: 700, lineHeight: 1.5, WebkitBoxReflect: ln.reflect ? 'below -30px linear-gradient(transparent 45%, rgba(255,255,255,.28))' : undefined}}>
      {words.map((w, i) => {
        const em = (ln.em || []).some(e => strip(e) === strip(w.w));
        const hit = (x) => x && strip(w.w) === strip(x);
        const dim = hit(ln.dim) ? interpolate(t, [w.t + 0.7, w.t + 2.2], [1, 0.14], clamp) : undefined;
        return <Word key={i} w={w} t={t} size={ln.size} em={em} dim={dim} strikeAt={hit(ln.strike) ? w.t + 0.45 : undefined} />;
      })}
    </div>
  );
};

// ---------- effects ----------
const Tags = ({tl, f, end}) => {
  const t = useT(); const strikeAt = f.strike ? ref(tl, f.strike) : null;
  const pull = inOut(interpolate(t, [end - 0.6, end + 0.6], [0, 1], clamp));
  return (
    <AbsoluteFill style={{transform: `scale(${1 - 0.4 * pull}) translateY(${-100 * pull}px)`, filter: `blur(${pull * 5}px)`, opacity: 1 - pull}}>
      {f.items.map((g, i) => {
        const at = ref(tl, g.at), p = out(interpolate(t, [at - 0.08, at + 0.35], [0, 1], clamp));
        const rot = [-4, 3, -2, 2.5][i % 4], x = [-40, 50, -20, 30][i % 4];
        return (
          <div key={i} style={{position: 'absolute', top: f.top + i * 190, left: 0, right: 0, display: 'flex', justifyContent: 'center',
            opacity: p, transform: `translateX(${x}px) translateY(${(1 - p) * -90}px) rotate(${rot + (1 - p) * 10}deg) scale(${1.35 - 0.35 * p})`}}>
            <div dir="rtl" lang="ar" style={{position: 'relative', padding: '18px 54px 26px', background: 'linear-gradient(170deg, #efe4cc, #d8c7a4)', borderRadius: 6,
              boxShadow: '0 18px 40px rgba(0,0,0,.55)', fontFamily: RUQAA, fontWeight: 700, fontSize: 66, color: '#2a1d12', whiteSpace: 'nowrap'}}>
              {g.text}
              {strikeAt != null && <span style={{position: 'absolute', right: '4%', top: '54%', height: 6, borderRadius: 6, background: COPPER,
                boxShadow: '0 0 12px rgba(233,180,122,.7)', width: `${out(interpolate(t, [strikeAt + i * 0.12, strikeAt + i * 0.12 + 0.4], [0, 1], clamp)) * 92}%`}} />}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
const Burst = ({tl, f}) => {
  const t = useT(); const at = ref(tl, f.at);
  const b = interpolate(t, [at - 0.05, at + 0.25, at + 1.8], [0, 1, 0.25], clamp);
  return (<>
    <AbsoluteFill style={{background: `radial-gradient(circle at 50% 42%, rgba(255,200,140,${0.5 * b}) 0%, rgba(184,131,90,${0.25 * b}) 25%, rgba(0,0,0,0) 55%)`, mixBlendMode: 'screen'}} />
    <Dust n={70} seed="burst" speed={0.6} boost={0.5 * b} />
  </>);
};
const Fog = () => {
  const t = useT();
  return <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 50%, rgba(180,200,205,${0.08 + 0.03 * Math.sin(t)}) 0%, rgba(0,0,0,0) 60%)`, filter: 'blur(20px)'}} />;
};
// a slow inner universe: warm particles orbiting inside a soft circle
const Galaxy = ({soft}) => {
  const f = useCurrentFrame(); const cx = 540, cy = 800;
  return (
    <AbsoluteFill style={{opacity: soft ? 0.35 : 1, mixBlendMode: 'screen'}}>
      <div style={{position: 'absolute', left: cx - 360, top: cy - 360, width: 720, height: 720, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(233,180,122,.26) 0%, rgba(30,70,80,.22) 55%, rgba(0,0,0,0) 72%)'}} />
      {new Array(140).fill(0).map((_, i) => {
        const r = 40 + random(`gr${i}`) ** 0.7 * 320, a0 = random(`ga${i}`) * Math.PI * 2, sp = (0.002 + 0.006 * (1 - r / 340)) * (i % 2 ? 1 : 0.8);
        const a = a0 + f * sp, x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r * 0.62, s = 2.5 + random(`gs${i}`) * 5;
        return <div key={i} style={{position: 'absolute', left: x, top: y, width: s, height: s, borderRadius: '50%', background: i % 7 ? AMBER : IVORY,
          opacity: 0.35 + 0.5 * Math.abs(Math.sin(f / 29 + i)), filter: 'blur(.6px)'}} />;
      })}
    </AbsoluteFill>
  );
};
// a faint human silhouette with the judgements we stick on it, which fall away when the screen ends
const Person = ({tl, f, end}) => {
  const t = useT(); const away = interpolate(t, [end - 0.5, end + 0.3], [0, 1], clamp);
  const spots = [[180, 560, -6], [700, 640, 5], [150, 900, 4], [640, 1000, -4]];
  return (
    <AbsoluteFill>
      <svg width="1080" height="1920" style={{position: 'absolute', inset: 0, opacity: 0.22}}>
        <circle cx="540" cy="640" r="120" fill={IVORY} /><path d="M330 1180 Q330 820 540 800 Q750 820 750 1180 Z" fill={IVORY} />
      </svg>
      {f.items.map((g, i) => {
        const at = ref(tl, g.at), p = out(interpolate(t, [at - 0.05, at + 0.3], [0, 1], clamp));
        const [x, y, rot] = spots[i % spots.length];
        return <div key={i} dir="rtl" lang="ar" style={{position: 'absolute', left: x, top: y + away * (300 + i * 80), padding: '12px 36px 18px',
          background: 'linear-gradient(170deg, #efe4cc, #d8c7a4)', borderRadius: 6, boxShadow: '0 14px 30px rgba(0,0,0,.5)', fontFamily: RUQAA, fontWeight: 700,
          fontSize: 60, color: '#2a1d12', whiteSpace: 'nowrap', opacity: p * (1 - away), transform: `rotate(${rot + away * (i % 2 ? 30 : -30)}deg) scale(${1.3 - 0.3 * p})`}}>{g.text}</div>;
      })}
    </AbsoluteFill>
  );
};
const FX = {tags: Tags, burst: Burst, fog: Fog, galaxy: Galaxy, person: Person};

// ---------- screens + logo ----------
const Screen = ({tl, sc, a, b, first}) => {
  const t = useT();
  const o = first ? interpolate(t, [b - 0.05, b + 0.4], [1, 0], clamp) : interpolate(t, [a - 0.3, a + 0.05, b - 0.05, b + 0.4], [0, 1, 1, 0], clamp);
  if (o <= 0) return null;
  const push = 1 + 0.045 * inOut(interpolate(t, [a - 0.3, b + 0.4], [0, 1], clamp));
  return (
    <AbsoluteFill style={{opacity: o, transform: `scale(${push})`}}>
      {(sc.fx || []).map((f, i) => { const C = FX[f.type]; return <C key={i} tl={tl} f={f} soft={f.soft} end={b} />; })}
      {sc.lines.map((ln, i) => <Line key={i} tl={tl} ln={ln} />)}
    </AbsoluteFill>
  );
};
const Logo = ({at}) => {
  const t = useT(); const p = out(interpolate(t, [at, at + 1.0], [0, 1], clamp));
  const shine = interpolate(t, [at + 0.7, at + 2.0], [-30, 130], clamp);
  if (t < at - 0.1) return null;
  return (
    <AbsoluteFill style={{opacity: p}}>
      <div dir="rtl" lang="ar" style={{position: 'absolute', left: 0, right: 0, top: 660, textAlign: 'center', fontFamily: RUQAA, fontWeight: 700, fontSize: 200,
        color: COPPER, transform: `scale(${1.15 - 0.15 * p})`, filter: `blur(${(1 - p) * 14}px)`, textShadow: '0 0 50px rgba(233,180,122,.45)',
        WebkitMaskImage: `linear-gradient(100deg, #000 ${shine - 30}%, rgba(0,0,0,.65) ${shine}%, #000 ${shine + 30}%)`}}>ما لا يُقال</div>
      <div style={{position: 'absolute', left: 380, right: 380, top: 1010, height: 2, background: COPPER, opacity: 0.7, transform: `scaleX(${p})`}} />
      <div dir="rtl" lang="ar" style={{position: 'absolute', left: 0, right: 0, top: 1050, textAlign: 'center', fontFamily: RUQAA, fontWeight: 700, fontSize: 64, color: IVORY, opacity: 0.85}}>بودكاست · همام ديك</div>
    </AbsoluteFill>
  );
};

export const Short = ({id}) => {
  const tl = TL[id], vis = VIS[id];
  const logoAt = vis.logo ? ref(tl, vis.logo) : tl.logo_at;
  const starts = vis.screens.map(sc => ref(tl, sc.at)).concat([logoAt]);
  return (
    <AbsoluteFill style={{background: BG}}>
      <Backdrop seed={id} />
      <Dust n={50} seed={`base${id}`} />
      {vis.screens.map((sc, i) => <Screen key={i} tl={tl} sc={sc} a={i === 0 ? 0 : starts[i]} b={starts[i + 1]} first={i === 0} />)}
      <Logo at={logoAt} />
      {starts.slice(1).map(c => <Sweep key={c} at={c} />)}
      <Vignette /><Grain />
      <Audio src={staticFile(`shorts/${id}.wav`)} />
    </AbsoluteFill>
  );
};
export const SHORT_IDS = Object.keys(TL);
export const shortFrames = (id) => Math.round(TL[id].duration * 30);
