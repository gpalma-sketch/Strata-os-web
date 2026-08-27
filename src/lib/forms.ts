/**
 * Piezas compartidas por las dos rutas de formulario (`/api/waitlist` y
 * `/api/contact`).
 *
 * Las rutas se ejecutan en el servidor, en Vercel. La clave de servicio de
 * Supabase vive aquí y nunca sale hacia el navegador: el cliente solo habla
 * con nuestro propio dominio, así que tampoco hay una petición a un tercero
 * desde el equipo del visitante.
 */

/**
 * Se lee en cada petición, no al construir.
 *
 * Con `import.meta.env` el valor se incrusta en el paquete durante el build:
 * la clave quedaría escrita dentro del bundle y cambiarla en Vercel obligaría
 * a volver a desplegar. `process.env` la lee del entorno en el momento, que es
 * lo que hace el runtime de Node de Vercel.
 */
const env = (key: string): string =>
  process.env[key] ?? ((import.meta.env as Record<string, string | undefined>)[key] || '');

/**
 * A dónde se manda un envío (27 ago 2026).
 *
 * ── POR QUÉ YA NO SE HABLA CON LA BASE DESDE AQUÍ ────────────────────────
 * Estas rutas llamaban a las RPC `submit_*` directamente, y esas funciones
 * sólo las puede ejecutar el `service_role`. O sea que para funcionar
 * necesitaban **la clave de servicio dentro de Vercel** — y esa clave no
 * puede vivir en un front público: es la regla de la casa, «una fuga ahí es
 * la base entera».
 *
 * Como nadie la puso (con razón), `supabaseReady()` daba false y los DOS
 * formularios llevaban meses devolviendo **503 en producción**. Medido, no
 * supuesto:
 *     POST https://stratalabai.com/api/waitlist → 503
 *     POST https://stratalabai.com/api/contact  → 503
 * La página degradaba a un `mailto:`, así que sobre el papel nadie se quedaba
 * sin vía. En la práctica, quien llega desde un evento no abre su cliente de
 * correo para apuntarse a una lista: la web pedía direcciones y no las recogía.
 *
 * Ahora la escritura la hace una Edge Function del proyecto de la web
 * (`supabase/functions/formularios`), que es donde la clave de servicio vive
 * legítimamente porque la inyecta Supabase. Aquí no queda ningún secreto.
 *
 * La URL va por defecto EN EL CÓDIGO y no en una variable de entorno, igual
 * que `precios.ts`: es pública, no es un secreto, y así el sitio funciona
 * recién clonado sin que nadie tenga que acordarse de configurar nada. La
 * variable sigue existiendo por si algún día hay que apuntar a otro sitio.
 */
const FORMULARIOS =
  env('FORMULARIOS_URL') || 'https://vikyzqpayddubhrtxiyw.supabase.co/functions/v1/formularios';

/**
 * Ya no hay nada que configurar, así que ya no hay motivo para un 503.
 *
 * Se conserva el nombre para no tocar las dos rutas que lo llaman, y devuelve
 * true a secas: si la Edge Function no responde, el fallo se ve en `enviar()`
 * y se convierte en el 502 de siempre — que es un error REAL, no un «no está
 * configurado». Confundir esas dos cosas fue justo lo que dejó los formularios
 * rotos en silencio durante meses.
 */
export const supabaseReady = (): boolean => true;

export const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

/**
 * Manda un envío ya validado a la Edge Function.
 *
 * `formulario` es 'waitlist' o 'contacto', y viaja en la ruta. Los campos van
 * tal cual: la función vuelve a validarlos por su cuenta, porque una validación
 * que sólo vive de un lado la salta cualquiera que llame al otro directamente.
 */
export async function callRpc(formulario: string, campos: Record<string, unknown>): Promise<void> {
  const res = await fetch(`${FORMULARIOS}/${formulario}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    // 10 s: si no responde, es mejor devolver el error del formulario —que
    // enseña la dirección de correo— que dejar el botón girando.
    signal: AbortSignal.timeout(10_000),
    body: JSON.stringify(campos),
  });

  if (!res.ok) {
    // El cuerpo puede traer datos del propio envío; se registra para poder
    // depurar, pero nunca se devuelve al cliente.
    throw new Error(`formularios/${formulario} ${res.status}: ${await res.text()}`);
  }
}

/** Lee tanto `FormData` como JSON: los formularios envían lo primero. */
export async function readBody(request: Request): Promise<Record<string, string>> {
  const type = request.headers.get('content-type') ?? '';
  if (type.includes('application/json')) {
    const raw = (await request.json()) as Record<string, unknown>;
    return Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, String(v ?? '')]));
  }
  const form = await request.formData();
  return Object.fromEntries(Array.from(form.entries()).map(([k, v]) => [k, String(v)]));
}

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
export const validEmail = (v: string) => EMAIL.test(v.trim());

/**
 * El campo trampa del formulario. Un navegador real lo deja vacío porque está
 * oculto; un bot que rellena todo lo que encuentra, no. Cuando cae, se
 * responde 200 a propósito: si devolviéramos un error, el bot sabría que ha
 * sido detectado y probaría otra cosa.
 */
export const isBot = (fields: Record<string, string>) => Boolean(fields._gotcha?.trim());

/** El idioma sale de la página que envía, para poder responder en el suyo. */
export const localeOf = (request: Request): 'es' | 'en' => {
  const ref = request.headers.get('referer') ?? '';
  return ref.includes('/en') ? 'en' : 'es';
};

/** Se guarda recortado: sirve para detectar abuso, no para perfilar a nadie. */
export const uaOf = (request: Request) => (request.headers.get('user-agent') ?? '').slice(0, 300);
