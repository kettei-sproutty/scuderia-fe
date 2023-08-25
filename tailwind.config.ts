import { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "**/*.stories.ts, **/*.stories.tsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        ferroRosso: ["Ferro Rosso", "sans-serif"],
      },
      colors: {
        background: "#1b1c1d",
        foreground: "#f2f2f2",

        primary: {
          "50": "#f5f6f6",
          "100": "#e5e8e8",
          "200": "#cdd2d4",
          "300": "#abb3b5",
          "400": "#818b8f",
          "500": "#667074",
          DEFAULT: "#667074",
          "600": "#576063",
          "700": "#4a5154",
          "800": "#424648",
          "900": "#3a3d3f",
          "950": "#292c2e",
        },

        accent: {
          lighter: "#c7acff",
          light: "#9549ff",
          DEFAULT: "#570ea4",
          dark: "#35066f",
        },

        info: {
          lighter: "#60a5fa",
          light: "#3b82f6",
          DEFAULT: "#1d4ed8",
          dark: "#1e3a8a",
        },

        success: {
          lighter: "#86efac",
          light: "#22c55e",
          DEFAULT: "#16a34a",
          dark: "#064e3b",
        },

        warning: {
          lighter: "#fde68a",
          light: "#fcd34d",
          DEFAULT: "#b45309",
          dark: "#78350f",
        },

        error: {
          lighter: "#fb7185",
          light: "#be123c",
          DEFAULT: "#881337",
          dark: "#4c0519",
        },

        //TODO: check if it's still usefull
        redFerrari: "#FF2800",
      },
    },
  },
  plugins: [],
} satisfies Config;
