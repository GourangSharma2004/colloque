import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        cream: "#F5EFE6",
        amber: "#E8A830",
        walnut: "#8B5E3C",
        taupe: "#C4A882",
        charcoal: "#2C2C2C",
        "blue-converse": "#2D7DD2",
        coral: "#E05C3A",
        "emerald-converse": "#3DAA5C",
        gold: "#D4A017",
        "purple-converse": "#7B4FBE",
        "teal-converse": "#1FA8C7",
      },
    },
  },
  plugins: [],
};
export default config;
