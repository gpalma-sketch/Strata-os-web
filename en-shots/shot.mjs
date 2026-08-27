import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:1100,height:565}, deviceScaleFactor:2 });
await p.goto('file:///private/tmp/claude-501/-Users-gonzalopalmahuarte-gonzalo-os/a55dc7a0-91c1-4f13-8a60-9c8b2e4ee961/scratchpad/Strata-os-web/en-shots/os-equipo.html');
await p.waitForTimeout(600);
await p.screenshot({ path:'/private/tmp/claude-501/-Users-gonzalopalmahuarte-gonzalo-os/a55dc7a0-91c1-4f13-8a60-9c8b2e4ee961/scratchpad/Strata-os-web/src/assets/os-equipo-en.png' });
await b.close();
