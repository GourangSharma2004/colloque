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
        "blue-colloque": "#2D7DD2",
        coral: "#E05C3A",
        "emerald-colloque": "#3DAA5C",
        gold: "#D4A017",
        "purple-colloque": "#7B4FBE",
        "teal-colloque": "#1FA8C7",
      },
    },
  },
  plugins: [],
};
export default config;
