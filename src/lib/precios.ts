/**
 * La tarifa, leída de la fuente y no escrita aquí (STR-224).
 *
 * ANTES DE ESTO los precios vivían en dos sitios: la tabla `plans` —que leen el panel del cliente y
 * los agentes— y las cadenas `'1.490 €'` de `src/data/content/{es,en}.ts`. Coincidían. El problema
 * nunca es el día que se escriben: es el día que alguien sube una tarifa en un sitio y no en el
 * otro, y entonces el comercial y la web le dicen cosas distintas al mismo cliente.
 *
 * CUÁNDO SE LEE: en el **build**, no en cada visita. La web es estática y esa es su virtud —rápida,
 * sin función de servidor por delante, y sin un modo de fallo en caliente que deje la página de
 * precios en blanco si Supabase tiene un mal minuto. Lo que hace que siga siendo fuente única es que
 * un cambio en `plans` dispara un redespliegue solo (ver `supabase/migrations` en business-os):
 * cambias el número y a los dos minutos está publicado sin que nadie toque un fichero.
 *
 * SI LA LECTURA FALLA, EL BUILD SE ROMPE. A propósito, y es la decisión importante de este fichero.
 * La alternativa cómoda —dejar unos precios de reserva escritos aquí— reconstruye exactamente el
 * problema que esto viene a resolver, y encima en silencio: publicaría una tarifa que nadie ha
 * verificado con toda la apariencia de estar bien. Una web que no se despliega se nota en un minuto;
 * una web con el precio de hace tres meses no se nota hasta que la ve un cliente.
 */

/** Público a propósito: una tarifa no es un secreto, y por eso este endpoint no lleva token. */
const ENDPOINT =
  import.meta.env.PRECIOS_URL ?? 'https://kubxhyyqqpmeztqbrhvn.supabase.co/functions/v1/precios';

export interface PlanCrudo {
  plan_key: string;
  label: string;
  /** Cuota recurrente. `null` = no se publica cifra (se cierra tras el diagnóstico). */
  precio_mes_eur: number | null;
  /** Pago único de implantación. `null` = según alcance. */
  implantacion_eur: number | null;
  /** Si la implantación se anuncia como suelo («desde») o como cifra cerrada. */
  implantacion_desde: boolean;
  a_medida: boolean;
}

export interface Tarifa {
  version: number | null;
  vigenteDesde: string | null;
  planes: Map<string, PlanCrudo>;
}

let cache: Promise<Tarifa> | null = null;

/**
 * Una sola petición por build aunque la llamen las dos páginas (es + en). Sin esto, Astro la
 * ejecutaría una vez por página y las dos tarifas podrían salir de lecturas distintas — improbable,
 * pero es justo el tipo de divergencia que este fichero existe para impedir.
 */
export function tarifaPublica(): Promise<Tarifa> {
  if (!cache) cache = leer();
  return cache;
}

async function leer(): Promise<Tarifa> {
  let res: Response;
  try {
    res = await fetch(ENDPOINT, { headers: { accept: 'application/json' } });
  } catch (err) {
    throw new Error(
      `[precios] No se ha podido leer la tarifa de ${ENDPOINT}: ${err}. El build se para: ` +
        'publicar precios sin verificar es peor que no publicar.',
    );
  }
  if (!res.ok) {
    throw new Error(`[precios] ${ENDPOINT} respondió ${res.status}. El build se para.`);
  }
  const body = (await res.json()) as {
    ok?: boolean;
    version?: number | null;
    vigente_desde?: string | null;
    planes?: PlanCrudo[];
  };
  if (!body.ok || !Array.isArray(body.planes) || body.planes.length === 0) {
    throw new Error('[precios] La respuesta no trae ninguna tarifa. El build se para.');
  }
  return {
    version: body.version ?? null,
    vigenteDesde: body.vigente_desde ?? null,
    planes: new Map(body.planes.map((p) => [p.plan_key, p])),
  };
}

/** Lo que se pinta en una tarjeta de precio, ya en el idioma de la página. */
export interface PrecioVisible {
  price: string;
  period?: string;
  setup?: string;
}

const TEXTOS = {
  es: { medida: 'A medida', mes: '/mes', desde: 'desde', alcance: 'según alcance' },
  en: { medida: 'Custom', mes: '/mo', desde: 'from', alcance: 'scoped per project' },
} as const;

/**
 * El mismo importe se escribe «1.490 €» en español y «€1,490» en inglés. Formatear aquí y no en la
 * Edge Function es lo que permite que el dato viaje como número: el servidor no tiene por qué saber
 * en qué idioma se va a leer.
 */
function euros(n: number, locale: 'es' | 'en'): string {
  const f = new Intl.NumberFormat(locale === 'es' ? 'es-ES' : 'en-GB', {
    maximumFractionDigits: 0,
    // ⚠️ `useGrouping: 'always'` NO es decoración. Por defecto, `es-ES` no agrupa los números de
    // cuatro cifras —es la regla del castellano— así que 1490 sale «1490» y 18000 sale «18.000».
    // En la misma tabla de precios, uno al lado del otro, eso parece un fallo. Cazado mirando el
    // HTML construido, no el código: en el código las dos líneas son idénticas.
    useGrouping: 'always',
  }).format(n);
  return locale === 'es' ? `${f} €` : `€${f}`;
}

export function precioVisible(plan: PlanCrudo, locale: 'es' | 'en'): PrecioVisible {
  const t = TEXTOS[locale];
  const out: PrecioVisible = {
    price: plan.precio_mes_eur === null ? t.medida : euros(plan.precio_mes_eur, locale),
  };
  if (plan.precio_mes_eur !== null) out.period = t.mes;
  out.setup =
    plan.implantacion_eur === null
      ? t.alcance
      : plan.implantacion_desde
        ? `${t.desde} ${euros(plan.implantacion_eur, locale)}`
        : euros(plan.implantacion_eur, locale);
  return out;
}

/**
 * ── LOS SUELOS DE LA TARIFA, PARA EL TEXTO CORRIDO ──────────────────────────────────────────────
 *
 * Las tarjetas de precio no eran el único sitio con cifras. La tarifa estaba escrita a mano en
 * CUATRO secciones más de cada idioma: `pillars` («próximamente · desde 1.490 €/mes»), `lab`, una
 * respuesta del `faq` y —la peor— `chat`, que es lo que el chatbot de la web le contesta a un
 * visitante que pregunta cuánto cuesta.
 *
 * Esa última es exactamente la forma en que esta casa ya se ha roto antes: el escaparate se revisa
 * porque se ve, y lo que responde el agente se olvida. Un chatbot citando la tarifa del trimestre
 * pasado a un cliente potencial es peor que una página desactualizada, porque parece una respuesta
 * personal.
 *
 * Por eso los textos llevan marcadores y no cifras, y se rellenan en el build desde la misma
 * lectura. El suelo se calcula (el MÍNIMO publicado), no se nombra un plan: si mañana entra un
 * tramo más barato, el «desde» se corrige solo en las cinco secciones a la vez.
 */
// Hay dos formas de la cuota porque el texto corrido las necesita distintas: el FAQ ya dice «una
// cuota mensual desde …» y meterle el «/mes» dejaría «cuota mensual desde 1.490 €/mes».
const MARCADORES = ['{{cuota_desde}}', '{{cuota_desde_importe}}', '{{implantacion_desde}}'] as const;

function suelos(tarifa: Tarifa, locale: 'es' | 'en'): Record<string, string> {
  const t = TEXTOS[locale];
  const planes = [...tarifa.planes.values()];
  const cuotas = planes.map((p) => p.precio_mes_eur).filter((n): n is number => n !== null && n > 0);
  const implantaciones = planes
    .map((p) => p.implantacion_eur)
    .filter((n): n is number => n !== null && n > 0);
  if (!cuotas.length || !implantaciones.length) {
    throw new Error('[precios] La tarifa no tiene suelo de cuota o de implantación. El build se para.');
  }
  return {
    '{{cuota_desde}}': `${euros(Math.min(...cuotas), locale)}${t.mes}`,
    '{{cuota_desde_importe}}': euros(Math.min(...cuotas), locale),
    '{{implantacion_desde}}': euros(Math.min(...implantaciones), locale),
  };
}

/**
 * Recorre TODO el contenido de un idioma y rellena los marcadores. Se hace en el barril
 * (`src/data/content/index.ts`) y no en cada componente a propósito: son 28 ficheros los que
 * importan el contenido, y arreglar sólo los cuatro de hoy dejaría el siguiente texto con una cifra
 * escapándose sin que nadie se entere. Aquí, una cadena nueva con marcador funciona sola.
 *
 * Si al terminar queda algún marcador sin sustituir, LANZA: publicar «desde {{cuota_desde}} €» es
 * peor que no publicar, y es el fallo que más fácil se cuela en una revisión por encima.
 */
export function rellenarMarcadores<T>(nodo: T, tarifa: Tarifa, locale: 'es' | 'en'): T {
  const mapa = suelos(tarifa, locale);
  const anda = (v: unknown): unknown => {
    if (typeof v === 'string') {
      let out = v;
      for (const m of MARCADORES) out = out.split(m).join(mapa[m]);
      if (out.includes('{{')) {
        throw new Error(`[precios] Marcador sin sustituir en el contenido ${locale}: ${out.slice(0, 120)}`);
      }
      return out;
    }
    if (Array.isArray(v)) return v.map(anda);
    if (v && typeof v === 'object') {
      return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, anda(x)]));
    }
    return v;
  };
  return anda(nodo) as T;
}

/**
 * Aplica la tarifa a los tramos escritos en `content`. El texto de venta —nombre, gancho, lo que
 * incluye— sigue viviendo ahí, porque no es un dato de negocio: es copy. Lo que viene de la fuente
 * son LOS NÚMEROS, que es lo que no puede estar en dos sitios.
 *
 * Un tramo con `planKey` que no exista en `plans` PARA EL BUILD en vez de dejar el precio viejo: un
 * plan renombrado en la base y no aquí es exactamente cómo se publica una tarifa fantasma.
 */
export function aplicarTarifa<T extends { planKey?: string; price: string; period?: string; setup?: string }>(
  tramos: readonly T[],
  tarifa: Tarifa,
  locale: 'es' | 'en',
): T[] {
  return tramos.map((tramo) => {
    if (!tramo.planKey) return tramo;
    const plan = tarifa.planes.get(tramo.planKey);
    if (!plan) {
      throw new Error(
        `[precios] El tramo declara planKey='${tramo.planKey}' y la tarifa no lo tiene. ` +
          `Publicados: ${[...tarifa.planes.keys()].join(', ')}. El build se para.`,
      );
    }
    return { ...tramo, ...precioVisible(plan, locale) };
  });
}
