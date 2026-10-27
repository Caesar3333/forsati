// Renders the 9:16 cover options. Key text stays inside the centre 4:5 band (y 285-1635) so the
// Instagram grid crop keeps it. Usage: node cover.js <docs/ma-la-yuqal dir> <fonts node_modules dir>
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const [, , D, NM] = process.argv;
const b64 = p => fs.readFileSync(p).toString('base64');
const font = p => `data:font/woff2;base64,${b64(path.join(NM, '@fontsource', p))}`;
const img = p => `data:image/jpeg;base64,${b64(path.join(D, p))}`;
const css = `
@font-face{font-family:Plex;font-weight:300;src:url(${font('ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-300-normal.woff2')})}
@font-face{font-family:Plex;font-weight:600;src:url(${font('ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-600-normal.woff2')})}
@font-face{font-family:Ruqaa;src:url(${font('aref-ruqaa-ink/files/aref-ruqaa-ink-arabic-700-normal.woff2')})}
html,body{margin:0;width:1080px;height:1920px;background:#0B0D10;overflow:hidden}
.bg{position:absolute;inset:0;background-size:cover;background-position:center;filter:brightness(.95) contrast(1.06) saturate(.85)}
.v{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 48%,rgba(0,0,0,0) 40%,rgba(0,0,0,.7) 100%)}
.t{position:absolute;left:80px;right:80px;direction:rtl;text-align:center;font-family:Plex;color:#EDE6D6;
   text-shadow:0 3px 24px rgba(0,0,0,.9),0 0 60px rgba(0,0,0,.6)}
.h{font-weight:600;font-size:118px;line-height:1.3}.h b{color:#B8835A;font-weight:600}
.logo{position:absolute;left:0;right:0;direction:rtl;text-align:center}
.logo .r{font-family:Ruqaa;font-size:92px;color:#EDE6D6;text-shadow:0 0 40px rgba(184,131,90,.4)}
.logo .n{font-family:Plex;font-weight:300;font-size:34px;color:#A39D96;margin-top:2px}
.logo .l{width:110px;height:1px;background:#B8835A;opacity:.8;margin:6px auto 10px}`;
const covers = {
  cover_A_eyes: { bg: 'render/layers/4a_eyes_full.jpg', fade: 'linear-gradient(180deg,rgba(11,13,16,.85) 0%,rgba(11,13,16,0) 38%,rgba(11,13,16,0) 70%,rgba(11,13,16,.9) 100%)',
    head: '<b>من متى</b><br>أنا هيك؟', top: 330, logo: 1440 },
  cover_B_portrait: { bg: 'backgrounds/likeness/hook_wood_portrait.jpg', fade: 'linear-gradient(180deg,rgba(11,13,16,.75) 0%,rgba(11,13,16,0) 30%,rgba(11,13,16,.2) 60%,rgba(11,13,16,.95) 92%)',
    head: 'احنا ما بنحتاج<br>نغيّر <b>الماضي</b>', top: 1080, logo: 1460, small: true },
};
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  for (const [name, c] of Object.entries(covers)) {
    await p.setContent(`<style>${css}</style>
      <div class="bg" style="background-image:url(${img(c.bg)})"></div><div class="v"></div>
      <div style="position:absolute;inset:0;background:${c.fade}"></div>
      <div class="t h" dir="rtl" lang="ar" style="top:${c.top}px;${c.small ? 'font-size:96px' : ''}">${c.head}</div>
      <div class="logo" dir="rtl" lang="ar" style="top:${c.logo}px"><div class="r">ما لا يُقال</div><div class="l"></div><div class="n">همام ديك</div></div>`);
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(D, 'cover', name + '.jpg'), type: 'jpeg', quality: 93 });
  }
  await b.close();
})();
