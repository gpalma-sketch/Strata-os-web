import type { Locale } from '../site';
import type { Content } from './types';
import { rellenarMarcadores, tarifaPublica } from '../../lib/precios';
import { es } from './es';
import { en } from './en';

/**
 * El contenido, con la TARIFA ya puesta (STR-224).
 *
 * Los ficheros `es.ts` y `en.ts` no llevan ni una cifra de precio: llevan marcadores
 * (`{{cuota_desde}}`, `{{implantacion_desde}}`) que se rellenan aquí, una sola vez por build, con
 * lo que diga la tabla `plans` de Supabase — la misma que leen el panel del cliente y los agentes.
 *
 * ⚠️ SE HACE EN ESTE FICHERO Y NO EN CADA COMPONENTE, y esa es la decisión que importa. Son 28
 * ficheros los que importan el contenido, y la tarifa aparecía en CINCO secciones distintas de cada
 * idioma: las tarjetas de precio, `pillars`, `lab`, una respuesta del `faq` y `chat` —lo que el
 * chatbot le contesta a quien pregunta cuánto cuesta—. Arreglar sólo las tarjetas habría dejado
 * cuatro cifras sueltas listas para divergir, que es literalmente el problema que STR-224 viene a
 * cerrar. Aquí, una cadena nueva con marcador funciona sola y no hay que acordarse de nada.
 *
 * El `await` de nivel superior para el build entero si la tarifa no se puede leer. Es deliberado:
 * una web que no se despliega se nota en un minuto; una web con el precio de hace tres meses no se
 * nota hasta que la ve un cliente.
 */
const tarifa = await tarifaPublica();

export const content: Record<Locale, Content> = {
  es: rellenarMarcadores(es, tarifa, 'es'),
  en: rellenarMarcadores(en, tarifa, 'en'),
};

/** Versión y fecha de la tarifa vigente, por si alguna sección quiere declararlas. */
export const tarifaVigente = { version: tarifa.version, desde: tarifa.vigenteDesde };

export type { Content } from './types';
export * from './types';
