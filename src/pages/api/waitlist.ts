import type { APIRoute } from 'astro';
import { callRpc, isBot, json, localeOf, readBody, supabaseReady, uaOf, validEmail } from '../../lib/forms';

/** Única ruta del sitio que no se pre-renderiza: necesita ejecutarse por envío. */
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  if (!supabaseReady()) {
    // Preferible a un 200 mentiroso: el formulario muestra su mensaje de error
    // con la dirección de correo, así que la persona no se queda sin vía.
    console.error('waitlist: faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY');
    return json({ ok: false }, 503);
  }

  let fields: Record<string, string>;
  try {
    fields = await readBody(request);
  } catch {
    return json({ ok: false }, 400);
  }

  // Trampa para bots: se acepta en apariencia y no se guarda nada.
  if (isBot(fields)) return json({ ok: true }, 200);

  const email = (fields.email ?? '').trim();
  if (!validEmail(email)) return json({ ok: false, error: 'email' }, 400);

  try {
    await callRpc('submit_waitlist', {
      p_email: email,
      p_locale: localeOf(request),
      p_source: fields._source || 'waitlist-strata-os',
      p_user_agent: uaOf(request),
    });
  } catch (err) {
    console.error('waitlist:', err);
    return json({ ok: false }, 502);
  }

  return json({ ok: true }, 200);
};

/** Un GET a esta ruta no tiene sentido; se responde explícitamente. */
export const GET: APIRoute = () => json({ ok: false, error: 'method' }, 405);
