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
          DEFAULT: '#58A6FF',
          dark: '#1F6FEB',
          light: '#7C3AED',
        },
        text: {
          DEFAULT: '#E6EDF3',
          muted: '#8B949E',
        },
      },
    },
  },
  plugins: [],
};
export default config;
