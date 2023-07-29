import { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        ferroRosso: ["Ferro Rosso", "sans-serif"],
      },
      colors: {
        //TODO handle theme config properly
        background: "#09090a",
      },
    },
  },
  plugins: [],
} satisfies Config;
