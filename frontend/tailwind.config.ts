import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"] as string[],
  theme: {
    extend: {
      colors: {
        ocean: "#2f80ed",
        sunshine: "#f6c453",
        mint: "#77e5c9",
        lavender: "#9b8df6",
        ink: "#1b2a3a"
      },
      fontFamily: {
        sans: ["Nunito", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
} satisfies Config;
