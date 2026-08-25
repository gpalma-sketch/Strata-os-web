//#region src/lib/forms.ts
var env = (key) => process.env[key] ?? (Object.assign({
	"ASSETS_PREFIX": void 0,
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SITE": "https://stratalabai.com",
	"SSR": true
}, { _: "/opt/node22/bin/npm" })[key] || "");
var supabaseReady = () => Boolean(env("SUPABASE_URL") && env("SUPABASE_SERVICE_ROLE_KEY"));
var json = (body, status) => new Response(JSON.stringify(body), {
	status,
	headers: { "content-type": "application/json; charset=utf-8" }
});
async function callRpc(fn, args) {
	const key = env("SUPABASE_SERVICE_ROLE_KEY");
	const res = await fetch(`${env("SUPABASE_URL")}/rest/v1/rpc/${fn}`, {
		method: "POST",
		headers: {
			apikey: key,
			authorization: `Bearer ${key}`,
			"content-type": "application/json"
		},
		signal: AbortSignal.timeout(1e4),
		body: JSON.stringify(args)
	});
	if (!res.ok) throw new Error(`supabase ${fn} ${res.status}: ${await res.text()}`);
}
async function readBody(request) {
	if ((request.headers.get("content-type") ?? "").includes("application/json")) {
		const raw = await request.json();
		return Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, String(v ?? "")]));
	}
	const form = await request.formData();
	return Object.fromEntries(Array.from(form.entries()).map(([k, v]) => [k, String(v)]));
}
var EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
var validEmail = (v) => EMAIL.test(v.trim());
var isBot = (fields) => Boolean(fields._gotcha?.trim());
var localeOf = (request) => {
	return (request.headers.get("referer") ?? "").includes("/en") ? "en" : "es";
};
var uaOf = (request) => (request.headers.get("user-agent") ?? "").slice(0, 300);
//#endregion
export { readBody as a, validEmail as c, localeOf as i, isBot as n, supabaseReady as o, json as r, uaOf as s, callRpc as t };
