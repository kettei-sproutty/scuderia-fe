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

      borderWidth: {
        DEFAULT: ".5px",
      },

      ringWidth: {
        DEFAULT: ".5px",
      },

      colors: {
        //SLATE
        // background: "#0f172a",
        //GRAY
        background: "#030712",

        foreground: "#f2f2f2",

        //SLATE
        // primary: {
        //   "50": "#f8fafc",
        //   "100": "#f1f5f9",
        //   "200": "#e2e8f0",
        //   "300": "#cbd5e1",
        //   "400": "#94a3b8",
        //   "500": "#64748b",
        //   DEFAULT: "#64748b",
        //   "600": "#475569",
        //   "700": "#334155",
        //   "800": "#1e293b",
        //   "900": "#0f172a",
        //   "950": "#020617",
        // },

        //GRAY
        primary: {
          "50": "#f9fafb",
          "100": "#f3f4f6",
          "200": "#e5e7eb",
          "300": "#d1d5db",
          "400": "#9ca3af",
          "500": "#6b7280",
          DEFAULT: "#6b7280",
          "600": "#4b5563",
          "700": "#374151",
          "800": "#1f2937",
          "900": "#030712",
          "950": "#030712",
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
