import { chromium } from 'playwright';

const dir = '/private/tmp/claude-501/-Users-gonzalopalmahuarte-gonzalo-os/a55dc7a0-91c1-4f13-8a60-9c8b2e4ee961/scratchpad/Strata-os-web';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1000, height: 198 }, deviceScaleFactor: 2 });
await p.goto('file://' + dir + '/en-shots/os-dia.html');
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(400);
await p.locator('#stage').screenshot({ path: dir + '/src/assets/os-dia-en.png' });
await b.close();
console.log('ok');
