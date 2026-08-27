// formularios — recibe los envíos de los formularios públicos de stratalabai.com.
//
// ── POR QUÉ EXISTE ─────────────────────────────────────────────────────────────────────────────
// Los dos formularios de la web (lista de lanzamiento y contacto) llevaban **meses devolviendo 503**
// en producción. Medido el 27 ago 2026 contra el sitio en vivo, no deducido:
//     POST https://stratalabai.com/api/waitlist  → 503
//     POST https://stratalabai.com/api/contact   → 503
// La página lo detecta y degrada a un enlace `mailto:`, así que nadie se quedaba sin vía… en teoría.
// En la práctica, quien llega desde un evento y tiene que abrir su cliente de correo y escribir a
// mano, no se apunta. La web pedía la lista y no la recogía.
//
// La causa no era una variable olvidada: las rutas de Astro llaman a `submit_waitlist` /
// `submit_contact`, que sólo puede ejecutar el `service_role`. O sea que para funcionar necesitaban
// **la clave de servicio dentro de Vercel**. Y eso choca de frente con la regla de la casa: el front
// no tiene ni debe tener esa clave — «sirve HTML; una fuga ahí es la base entera».
//
// ── LA SOLUCIÓN, Y POR QUÉ ES LA MÁS SIMPLE DE LAS QUE HAY ─────────────────────────────────────
// La clave de servicio ya vive, legítimamente, en un sitio: aquí. Supabase la inyecta en sus propias
// Edge Functions. Así que la ruta de Astro deja de hablar con la base y habla con esta función.
//
// Lo que se gana frente a las otras opciones que se miraron:
//   · frente a poner la clave en Vercel  → no hay clave que filtrar;
//   · frente a abrir las RPC a `anon`    → no hay clave anónima incrustada en la página ni hace
//                                          falta auditar la RLS de todo el proyecto;
//   · frente a un formulario de terceros → los datos no salen de nuestra infraestructura;
//   · y frente a todas ellas             → **cero variables de entorno nuevas**. La URL es pública
//                                          y va escrita por defecto en el código del sitio, igual
//                                          que ya se hace con la función `precios`.
//
// El navegador sigue hablando sólo con stratalabai.com, así que tampoco hay CORS que resolver ni una
// petición a un tercero desde el equipo del visitante — que era una propiedad que la implementación
// anterior tenía y merecía conservarse.
//
// ── QUÉ PROTEGE Y QUÉ NO, DICHO PARA QUE NO SE DÉ POR CERRADO ──────────────────────────────────
// Esta función es pública (`verify_jwt: false`) porque la llama un servidor sin sesión. Se defiende
// con: comprobación de origen, trampa para bots, validación de formato, tope de longitud y el
// `on conflict do nothing` de la propia RPC. Con eso, lo peor que consigue quien la aporree es meter
// filas basura en una lista de espera.
//
// Lo que NO tiene todavía, y conviene saberlo antes de la beta: límite por IP. Se ha dejado fuera a
// propósito porque exige una tabla y un barrido, y hoy el problema real es que el formulario NO
// FUNCIONA. Un captcha o un límite por IP es el siguiente paso cuando haya tráfico que lo justifique
// — no antes, que sería construir lo que no se necesita aún.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

// De dónde se acepta un envío. Se comprueba el `Origin`/`Referer` porque es barato y para al que
// pasa por encima; NO es una frontera —una petición fuera del navegador lo pone a mano— y por eso
// no es lo único que hay. Es la primera puerta, no la única.
const ORIGENES = [
  "https://stratalabai.com",
  "https://www.stratalabai.com",
  "http://localhost:4321",   // el dev de Astro
  "http://127.0.0.1:4321",
];

const json = (o: unknown, s = 200, origen = "") =>
  new Response(JSON.stringify(o), {
    status: s,
    headers: {
      "Content-Type": "application/json",
      // Se responde con el origen concreto y no con "*": la respuesta no lleva nada sensible, pero
      // devolver el comodín en algo que escribe en la base es una costumbre que un día se hereda
      // en un sitio donde sí importa.
      ...(origen ? { "Access-Control-Allow-Origin": origen, "Vary": "Origin" } : {}),
      "Access-Control-Allow-Headers": "content-type, accept",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
    },
  });

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const recorta = (v: unknown, n: number) => String(v ?? "").trim().slice(0, n);

/** Acepta JSON o un formulario, porque quien llama puede mandar cualquiera de los dos. */
async function campos(req: Request): Promise<Record<string, string>> {
  const tipo = req.headers.get("content-type") ?? "";
  if (tipo.includes("application/json")) {
    const d = await req.json();
    return Object.fromEntries(Object.entries(d ?? {}).map(([k, v]) => [k, String(v ?? "")]));
  }
  const f = await req.formData();
  return Object.fromEntries([...f.entries()].map(([k, v]) => [k, String(v)]));
}

Deno.serve(async (req: Request) => {
  const origen = req.headers.get("origin") ?? "";
  const permitido = ORIGENES.includes(origen) ? origen : "";

  if (req.method === "OPTIONS") return json({}, 204, permitido);
  if (req.method !== "POST") return json({ ok: false, error: "method" }, 405, permitido);

  // La ruta decide el formulario: /formularios/waitlist o /formularios/contacto.
  const cual = new URL(req.url).pathname.split("/").filter(Boolean).pop() ?? "";
  if (cual !== "waitlist" && cual !== "contacto") {
    return json({ ok: false, error: "ruta desconocida" }, 404, permitido);
  }

  // Un envío desde el navegador SIEMPRE trae Origin. Si no viene ninguno, lo manda un servidor —y el
  // servidor legítimo es la ruta de Astro, que se identifica con su propia cabecera. Se acepta el
  // caso "sin Origin" porque es justo el nuestro; lo que se rechaza es un Origin de OTRO sitio, que
  // sólo puede ser una web ajena intentando usar este formulario.
  if (origen && !permitido) return json({ ok: false, error: "origen" }, 403, "");

  let f: Record<string, string>;
  try {
    f = await campos(req);
  } catch {
    return json({ ok: false, error: "cuerpo" }, 400, permitido);
  }

  // Trampa para bots: el campo va oculto en la página, así que una persona nunca lo rellena. Se
  // responde 200 A PROPÓSITO — un bot que recibe un error reintenta con otra forma; uno que recibe
  // "gracias" se va satisfecho y no vuelve.
  if (esBot(f)) return json({ ok: true }, 200, permitido);

  const ua = recorta(req.headers.get("user-agent"), 300);
  const locale = recorta(f.locale || f._locale, 5).toLowerCase() === "en" ? "en" : "es";

  try {
    if (cual === "waitlist") {
      const email = recorta(f.email, 200).toLowerCase();
      if (!EMAIL.test(email)) return json({ ok: false, error: "email" }, 400, permitido);
      const { error } = await sb.rpc("submit_waitlist", {
        p_email: email,
        p_locale: locale,
        p_source: recorta(f._source, 60) || "waitlist-strata-os",
        p_user_agent: ua,
      });
      if (error) throw error;
    } else {
      const email = recorta(f.email, 200).toLowerCase();
      const nombre = recorta(f.name, 120);
      const mensaje = recorta(f.message, 4000);
      if (!EMAIL.test(email)) return json({ ok: false, error: "email" }, 400, permitido);
      // Nombre y mensaje se exigen aquí y no sólo en el navegador: una validación que sólo vive en
      // el cliente la salta cualquiera, y entonces llega una fila vacía que alguien tiene que mirar.
      if (!nombre || mensaje.length < 10) {
        return json({ ok: false, error: "faltan datos" }, 400, permitido);
      }
      const { error } = await sb.rpc("submit_contact", {
        p_name: nombre,
        p_email: email,
        p_message: mensaje,
        p_company: recorta(f.company, 160),
        p_locale: locale,
        p_user_agent: ua,
      });
      if (error) throw error;
    }
  } catch (e) {
    // Se registra con detalle y se responde escueto: quien envía no tiene por qué enterarse de cómo
    // se llama la función que ha fallado.
    console.error(`formularios/${cual}:`, e);
    return json({ ok: false }, 502, permitido);
  }

  return json({ ok: true }, 200, permitido);
});

/** El campo trampa. Se mira con varios nombres porque el de la web es `_gotcha` y podría cambiar. */
function esBot(f: Record<string, string>): boolean {
  return Boolean((f._gotcha ?? f.gotcha ?? f._honey ?? "").trim());
}
