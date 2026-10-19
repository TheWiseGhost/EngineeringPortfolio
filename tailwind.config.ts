import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#070707",
          900: "#0c0c0c",
          850: "#111111",
          800: "#161616",
          700: "#1f1f1f",
          600: "#2a2a2a",
        },
        ember: {
          300: "#ffb27a",
          400: "#ff8a3d",
          500: "#ff6b1a",
          600: "#e5560a",
          700: "#b84206",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        blink: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.2" } },
        scan: { from: { transform: "translateY(-100%)" }, to: { transform: "translateY(100%)" } },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        blink: "blink 1.4s ease-in-out infinite",
        scan: "scan 3.5s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
