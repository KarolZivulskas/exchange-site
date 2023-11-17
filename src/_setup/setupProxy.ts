import { createProxyMiddleware } from "http-proxy-middleware";

module.exports = function (app: unknown) {  // any tipas kompiliatoriaus netikrinamas tipo validavimu, tad saugiau jį pakeisti į unknown (arba konkretų tipą). Tai gali tapti saugumo problema arba bug'ų šaltiniu
	app.use(
		"/api",
		createProxyMiddleware({
			target: "http://localhost:8080",
			changeOrigin: true,
		})
	);
};
