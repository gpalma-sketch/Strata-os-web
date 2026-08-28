#!/usr/bin/env node
/**
 * ¿SE LEE EL TEXTO DE ESTA WEB? — comprueba el contraste de la AA sobre el sitio ya construido.
 *
 *   node scripts/contraste.mjs                  # contra el build (lo sirve él solo)
 *   node scripts/contraste.mjs --base https://stratalabai.com
 *   node scripts/contraste.mjs --json
 *
 * Sale con código 1 si algo falla. Cero salida ruidosa: sólo lo que no llega al mínimo.
 *
 * ── POR QUÉ EXISTE (28 ago 2026) ───────────────────────────────────────────────────────────────
 * La revisión de diseño encontró 20 textos por debajo del 4,5:1 de la WCAG AA, y no eran veinte
 * despistes: eran DOS decisiones de token repetidas por toda la web. `--teal` (#0e9b8e) se usaba
 * como color de texto en 13 declaraciones y da 3,19–3,44:1 sobre los fondos claros; `--text-mute`
 * (#8a97a3) daba 2,77:1. Entre los afectados estaban el descargo que mantiene honestas las cifras
 * de la portada y la etiqueta del único botón que se puede pulsar en /precios.
 *
 * Nada de eso se veía. No hay error, no hay aviso, la página se ve «bien»: sólo pasa que una parte
 * de la gente no lee lo que pone. Es el tipo de fallo que sólo aparece si se MIDE, y por eso esto
 * no es una nota en un comentario — es un guard que se puede ejecutar y que se pone rojo.
 *
 * ── POR QUÉ EN EL NAVEGADOR Y NO LEYENDO EL CSS ────────────────────────────────────────────────
 * Porque el fondo real de un texto no está escrito en ninguna parte. Tres casos que lo demuestran,
 * los tres encontrados en esta misma pasada:
 *   · El MISMO `color: var(--teal)` pasa sobre fondo oscuro (4,6:1) y falla sobre claro (3,2:1).
 *     Sin saber sobre qué se pinta, no hay veredicto.
 *   · `.pmock` tenía `rgba(255,255,255,.6)`: el color declarado era blanco, el fondo EFECTIVO era
 *     #dfeaf8 porque subía el azul de la tarjeta de debajo, y ahí su etiqueta fallaba por 0,22.
 *   · La maqueta del panel (`.osd`) declara su propia paleta y no hereda los tokens, así que
 *     arreglar `tokens.css` no la alcanzaba.
 *
 * ── AFINADO CONTRA EL REPO ANTES DE INSTALARLO ─────────────────────────────────────────────────
 * Regla de la casa: un detector ruidoso enseña a ignorar el aviso, que es peor que no tenerlo. Se
 * corrió contra el sitio ANTES de los arreglos (encontró los 20 y ni uno falso) y DESPUÉS (0).
 * Y comprueba que ha examinado algo: si mira menos de `MINIMO_EXAMINADOS` elementos, se pone rojo
 * él mismo — un verificador que examina cero informa de que todo está bien.
 */
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';

const RAIZ = new URL('..', import.meta.url).pathname;
const ESTATICO = join(RAIZ, '.vercel/output/static');

/**
 * LAS DOCE PÁGINAS, no las seis españolas.
 *
 * La primera versión sólo barría español, con el argumento «las inglesas comparten CSS, mismo
 * veredicto de color». Es casi verdad y por eso es peligroso: el color sí se comparte, pero lo que
 * se mide no es el color declarado — es el resultado de apilar capas sobre el fondo EFECTIVO, y ese
 * depende del texto (una frase más larga cambia de línea, cae en otro contenedor, hereda otra cosa).
 * Barrer las doce cuesta cuarenta segundos más y deja de haber nada que dar por supuesto.
 */
const RUTAS = [
  '/', '/el-os/', '/agentes/', '/control/', '/para-quien/', '/precios/',
  '/en/', '/en/the-os/', '/en/agents/', '/en/control/', '/en/who-its-for/', '/en/pricing/',
];

/** Móvil además de escritorio: hay reglas de color que sólo entran en un ancho. */
const VENTANAS = [
  { w: 1280, h: 900, nombre: 'escritorio' },
  { w: 390, h: 844, nombre: 'móvil' },
];

/** Si examina menos que esto, el detector está roto, no la web. */
const MINIMO_EXAMINADOS = 400;

/**
 * Excepciones declaradas CON SU MOTIVO. Vacío a propósito: hoy no hay ninguna, y que siga así.
 * Formato: { selector: 'texto que aparece en el informe', motivo: 'por qué se acepta' }
 * Un `motivo` vacío no vale — si no se puede escribir el motivo, no es una excepción, es un fallo.
 */
const EXCEPCIONES = [];

// ── el servidor mínimo para el build ───────────────────────────────────────────────────────────
const TIPOS = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.xml': 'application/xml', '.txt': 'text/plain',
};

async function servirBuild() {
  try {
    await stat(ESTATICO);
  } catch {
    console.error(`✖ no encuentro el build en ${ESTATICO}\n  Corre \`npm run build\` primero, o pasa --base <url>.`);
    process.exit(2);
  }
  const srv = createServer(async (req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p.endsWith('/')) p += 'index.html';
    try {
      const buf = await readFile(join(ESTATICO, p));
      res.writeHead(200, { 'content-type': TIPOS[extname(p)] || 'application/octet-stream' });
      res.end(buf);
    } catch {
      res.writeHead(404).end('no');
    }
  });
  await new Promise((r) => srv.listen(0, '127.0.0.1', r));
  return { base: `http://127.0.0.1:${srv.address().port}`, cerrar: () => srv.close() };
}

/**
 * LO QUE SE INYECTA EN LA PÁGINA. Se define aquí como texto de función para que quede legible
 * junto al resto en vez de escondido en una plantilla.
 */
function medirEnPagina() {
  const num = (s) => (s.match(/-?[\d.]+/g) || []).map(Number);

  const lin = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  const ratio = (a, b) => {
    const x = lum(a), y = lum(b);
    return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
  };
  /** Apila `frente` (con alfa) sobre `fondo`. Es lo que hace el navegador al pintar. */
  const apilar = (frente, fondo) => frente.slice(0, 3).map((v, i) => Math.round(frente[3] * v + (1 - frente[3]) * fondo[i]));

  /**
   * El fondo EFECTIVO de un elemento: se recorren los ancestros apilando cada capa hasta llegar a
   * una opaca. Devuelve null si en el camino hay una imagen o un degradado, porque entonces el
   * fondo no es UN color y el número saldría inventado.
   */
  function fondoEfectivo(el) {
    const capas = [];
    for (let e = el; e; e = e.parentElement) {
      const cs = getComputedStyle(e);
      if (cs.backgroundImage && cs.backgroundImage !== 'none') return { indeterminado: true };
      const c = num(cs.backgroundColor);
      const alfa = c.length > 3 ? c[3] : 1;
      if (alfa <= 0.001) continue;
      capas.push([c[0], c[1], c[2], alfa]);
      if (alfa > 0.999) {
        let base = capas.pop().slice(0, 3);
        while (capas.length) base = apilar(capas.pop(), base);
        return { color: base };
      }
    }
    let base = [255, 255, 255];
    while (capas.length) base = apilar(capas.pop(), base);
    return { color: base };
  }

  /** El mínimo que exige la AA: 3:1 para texto grande, 4,5:1 para el resto. */
  const minimo = (px, peso) => (px >= 24 || (px >= 18.66 && peso >= 700) ? 3 : 4.5);

  const camino = (el) => {
    const partes = [];
    for (let e = el; e && e.tagName !== 'BODY' && partes.length < 3; e = e.parentElement) {
      let s = e.tagName.toLowerCase();
      if (typeof e.className === 'string' && e.className.trim()) s += '.' + e.className.trim().split(/\s+/).slice(0, 2).join('.');
      partes.unshift(s);
    }
    return partes.join(' > ');
  };

  const fallos = [];
  let examinados = 0, indeterminados = 0;

  for (const el of document.querySelectorAll('body *')) {
    if (/^(SCRIPT|STYLE|NOSCRIPT|TEMPLATE|SVG|PATH|CANVAS)$/.test(el.tagName)) continue;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity < 0.1) continue;
    if (!el.getClientRects().length) continue;

    // Sólo elementos con texto PROPIO (o un ::before con contenido): así cada texto se cuenta una
    // vez, en el elemento que de verdad fija su color, y no una vez por ancestro.
    const propio = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    const antes = getComputedStyle(el, '::before').content;
    const conPseudo = antes && antes !== 'none' && antes !== 'normal' && antes !== '""';
    if (!propio && !conPseudo) continue;

    const fg = num(cs.color);
    const alfaTexto = fg.length > 3 ? fg[3] : 1;
    if (alfaTexto <= 0.05) continue;

    const f = fondoEfectivo(el);
    if (f.indeterminado) { indeterminados++; continue; }

    // Un texto semitransparente se mezcla con su propio fondo antes de compararse.
    const color = alfaTexto > 0.999 ? fg.slice(0, 3) : apilar([fg[0], fg[1], fg[2], alfaTexto], f.color);

    examinados++;
    const px = parseFloat(cs.fontSize);
    const peso = parseInt(cs.fontWeight, 10) || 400;
    const r = ratio(color, f.color);
    const min = minimo(px, peso);
    if (r + 0.005 < min) {
      const hex = (c) => '#' + c.map((v) => v.toString(16).padStart(2, '0')).join('');
      fallos.push({
        sel: camino(el),
        ratio: +r.toFixed(2),
        min,
        px: +px.toFixed(1),
        peso,
        texto: hex(color),
        fondo: hex(f.color),
        muestra: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 42),
      });
    }
  }
  return { fallos, examinados, indeterminados };
}

// ── ejecución ──────────────────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const comoJson = args.includes('--json');
const baseArg = args.includes('--base') ? args[args.indexOf('--base') + 1] : null;

const srv = baseArg ? { base: baseArg.replace(/\/$/, ''), cerrar: () => {} } : await servirBuild();
const navegador = await chromium.launch();
const informe = [];
let examinados = 0, indeterminados = 0;

for (const v of VENTANAS) {
  const ctx = await navegador.newContext({
    viewport: { width: v.w, height: v.h },
    deviceScaleFactor: 1,
    isMobile: v.w < 500,
    reducedMotion: 'reduce',
    locale: 'es-ES',
  });
  const page = await ctx.newPage();
  for (const ruta of RUTAS) {
    await page.goto(srv.base + ruta, { waitUntil: 'domcontentloaded', timeout: 30000 });
    // El aviso de cookies tapa contenido y no es de esta prueba; el chat, igual.
    await page.addStyleTag({ content: '.ckb,#cookieBanner,.chatfab,.chatpanel{display:none !important}' });
    await page.waitForTimeout(900);
    const r = await page.evaluate(medirEnPagina);
    examinados += r.examinados;
    indeterminados += r.indeterminados;
    for (const f of r.fallos) informe.push({ ...f, ruta, ventana: v.nombre });
  }
  await ctx.close();
}
await navegador.close();
srv.cerrar();

// Excepciones declaradas: se descuentan y se DICEN, para que aceptar no sea tapar.
const excusado = (f) => EXCEPCIONES.find((e) => e.motivo && f.sel.includes(e.selector));
const vivos = informe.filter((f) => !excusado(f));

/**
 * AGRUPAR ANTES DE INFORMAR. La primera pasada escupió 198 líneas y eso no son 198 defectos: es el
 * mismo par de colores contado una vez por elemento, por página y por ancho. Un informe así se lee
 * como una catástrofe inabordable y se cierra sin arreglar nada — que es la peor forma de fallar
 * para un detector. La unidad de arreglo es «este color sobre este fondo en este selector».
 */
const clave = (f) => `${f.sel}|${f.texto}|${f.fondo}`;
const grupos = new Map();
for (const f of vivos) {
  const k = clave(f);
  if (!grupos.has(k)) grupos.set(k, { ...f, veces: 0, rutas: new Set(), muestras: new Set() });
  const g = grupos.get(k);
  g.veces++;
  g.rutas.add(f.ruta);
  if (f.muestra) g.muestras.add(f.muestra);
}
const unicos = [...grupos.values()].sort((a, b) => a.ratio - b.ratio);
/** Por debajo de 1,5:1 el texto no es «poco legible»: no se ve. Eso no es contraste, es contenido
 *  que falta, y merece salir separado para que no se pierda entre los matices. */
const invisibles = unicos.filter((f) => f.ratio < 1.5);
const flojos = unicos.filter((f) => f.ratio >= 1.5);

if (comoJson) {
  console.log(JSON.stringify({
    examinados, indeterminados,
    defectosUnicos: unicos.length, instancias: vivos.length,
    fallos: unicos.map((f) => ({ ...f, rutas: [...f.rutas], muestras: [...f.muestras] })),
  }, null, 2));
} else {
  console.log(`Contraste AA · ${RUTAS.length} páginas × ${VENTANAS.length} anchos · ${examinados} textos medidos`);
  if (indeterminados) {
    console.log(`  ${indeterminados} sobre imagen o degradado: no se puede dar un número honesto, no se juzgan.`);
  }
  if (EXCEPCIONES.length) {
    console.log(`  ${vivos.length ? informe.length - vivos.length : 0} descontados por excepción declarada:`);
    for (const e of EXCEPCIONES) console.log(`    · ${e.selector} — ${e.motivo}`);
  }
  if (!unicos.length) {
    console.log('\n✓ todo por encima del mínimo.');
  } else {
    const pinta = (f) => {
      console.log(`  ${String(f.ratio).padStart(5)}:1 (mín ${f.min})  ${f.texto} sobre ${f.fondo}  ${f.px}px/${f.peso}  ×${f.veces}`);
      console.log(`        ${f.sel}`);
      console.log(`        en: ${[...f.rutas].join(' ')}`);
      for (const m of [...f.muestras].slice(0, 2)) console.log(`        «${m}»`);
    };
    console.log(`\n✖ ${unicos.length} defectos únicos (${vivos.length} instancias)`);
    if (invisibles.length) {
      console.log(`\n── ${invisibles.length} INVISIBLES (<1,5:1) · no es contraste, es contenido que no se ve ──`);
      invisibles.forEach(pinta);
    }
    if (flojos.length) {
      console.log(`\n── ${flojos.length} por debajo del mínimo pero legibles ──`);
      flojos.forEach(pinta);
    }
  }
}

// Un detector que examina cero informa de que todo está bien: eso también es un fallo.
if (examinados < MINIMO_EXAMINADOS) {
  console.error(`\n✖ sólo ${examinados} textos examinados (mínimo esperado ${MINIMO_EXAMINADOS}).`);
  console.error('  No es que la web esté bien: es que esta comprobación ha dejado de mirar.');
  process.exit(2);
}
process.exit(vivos.length ? 1 : 0);
