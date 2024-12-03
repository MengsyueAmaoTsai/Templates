export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	debug: process.env.NODE_ENV !== "production",
	devtools: { enabled: process.env.NODE_ENV !== "production" },
	ssr: true,
	rootDir: "./",
	srcDir: "src/",
	dir: {
		pages: "pages",
		layouts: "layouts",
		middleware: "middlewares",
		plugins: "plugins",
		modules: "modules",
		assets: "assets",
	},
	css: ["~/assets/styles/global.scss"],
});
