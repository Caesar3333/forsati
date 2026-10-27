// v2 — hybrid edit: podcast A-roll (lip-synced clips of Hammam at the mic) cut with kinetic Arabic
// typography B-roll. Until the A-roll arrives, `aroll` placeholders use the wood-room clip.
import React from 'react';
import {
  AbsoluteFill, Sequence, Img, OffthreadVideo, Audio, staticFile, useCurrentFrame, useVideoConfig,
  interpolate, Easing, random,
} from 'remotion';
import data from './data.json';
import v2 from './v2.json';

const IVORY = '#EDE6D6', COPPER = '#B8835A', BG = '#0B0D10';
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'};
const out = Easing.bezier(0.16, 1, 0.3, 1);         // expo-out: fast start, long settle
const inOut = Easing.bezier(0.65, 0, 0.35, 1);
const useT = () => { const f = useCurrentFrame(); const {fps} = useVideoConfig(); return f / fps; };
const cardsIn = (a, b) => data.cards.filter(c => c.show >= a - 0.05 && c.show < b);
const PLEX = 'IBM Plex Sans Arabic';

// ---------- living background ----------
const Backdrop = ({tint = 'copper'}) => {
  const t = useT();
  const c1 = tint === 'teal' ? '40,90,100' : '184,131,90';
  return (
    <AbsoluteFill style={{background: BG}}>
      <div style={{position: 'absolute', width: 1400, height: 1400, left: -300 + Math.sin(t * 0.25) * 160, top: 200 + Math.cos(t * 0.2) * 200,
        background: `radial-gradient(closest-side, rgba(${c1},.22), rgba(${c1},0))`, filter: 'blur(40px)'}} />
      <div style={{position: 'absolute', width: 1200, height: 1200, left: 300 + Math.cos(t * 0.18) * 180, top: 900 + Math.sin(t * 0.22) * 160,
        background: 'radial-gradient(closest-side, rgba(30,70,80,.28), rgba(30,70,80,0))', filter: 'blur(50px)'}} />
      <Dust n={45} />
    </AbsoluteFill>
  );
};
const Dust = ({n = 50, seed = 'd'}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{mixBlendMode: 'screen'}}>
      {new Array(n).fill(0).map((_, i) => {
        const x = random(`${seed}x${i}`) * 1080 + Math.sin(f / 80 + i) * 25;
        const y = (random(`${seed}y${i}`) * 1920 - f * (0.2 + random(`${seed}s${i}`) * 0.5) + 7680) % 1920;
        const s = 2 + random(`${seed}r${i}`) * 4;
        return <div key={i} style={{position: 'absolute', left: x, top: y, width: s, height: s, borderRadius: '50%',
          background: '#E9B47A', opacity: 0.35 + 0.35 * Math.abs(Math.sin(f / 37 + i)), filter: 'blur(1px)'}} />;
      })}
    </AbsoluteFill>
  );
};
const Grain = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{mixBlendMode: 'overlay', opacity: 0.2}}>
      <svg width="1080" height="1920"><filter id="g2"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={f % 12} /></filter>
        <rect width="100%" height="100%" filter="url(#g2)" /></svg>
    </AbsoluteFill>
  );
};
const Vignette = ({k = 0.62}) => <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 45%, rgba(0,0,0,${k}) 100%)`}} />;

// copper line that draws itself
const Line = ({x1, y1, x2, y2, at, dur = 0.6, w = 2, o = 0.85}) => {
  const t = useT(); const p = out(interpolate(t, [at, at + dur], [0, 1], clamp));
  const len = Math.hypot(x2 - x1, y2 - y1);
  return (
    <svg width="1080" height="1920" style={{position: 'absolute', inset: 0}}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={COPPER} strokeWidth={w} strokeOpacity={o}
        strokeDasharray={len} strokeDashoffset={len * (1 - p)} strokeLinecap="round" />
    </svg>
  );
};

// ---------- kinetic words ----------
// each word: right-to-left mask reveal + rise + unblur, timed to the voice
const KWord = ({w, t, size, emphasis, delay = 0, strike}) => {
  const p = out(interpolate(t, [w.t - 0.12 + delay, w.t + 0.38 + delay], [0, 1], clamp));
  const em = w.em || emphasis;
  return (
    <span style={{display: 'inline-block', position: 'relative', margin: '0 0.12em',
      clipPath: `inset(-20% 0 -20% ${(1 - p) * 100}%)`, transform: `translateY(${(1 - p) * 34}px)`,
      filter: `blur(${(1 - p) * 6}px)`, fontWeight: em ? 600 : 300, color: em ? COPPER : IVORY,
      fontSize: em ? size * 1.12 : size}}>
      {w.w}
      {em && <span style={{position: 'absolute', right: 0, bottom: '0.02em', height: 3, background: COPPER,
        width: `${out(interpolate(t, [w.t + 0.25, w.t + 0.75], [0, 1], clamp)) * 100}%`}} />}
      {strike && <span style={{position: 'absolute', right: 0, top: '58%', height: 6, borderRadius: 3, background: IVORY, opacity: 0.85,
        width: `${out(interpolate(t, [w.t + 0.7, w.t + 1.2], [0, 1], clamp)) * 100}%`}} />}
    </span>
  );
};
const KPhrase = ({card, size = 84, top, exitAt, style, offset = 0, strikeWord}) => {
  const t = useT() + offset;                           // absolute time (offset = Sequence start)
  const leave = exitAt ?? card.hide;
  const o = interpolate(t, [leave - 0.3, leave + 0.1], [1, 0], clamp);
  const lift = interpolate(t, [leave - 0.3, leave + 0.1], [0, -40], {...clamp, easing: inOut});
  return (
    <div dir="rtl" lang="ar" style={{position: 'absolute', left: 70, right: 70, top, textAlign: 'center', direction: 'rtl',
      fontFamily: PLEX, lineHeight: 1.35, color: IVORY, opacity: o, transform: `translateY(${lift}px)`,
      filter: `blur(${(1 - o) * 6}px)`, textShadow: '0 2px 22px rgba(0,0,0,.8)', ...style}}>
      {card.words.map((w, i) => <KWord key={i} w={w} t={t} size={size} strike={strikeWord && w.w.includes(strikeWord)} />)}
    </div>
  );
};

// ---------- A-roll (podcast) ----------
const ARoll = ({clip, start, end}) => {
  const t = useT(); const d = end - start;
  const push = 1.04 + 0.05 * inOut(interpolate(t, [0, d], [0, 1], clamp));
  const src = clip.file ? staticFile(clip.file) : staticFile('talking_wood_listen.mp4');
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{transform: `scale(${push})`, filter: 'brightness(.78) contrast(1.1) saturate(.72) sepia(.1)'}}>
        <OffthreadVideo src={src} muted playbackRate={clip.file ? 1 : 0.5} startFrom={clip.file ? Math.round((clip.trim || 0) * 30) : 0} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </AbsoluteFill>
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(11,13,16,.55) 0%, rgba(11,13,16,0) 22%, rgba(11,13,16,0) 55%, rgba(11,13,16,.92) 100%)'}} />
      {!clip.file && <div dir="rtl" style={{position: 'absolute', top: 60, left: 60, fontFamily: PLEX, fontSize: 26, color: '#C9925F',
        border: '1px solid rgba(201,146,95,.6)', padding: '6px 14px', borderRadius: 20, background: 'rgba(11,13,16,.5)'}}>مكان لقطة البودكاست</div>}
      <Bug />
    </AbsoluteFill>
  );
};
const Bug = () => (
  <div dir="rtl" lang="ar" style={{position: 'absolute', top: 70, right: 70, fontFamily: 'Aref Ruqaa Ink', fontSize: 46, color: IVORY, opacity: 0.7,
    textShadow: '0 0 20px rgba(0,0,0,.6)'}}>ما لا يُقال</div>
);
const Brackets = ({at, dur = 1.6}) => {               // viewfinder corners for the "snapshot" moment
  const t = useT(); const p = out(interpolate(t, [at, at + 0.35], [0, 1], clamp));
  const o = interpolate(t, [at, at + 0.1, at + dur - 0.3, at + dur], [0, 1, 1, 0], clamp);
  const inset = 60 + (1 - p) * 80, L = 90;
  const c = (s) => ({position: 'absolute', width: L, height: L, borderColor: IVORY, borderStyle: 'solid', borderWidth: 0, ...s});
  return (
    <AbsoluteFill style={{opacity: o}}>
      <div style={c({top: inset + 160, left: inset, borderTopWidth: 3, borderLeftWidth: 3})} />
      <div style={c({top: inset + 160, right: inset, borderTopWidth: 3, borderRightWidth: 3})} />
      <div style={c({bottom: inset + 420, left: inset, borderBottomWidth: 3, borderLeftWidth: 3})} />
      <div style={c({bottom: inset + 420, right: inset, borderBottomWidth: 3, borderRightWidth: 3})} />
      <AbsoluteFill style={{background: '#fff', opacity: interpolate(t, [at, at + 0.06, at + 0.22], [0, 0.35, 0], clamp)}} />
    </AbsoluteFill>
  );
};
// floating judgement tags around the face ("مغرور" "بارد" ...)
const Tags = ({card, offset = 0}) => {
  const t = useT() + offset;
  const pos = [[660, 860, -5], [90, 930, 5], [640, 1060, 4], [80, 1150, -4]];
  const words = card.words.map(w => ({...w, w: w.w.replace(/[…\.]/g, '')}))
    .filter(w => !['حكينا', 'إنه', 'أو'].includes(w.w));
  const groups = [];                                   // "أسلوبه سيّئ" stays together
  words.forEach(w => (w.w === 'سيّئ' && groups.length ? groups[groups.length - 1].w += ' سيّئ' : groups.push({...w})));
  return groups.slice(0, 4).map((g, i) => {
    const [x, y, r] = pos[i];
    const p = out(interpolate(t, [g.t - 0.05, g.t + 0.4], [0, 1], clamp));
    const o = interpolate(t, [card.hide + 0.2, card.hide + 0.6], [1, 0], clamp);
    return (
      <div key={i} dir="rtl" lang="ar" style={{position: 'absolute', left: x, top: y, fontFamily: PLEX, fontWeight: 600, fontSize: 50,
        color: IVORY, padding: '10px 28px', borderRadius: 999, border: `2px solid ${COPPER}`, background: 'rgba(11,13,16,.62)',
        backdropFilter: 'blur(6px)', opacity: p * o, transform: `translateY(${(1 - p) * 40}px) scale(${0.8 + 0.2 * p}) rotate(${r}deg)`}}>
        {g.w}
      </div>
    );
  });
};

// ---------- B-roll scenes ----------
const BigType = ({from, to, size = 104, top = 720, tint}) => {
  const cards = cardsIn(from, to);
  return (
    <AbsoluteFill>
      <Backdrop tint={tint} />
      <>{cards.map((c, i) => <KPhrase offset={from} key={i} card={c} size={size} top={top} exitAt={Math.min(c.hide, cards[i + 1]?.show ?? to) - 0.05} />)}</>
      <Line x1={140} y1={top - 70} x2={940} y2={top - 70} at={0.15} dur={0.9} w={1.5} o={0.5} />
    </AbsoluteFill>
  );
};
const Polaroid = ({from, to}) => {                     // "تفسير قديم": the old frame we keep living in
  const t = useT(); const d = to - from;
  const p = out(interpolate(t, [0.1, 1.0], [0, 1], clamp));
  const burn = interpolate(t, [d - 2.5, d], [0, 1], clamp);
  const cards = cardsIn(from, to);
  return (
    <AbsoluteFill>
      <Backdrop />
      <div style={{position: 'absolute', left: 190, top: 980, width: 700, height: 820, background: '#E9E2D2', padding: '28px 28px 120px',
        boxShadow: '0 40px 80px rgba(0,0,0,.6)', transform: `translateY(${(1 - p) * 200}px) rotate(${-4 + 2 * p + Math.sin(t * .6) * .6}deg)`, opacity: p}}>
        <div style={{width: '100%', height: '100%', overflow: 'hidden', position: 'relative'}}>
          <Img src={staticFile('2_old_room_full.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover',
            filter: `sepia(.75) contrast(1.05) brightness(${0.9 - burn * 0.3})`, transform: `scale(${1.1 + t * 0.01})`}} />
          <div style={{position: 'absolute', inset: 0, background: `radial-gradient(circle at 70% 30%, rgba(255,140,40,${burn * .8}), rgba(60,20,0,${burn * .6}) ${30 + burn * 40}%, rgba(0,0,0,0) ${45 + burn * 50}%)`, mixBlendMode: 'screen'}} />
        </div>
      </div>
      <>{cards.map((c, i) => <KPhrase offset={from} key={i} card={c} size={86} top={330} exitAt={Math.min(c.hide, cards[i + 1]?.show ?? to) - 0.05} />)}</>
    </AbsoluteFill>
  );
};
const LabelStack = ({from, to}) => {                   // «أنا عصبي» … stacked, then struck through and dropped
  const t = useT(); const abs = t + from;
  const labels = data.cards.filter(c => c.style === 'label');
  const strikeAt = labels[labels.length - 1].words.at(-1).t + 0.45;
  const fall = interpolate(abs, [strikeAt + 0.6, strikeAt + 1.4], [0, 1], {...clamp, easing: Easing.in(Easing.cubic)});
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{filter: 'blur(10px) brightness(.35) saturate(.6)', transform: 'scale(1.1)'}}>
        <Img src={staticFile('3_mirror_full.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </AbsoluteFill>
      <Dust n={30} seed="ls" />
      {labels.map((c, i) => {
        const a = c.words[0].t;
        const p = out(interpolate(abs, [a - 0.1, a + 0.35], [0, 1], clamp));
        const sp = out(interpolate(abs, [strikeAt + i * 0.12, strikeAt + i * 0.12 + 0.35], [0, 1], clamp));
        const text = c.words.map(w => w.w).join(' ').replace(/[«»]/g, '');
        return (
          <div key={i} style={{position: 'absolute', left: 0, right: 0, top: 560 + i * 190, display: 'flex', justifyContent: 'center',
            opacity: p * (1 - fall), transform: `translateY(${(1 - p) * -60 + fall * (400 + i * 120)}px) rotate(${fall * (i % 2 ? 8 : -6)}deg)`, filter: `blur(${fall * 8}px)`}}>
            <div dir="rtl" lang="ar" style={{position: 'relative', fontFamily: PLEX, fontWeight: 600, fontSize: 70, color: IVORY, padding: '14px 40px',
              border: '2px solid rgba(237,230,214,.35)', borderRadius: 14, background: 'rgba(11,13,16,.55)'}}>
              {text}
              <div style={{position: 'absolute', right: 20, top: '52%', height: 5, background: COPPER, width: `calc(${sp * 100}% - 40px)`, borderRadius: 3}} />
            </div>
          </div>
        );
      })}
      <>{cardsIn(from, to).filter(c => c.style !== 'label').map((c, i) =>
        <KPhrase offset={from} key={i} card={c} size={74} top={300} />)}</>
    </AbsoluteFill>
  );
};
const PullBack = ({from, to}) => {                     // "رجعت خطوة لورا": camera pulls back through the words
  const t = useT(); const d = to - from;
  const z = interpolate(t, [0, d], [1.25, 0.82], {...clamp, easing: inOut});
  const cards = cardsIn(from, to).filter(c => c.style !== 'climax');
  return (
    <AbsoluteFill>
      <Backdrop tint="teal" />
      <AbsoluteFill style={{transform: `scale(${z})`}}>
        <div style={{position: 'absolute', left: 340, top: 760, width: 400, height: 700, overflow: 'hidden', borderRadius: 6,
          boxShadow: '0 0 120px rgba(255,200,140,.25)', opacity: interpolate(t, [0, 1.2], [0, 1], clamp)}}>
          <Img src={staticFile('4b_corridor_back_full.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
        </div>
        <>{cards.map((c, i) => <KPhrase offset={from} key={i} card={c} size={80} top={400} exitAt={Math.min(c.hide, cards[i + 1]?.show ?? to) - 0.05} />)}</>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
const Climax = ({from, to}) => {                      // "من متى أنا هيك؟" — huge, then held in silence
  const t = useT(); const abs = t + from;
  const card = data.cards.find(c => c.style === 'climax');
  const [w1, w2, w3, w4] = card.words;
  const a = out(interpolate(abs, [w1.t - 0.1, w1.t + 0.5], [0, 1], clamp));
  const b = out(interpolate(abs, [w3.t - 0.1, w3.t + 0.5], [0, 1], clamp));
  const breathe = 1 + 0.02 * interpolate(t, [1.2, to - from], [0, 1], clamp);
  return (
    <AbsoluteFill style={{background: '#050607'}}>
      <AbsoluteFill style={{opacity: 0.22 * a}}>
        <Img src={staticFile('4a_eyes_full.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(2px)'}} />
      </AbsoluteFill>
      <div dir="rtl" lang="ar" style={{position: 'absolute', left: 0, right: 0, top: 560, textAlign: 'center', fontFamily: PLEX, transform: `scale(${breathe})`}}>
        <div style={{fontWeight: 600, fontSize: 210, color: COPPER, lineHeight: 1.1, opacity: a, filter: `blur(${(1 - a) * 12}px)`,
          transform: `translateY(${(1 - a) * 60}px)`}}>{w1.w} {w2.w}</div>
        <div style={{fontWeight: 300, fontSize: 150, color: IVORY, lineHeight: 1.2, opacity: b, filter: `blur(${(1 - b) * 12}px)`,
          transform: `translateY(${(1 - b) * 60}px)`}}>{w3.w} {w4.w}</div>
      </div>
      <Grain />
    </AbsoluteFill>
  );
};
const Past = ({from, to}) => {                         // "ما بنحتاج نغيّر الماضي / قد ما بنحتاج نفهم"
  const t = useT(); const abs = t + from;
  const cards = cardsIn(from, to);
  return (
    <AbsoluteFill>
      <Backdrop />
      <>{cards.map((c, i) => <KPhrase offset={from} key={i} card={c} size={92} top={i === 0 ? 600 : 960} exitAt={to + 1} strikeWord={i === 0 ? 'الماضي' : undefined} />)}</>
    </AbsoluteFill>
  );
};
const Logo = ({from, to}) => {
  const t = useT(); const d = to - from;
  const p = inOut(interpolate(t, [0.1, 1.3], [0, 1], clamp));
  const o = interpolate(t, [d - 0.7, d], [1, 0], clamp);
  return (
    <AbsoluteFill style={{background: BG, opacity: o}}>
      <Dust n={60} seed="lg" />
      <div dir="rtl" lang="ar" style={{position: 'absolute', left: 0, right: 0, top: 760, textAlign: 'center', fontFamily: 'Aref Ruqaa Ink', fontSize: 170,
        color: IVORY, clipPath: `inset(-30% 0 -30% ${(1 - p) * 100}%)`, textShadow: '0 0 60px rgba(184,131,90,.4)'}}>ما لا يُقال</div>
      <Line x1={420} y1={1040} x2={660} y2={1040} at={1.0} dur={0.7} w={2} />
      <div dir="rtl" lang="ar" style={{position: 'absolute', left: 0, right: 0, top: 1065, textAlign: 'center', fontFamily: PLEX, fontWeight: 300,
        fontSize: 44, color: '#9A9590', opacity: interpolate(t, [1.2, 1.8], [0, 1], clamp)}}>همام ديك</div>
    </AbsoluteFill>
  );
};

// ---------- transitions ----------
const SceneWrap = ({children, dur, first}) => {
  const t = useT();
  const inP = first ? 1 : out(interpolate(t, [0, 0.45], [0, 1], clamp));
  const outP = interpolate(t, [dur - 0.25, dur], [0, 1], {...clamp, easing: Easing.in(Easing.quad)});
  return (
    <AbsoluteFill style={{opacity: inP * (1 - outP * 0.0), transform: `scale(${(0.94 + 0.06 * inP) * (1 + outP * 0.12)})`,
      filter: `blur(${(1 - inP) * 10 + outP * 12}px)`}}>{children}</AbsoluteFill>
  );
};
const Swipe = ({at}) => {                              // thin copper light bar sweeping across a cut
  const t = useT(); const p = interpolate(t, [at - 0.18, at + 0.22], [0, 1], clamp);
  if (p <= 0 || p >= 1) return null;
  return <AbsoluteFill style={{mixBlendMode: 'screen'}}>
    <div style={{position: 'absolute', top: 0, bottom: 0, width: 260, right: -300 + p * 1700,
      background: 'linear-gradient(90deg, rgba(255,190,120,0), rgba(255,190,120,.55), rgba(255,190,120,0))', filter: 'blur(12px)'}} />
  </AbsoluteFill>;
};

const SCENES = {aroll: ARoll, bigtype: BigType, polaroid: Polaroid, labels: LabelStack, pullback: PullBack, climax: Climax, past: Past, logo: Logo};

export const FilmV2 = () => {
  const {fps} = useVideoConfig();
  const fr = s => Math.round(s * fps);
  return (
    <AbsoluteFill style={{background: BG}}>
      {v2.scenes.map((s, i) => {
        const C = SCENES[s.kind];
        const from = fr(s.start), dur = fr(s.end) - from;
        return (
          <Sequence key={i} from={from} durationInFrames={dur + (i < v2.scenes.length - 1 ? 6 : 0)}>
            <SceneWrap dur={(dur + 6) / fps} first={i === 0}>
              <C from={s.start} to={s.end} start={s.start} end={s.end} clip={s} {...s.props} />
            </SceneWrap>
          </Sequence>
        );
      })}
      {/* captions + tags over the podcast shots */}
      {v2.scenes.filter(s => s.kind === 'aroll').map((s, i) => (
        <Sequence key={`c${i}`} from={fr(s.start)} durationInFrames={fr(s.end) - fr(s.start)}>
          <>
            {cardsIn(s.start, s.end).map((c, j) => <KPhrase offset={s.start} key={j} card={c} size={64} top={1290} />)}
            {s.tags && <Tags offset={s.start} card={data.cards.find(c => c.words.some(w => w.w.startsWith('مغرور')))} />}
          </>
          {s.snapshot && <Brackets at={s.snapshot - s.start} />}
        </Sequence>
      ))}
      {v2.scenes.slice(1).map((s, i) => <Swipe key={`w${i}`} at={s.start} />)}
      <Vignette />
      <Grain />
      <Audio src={staticFile('final_mix_v2.wav')} />
    </AbsoluteFill>
  );
};
