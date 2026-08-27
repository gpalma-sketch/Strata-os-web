/**
 * Contraste medido bien (v2) + comprobación de deformación de imágenes.
 *
 * POR QUÉ HAY UNA v2. La v1 muestreaba el fondo en una franja AL LADO del
 * texto, y eso falla de dos maneras que producen fallos falsos:
 *   - Un botón (.btn-primary) lleva SU PROPIO fondo. Mirar al lado del botón
 *     mide el fondo de la sección, no el que hay debajo de esas letras: daba
 *     1.08:1 en un botón que en realidad es texto oscuro sobre menta.
 *   - En un carrusel de texto, la franja de al lado está llena de OTRAS
 *     letras. El percentil 98 cogía un píxel de glifo y lo llamaba "fondo".
 *
 * v2 mide DENTRO de la caja del propio texto y separa fondo de letra por
 * frecuencia: en una caja de texto los píxeles de fondo son mayoría y los del
 * glifo minoría, así que el color MODAL es el fondo. El "peor fondo" se busca
 * sólo entre los píxeles del grupo del fondo, para que un degradado o un orbe
 * cuenten y una letra no.
 *
 * Comprobación cruzada obligatoria: se cuenta qué porcentaje de la caja ocupa
 * el grupo del fondo. Si el fondo no llega al 45 % de la caja, la medida no es
 * de fiar y se marca DUDOSA en vez de darla por buena.
 */
import { chromium } from 'playwright';
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const RAIZ = '/private/tmp/claude-501/-Users-gonzalopalmahuarte-gonzalo-os/a55dc7a0-91c1-4f13-8a60-9c8b2e4ee961/scratchpad/Strata-os-web';
const OUT = path.join(RAIZ, 'verif');
const BASE = 'http://localhost:4399';
const IDS = ['agentes', 'lanzamiento', 'lab', 'casos', 'contacto'];

const VIEWPORTS = [
  { nombre: 'escritorio', width: 1440, height: 900, isMobile: false, hasTouch: false },
  { nombre: 'movil', width: 390, height: 844, isMobile: true, hasTouch: true },
];
const IDIOMAS = [{ nombre: 'es', url: '/' }, { nombre: 'en', url: '/en/' }];

const lin = (c) => { const s = c / 255; return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4); };
const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const ratio = (a, b) => { const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x); return (l1 + 0.05) / (l2 + 0.05); };

/** Fondo real bajo una caja de texto, por color modal. */
function fondoModal(raw, W, H, r) {
  const x0 = Math.max(0, Math.round(r.x) + 1), y0 = Math.max(0, Math.round(r.y) + 1);
  const x1 = Math.min(W, Math.round(r.x + r.w) - 1), y1 = Math.min(H, Math.round(r.y + r.h) - 1);
  if (x1 - x0 < 3 || y1 - y0 < 3) return null;
  const cubos = new Map();
  const px = [];
  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      const i = (y * W + x) * 3;
      const c = [raw[i], raw[i + 1], raw[i + 2]];
      px.push(c);
      const k = (c[0] >> 4) * 4096 + (c[1] >> 4) * 64 + (c[2] >> 4); // cubos de 16 niveles
      cubos.set(k, (cubos.get(k) || 0) + 1);
    }
  }
  if (!px.length) return null;
  let modaK = -1, modaN = 0;
  for (const [k, n] of cubos) if (n > modaN) { modaN = n; modaK = k; }
  const mr = Math.floor(modaK / 4096), mg = Math.floor((modaK % 4096) / 64), mb = modaK % 64;
  const centro = [mr * 16 + 8, mg * 16 + 8, mb * 16 + 8];
  // grupo del fondo: todo píxel a menos de 22 por canal del centro modal
  const grupo = px.filter((c) => Math.abs(c[0] - centro[0]) <= 22 && Math.abs(c[1] - centro[1]) <= 22 && Math.abs(c[2] - centro[2]) <= 22);
  if (grupo.length < 12) return null;
  const media = [0, 1, 2].map((i) => Math.round(grupo.reduce((a, c) => a + c[i], 0) / grupo.length));
  const lums = grupo.map(lum);
  return {
    nCaja: px.length, nFondo: grupo.length, cobertura: grupo.length / px.length,
    media,
    masClaro: grupo[lums.indexOf(Math.max(...lums))],
    masOscuro: grupo[lums.indexOf(Math.min(...lums))],
    // extremos absolutos de la caja: sirven para comprobar que ahí hay letra
    cajaMin: px[px.map(lum).indexOf(Math.min(...px.map(lum)))],
    cajaMax: px[px.map(lum).indexOf(Math.max(...px.map(lum)))],
    centro,
  };
}

const LECTOR = (IDS) => {
  const vis = (el) => { const s = getComputedStyle(el); if (s.display === 'none' || s.visibility === 'hidden') return false; const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
  const opac = (el) => { let o = 1, n = el; while (n && n.nodeType === 1) { o *= parseFloat(getComputedStyle(n).opacity || '1'); n = n.parentElement; } return o; };
  const abs = (el) => { const r = el.getBoundingClientRect(); return { x: r.x + scrollX, y: r.y + scrollY, w: r.width, h: r.height }; };

  const imgs = [...document.querySelectorAll('img')].map((el) => {
    const s = getComputedStyle(el); const r = el.getBoundingClientRect();
    const arNat = el.naturalWidth / el.naturalHeight, arBox = r.width / r.height;
    return {
      src: (el.currentSrc || el.src).split('/').pop(), objectFit: s.objectFit, aspectRatio: s.aspectRatio,
      natural: [el.naturalWidth, el.naturalHeight], render: [+r.width.toFixed(1), +r.height.toFixed(1)],
      arNatural: +arNat.toFixed(4), arCaja: +arBox.toFixed(4),
      // Sólo `fill` (el valor por defecto de CSS) deforma. Con cover/contain la
      // imagen se recorta o se encaja, pero nunca se estira.
      deforma: s.objectFit === 'fill' && Math.abs(arNat - arBox) / arNat > 0.01,
      desviacionAR: +(Math.abs(arNat - arBox) / arNat * 100).toFixed(2),
    };
  });

  const secciones = IDS.map((id) => {
    const sec = document.getElementById(id);
    if (!sec) return { id, existe: false };
    const rs = abs(sec);
    const textos = [];
    for (const el of sec.querySelectorAll('h1,h2,h3,h4,p,li,span,a,label,strong,em,button,div')) {
      const propio = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join(' ').trim();
      if (!propio || !vis(el)) continue;
      const s = getComputedStyle(el); const r = abs(el);
      if (r.w < 8 || r.h < 8) continue;
      const fs = parseFloat(s.fontSize), fw = parseInt(s.fontWeight, 10) || 400;
      textos.push({ tag: el.tagName.toLowerCase(), cls: (el.className?.toString?.() || '').slice(0, 40), texto: propio.slice(0, 55), color: s.color, fontSize: fs, fontWeight: fw, grande: fs >= 24 || (fs >= 18.66 && fw >= 700), opacidad: opac(el), rect: r });
    }
    return { id, existe: true, rect: rs, textos };
  });
  return { imgs, secciones };
};

fs.mkdirSync(OUT, { recursive: true });
const inf = { pases: [] };
const nav = await chromium.launch();

for (const vp of VIEWPORTS) {
  for (const idio of IDIOMAS) {
    const ctx = await nav.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: vp.isMobile, hasTouch: vp.hasTouch, deviceScaleFactor: 1, reducedMotion: 'reduce' });
    await ctx.addInitScript(() => { try { localStorage.setItem('strata_cookie_consent', JSON.stringify({ v: 1, analytics: false, date: new Date().toISOString() })); } catch {} });
    const page = await ctx.newPage();
    await page.goto(BASE + idio.url, { waitUntil: 'networkidle' });
    await page.evaluate(async () => { const h = document.documentElement.scrollHeight; for (let y = 0; y < h; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 10)); } window.scrollTo(0, 0); await new Promise((r) => setTimeout(r, 300)); });
    await page.evaluate(() => Promise.all([...document.images].map((i) => (i.complete ? 0 : i.decode().catch(() => 0)))));

    const d = await page.evaluate(LECTOR, IDS);

    const pase = { etiqueta: `${vp.nombre}/${idio.nombre}`, imgs: d.imgs, secciones: [] };

    for (const id of IDS) {
      const dom = d.secciones.find((x) => x.id === id);
      const png = await page.locator(`#${id}`).screenshot({ animations: 'disabled' });
      const { data, info } = await sharp(png).removeAlpha().raw().toBuffer({ resolveWithObject: true });
      const W = info.width, H = info.height;
      const medidos = [], dudosos = [];
      for (const t of dom.textos) {
        const r = { x: t.rect.x - dom.rect.x, y: t.rect.y - dom.rect.y, w: t.rect.w, h: t.rect.h };
        if (r.y < 0 || r.y + r.h > H || r.x < 0 || r.x + r.w > W) continue;
        const f = fondoModal(data, W, H, r);
        if (!f) continue;
        const m = t.color.match(/[\d.]+/g).map(Number);
        const fg = [m[0], m[1], m[2]];
        const alpha = (m.length > 3 ? m[3] : 1) * t.opacidad;
        const comp = (bg) => fg.map((c, i) => c * alpha + bg[i] * (1 - alpha));
        const claro = lum(fg) > lum(f.media);
        const peorBg = claro ? f.masClaro : f.masOscuro;
        const reg = {
          tag: t.tag, cls: t.cls, texto: t.texto, fs: t.fontSize, fw: t.fontWeight, grande: t.grande,
          color: t.color, alpha: +alpha.toFixed(2),
          bg: f.media, bgPeor: peorBg, cobertura: +(f.cobertura * 100).toFixed(1), nCaja: f.nCaja,
          rMedio: +ratio(comp(f.media), f.media).toFixed(2),
          rPeor: +ratio(comp(peorBg), peorBg).toFixed(2),
          umbral: t.grande ? 3 : 4.5,
        };
        if (f.cobertura < 0.45) dudosos.push(reg); else medidos.push(reg);
      }
      const tit = medidos.filter((x) => x.grande), cue = medidos.filter((x) => !x.grande);
      pase.secciones.push({
        id, alto: Math.round(dom.rect.h), textosDOM: dom.textos.length, medidos: medidos.length, dudosos: dudosos.length,
        titulares: tit.length, cuerpo: cue.length,
        minTitular: tit.length ? Math.min(...tit.map((x) => x.rPeor)) : null,
        minCuerpo: cue.length ? Math.min(...cue.map((x) => x.rPeor)) : null,
        fallos: medidos.filter((x) => x.rPeor < x.umbral),
        listaDudosos: dudosos,
        peores: medidos.slice().sort((a, b) => a.rPeor - b.rPeor).slice(0, 3),
      });
    }
    inf.pases.push(pase);
    await ctx.close();
    console.error('[ok]', pase.etiqueta);
  }
}
await nav.close();
fs.writeFileSync(path.join(OUT, 'informe2.json'), JSON.stringify(inf, null, 2));
console.log('ESCRITO informe2.json');
