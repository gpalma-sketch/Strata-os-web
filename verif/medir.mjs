/**
 * Verificación MEDIDA de la retirada de fotografía decorativa (26 ago 2026).
 *
 * Regla de esta comprobación: cada bloque devuelve CUÁNTOS elementos examinó.
 * Un comprobador que revisa cero elementos y dice "todo bien" es peor que no
 * tener comprobador, porque produce confianza sin evidencia.
 *
 * Qué mide, y por qué así:
 *  1) Fotos fuera: no basta con mirar el DOM. Una foto puede entrar por CSS
 *     (background-image), por <source srcset> de un <picture> o por un
 *     <link rel=preload>. Por eso se registra TODA petición de red además de
 *     recorrer el DOM y los estilos calculados.
 *  2) Desbordamiento horizontal: scrollWidth vs innerWidth.
 *  3) Contraste: el color del texto se lee del estilo calculado (con la
 *     opacidad heredada compuesta), pero el FONDO se muestrea de los PÍXELES
 *     reales de una captura. Leer background-color mentiría: estas secciones
 *     tienen degradados, rejilla y orbes, y el computed value de casi todo es
 *     `transparent`.
 *  4) Huecos: también por píxeles. Un hueco visual es una franja de filas sin
 *     nada, y eso se ve en la imagen, no en el árbol DOM (donde el padding de
 *     110px de una sección parece contenido).
 */
import { chromium } from 'playwright';
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const RAIZ = '/private/tmp/claude-501/-Users-gonzalopalmahuarte-gonzalo-os/a55dc7a0-91c1-4f13-8a60-9c8b2e4ee961/scratchpad/Strata-os-web';
const OUT = path.join(RAIZ, 'verif');
const BASE = 'http://localhost:4399';

const SECCIONES = [
  { id: 'agentes', comp: 'Agents', foto: 'bg-estudio.jpg' },
  { id: 'lanzamiento', comp: 'Waitlist', foto: 'bg-stand.jpg' },
  { id: 'lab', comp: 'Lab', foto: 'bg-panel.jpg' },
  { id: 'casos', comp: 'UseCases', foto: 'bg-feria.jpg' },
  { id: 'contacto', comp: 'Contact', foto: 'bg-evento.jpg' },
];

const VIEWPORTS = [
  { nombre: 'escritorio', width: 1440, height: 900, isMobile: false, hasTouch: false },
  { nombre: 'movil', width: 390, height: 844, isMobile: true, hasTouch: true },
];
const IDIOMAS = [
  { nombre: 'es', url: '/' },
  { nombre: 'en', url: '/en/' },
];

// Nombres base de la fotografía decorativa retirada. Astro renombra con hash
// pero conserva el nombre base, así que buscar el prefijo sigue valiendo.
const PROHIBIDAS = /(bg-(estudio|evento|feria|panel|stand)|ban-(sala|stand))/i;

/* ---------- WCAG ---------- */
const lin = (c) => {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
};
const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const ratio = (a, b) => {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

/* ---------- muestreo de píxeles ---------- */
function region(raw, W, H, x0, y0, x1, y1) {
  x0 = Math.max(0, Math.round(x0)); y0 = Math.max(0, Math.round(y0));
  x1 = Math.min(W, Math.round(x1)); y1 = Math.min(H, Math.round(y1));
  if (x1 <= x0 || y1 <= y0) return null;
  let n = 0, sr = 0, sg = 0, sb = 0;
  const lums = [];
  const cols = [];
  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      const i = (y * W + x) * 3;
      const c = [raw[i], raw[i + 1], raw[i + 2]];
      sr += c[0]; sg += c[1]; sb += c[2];
      lums.push(lum(c));
      cols.push(c);
      n++;
    }
  }
  if (!n) return null;
  const media = [sr / n, sg / n, sb / n];
  const ml = lum(media);
  let varianza = 0;
  for (const l of lums) varianza += (l - ml) ** 2;
  const orden = lums.map((l, i) => i).sort((a, b) => lums[a] - lums[b]);
  return {
    n,
    media: media.map((v) => Math.round(v)),
    desv: Math.sqrt(varianza / n),
    // p02 / p98 en LUMINANCIA: el fondo "peor" para texto claro es el píxel
    // más claro del fondo, y para texto oscuro el más oscuro. Se usa p98/p02
    // en vez del máximo absoluto para no dejar que un solo píxel de antialias
    // decida el veredicto.
    p02: cols[orden[Math.floor(0.02 * (n - 1))]],
    p98: cols[orden[Math.floor(0.98 * (n - 1))]],
  };
}

/** Fondo local de un texto: se prueban cuatro zonas limpias alrededor. */
function fondoDe(raw, W, H, r) {
  const cand = [
    ['izq', 0, r.y, Math.max(0, r.x - 6), r.y + r.h],
    ['der', Math.min(W, r.x + r.w + 6), r.y, W, r.y + r.h],
    ['arriba', r.x, r.y - 12, r.x + r.w, r.y - 3],
    ['abajo', r.x, r.y + r.h + 3, r.x + r.w, r.y + r.h + 12],
  ];
  let mejor = null;
  for (const [nombre, x0, y0, x1, y1] of cand) {
    const m = region(raw, W, H, x0, y0, x1, y1);
    if (!m || m.n < 200) continue;
    // Zona "limpia" = uniforme. Si tiene mucha varianza es que hemos pillado
    // otra tarjeta o más texto, no el fondo.
    if (!mejor || m.desv < mejor.m.desv) mejor = { zona: nombre, m };
  }
  return mejor;
}

/* ---------- lectura del DOM ---------- */
const LECTOR = () => {
  const vis = (el) => {
    const s = getComputedStyle(el);
    if (s.display === 'none' || s.visibility === 'hidden') return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };
  const opacidadEfectiva = (el) => {
    let o = 1, n = el;
    while (n && n.nodeType === 1) { o *= parseFloat(getComputedStyle(n).opacity || '1'); n = n.parentElement; }
    return o;
  };
  const abs = (el) => {
    const r = el.getBoundingClientRect();
    return { x: r.x + scrollX, y: r.y + scrollY, w: r.width, h: r.height };
  };

  // --- imágenes ---
  const imgs = [...document.querySelectorAll('img')].map((el) => ({
    src: el.currentSrc || el.src,
    attrSrc: el.getAttribute('src') || '',
    srcset: el.getAttribute('srcset') || '',
    alt: el.getAttribute('alt'),
    natural: [el.naturalWidth, el.naturalHeight],
    render: [Math.round(el.getBoundingClientRect().width), Math.round(el.getBoundingClientRect().height)],
    visible: vis(el),
    seccion: el.closest('section')?.id || el.closest('section')?.className || '(sin section)',
  }));
  const sources = [...document.querySelectorAll('source')].map((el) => el.getAttribute('srcset') || '');
  const preloads = [...document.querySelectorAll('link[rel=preload],link[as=image]')].map((el) => el.getAttribute('href') || '');

  // --- background-image de TODOS los elementos ---
  const todos = [...document.querySelectorAll('*')];
  const fondos = [];
  for (const el of todos) {
    const bi = getComputedStyle(el).backgroundImage;
    if (bi && bi !== 'none' && bi.includes('url(')) {
      for (const m of bi.matchAll(/url\((['"]?)(.*?)\1\)/g)) fondos.push({ url: m[2], tag: el.tagName.toLowerCase(), cls: el.className?.toString?.().slice(0, 60) });
    }
  }

  // --- desbordamiento ---
  const de = document.documentElement;
  const desborde = {
    scrollWidth: de.scrollWidth,
    innerWidth: window.innerWidth,
    bodyScrollWidth: document.body.scrollWidth,
    clientWidth: de.clientWidth,
  };
  // culpables: elementos cuyo borde derecho sale del viewport
  const culpables = [];
  if (de.scrollWidth > window.innerWidth + 1) {
    for (const el of todos) {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.right > window.innerWidth + 1) {
        culpables.push({ tag: el.tagName.toLowerCase(), cls: el.className?.toString?.().slice(0, 60), right: Math.round(r.right), w: Math.round(r.width) });
      }
    }
  }

  // --- secciones y sus textos ---
  const IDS = ['agentes', 'lanzamiento', 'lab', 'casos', 'contacto'];
  const secciones = IDS.map((id) => {
    const sec = document.getElementById(id);
    if (!sec) return { id, existe: false };
    const rs = abs(sec);
    const textos = [];
    for (const el of sec.querySelectorAll('h1,h2,h3,h4,p,li,span,a,label,strong,em,button')) {
      // sólo elementos con texto PROPIO (no contenedores que heredan el de sus hijos)
      const propio = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join(' ').trim();
      if (!propio) continue;
      if (!vis(el)) continue;
      const s = getComputedStyle(el);
      const r = abs(el);
      if (r.w < 4 || r.h < 4) continue;
      const fs = parseFloat(s.fontSize);
      const fw = parseInt(s.fontWeight, 10) || 400;
      textos.push({
        tag: el.tagName.toLowerCase(),
        cls: el.className?.toString?.().slice(0, 40) || '',
        texto: propio.slice(0, 60),
        color: s.color,
        fontSize: fs,
        fontWeight: fw,
        grande: fs >= 24 || (fs >= 18.66 && fw >= 700),
        opacidad: opacidadEfectiva(el),
        rect: r,
      });
    }
    // ocupación DOM por filas (contraste con la medida de píxeles)
    const ocupado = [];
    for (const el of sec.querySelectorAll('*')) {
      const tieneTexto = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
      const esMedia = ['IMG', 'SVG', 'CANVAS', 'VIDEO'].includes(el.tagName);
      if (!tieneTexto && !esMedia) continue;
      if (!vis(el)) continue;
      const r = abs(el);
      ocupado.push([r.y - rs.y, r.y - rs.y + r.h]);
    }
    return { id, existe: true, rect: rs, textos, ocupado, clases: sec.className };
  });

  return { imgs, sources, preloads, fondos, desborde, culpables, secciones, totalElementos: todos.length, altoDoc: de.scrollHeight };
};

/* ---------- huecos por píxeles ---------- */
function huecos(raw, W, H) {
  // Una fila es "vacía" si todos sus píxeles están cerca de la mediana de la
  // fila. La rejilla de fondo (grid-bg) es de muy baja opacidad y no llega al
  // umbral; un texto o una tarjeta sí.
  const filaVacia = new Uint8Array(H);
  const buf = new Uint8Array(W);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) buf[x] = raw[(y * W + x) * 3 + 1]; // canal G como proxy de luz
    const orden = Array.from(buf).sort((a, b) => a - b);
    const med = orden[Math.floor(W / 2)];
    let maxDev = 0;
    for (let x = 0; x < W; x++) { const d = Math.abs(buf[x] - med); if (d > maxDev) maxDev = d; }
    filaVacia[y] = maxDev < 24 ? 1 : 0;
  }
  let mejor = { inicio: 0, largo: 0 };
  let ini = -1;
  for (let y = 0; y <= H; y++) {
    if (y < H && filaVacia[y]) { if (ini < 0) ini = y; }
    else if (ini >= 0) { const largo = y - ini; if (largo > mejor.largo) mejor = { inicio: ini, largo }; ini = -1; }
  }
  // el hueco de cabecera/pie (padding de la sección) se reporta aparte
  let cab = 0; while (cab < H && filaVacia[cab]) cab++;
  let pie = 0; while (pie < H && filaVacia[H - 1 - pie]) pie++;
  return { mayor: mejor, cabecera: cab, pie, alto: H };
}

/* ---------- main ---------- */
fs.mkdirSync(OUT, { recursive: true });
const informe = { generado: new Date().toISOString(), pases: [] };

const navegador = await chromium.launch();

for (const vp of VIEWPORTS) {
  for (const idio of IDIOMAS) {
    const etiqueta = `${vp.nombre}/${idio.nombre}`;
    const ctx = await navegador.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: vp.isMobile,
      hasTouch: vp.hasTouch,
      deviceScaleFactor: 1,
      // Sin reveal diferido: `prefers-reduced-motion` hace que Reveal.astro
      // NO añada `js-reveal`, así que la página se pinta ya en su estado
      // final. Medir con animaciones a medias daría contrastes falsos.
      reducedMotion: 'reduce',
    });
    // Consentimiento ya dado: el banner de cookies tapa el pie y falsearía
    // tanto la captura de #contacto como la detección de huecos.
    await ctx.addInitScript(() => {
      try { localStorage.setItem('strata_cookie_consent', JSON.stringify({ v: 1, analytics: false, date: new Date().toISOString() })); } catch {}
    });

    const peticiones = [];
    const page = await ctx.newPage();
    page.on('request', (r) => peticiones.push({ url: r.url(), tipo: r.resourceType() }));

    await page.goto(BASE + idio.url, { waitUntil: 'networkidle' });
    // recorrido completo: aunque reduced-motion desactiva el reveal, el lazy
    // loading de <img> sí depende de que se pase por delante.
    await page.evaluate(async () => {
      const h = document.documentElement.scrollHeight;
      for (let y = 0; y < h; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 12)); }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 300));
    });
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.evaluate(() => Promise.all([...document.images].map((i) => (i.complete ? 0 : i.decode().catch(() => 0)))));

    const d = await page.evaluate(LECTOR);

    const pase = {
      etiqueta, viewport: vp.nombre, idioma: idio.nombre,
      elementosDOM: d.totalElementos,
      altoDoc: d.altoDoc,
      imagenes: { examinadas: d.imgs.length, lista: d.imgs, prohibidas: d.imgs.filter((i) => PROHIBIDAS.test(i.src) || PROHIBIDAS.test(i.attrSrc) || PROHIBIDAS.test(i.srcset)) },
      sources: { examinados: d.sources.length, prohibidos: d.sources.filter((s) => PROHIBIDAS.test(s)) },
      preloads: { examinados: d.preloads.length, prohibidos: d.preloads.filter((s) => PROHIBIDAS.test(s)) },
      fondosCSS: { examinados: d.fondos.length, lista: d.fondos, prohibidos: d.fondos.filter((f) => PROHIBIDAS.test(f.url)) },
      red: { examinadas: peticiones.length, imagenes: peticiones.filter((p) => p.tipo === 'image').length, prohibidas: peticiones.filter((p) => PROHIBIDAS.test(p.url)) },
      desborde: d.desborde,
      culpablesDesborde: d.culpables.slice(0, 12),
      secciones: [],
    };

    for (const s of SECCIONES) {
      const dom = d.secciones.find((x) => x.id === s.id);
      if (!dom?.existe) { pase.secciones.push({ id: s.id, existe: false }); continue; }

      const el = page.locator(`#${s.id}`);
      const png = await el.screenshot({ animations: 'disabled' });
      const { data, info } = await sharp(png).removeAlpha().raw().toBuffer({ resolveWithObject: true });
      const W = info.width, H = info.height;

      // guardar sólo el pase de referencia (escritorio/es y movil/es)
      if (idio.nombre === 'es') {
        fs.writeFileSync(path.join(OUT, `${s.id}-${vp.width}.png`), png);
      }

      const medidos = [];
      for (const t of dom.textos) {
        const r = { x: t.rect.x - dom.rect.x, y: t.rect.y - dom.rect.y, w: t.rect.w, h: t.rect.h };
        if (r.y < 0 || r.y + r.h > H || r.x < 0) continue;
        const f = fondoDe(data, W, H, r);
        if (!f) continue;
        const m = t.color.match(/[\d.]+/g).map(Number);
        let fg = [m[0], m[1], m[2]];
        const alpha = (m.length > 3 ? m[3] : 1) * t.opacidad;
        const bgMedia = f.m.media;
        // composición del texto sobre su fondo real cuando hay opacidad
        const comp = (bg) => fg.map((c, i) => c * alpha + bg[i] * (1 - alpha));
        const claro = lum(fg) > lum(bgMedia);
        const bgPeor = claro ? f.m.p98 : f.m.p02; // el fondo que más se acerca al texto
        medidos.push({
          ...t,
          zonaFondo: f.zona, nFondo: f.m.n, desvFondo: +f.m.desv.toFixed(2),
          bg: bgMedia, bgPeor,
          rMedio: +ratio(comp(bgMedia), bgMedia).toFixed(2),
          rPeor: +ratio(comp(bgPeor), bgPeor).toFixed(2),
          umbral: t.grande ? 3 : 4.5,
        });
      }

      const hu = huecos(data, W, H);
      // hueco DOM (cross-check)
      const ocup = new Uint8Array(Math.max(1, Math.ceil(dom.rect.h)));
      for (const [a, b] of dom.ocupado) for (let y = Math.max(0, Math.floor(a)); y < Math.min(ocup.length, Math.ceil(b)); y++) ocup[y] = 1;
      let mejorDom = 0, ini = -1;
      for (let y = 0; y <= ocup.length; y++) {
        if (y < ocup.length && !ocup[y]) { if (ini < 0) ini = y; }
        else if (ini >= 0) { if (y - ini > mejorDom) mejorDom = y - ini; ini = -1; }
      }

      pase.secciones.push({
        id: s.id, existe: true, clases: dom.clases,
        alto: Math.round(dom.rect.h), ancho: Math.round(dom.rect.w),
        capturaWH: [W, H],
        textosExaminados: medidos.length, textosEnDOM: dom.textos.length,
        fallos: medidos.filter((t) => t.rPeor < t.umbral),
        peor: medidos.slice().sort((a, b) => a.rPeor - b.rPeor).slice(0, 4).map((t) => ({ tag: t.tag, cls: t.cls, texto: t.texto, fs: t.fontSize, grande: t.grande, color: t.color, bg: t.bg, rMedio: t.rMedio, rPeor: t.rPeor, umbral: t.umbral, zona: t.zonaFondo, n: t.nFondo })),
        titulares: medidos.filter((t) => t.grande).length,
        cuerpo: medidos.filter((t) => !t.grande).length,
        minTitular: Math.min(...medidos.filter((t) => t.grande).map((t) => t.rPeor), Infinity),
        minCuerpo: Math.min(...medidos.filter((t) => !t.grande).map((t) => t.rPeor), Infinity),
        huecoPixMayor: hu.mayor.largo, huecoPixInicio: hu.mayor.inicio,
        huecoCabecera: hu.cabecera, huecoPie: hu.pie,
        huecoDOMMayor: mejorDom,
        // textura del fondo: desviación de luminancia de una franja de fondo puro
        textura: (() => {
          const franja = region(data, W, H, Math.round(W * 0.02), Math.round(H * 0.35), Math.round(W * 0.08), Math.round(H * 0.65));
          return franja ? { n: franja.n, media: franja.media, desv: +franja.desv.toFixed(4) } : null;
        })(),
      });
    }

    informe.pases.push(pase);
    await ctx.close();
    console.error(`[ok] ${etiqueta}`);
  }
}

await navegador.close();
fs.writeFileSync(path.join(OUT, 'informe.json'), JSON.stringify(informe, null, 2));
console.log('ESCRITO', path.join(OUT, 'informe.json'));
