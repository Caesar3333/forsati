// Logo profile pictures for «ما لا يُقال»: 1080x1080, everything kept inside the centre circle Instagram shows.
// Usage: node profile_logo.js out_dir
const {chromium} = require('playwright');
const fs = require('fs'), path = require('path');
const outDir = process.argv[2];
const FS = path.resolve(__dirname, '../render/remotion/node_modules/@fontsource');
const F = p => 'data:font/woff2;base64,' + fs.readFileSync(path.join(FS, p)).toString('base64');
const css = `
@font-face{font-family:Plex;font-weight:300;src:url(${F('ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-300-normal.woff2')})}
@font-face{font-family:Plex;font-weight:600;src:url(${F('ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-600-normal.woff2')})}
@font-face{font-family:Ruqaa;font-weight:700;src:url(${F('aref-ruqaa-ink/files/aref-ruqaa-ink-arabic-700-normal.woff2')})}
html,body{margin:0;width:1080px;height:1080px;overflow:hidden}
.s{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;direction:rtl;text-align:center}
.dark{background:radial-gradient(circle at 50% 42%,#2a2016 0%,#14110e 45%,#0B0D10 75%)}
.light{background:radial-gradient(circle at 50% 42%,#f4ecdb 0%,#e9dfc8 60%,#dccfb2 100%)}
.ring{position:absolute;left:90px;top:90px;width:900px;height:900px;border-radius:50%;border:3px solid rgba(184,131,90,.55)}
.logo{font-family:Ruqaa;font-weight:700;line-height:1.05}
.slogan{font-family:Plex;font-weight:300;font-size:64px;margin-top:34px}
.line{width:220px;height:3px;background:#B8835A;margin-top:34px;opacity:.85}
.grain{position:absolute;inset:0;opacity:.14;mix-blend-mode:overlay}`;
const grain = `<svg class="grain" width="1080" height="1080"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="3"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`;
const V = [
  {id: 'logo_1_stacked', cls: 'dark', html: `<div class="logo" style="font-size:300px;color:#C9925F;text-shadow:0 0 60px rgba(233,180,122,.35)">ما لا<br>يُقال</div>`},
  {id: 'logo_2_slogan', cls: 'dark', html: `<div class="logo" style="font-size:230px;color:#C9925F;text-shadow:0 0 60px rgba(233,180,122,.35)">ما لا يُقال</div><div class="line"></div><div class="slogan" style="color:#EDE6D6">مساحة نراجع فيها</div>`},
  {id: 'logo_3_podcast', cls: 'dark', html: `<div class="logo" style="font-size:230px;color:#C9925F;text-shadow:0 0 60px rgba(233,180,122,.35)">ما لا يُقال</div><div class="line"></div><div class="slogan" style="color:#CFC6B5">بودكاست همام ديك</div>`},
  {id: 'logo_4_light', cls: 'light', html: `<div class="logo" style="font-size:300px;color:#2a1d12">ما لا<br>يُقال</div><div class="line"></div>`},
  {id: 'logo_5_ring_slogan', cls: 'dark', html: `<svg width="1080" height="1080" style="position:absolute;inset:0"><defs><path id="arc" d="M 200 600 A 340 340 0 0 0 880 600"/></defs>
    <text font-family="Plex" font-weight="300" font-size="64" fill="#CFC6B5" direction="rtl"><textPath href="#arc" startOffset="50%" text-anchor="middle">مساحة نراجع فيها</textPath></text></svg>
    <div class="logo" style="font-size:250px;color:#C9925F;text-shadow:0 0 60px rgba(233,180,122,.35);margin-top:-130px">ما لا<br>يُقال</div>`},
  {id: 'logo_6_quotes_mark', cls: 'dark', html: `<div style="display:flex;align-items:center;gap:10px;color:#B8835A;font-family:Ruqaa;font-weight:700">
    <span style="font-size:330px;opacity:.9;line-height:1">«</span><span class="logo" style="font-size:170px;color:#EDE6D6">ما لا<br>يُقال</span><span style="font-size:330px;opacity:.9;line-height:1">»</span></div>`},
];
(async () => {
  fs.mkdirSync(outDir, {recursive: true});
  const b = await chromium.launch(); const p = await b.newPage({viewport: {width: 1080, height: 1080}, deviceScaleFactor: Number(process.env.SCALE || 1)});
  for (const v of V) {
    await p.setContent(`<style>${css}</style><div class="s ${v.cls}" lang="ar">${grain}<div class="ring"></div>${v.html}</div>`);
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({path: path.join(outDir, v.id + '.png')});
  }
  await b.close();
})();
