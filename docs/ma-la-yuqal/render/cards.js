// Renders transparent 1080x1920 PNG text cards with proper Arabic shaping.
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const [, , specPath, outDir] = process.argv;
const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
const F = p => 'file://' + path.resolve(__dirname, 'node_modules/@fontsource', p);
const css = `
@font-face{font-family:Plex;font-weight:300;src:url(${F('ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-300-normal.woff2')})}
@font-face{font-family:Plex;font-weight:600;src:url(${F('ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-600-normal.woff2')})}
@font-face{font-family:Ruqaa;font-weight:700;src:url(${F('aref-ruqaa/files/aref-ruqaa-arabic-700-normal.woff2')})}
html,body{margin:0;width:1080px;height:1920px;background:transparent}
.card{position:absolute;left:110px;right:110px;direction:rtl;text-align:center;font-family:Plex;font-weight:300;
 color:#EDE6D6;font-size:66px;line-height:1.55;text-shadow:0 2px 18px rgba(0,0,0,.85),0 0 42px rgba(0,0,0,.55)}
.card b{font-weight:600;color:#C9925F}
.big{font-size:84px}
.logo{font-family:Ruqaa;font-weight:700;font-size:150px;color:#EDE6D6;line-height:1.3}
.name{font-family:Plex;font-weight:300;font-size:46px;color:#9A9590;letter-spacing:2px;margin-top:10px}`;
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  for (const c of spec) {
    await p.setContent(`<style>${css}</style><div class="card ${c.cls||''}" style="top:${c.y}px">${c.html}</div>`);
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(outDir, c.id + '.png'), omitBackground: true });
  }
  await b.close();
})();
