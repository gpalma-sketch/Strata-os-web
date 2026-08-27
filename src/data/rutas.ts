/**
 * EL MAPA DE RUTAS — fuente única de la navegación del sitio.
 *
 * La landing pesaba 26.967 px en escritorio (30 pantallas) y ~49.000 px en móvil
 * (58 pantallas) con las 20 secciones apiladas. Se parte en cinco páginas, cada
 * una respondiendo UNA pregunta, y en la portada queda sólo lo clave.
 *
 * ⚠️ POR QUÉ EXISTE ESTE FICHERO Y NO UNA LISTA EN CADA SITIO. La misma ruta la
 * necesitan CUATRO consumidores: el menú (`Nav.astro`), el selector ES/EN (que
 * tiene que saltar de /precios a /en/pricing, no a la portada), los metadatos de
 * cada página (`Base.astro`: canonical + hreflang) y el sitemap
 * (`astro.config.mjs`). Con los slugs LOCALIZADOS —que es lo bueno para
 * buscadores y lo que hace un sitio de verdad— cada consumidor necesita saber
 * las DOS variantes de cada página. Cuatro copias de eso divergen el día que
 * alguien renombre un slug: el menú llevaría a la página nueva y el hreflang
 * seguiría declarando la vieja. Aquí vive una vez y los cuatro leen de aquí.
 *
 * Las etiquetas del menú y el <title>/<description> de cada página también viven
 * aquí, y no en `es.ts` / `en.ts`, por la misma razón: son atributos de la RUTA.
 * Si estuvieran en el fichero de contenido habría que mantener a mano la
 * correspondencia entre la etiqueta y el destino, que es justo lo que se rompe.
 *
 * Al añadir una página nueva: se añade su clave a `CLAVES_RUTA`, su entrada a
 * `rutas`, y se crean los DOS ficheros en `src/pages/` (es y en). Nada más — el
 * menú, el selector, el sitemap y los metadatos la recogen solos.
 */
import { localePath, type Locale } from './site';

/**
 * Las cinco páginas internas, en el orden en que salen en el menú.
 * El orden es el del recorrido de compra: qué es → quién lo hace → quién manda
 * → a quién le ha funcionado → cuánto cuesta.
 */
export const CLAVES_RUTA = ['el-os', 'agentes', 'control', 'casos', 'precios'] as const;

export type ClaveRuta = (typeof CLAVES_RUTA)[number];

/** Lo que define una página en UN idioma. */
export interface RutaIdioma {
  /**
   * Ruta SIN prefijo de idioma y empezando por '/'. El prefijo lo pone
   * `localePath`, que ya sabe que 'es' no lleva prefijo y 'en' lleva '/en'.
   * El fichero de `src/pages/` tiene que coincidir con esto:
   *   es → src/pages/el-os.astro        en → src/pages/en/the-os.astro
   */
  slug: string;
  /** Etiqueta en el menú. Corta: caben cinco en la barra de escritorio. */
  menu: string;
  /** <title> de la página. Bajo ~60 caracteres, que es lo que Google enseña. */
  titulo: string;
  /** <meta name="description">. Sin cifras de precio: esas sólo salen de `plans`. */
  descripcion: string;
}

export type Ruta = Record<Locale, RutaIdioma>;

export const rutas: Record<ClaveRuta, Ruta> = {
  'el-os': {
    es: {
      slug: '/el-os',
      menu: 'El OS',
      titulo: 'El OS: un panel para gobernar toda tu IA — STRATA',
      descripcion:
        'El Business OS es el panel desde el que se gobierna toda la IA de la empresa, con Jarvis en el centro. Dos formas de trabajar con STRATA: el sistema operativo listo para usar, o algo hecho a tu medida en STRATA Lab.',
    },
    en: {
      slug: '/the-os',
      menu: 'The OS',
      titulo: 'The OS: one panel to govern all your AI — STRATA',
      descripcion:
        'The Business OS is the panel every bit of company AI is governed from, with Jarvis at its centre. Two ways to work with STRATA: the operating system ready to use, or something built for you by STRATA Lab.',
    },
  },
  agentes: {
    es: {
      slug: '/agentes',
      menu: 'Agentes',
      titulo: 'Agentes: departamentos que operan solos — STRATA',
      descripcion:
        'No contratas un agente suelto: contratas un departamento entero que entrega el servicio ya hecho. Por debajo, un motor que no depende de un solo modelo — usa el que gana en cada tarea.',
    },
    en: {
      slug: '/agents',
      menu: 'Agents',
      titulo: 'Agents: departments that run themselves — STRATA',
      descripcion:
        'You do not hire a lone agent: you hire a whole department that delivers the outcome already done. Underneath, an engine that depends on no single model — it uses whichever wins the task.',
    },
  },
  control: {
    es: {
      slug: '/control',
      menu: 'Control',
      titulo: 'Control: nada se hace sin tu permiso — STRATA',
      descripcion:
        'Se instala en seis pasos y no hace nada sin tu permiso: arranca cerrado y lo abres tú, gesto a gesto. Y el sistema se construye nivel a nivel, sin saltarse pasos.',
    },
    en: {
      slug: '/control',
      menu: 'Control',
      titulo: 'Control: nothing happens without your say-so — STRATA',
      descripcion:
        'It installs in six steps and does nothing without your say-so: it starts closed and you open it, one gesture at a time. And the system is built level by level, skipping no steps.',
    },
  },
  casos: {
    es: {
      slug: '/casos',
      menu: 'Casos',
      titulo: 'Casos: probado en nuestros propios negocios — STRATA',
      descripcion:
        'No lo estrenamos contigo: lo pusimos a operar nuestros propios negocios antes de vendérselo a nadie. Casos de uso por área y los perfiles de empresa para los que está pensado.',
    },
    en: {
      slug: '/cases',
      menu: 'Cases',
      titulo: 'Cases: proven on our own businesses — STRATA',
      descripcion:
        'We did not pilot it on you: we put it to work running our own businesses first. Use cases area by area, and the company profiles it is built for.',
    },
  },
  precios: {
    es: {
      slug: '/precios',
      menu: 'Precios',
      titulo: 'Precios: contratas departamentos, no licencias — STRATA',
      descripcion:
        'La unidad no es el agente suelto: es el departamento, un equipo de agentes que entrega el servicio completo de su área con el Business OS incluido. Tarifa de lanzamiento y preguntas frecuentes.',
    },
    en: {
      slug: '/pricing',
      menu: 'Pricing',
      titulo: 'Pricing: you hire departments, not licenses — STRATA',
      descripcion:
        'The unit is not the individual agent — it is the department, a team of agents that delivers its area end to end with the Business OS included. Launch pricing and frequently asked questions.',
    },
  },
};

/** URL final de una página, con el prefijo de idioma ya puesto. */
export function rutaHref(clave: ClaveRuta, locale: Locale): string {
  return localePath(locale, rutas[clave][locale].slug);
}

/** Título y descripción de una página para el <head>. */
export function metaDeRuta(clave: ClaveRuta, locale: Locale): { titulo: string; descripcion: string } {
  const { titulo, descripcion } = rutas[clave][locale];
  return { titulo, descripcion };
}

/**
 * Las entradas del menú, en orden. Lo consumen la barra de escritorio y el
 * cajón del móvil — los dos, y por eso no se escribe la lista dos veces.
 */
export function enlacesMenu(locale: Locale): Array<{ clave: ClaveRuta; href: string; label: string }> {
  return CLAVES_RUTA.map((clave) => ({
    clave,
    href: rutaHref(clave, locale),
    label: rutas[clave][locale].menu,
  }));
}

/**
 * Descompone una URL en (idioma, ruta sin prefijo).
 *
 * Tolera la barra final porque no siempre viene igual: `Astro.url.pathname`
 * la trae o no según `build.format`, y un enlace pegado a mano en un correo
 * puede traer cualquiera de las dos. Si el normalizador no lo tolerase, el
 * selector ES/EN fallaría exactamente en la mitad de los casos.
 */
function descomponer(pathname: string): { locale: Locale; base: string } {
  const limpio = pathname.replace(/\/+$/, '') || '/';
  if (limpio === '/en' || limpio.startsWith('/en/')) {
    return { locale: 'en', base: limpio.slice(3) || '/' };
  }
  return { locale: 'es', base: limpio };
}

/** El idioma que declara una URL por su prefijo. */
export function localeDeRuta(pathname: string): Locale {
  return descomponer(pathname).locale;
}

/** La clave del mapa a la que corresponde una URL, o null si no está en el mapa. */
export function claveDeRuta(pathname: string): ClaveRuta | null {
  const { locale, base } = descomponer(pathname);
  return CLAVES_RUTA.find((c) => rutas[c][locale].slug === base) ?? null;
}

/**
 * LA MISMA PÁGINA EN EL OTRO IDIOMA — lo que necesita el selector ES/EN.
 *
 * Hasta ahora el selector mandaba SIEMPRE a la portada: quien estaba leyendo
 * precios y pulsaba EN perdía la página y tenía que volver a buscarla. Con
 * slugs localizados eso ya no se puede resolver pegando un '/en' delante, así
 * que hay que preguntarle al mapa: /precios → /en/pricing.
 *
 * Fuera del mapa (aviso legal, privacidad, cookies y la portada) devuelve la
 * MISMA ruta en el otro idioma, que es lo correcto porque hoy todas las páginas
 * del sitio existen en los dos idiomas con el mismo slug — comprobado sobre el
 * build: `/aviso-legal` ↔ `/en/aviso-legal`, y así las tres legales.
 *
 * ⚠️ INVARIANTE QUE HAY QUE MANTENER: si algún día se crea una página que sólo
 * exista en un idioma, o cuyo slug cambie entre idiomas, tiene que entrar en
 * este mapa. Si no, el selector la mandará a un 404.
 */
export function rutaEquivalente(pathnameActual: string, destino: Locale): string {
  const { locale: origen, base } = descomponer(pathnameActual);
  const clave = CLAVES_RUTA.find((c) => rutas[c][origen].slug === base);
  return clave ? rutaHref(clave, destino) : localePath(destino, base);
}

/**
 * LOS ENLACES VIEJOS NO PUEDEN MORIR.
 *
 * Estas anclas se publicaron cuando toda la web era una sola página: están en
 * el menú de la versión anterior, y pueden estar guardadas en un marcador, en
 * un correo enviado o en un deck. Al mudarse la sección a otra página el ancla
 * deja de existir en la portada, y el enlace no da error: hace algo peor, deja
 * al visitante arriba del todo sin señal de que iba a otro sitio.
 *
 * `AnclasViejas.astro` lee este mapa y redirige. Sólo están aquí las anclas de
 * secciones que SE VAN de la portada; las que se quedan (#top, #lanzamiento,
 * #contacto, #equipo) no aparecen y siguen funcionando como siempre.
 */
export const ANCLAS_MUDADAS: Record<string, ClaveRuta> = {
  // El OS  ← Product + Pillars + Lab
  '#producto': 'el-os',
  '#modelo': 'el-os',
  '#lab': 'el-os',
  // Agentes ← Agents + Flow + Engine
  '#agentes': 'agentes',
  '#motor': 'agentes',
  // `#como` se añadió el 27 ago 2026, al colocar la sección `Flow` que se había quedado huérfana:
  // el reparto aprobado cubría 19 de las 20 secciones de la landing. Sin esta línea, un enlace ya
  // publicado a `#como` aterrizaría en la portada y no encontraría nada — que es justo lo que esta
  // tabla existe para evitar.
  '#como': 'agentes',
  // Control ← Rollout + Permisos + Method
  '#despliegue': 'control',
  '#permisos': 'control',
  '#metodo': 'control',
  // Casos   ← Cases + UseCases + Partners
  '#grupo': 'casos',
  '#casos': 'casos',
  '#partners': 'casos',
  // Precios ← Pricing + Faq
  '#precios': 'precios',
  '#faq': 'precios',
};
