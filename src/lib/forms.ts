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

/** Sin configurar, las rutas responden 503 en vez de fingir que guardan. */
export const supabaseReady = (): boolean => Boolean(env('SUPABASE_URL') && env('SUPABASE_SERVICE_ROLE_KEY'));

export const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

/**
 * Llama a una de las funciones `submit_*` del proyecto.
 *
 * Son la única superficie de escritura expuesta: las tablas viven en el
 * esquema `marketing`, que no está publicado en la API, así que ni siquiera
 * con esta clave se puede leer la lista entera desde aquí.
 */
export async function callRpc(fn: string, args: Record<string, unknown>): Promise<void> {
  const key = env('SUPABASE_SERVICE_ROLE_KEY');
  const res = await fetch(`${env('SUPABASE_URL')}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: {
      apikey: key,
      authorization: `Bearer ${key}`,
      'content-type': 'application/json',
    },
    // 10 s: si Supabase no responde, es mejor devolver el error del formulario
    // —que enseña la dirección de correo— que dejar el botón girando.
    signal: AbortSignal.timeout(10_000),
    body: JSON.stringify(args),
  });

  if (!res.ok) {
    // El cuerpo puede traer datos del propio envío; se registra para poder
    // depurar, pero nunca se devuelve al cliente.
    throw new Error(`supabase ${fn} ${res.status}: ${await res.text()}`);
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
