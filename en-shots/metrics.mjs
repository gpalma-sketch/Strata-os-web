import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage();
await p.goto('file://' + process.cwd() + '/en-shots/calib.html');
await p.waitForFunction('window.__done===true');
const out = await p.evaluate(()=>{
  const c=document.createElement('canvas'); c.width=1200;c.height=400;
  const g=c.getContext('2d');
  function m(txt, font){ g.font=font; const t=g.measureText(txt);
    return {w:t.width, asc:t.actualBoundingBoxAscent, desc:t.actualBoundingBoxDescent,
            l:t.actualBoundingBoxLeft, r:t.actualBoundingBoxRight}; }
  const R={};
  R.SG_H_100 = m('H', '100px "Space Grotesk"');
  R.SG_x_100 = m('x', '100px "Space Grotesk"');
  R.SGb_H_100 = m('H', 'bold 100px "Space Grotesk"');
  R.SGb_C_100 = m('C', 'bold 100px "Space Grotesk"');
  R.SM_H_100 = m('H', '100px "Space Mono"');
  R.t_title = m('Cierra tu mes contable', 'bold 100px "Space Grotesk"');
  R.t_desc  = m('Pérdidas y ganancias, márgenes y desviaciones con tus datos de', '100px "Space Grotesk"');
  R.t_desc3 = m('Cuentas B2B que encajan con tu cliente ideal, guardadas en tu CRM', '100px "Space Grotesk"');
  R.t_ppl   = m('People', '100px "Space Grotesk"');
  R.t_ag    = m('Agentes & Gobierno', '100px "Space Grotesk"');
  R.t_emp   = m('Empieza aquí', 'bold 100px "Space Grotesk"');
  R.t_emp5  = m('Empieza aquí', '500 100px "Space Grotesk"');
  R.t_c2    = m('Reclama tus cobros pendientes', 'bold 100px "Space Grotesk"');
  R.t_mono  = m('UN CLIC → TU EQUIPO SE PONE A ELLO', '100px "Space Mono"');
  R.t_gob   = m('GOBIERNO', '100px "Space Mono"');
  R.t_diag  = m('DIAGNÓSTICO & MEJORA', '100px "Space Mono"');
  return R;
});
console.log(JSON.stringify(out,null,1));
await b.close();
