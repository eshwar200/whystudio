import type { Config } from "tailwindcss";

/**
 * WHY design tokens. Colours are defined once as CSS variables in globals.css
 * and mapped here so every component uses the same vocabulary.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "rgb(var(--paper) / <alpha-value>)",
        "paper-2": "rgb(var(--paper-2) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        "ink-2": "rgb(var(--ink-2) / <alpha-value>)",
        mute: "rgb(var(--mute) / <alpha-value>)",
        lime: "rgb(var(--lime) / <alpha-value>)",
        acid: "rgb(var(--acid) / <alpha-value>)",
        flare: "rgb(var(--flare) / <alpha-value>)",
        volt: "rgb(var(--volt) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        mega: ["clamp(4.5rem, 19vw, 22rem)", { lineHeight: "0.8", letterSpacing: "-0.06em" }],
        giant: ["clamp(2.4rem, 9vw, 9.5rem)", { lineHeight: "0.86", letterSpacing: "-0.045em" }],
        huge: ["clamp(2.1rem, 6vw, 6rem)", { lineHeight: "0.9", letterSpacing: "-0.04em" }],
        big: ["clamp(1.9rem, 3.6vw, 3.4rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
      },
      maxWidth: { frame: "1440px" },
      transitionTimingFunction: { out: "cubic-bezier(0.16, 1, 0.3, 1)" },
    },
  },
  plugins: [],
};

export default config;
