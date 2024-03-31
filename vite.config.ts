import { defineConfig, normalizePath } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import path, { resolve } from "path";
import handlebars from "vite-plugin-handlebars";
// import react from "@vitejs/plugin-react";
// import InjectCSS from "@itsy/vite-css-inject";
// import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, "index.html"),
				"our-team": resolve(__dirname, "./pages/our-team/index.html"),
				academy: resolve(__dirname, "./pages/academy/index.html"),
				facilities: resolve(__dirname, "./pages/facilities/index.html"),
				gallery: resolve(__dirname, "./pages/gallery/index.html"),
				news: resolve(__dirname, "./pages/news/index.html"),
				"contact-us": resolve(
					__dirname,
					"./pages/contact-us/index.html"
				),
			},
		},
	},
	plugins: [
		handlebars({
			partialDirectory: resolve(__dirname, "./src/_partials"),
		}),
		viteStaticCopy({
			targets: [
				{
					// src: path.resolve(__dirname, "./static") + "/[!.]*", // 1️⃣
					src: normalizePath(
						path.resolve(
							__dirname,
							"./src/assets/svg/svg-built.svg"
						)
					),
					dest: "./assets/svg", // 2️⃣
				},
				// {
				// 	src: "src/assets/svg/svg-built.svg",
				// 	dest: "assets/svg",
				// },
			],
		}),
	],
	// resolve: {
	// 	alias: {
	// 		"@": path.resolve(__dirname, "./src"),
	// 		"@tests": path.resolve(__dirname, "./tests"),
	// 	},
	// },
});
