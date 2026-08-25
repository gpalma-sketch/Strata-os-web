import type { APIRoute } from 'astro';
import { callRpc, isBot, json, localeOf, readBody, supabaseReady, uaOf, validEmail } from '../../lib/forms';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  if (!supabaseReady()) {
    console.error('contact: faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY');
    return json({ ok: false }, 503);
  }

  let fields: Record<string, string>;
  try {
    fields = await readBody(request);
  } catch {
    return json({ ok: false }, 400);
  }

  if (isBot(fields)) return json({ ok: true }, 200);

  const name = (fields.name ?? '').trim();
  const email = (fields.email ?? '').trim();
  const message = (fields.message ?? '').trim();

  if (!name || !message || !validEmail(email)) {
    return json({ ok: false, error: 'campos' }, 400);
  }

  try {
    await callRpc('submit_contact', {
      p_name: name,
      p_email: email,
      p_message: message,
      p_company: (fields.company ?? '').trim() || null,
      p_locale: localeOf(request),
      p_user_agent: uaOf(request),
    });
  } catch (err) {
    console.error('contact:', err);
    return json({ ok: false }, 502);
  }

  return json({ ok: true }, 200);
};

export const GET: APIRoute = () => json({ ok: false, error: 'method' }, 405);
