/**
 * Casos reales: las empresas del grupo que ya operan con STRATA.
 *
 * ⚠️ NO SON CLIENTES EXTERNOS, y la sección lo dice literalmente. Presentar
 * empresas propias como clientes es publicidad engañosa (Directiva 2005/29/CE,
 * anexo I, punto 2) y además es lo primero que comprueba cualquiera que tire
 * del hilo. El encuadre honesto es más fuerte: si te juegas tus propios
 * negocios con el sistema, la convicción se demuestra sola.
 *
 * ⚠️ CAMPOS PENDIENTES: mientras `resumen` esté vacío en todos los casos, la
 * sección entera no se renderiza — mismo criterio que las páginas legales.
 * Media sección con huecos es peor que ninguna.
 *
 * Sobre las métricas: `periodo` es obligatorio cuando hay cifra. Un «−40 %»
 * sin decir de qué periodo ni sobre qué base no es un dato, es un eslogan, y
 * es exactamente lo que no se puede sostener cuando alguien pregunta en una
 * reunión. Si no hay medición hecha, se deja `metricas` vacío: el caso se
 * muestra igual, contando qué departamentos operan.
 *
 * Sobre las personas: aquí no aparece el nombre de ningún particular. Los
 * datos de los titulares de estas empresas no pintan nada en una web pública
 * y publicarlos sería un tratamiento de datos personales sin base que lo
 * ampare.
 */

export interface Metrica {
  /** La cifra, ya formateada: '−38', '×2,4', '120'. */
  valor: string;
  /** Unidad o símbolo: '%', 'h/mes', 'd'. Vacío si el valor ya la lleva. */
  unidad?: string;
  caption: { es: string; en: string };
  /** Obligatorio: sobre qué periodo se midió. 'últimos 6 meses', '2026'. */
  periodo: { es: string; en: string };
}

/**
 * Empresa del grupo o cliente externo.
 *
 * La distinción se pinta en la tarjeta. Mezclar las dos cosas bajo la palabra
 * "clientes" sería publicidad engañosa; esconder que hay un cliente real sería
 * desaprovecharlo. Cada una lleva su etiqueta y se acabó el problema.
 */
export type TipoCaso = 'grupo' | 'cliente';

export interface Caso {
  slug: string;
  nombre: string;
  tipo: TipoCaso;
  /** Sector en una línea corta. */
  sector: { es: string; en: string };
  /** Qué es el negocio. Una o dos frases, en presente. */
  resumen: { es: string; en: string };
  /** Departamentos que hoy operan con agentes en esa empresa. */
  departamentos: { es: string[]; en: string[] };
  /** Vacío mientras no haya medición real. */
  metricas: Metrica[];
  /** Fichero en src/assets/ para el logotipo. Vacío = se muestra el nombre. */
  logo?: string;
  /** Lo resalta con el borde dorado. Como mucho uno. */
  destacado?: boolean;
}

/**
 * Los nueve departamentos, en orden.
 *
 * Cuando un caso los opera todos, la tarjeta muestra una sola etiqueta en vez
 * de nueve fichas: seis tarjetas con la misma lista de nueve son 54 etiquetas
 * repetidas que no aportan nada y ahogan lo que sí distingue a cada negocio.
 * La estructura sigue admitiendo listas parciales para cuando alguna empresa
 * opere solo algunas áreas.
 */
export const TODOS_LOS_DEPARTAMENTOS = {
  es: ['Marketing', 'Ventas', 'Atención', 'Legal', 'Finanzas', 'Producto & Dev', 'People', 'Ops', 'Dirección'],
  en: ['Marketing', 'Sales', 'Support', 'Legal', 'Finance', 'Product & Dev', 'People', 'Ops', 'Leadership'],
};

const TODOS = TODOS_LOS_DEPARTAMENTOS;

export const casos: Caso[] = [
  {
    slug: 'strata',
    nombre: 'STRATA',
    tipo: 'grupo',
    sector: { es: 'IA aplicada · el sistema sobre sí mismo', en: 'Applied AI · the system on itself' },
    resumen: {
      es: 'La empresa que construye STRATA se opera con STRATA. Los mismos agentes que te proponemos llevan nuestras ventas, nuestro soporte y nuestras cuentas, sobre el mismo Business OS. Cualquier fallo lo sufrimos nosotros antes que ningún cliente, y por eso se arregla antes de llegar a nadie.',
      en: 'The company that builds STRATA runs on STRATA. The same agents we are proposing to you handle our sales, our support and our books, on the same Business OS. Any failure hits us before it reaches a single client, which is why it gets fixed before anyone else sees it.',
    },
    departamentos: TODOS,
    metricas: [],
    destacado: true,
  },
  {
    slug: 'ywh',
    tipo: 'grupo',
    nombre: 'Young Wild Hunters',
    sector: { es: 'Producción audiovisual · outdoor', en: 'Film production · outdoor' },
    resumen: {
      es: 'Productora audiovisual especializada en el sector outdoor y naturaleza. Un negocio de proyectos: cada rodaje tiene su propio calendario, sus proveedores y su cliente, y nada se parece al mes anterior.',
      en: 'A film production company specialising in the outdoor and nature sector. A project business: every shoot has its own schedule, its own suppliers and its own client, and no month looks like the last.',
    },
    departamentos: TODOS,
    metricas: [],
  },
  {
    slug: 'off-tv',
    tipo: 'grupo',
    nombre: 'OFF TV',
    sector: { es: 'Ecommerce y OTT · outdoor', en: 'Ecommerce and OTT · outdoor' },
    resumen: {
      es: 'Ecommerce y plataforma OTT del mundo outdoor, con comunidad propia. Tres negocios conviviendo bajo una misma marca: la tienda, el contenido por suscripción y la audiencia que los une.',
      en: 'An outdoor ecommerce and OTT platform with its own community. Three businesses living under one brand: the store, the subscription content and the audience that ties them together.',
    },
    departamentos: TODOS,
    metricas: [],
  },
  {
    slug: 'feronia',
    tipo: 'cliente',
    nombre: 'Feronia',
    sector: { es: 'Paisajismo y decoración', en: 'Landscaping and interiors' },
    resumen: {
      es: 'Estudio de paisajismo y decoración, y nuestro primer cliente externo. Proyectos a medida, con presupuestos, proveedores y plazos que dependen de la obra y de la temporada — el tipo de negocio donde la coordinación se come el día.',
      en: 'A landscaping and interior design studio, and our first external client. Bespoke projects, with quotes, suppliers and timelines that depend on the site and the season — the kind of business where coordination eats the day.',
    },
    departamentos: TODOS,
    metricas: [],
  },
  {
    slug: 'nestor-ai',
    tipo: 'grupo',
    nombre: 'Nestor AI',
    sector: { es: 'Proptech · gestión de propiedades', en: 'Proptech · property management' },
    resumen: {
      es: 'Aplicación de gestión de propiedades y pisos con IA. Inmuebles, inquilinos y toda la documentación que arrastra cada uno, en un sector donde los plazos y el papeleo no perdonan.',
      en: 'An AI-powered property and rental management app. Properties, tenants and all the paperwork each one drags along, in a sector where deadlines and documentation are unforgiving.',
    },
    departamentos: TODOS,
    metricas: [],
  },
  {
    slug: 'rusty-twins',
    tipo: 'grupo',
    nombre: 'Rusty Twins Garage',
    sector: { es: 'Comunidad · coches clásicos', en: 'Community · classic cars' },
    resumen: {
      es: 'Aplicación para los amantes de los coches clásicos: un producto de comunidad en un nicho muy concreto, donde la relación con el usuario es el producto.',
      en: 'An app for classic car enthusiasts: a community product in a very specific niche, where the relationship with the user is the product.',
    },
    departamentos: TODOS,
    metricas: [],
  },
];

/** Un caso solo se muestra cuando tiene, como mínimo, qué es y qué opera. */
export const casoListo = (c: Caso): boolean =>
  Boolean(c.resumen.es && c.resumen.en && c.departamentos.es.length && c.departamentos.en.length);

export const casosListos = (): Caso[] => casos.filter(casoListo);

/** Sin ningún caso completo, la sección no se renderiza en absoluto. */
export const hayCasos = (): boolean => casosListos().length > 0;

/** ¿Opera el catálogo entero? Decide si se pinta una etiqueta o nueve. */
export const operaTodo = (c: Caso, locale: 'es' | 'en'): boolean =>
  c.departamentos[locale].length >= TODOS_LOS_DEPARTAMENTOS[locale].length;
