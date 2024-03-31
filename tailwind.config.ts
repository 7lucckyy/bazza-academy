import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import containerQueries from "@tailwindcss/container-queries";

// Rotate X utilities
const rotateY = plugin(function ({ addUtilities }) {
	addUtilities({
		".rotate-y-180": {
			transform: "rotateY(180deg)",
		},
	});
});

const config: Config = {
	content: ["./**/*.{js,ts,html}"],
	theme: {
		extend: {
			screens: {
				"3xl": "1920px",
			},
			backgroundImage: {},
			colors: {
				primary: "rgb(var(--color-primary-rgb) / <alpha-value>)",
				secondary: "rgb(var(--color-secondary-rgb) / <alpha-value>)",
				accent: "rgb(var(--color-accent-rgb) / <alpha-value>)",
			},
			fontFamily: {
				inter: ["Inter"],
				"inter-tight": ["InterTight"],
				boogy: ["Boogy"],
				tobias: ["Tobias"],
				roboto: ["Roboto"],
				"work-sans": ["WorkSans"],
			},
			letterSpacing: {},
			lineHeight: {
				base: "130%",
			},
		},
	},
	plugins: [containerQueries, rotateY],
};
export default config;
