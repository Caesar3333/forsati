// Instagram carousels for «ما لا يُقال»: 1080x1350 (4:5) slides from carousels.json, real Arabic shaping in Chromium.
// Usage: node carousel.js carousels.json out_dir
const {chromium} = require('playwright');
const fs = require('fs'), path = require('path');
const [, , specPath, outDir] = process.argv;
const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
const FS = path.resolve(__dirname, '../render/remotion/node_modules/@fontsource');
// fonts are inlined as data URLs: Chromium refuses file:// fonts from an about:blank page
const F = p => 'data:font/woff2;base64,' + fs.readFileSync(path.join(FS, p)).toString('base64');
const css = `
@font-face{font-family:Plex;font-weight:300;src:url(${F('ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-300-normal.woff2')})}
@font-face{font-family:Plex;font-weight:600;src:url(${F('ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-600-normal.woff2')})}
@font-face{font-family:Ruqaa;font-weight:700;src:url(${F('aref-ruqaa-ink/files/aref-ruqaa-ink-arabic-700-normal.woff2')})}
*{box-sizing:border-box}
html,body{margin:0;width:1080px;height:1350px;background:#0B0D10;overflow:hidden}
.s{position:absolute;inset:0;direction:rtl;color:#EDE6D6;font-family:Plex;font-weight:300}
.glow{position:absolute;inset:0}
.grain{position:absolute;inset:0;opacity:.18;mix-blend-mode:overlay}
.vig{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 48%,rgba(0,0,0,0) 45%,rgba(0,0,0,.72) 100%)}
.logo{position:absolute;top:58px;right:72px;font-family:Ruqaa;font-weight:700;font-size:46px;opacity:.8}
.num{position:absolute;top:70px;left:76px;font-size:30px;color:#9A9590;letter-spacing:1px;direction:ltr}
.foot{position:absolute;bottom:64px;right:72px;left:72px;display:flex;justify-content:space-between;align-items:center;font-size:30px;color:#9A9590}
.foot i{display:block;width:120px;height:2px;background:#B8835A;opacity:.8}
.c{position:absolute;left:96px;right:96px;top:180px;bottom:170px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center}
b{font-weight:600;color:#C9925F}
span{color:#B8835A;text-shadow:0 0 40px rgba(233,180,122,.45)}
.kicker{font-family:Ruqaa;font-weight:700;font-size:52px;color:#B8835A;margin-bottom:30px}
.title{font-family:Ruqaa;font-weight:700;font-size:118px;line-height:1.45;text-shadow:0 6px 40px rgba(0,0,0,.8)}
.sub{font-size:44px;line-height:1.6;color:#CFC6B5;margin-top:36px;max-width:820px}
.swipe{position:absolute;bottom:150px;left:0;right:0;text-align:center;font-size:32px;color:#C9925F;letter-spacing:1px}
.quote{font-size:58px;line-height:1.75;max-width:860px}
.quote:before{content:"«";display:block;font-family:Ruqaa;font-size:160px;line-height:.6;color:#B8835A;opacity:.55;margin-bottom:24px}
.big{font-family:Ruqaa;font-weight:700;font-size:170px;line-height:1.35;text-shadow:0 6px 50px rgba(0,0,0,.8)}
.lead{font-size:52px;margin-bottom:56px}
.tag{display:inline-block;padding:18px 54px 24px;margin:14px 0;background:linear-gradient(170deg,#efe4cc,#d8c7a4);border-radius:6px;
 box-shadow:0 18px 40px rgba(0,0,0,.55);font-family:Ruqaa;font-weight:700;font-size:60px;color:#2a1d12;white-space:nowrap;position:relative}
.tag:after{content:"";position:absolute;right:4%;left:4%;top:54%;height:6px;border-radius:6px;background:#B8835A;opacity:.0}
.old{font-family:Ruqaa;font-weight:700;font-size:96px;color:#9A9590;position:relative;display:inline-block;opacity:.75}
.old:after{content:"";position:absolute;right:-4%;left:-4%;top:52%;height:7px;border-radius:7px;background:#B8835A;box-shadow:0 0 14px rgba(233,180,122,.7)}
.arrow{font-size:60px;color:#B8835A;margin:26px 0}
.new{font-family:Ruqaa;font-weight:700;font-size:132px;line-height:1.4}
.cta{margin-top:64px;font-size:40px;color:#CFC6B5;border-top:2px solid rgba(184,131,90,.6);padding-top:30px}`;
const grain = `<svg class="grain" width="1080" height="1350"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`;
const body = (s) => {
  if (s.type === 'cover') return `${s.kicker ? `<div class="kicker">${s.kicker}</div>` : ''}<div class="title">${s.title}</div><div class="sub">${s.sub}</div>`;
  if (s.type === 'quote') return `<div class="quote">${s.text}</div>`;
  if (s.type === 'big') return `<div class="big">${s.text}</div>`;
  if (s.type === 'tags') return `<div class="lead">${s.lead}</div>` + s.tags.map((t, i) => `<div class="tag" style="transform:rotate(${[-3, 2.5, -1.5, 2][i % 4]}deg) translateX(${[-30, 40, -15, 25][i % 4]}px)">${t}</div>`).join('');
  if (s.type === 'turn') return `<div class="old">${s.old}</div><div class="arrow">↓</div><div class="new">${s.new}</div><div class="cta">${s.cta}</div>`;
  if (s.type === 'big_cta') return `<div class="big" style="font-size:128px">${s.text}</div><div class="cta">${s.cta}</div>`;
  throw new Error('unknown slide type ' + s.type);
};
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({viewport: {width: 1080, height: 1350}, deviceScaleFactor: Number(process.env.SCALE || 1)});
  for (const [name, c] of Object.entries(spec)) {
    const dir = path.join(outDir, name); fs.mkdirSync(dir, {recursive: true});
    const n = c.slides.length;
    for (let i = 0; i < n; i++) {
      const s = c.slides[i], g = c.glow[i % c.glow.length];
      const glow = `background:radial-gradient(circle at ${g},rgba(184,131,90,.28),rgba(184,131,90,0) 55%),radial-gradient(circle at ${100 - parseFloat(g)}% 80%,rgba(30,70,80,.35),rgba(30,70,80,0) 60%)`;
      const html = `<style>${css}</style><div class="s"><div class="glow" style="${glow}"></div>${grain}<div class="vig"></div>
        <div class="logo">ما لا يُقال</div><div class="num">${i + 1} / ${n}</div>
        <div class="c" lang="ar">${body(s)}</div>
        ${s.type === 'cover' ? '<div class="swipe">اسحب ←</div>' : ''}
        <div class="foot"><span style="color:#9A9590;text-shadow:none">همام ديك</span><i></i></div></div>`;
      await p.setContent(html); await p.evaluate(() => document.fonts.ready);
      await p.screenshot({path: path.join(dir, `${String(i + 1).padStart(2, '0')}.png`)});
    }
  }
  await b.close();
})();
