import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { a as readBody, c as validEmail, i as localeOf, n as isBot, o as supabaseReady, r as json, s as uaOf, t as callRpc } from "./forms_Cq7ag4g6.mjs";
//#region src/pages/api/contact.ts
var contact_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request }) => {
	if (!supabaseReady()) {
		console.error("contact: faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY");
		return json({ ok: false }, 503);
	}
	let fields;
	try {
		fields = await readBody(request);
	} catch {
		return json({ ok: false }, 400);
	}
	if (isBot(fields)) return json({ ok: true }, 200);
	const name = (fields.name ?? "").trim();
	const email = (fields.email ?? "").trim();
	const message = (fields.message ?? "").trim();
	if (!name || !message || !validEmail(email)) return json({
		ok: false,
		error: "campos"
	}, 400);
	try {
		await callRpc("submit_contact", {
			p_name: name,
			p_email: email,
			p_message: message,
			p_company: (fields.company ?? "").trim() || null,
			p_locale: localeOf(request),
			p_user_agent: uaOf(request)
		});
	} catch (err) {
		console.error("contact:", err);
		return json({ ok: false }, 502);
	}
	return json({ ok: true }, 200);
};
var GET = () => json({
	ok: false,
	error: "method"
}, 405);
//#endregion
//#region \0virtual:astro:page:src/pages/api/contact@_@ts
var page = () => contact_exports;
//#endregion
export { page };
