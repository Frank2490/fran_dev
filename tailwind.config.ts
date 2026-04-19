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
        bg: {
          DEFAULT: '#0D1117',
          surface: '#161B22',
        },
        card: '#161B22',
        border: {
          DEFAULT: '#30363D',
        },
        accent: {
          DEFAULT: '#7C3AED',
          dark: '#6D28D9',
          light: '#A78BFA',
        },
        text: {
          DEFAULT: '#FFFFFF',
          muted: '#8B949E',
        },
      },
    },
  },
  plugins: [],
};
export default config;
