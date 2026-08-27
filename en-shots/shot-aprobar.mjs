import { chromium } from 'playwright';
const base = '/private/tmp/claude-501/-Users-gonzalopalmahuarte-gonzalo-os/a55dc7a0-91c1-4f13-8a60-9c8b2e4ee961/scratchpad/';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1000, height: 143 }, deviceScaleFactor: 2 });
await p.goto('file://' + base + 'Strata-os-web/en-shots/os-aprobar.html');
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(300);
await p.screenshot({ path: base + 'Strata-os-web/src/assets/os-aprobar-en.png' });

const cmp = `<style>body{margin:0;background:#f00}
.w{position:relative;width:2000px;height:286px;overflow:hidden}
img{position:absolute;left:0;top:0;width:2000px}</style>
<div class="w"><img src="file://${base}Strata-os-web/src/assets/os-aprobar.png"></div>
<div style="height:10px"></div>
<div class="w"><img src="file://${base}Strata-os-web/src/assets/os-aprobar-en.png"></div>`;
const p2 = await b.newPage({ viewport: { width: 2000, height: 582 }, deviceScaleFactor: 1 });
await p2.setContent(cmp);
await p2.waitForTimeout(400);
await p2.screenshot({ path: base + 'cmp-aprobar.png' });
await b.close();
console.log('OK');
