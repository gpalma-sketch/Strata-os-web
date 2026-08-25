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

export interface Caso {
  slug: string;
  nombre: string;
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
  /** Ocupa el doble de ancho en la rejilla. Como mucho uno. */
  destacado?: boolean;
}

const P = { es: '', en: '' };

export const casos: Caso[] = [
  {
    slug: 'strata',
    nombre: 'STRATA',
    sector: P,
    resumen: P,
    departamentos: { es: [], en: [] },
    metricas: [],
    destacado: true,
  },
  {
    slug: 'ywh',
    nombre: 'Young Wild Hunters',
    sector: P,
    resumen: P,
    departamentos: { es: [], en: [] },
    metricas: [],
  },
  {
    slug: 'off-tv',
    nombre: 'OFF TV',
    sector: P,
    resumen: P,
    departamentos: { es: [], en: [] },
    metricas: [],
  },
  {
    slug: 'feronia',
    nombre: 'Feronia',
    sector: P,
    resumen: P,
    departamentos: { es: [], en: [] },
    metricas: [],
  },
  {
    slug: 'nestor-ai',
    nombre: 'Nestor AI',
    sector: P,
    resumen: P,
    departamentos: { es: [], en: [] },
    metricas: [],
  },
  {
    slug: 'rusty-twins',
    nombre: 'Rusty Twins Garage',
    sector: P,
    resumen: P,
    departamentos: { es: [], en: [] },
    metricas: [],
  },
];

/** Un caso solo se muestra cuando tiene, como mínimo, qué es y qué opera. */
export const casoListo = (c: Caso): boolean =>
  Boolean(c.resumen.es && c.resumen.en && c.departamentos.es.length && c.departamentos.en.length);

export const casosListos = (): Caso[] => casos.filter(casoListo);

/** Sin ningún caso completo, la sección no se renderiza en absoluto. */
export const hayCasos = (): boolean => casosListos().length > 0;
