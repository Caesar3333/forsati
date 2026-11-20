const {chromium}=require('playwright'),fs=require('fs'),path=require('path');
const [,,S,FS]=process.argv;
const F=p=>'data:font/woff2;base64,'+fs.readFileSync(path.join(FS,p)).toString('base64');
const css=`@font-face{font-family:Plex;font-weight:600;src:url(${F('ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-600-normal.woff2')})}
@font-face{font-family:Plex;font-weight:400;src:url(${F('ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-400-normal.woff2')})}
@font-face{font-family:Ruqaa;font-weight:700;src:url(${F('aref-ruqaa-ink/files/aref-ruqaa-ink-arabic-700-normal.woff2')})}
html,body{margin:0;width:1080px;height:1920px;background:transparent}
.c{position:absolute;left:96px;width:820px;bottom:470px;direction:rtl;text-align:center;font-family:Plex;font-weight:600;font-size:50px;line-height:1.55;color:#F4EFE6;
text-wrap:balance;text-shadow:0 2px 3px rgba(0,0,0,.85),0 0 22px rgba(0,0,0,.65),0 0 44px rgba(0,0,0,.4)}
.t{position:absolute;top:66px;left:0;right:0;text-align:center;direction:rtl;font-family:Ruqaa;font-weight:700;font-size:80px;color:#EDE6D6;text-shadow:0 4px 30px rgba(0,0,0,.75)}
.t small{display:block;font-family:Plex;font-weight:400;font-size:30px;letter-spacing:1px;color:#D9B98F;margin-top:6px}`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
const caps=JSON.parse(fs.readFileSync(S+'/captions.json'));
for(let i=0;i<caps.length;i++){await p.setContent(`<style>${css}</style><div class="c">${caps[i][2]}</div>`);await p.evaluate(()=>document.fonts.ready);
 await p.screenshot({path:`${S}/cap/cap_${String(i).padStart(2,'0')}.png`,omitBackground:true});}
await p.setContent(`<style>${css}</style><div class="t">ما لا يُقال</div>`);await p.evaluate(()=>document.fonts.ready);
await p.screenshot({path:`${S}/cap/title.png`,omitBackground:true});await b.close();})();
