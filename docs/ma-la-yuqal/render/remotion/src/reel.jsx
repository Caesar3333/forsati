// Facebook reel — motion only: the real voice of «ما لا يُقال» + kinetic Ruqaa typography and abstract motion.
// No captions: only chosen key words, each revealed on the voice. Everything is timed from reel.json (absolute seconds).
import React from 'react';
import {AbsoluteFill, Audio, staticFile, useCurrentFrame, useVideoConfig, interpolate, Easing, random} from 'remotion';
import R from './reel.json';

const IVORY = '#EDE6D6', COPPER = '#B8835A', AMBER = '#E9B47A', BG = '#0B0D10', TEAL = '30,70,80';
const RUQAA = 'Aref Ruqaa Ink';
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'};
const out = Easing.bezier(0.16, 1, 0.3, 1);
const inOut = Easing.bezier(0.65, 0, 0.35, 1);
const useT = () => { const f = useCurrentFrame(); const {fps} = useVideoConfig(); return f / fps; };
const S = Object.fromEntries(R.segments.map(s => [s.role, s]));
const strip = (w) => w.replace(/[…؟،.:«»!]/g, '');

// word times inside a phrase, proportional to word length (the phrase start/end come from the real recording)
const timed = (p) => {
  const ws = p.text.split(/\s+/).filter(Boolean);
  const wt = ws.map(w => strip(w).length + 1), tot = wt.reduce((a, b) => a + b, 0);
  let acc = 0;
  return ws.map((w, i) => { const t = p.t0 + (p.t1 - p.t0) * acc / tot; acc += wt[i]; return {w, t}; });
};
// pick an exact run of words from a phrase (display keeps the phrase's own punctuation)
const pick = (role, pi, words) => {
  const all = timed(S[role].phrases[pi]); const key = words.split(' ').map(strip);
  for (let i = 0; i + key.length <= all.length; i++) {
    if (key.every((k, j) => strip(all[i + j].w) === k)) return all.slice(i, i + key.length);
  }
  throw new Error(`words not found: ${words}`);
};
const wordT = (role, pi, word) => pick(role, pi, word)[0].t;

// ---------- atmosphere ----------
const Backdrop = () => {
  const t = useT();
  const cool = interpolate(t, [S.wound.start - 1, S.wound.start + 1, S.new_question.start, S.new_question.start + 2], [0, 1, 1, 0.2], clamp);
  return (
    <AbsoluteFill style={{background: BG}}>
      <div style={{position: 'absolute', width: 1500, height: 1500, left: -380 + Math.sin(t * 0.23) * 170, top: 120 + Math.cos(t * 0.19) * 210,
        background: `radial-gradient(closest-side, rgba(184,131,90,${0.24 * (1 - cool * 0.6)}), rgba(184,131,90,0))`, filter: 'blur(40px)'}} />
      <div style={{position: 'absolute', width: 1300, height: 1300, left: 260 + Math.cos(t * 0.17) * 190, top: 820 + Math.sin(t * 0.21) * 170,
        background: `radial-gradient(closest-side, rgba(${TEAL},${0.26 + cool * 0.2}), rgba(${TEAL},0))`, filter: 'blur(50px)'}} />
    </AbsoluteFill>
  );
};
const Dust = ({n = 60, seed = 'd', speed = 1, boost = 0}) => {
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
      <svg width="1080" height="1920"><filter id="rg"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={f % 12} /></filter>
        <rect width="100%" height="100%" filter="url(#rg)" /></svg>
    </AbsoluteFill>
  );
};
const Vignette = () => <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 42%, rgba(0,0,0,.7) 100%)'}} />;
// warm light sweep across the frame at each section change
const Sweep = ({at}) => {
  const t = useT(); const p = interpolate(t, [at - 0.35, at + 0.45], [0, 1], clamp);
  if (p <= 0 || p >= 1) return null;
  return <AbsoluteFill style={{mixBlendMode: 'screen', opacity: Math.sin(p * Math.PI) * 0.55,
    background: `linear-gradient(105deg, rgba(255,190,120,0) ${p * 140 - 40}%, rgba(255,190,120,.55) ${p * 140 - 20}%, rgba(255,190,120,0) ${p * 140}%)`}} />;
};

// ---------- kinetic Ruqaa ----------
// a word: right-to-left mask reveal + rise + unblur on its time (whole words only: Arabic letters always stay joined)
const Word = ({w, t, size, em, dim, strikeAt}) => {
  const p = out(interpolate(t, [w.t - 0.1, w.t + 0.42], [0, 1], clamp));
  const glow = em ? `0 0 ${18 + 22 * p}px rgba(233,180,122,.55), 0 4px 30px rgba(0,0,0,.85)` : '0 4px 30px rgba(0,0,0,.85)';
  return (
    <span style={{display: 'inline-block', margin: '0 0.14em', clipPath: `inset(-30% 0 -30% ${(1 - p) * 100}%)`,
      transform: `translateY(${(1 - p) * 40}px) scale(${em ? 1 + 0.06 * (1 - p) : 1})`, filter: `blur(${(1 - p) * 8}px)`,
      color: em ? COPPER : IVORY, fontSize: size * (em ? 1.15 : 1), textShadow: glow, opacity: dim ?? 1, position: 'relative'}}>{w.w}
      {strikeAt != null && <span style={{position: 'absolute', right: '-4%', top: '50%', height: Math.max(5, size * 0.055), borderRadius: 4, background: COPPER,
        boxShadow: '0 0 14px rgba(233,180,122,.7)', width: `${out(interpolate(t, [strikeAt, strikeAt + 0.45], [0, 1], clamp)) * 108}%`}} />}</span>
  );
};
// a line of picked words; fades out at `hide` with a soft lift
const Line = ({words, top, size = 110, emph = [], hide, show = 0, dimWord, dimAt, strikeWord, strikeAt, style}) => {
  const t = useT();
  const o = hide ? interpolate(t, [hide - 0.35, hide + 0.05], [1, 0], clamp) : 1;
  if (o <= 0 || t < words[0].t - 0.2 - show) return null;
  const lift = hide ? interpolate(t, [hide - 0.35, hide + 0.05], [0, -50], {...clamp, easing: inOut}) : 0;
  return (
    <div dir="rtl" lang="ar" style={{position: 'absolute', left: 90, right: 150, top, textAlign: 'center', direction: 'rtl', fontFamily: RUQAA,
      fontWeight: 700, lineHeight: 1.5, opacity: o, transform: `translateY(${lift}px)`, filter: `blur(${(1 - o) * 8}px)`, ...style}}>
      {words.map((w, i) => {
        const em = emph.some(e => strip(w.w) === strip(e));
        const dim = dimWord && strip(w.w) === strip(dimWord) ? interpolate(t, [dimAt, dimAt + 1.6], [1, 0.12], clamp) : undefined;
        const st = strikeWord && strip(w.w) === strip(strikeWord) ? strikeAt : undefined;
        return <Word key={i} w={w} t={t} size={size} em={em} dim={dim} strikeAt={st} />;
      })}
    </div>
  );
};
// copper line that draws itself right-to-left (strike-through)
const Strike = ({at, top, left = 160, right = 220, w = 7, dur = 0.45, o = 1}) => {
  const t = useT(); const p = out(interpolate(t, [at, at + dur], [0, 1], clamp));
  return <div style={{position: 'absolute', top, right, height: w, borderRadius: w, background: COPPER, opacity: o,
    width: (1080 - left - right) * p, boxShadow: '0 0 14px rgba(233,180,122,.7)'}} />;
};
const push = (t, a, b, k = 0.045) => ({transform: `scale(${1 + k * inOut(interpolate(t, [a - 0.4, b + 0.4], [0, 1], clamp))})`});
const sec = (t, a, b, fi = 0.35, fo = 0.45) => interpolate(t, [a - fi, a, b, b + fo], [0, 1, 1, 0], clamp);

// ---------- 1 · hook: a question mark forms from dust ----------
const Hook = () => {
  const t = useT(); const {start, end} = S.hook;
  const o = sec(t, start, end + 0.2);
  const p = out(interpolate(t, [start - 0.3, start + 2.2], [0, 1], clamp));
  return (
    <AbsoluteFill style={{opacity: o, ...push(t, start, end)}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 120, textAlign: 'center', fontFamily: RUQAA, fontWeight: 700, fontSize: 900,
        lineHeight: 1, color: COPPER, opacity: 0.16 + 0.1 * p, filter: `blur(${(1 - p) * 30}px)`, transform: `scale(${1.25 - 0.25 * p}) rotate(${(1 - p) * -8}deg)`,
        textShadow: '0 0 80px rgba(233,180,122,.45)'}}>؟</div>
      <Line words={pick('hook', 0, 'أنا بعرف شو صار فعلاً؟')} top={560} size={112} emph={['فعلاً؟']} hide={end + 0.1} />
      <Line words={pick('hook', 1, 'ولا بعرف بس كيف أنا شفت وفسّرت اللي صار؟')} top={850} size={84} emph={['وفسّرت']} hide={end + 0.1} />
    </AbsoluteFill>
  );
};

// ---------- 2 · an old interpretation: words inside an ageing photo frame that burns ----------
const OldStory = () => {
  const t = useT(); const {start, end} = S.old_story;
  const o = sec(t, start, end);
  const burn = interpolate(t, [start + 3.2, end], [0, 1], clamp);
  const lean = Math.sin(t * 0.6) * 1.2;
  return (
    <AbsoluteFill style={{opacity: o, ...push(t, start, end, 0.06)}}>
      <Line words={pick('old_story', 0, 'منضل عايشين جوّا')} top={330} size={84} hide={end} />
      <div style={{position: 'absolute', left: 150, right: 150, top: 560, height: 520, transform: `rotate(${-2 + lean}deg)`,
        background: 'linear-gradient(160deg, #3b2c1f, #22180f)', border: '14px solid #d9c9a8', boxShadow: '0 30px 80px rgba(0,0,0,.7)',
        filter: `sepia(.6) brightness(${1 - burn * 0.35})`}}>
        <AbsoluteFill style={{background: `radial-gradient(ellipse at 85% 90%, rgba(255,140,40,${0.85 * burn}) 0%, rgba(120,40,10,${0.7 * burn}) ${18 + 30 * burn}%, rgba(0,0,0,0) ${30 + 45 * burn}%)`, mixBlendMode: 'screen'}} />
        <AbsoluteFill style={{background: `radial-gradient(ellipse at 85% 90%, rgba(10,6,4,${burn}) 0%, rgba(10,6,4,0) ${10 + 26 * burn}%)`}} />
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 700, transform: `rotate(${-2 + lean}deg)`}}>
        <Line words={pick('old_story', 0, 'تفسير قديم…')} top={0} size={140} emph={['قديم…']} hide={end} style={{position: 'relative', left: 0, right: 0}} />
      </div>
      <Line words={pick('old_story', 0, 'حتى بعد ما تتغيّر الظروف')} top={1150} size={70} hide={end} />
      <Line words={pick('old_story', 1, 'وحتى إحنا نفسنا')} top={1260} size={88} emph={['نفسنا']} hide={end} />
      <Dust n={40} seed="ember" speed={-1.4} boost={0.3 * burn} />
    </AbsoluteFill>
  );
};

// ---------- 3 · labels we give ourselves: paper tags slam in, then get struck through ----------
const TAGS = [
  {pi: 1, words: '«أنا عصبي»', rot: -4, x: -40},
  {pi: 2, words: '«أنا ما بثق بحدا»', rot: 3, x: 50},
  {pi: 3, words: '«أنا ما بحب أطلب مساعدة»', rot: -2, x: -20},
  {pi: 4, words: '«أنا هيك… وما رح أتغيّر»', rot: 2.5, x: 30},
];
const Labels = () => {
  const t = useT(); const L = S.labels, C = S.climax;
  const back = wordT('climax', 1, 'رجعت');                          // "رجعت خطوة لورا": everything pulls back
  const strikeAt = wordT('climax', 0, 'تعريف');
  const o = interpolate(t, [L.start - 0.35, L.start, back + 0.6, back + 1.6], [0, 1, 1, 0], clamp);
  const pull = inOut(interpolate(t, [back - 0.1, back + 1.6], [0, 1], clamp));
  return (
    <AbsoluteFill style={{opacity: o, transform: `scale(${1 - 0.45 * pull}) translateY(${-120 * pull}px)`, filter: `blur(${pull * 6}px)`}}>
      <Line words={pick('labels', 0, 'بجمل جاهزة')} top={300} size={96} emph={['جاهزة']} hide={C.start + 0.3} />
      {TAGS.map((g, i) => {
        const at = L.phrases[g.pi].t0;
        const p = out(interpolate(t, [at - 0.08, at + 0.35], [0, 1], clamp));
        const top = 520 + i * 190;
        return (
          <div key={i} style={{position: 'absolute', top, left: 0, right: 0, display: 'flex', justifyContent: 'center',
            opacity: p, transform: `translateX(${g.x}px) translateY(${(1 - p) * -90}px) rotate(${g.rot + (1 - p) * 10}deg) scale(${1.35 - 0.35 * p})`}}>
            <div dir="rtl" lang="ar" style={{position: 'relative', padding: '18px 54px 26px', background: 'linear-gradient(170deg, #efe4cc, #d8c7a4)',
              borderRadius: 6, boxShadow: '0 18px 40px rgba(0,0,0,.55)', fontFamily: RUQAA, fontWeight: 700, fontSize: 66, color: '#2a1d12', whiteSpace: 'nowrap'}}>
              <span style={{position: 'absolute', right: 18, top: '50%', width: 16, height: 16, marginTop: -8, borderRadius: '50%', background: BG, opacity: 0.85}} />
              {g.words}
              <span style={{position: 'absolute', right: '4%', top: '54%', height: 6, borderRadius: 6, background: COPPER, boxShadow: '0 0 12px rgba(233,180,122,.7)',
                width: `${out(interpolate(t, [strikeAt + i * 0.12, strikeAt + i * 0.12 + 0.4], [0, 1], clamp)) * 92}%`}} />
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ---------- 4 · climax: "من متى أنا هيك؟" ----------
const Climax = () => {
  const t = useT(); const C = S.climax;
  const q = C.phrases[2];                                            // "من متى أنا هيك؟"
  const lead = pick('climax', 1, 'رجعت خطوة لورا…');
  const o = sec(t, C.start + 0.2, S.wound.start - 0.45, 0.3, 0.6);
  const burst = interpolate(t, [q.t0 - 0.05, q.t0 + 0.25, q.t0 + 1.6], [0, 1, 0.25], clamp);
  const breathe = 1 + 0.02 * Math.sin((t - q.t0) * 2.2) * (t > q.t0 ? 1 : 0);
  return (
    <AbsoluteFill style={{opacity: o}}>
      <Line words={pick('climax', 0, 'تعريف نهائي')} top={1380} size={74} hide={wordT('climax', 1, 'رجعت') + 0.3} style={{opacity: 0.9}} />
      <Line words={lead} top={1380} size={78} hide={q.t0 - 0.05} />
      <AbsoluteFill style={{background: `radial-gradient(circle at 50% 46%, rgba(255,200,140,${0.5 * burst}) 0%, rgba(184,131,90,${0.25 * burst}) 25%, rgba(0,0,0,0) 55%)`, mixBlendMode: 'screen'}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 640, transform: `scale(${breathe})`}}>
        <Line words={pick('climax', 2, 'من متى')} top={0} size={190} emph={['متى']} style={{position: 'relative', left: 60, right: 60}} />
        <Line words={pick('climax', 2, 'أنا هيك؟')} top={0} size={150} style={{position: 'relative', left: 60, right: 60, marginTop: -10}} />
      </div>
      <Dust n={70} seed="burst" speed={0.6} boost={0.5 * burst} />
    </AbsoluteFill>
  );
};

// ---------- 5 · the wound: words that fall quiet ----------
const Wound = () => {
  const t = useT(); const W = S.wound;
  const o = sec(t, W.start, W.end + 0.1);
  const mid = W.phrases[1].t0;
  const fog = interpolate(t, [W.start, W.start + 2], [0, 1], clamp);
  const silent = wordT('wound', 1, 'تسكت');
  const talk = wordT('wound', 1, 'كنت');
  return (
    <AbsoluteFill style={{opacity: o, ...push(t, W.start, W.end)}}>
      <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 48%, rgba(180,200,205,${0.07 * fog}) 0%, rgba(0,0,0,0) 60%)`, filter: 'blur(20px)'}} />
      <Line words={pick('wound', 0, 'ما كنت دايماً عصبي…')} top={520} size={96} emph={['دايماً']} hide={talk - 0.15} />
      <Line words={pick('wound', 0, 'ما كنت دايماً تخاف تثق')} top={760} size={84} hide={talk - 0.15} />
      <Line words={pick('wound', 1, 'بيوم من الأيام')} top={380} size={70} hide={W.end + 0.1} style={{opacity: 0.85}} />
      <Line words={pick('wound', 1, 'كنت تحكي عن اللي بوجعك…')} top={560} size={96} emph={['بوجعك…']} hide={W.end + 0.1} />
      <Line words={pick('wound', 1, 'قبل ما تتعلّم تسكت')} top={860} size={120} emph={['تسكت']} hide={W.end + 0.1} dimWord="تسكت" dimAt={silent + 0.5} />
    </AbsoluteFill>
  );
};

// ---------- 6 · the new question: "ليش أنا هيك؟" becomes "هل بدّي أضل هيك؟" ----------
const NewQuestion = () => {
  const t = useT(); const Q = S.new_question;
  const o = sec(t, Q.start, Q.end + 0.15);
  const second = wordT('new_question', 1, 'بل'), why = wordT('new_question', 1, 'ليش'), will = wordT('new_question', 1, 'هل');
  return (
    <AbsoluteFill style={{opacity: o, ...push(t, Q.start, Q.end)}}>
      <Line words={pick('new_question', 0, 'نوع مختلف من الفهم')} top={700} size={96} emph={['الفهم']} hide={why - 0.1} />
      <Line words={pick('new_question', 1, 'ما تكتفي تسأل:')} top={460} size={74} hide={second - 0.05} style={{opacity: 0.85}} />
      <Line words={pick('new_question', 1, 'بل تسأل كمان:')} top={460} size={74} hide={Q.end + 0.15} style={{opacity: 0.85}} />
      <Line words={pick('new_question', 1, 'ليش أنا هيك؟')} top={700} size={130} hide={will + 0.15} style={{opacity: 0.85}} />
      <Line words={pick('new_question', 1, 'هل بدّي أضل هيك؟')} top={680} size={140} emph={['بدّي']} hide={Q.end + 0.15} />
    </AbsoluteFill>
  );
};

// ---------- 7 · resolution: the past is struck, "نفهم" glows ----------
const Resolve = () => {
  const t = useT(); const V = S.resolve;
  const o = sec(t, V.start, V.end + 0.15);
  const past = wordT('resolve', 0, 'الماضي');
  return (
    <AbsoluteFill style={{opacity: o, ...push(t, V.start, V.end)}}>
      <Line words={pick('resolve', 0, 'لأنه مرّات…')} top={380} size={70} hide={V.end + 0.15} style={{opacity: 0.85}} />
      <Line words={pick('resolve', 0, 'ما بنحتاج نغيّر الماضي')} top={520} size={100} hide={V.end + 0.15} dimWord="الماضي" dimAt={past + 0.7} strikeWord="الماضي" strikeAt={past + 0.45} />
      <Line words={pick('resolve', 1, 'قد ما بنحتاج نفهم')} top={800} size={124} emph={['نفهم']} hide={V.end + 0.15} />
      <Line words={pick('resolve', 1, 'شو عمل فينا')} top={1030} size={96} hide={V.end + 0.15} />
    </AbsoluteFill>
  );
};

// ---------- 8 · sign-off: logo ----------
const Sign = () => {
  const t = useT(); const G = S.sign;
  const o = interpolate(t, [G.start - 0.3, G.start + 0.2], [0, 1], clamp);
  const logoAt = wordT('sign', 0, 'وهذا');
  const p = out(interpolate(t, [logoAt, logoAt + 1.1], [0, 1], clamp));
  const shine = interpolate(t, [logoAt + 0.8, logoAt + 2.2], [-30, 130], clamp);
  return (
    <AbsoluteFill style={{opacity: o}}>
      <Line words={pick('sign', 0, 'أنا همام ديك…')} top={1050} size={70} />
      <div dir="rtl" lang="ar" style={{position: 'absolute', left: 0, right: 0, top: 640, textAlign: 'center', fontFamily: RUQAA, fontWeight: 700,
        fontSize: 200, color: COPPER, opacity: p, transform: `scale(${1.15 - 0.15 * p})`, filter: `blur(${(1 - p) * 14}px)`,
        textShadow: '0 0 50px rgba(233,180,122,.45)',
        WebkitMaskImage: `linear-gradient(100deg, #000 ${shine - 30}%, rgba(0,0,0,.65) ${shine}%, #000 ${shine + 30}%)`}}>ما لا يُقال</div>
      <div style={{position: 'absolute', left: 380, right: 380, top: 1010, height: 2, background: COPPER, opacity: 0.7, transform: `scaleX(${p})`}} />
    </AbsoluteFill>
  );
};

export const Reel = () => {
  const t = useT();
  const cuts = R.segments.slice(1).map(s => s.start).filter(c => Math.abs(c - S.wound.start) > 0.1);
  const silence = t > S.climax.end + 0.1 && t < S.wound.start - 0.3;
  return (
    <AbsoluteFill style={{background: BG}}>
      <Backdrop />
      <Dust n={50} seed="base" speed={silence ? 0.15 : 1} />
      <Hook /><OldStory /><Labels /><Climax /><Wound /><NewQuestion /><Resolve /><Sign />
      {cuts.map(c => <Sweep key={c} at={c} />)}
      <Vignette /><Grain />
      <Audio src={staticFile('reel_mix.wav')} />
    </AbsoluteFill>
  );
};
