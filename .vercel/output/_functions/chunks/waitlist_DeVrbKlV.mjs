import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { a as readBody, c as validEmail, i as localeOf, n as isBot, o as supabaseReady, r as json, s as uaOf, t as callRpc } from "./forms_Cq7ag4g6.mjs";
//#region src/pages/api/waitlist.ts
var waitlist_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request }) => {
	if (!supabaseReady()) {
		console.error("waitlist: faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY");
		return json({ ok: false }, 503);
	}
	let fields;
	try {
		fields = await readBody(request);
	} catch {
		return json({ ok: false }, 400);
	}
	if (isBot(fields)) return json({ ok: true }, 200);
	const email = (fields.email ?? "").trim();
	if (!validEmail(email)) return json({
		ok: false,
		error: "email"
	}, 400);
	try {
		await callRpc("submit_waitlist", {
			p_email: email,
			p_locale: localeOf(request),
			p_source: fields._source || "waitlist-strata-os",
			p_user_agent: uaOf(request)
		});
	} catch (err) {
		console.error("waitlist:", err);
		return json({ ok: false }, 502);
	}
	return json({ ok: true }, 200);
};
/** Un GET a esta ruta no tiene sentido; se responde explícitamente. */
var GET = () => json({
	ok: false,
	error: "method"
}, 405);
//#endregion
//#region \0virtual:astro:page:src/pages/api/waitlist@_@ts
var page = () => waitlist_exports;
//#endregion
export { page };
