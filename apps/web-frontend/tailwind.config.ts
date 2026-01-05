import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          900: "#0F172A",
          700: "#334155",
          600: "#475569",
          500: "#64748B",
          400: "#94A3B8",
          300: "#CBD5F5",
          200: "#E2E8F0",
          100: "#F1F5F9"
        },
        sand: {
          DEFAULT: "#FFF7ED",
          50: "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA"
        },
        brand: {
          700: "#C76B12",
          600: "#E17810",
          500: "#F28C28",
          400: "#F8A34B",
          300: "#FDBA74",
          200: "#FED7AA",
          100: "#FFEDD5"
        }
      },
      boxShadow: {
        card: "0 12px 30px -20px rgba(15, 23, 42, 0.35)",
        soft: "0 6px 20px -12px rgba(15, 23, 42, 0.25)"
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem"
      },
      fontFamily: {
        sans: ["var(--font-primary)", "ui-sans-serif", "system-ui"]
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
