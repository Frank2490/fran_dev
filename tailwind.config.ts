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
          DEFAULT: '#141414',
          surface: '#1A1A1A',
        },
        border: {
          DEFAULT: '#1A1A1A',
        },
        accent: {
          DEFAULT: '#38BDF8',
          dark: '#0EA5E9',
        },
        text: {
          DEFAULT: '#F5F5F5',
          muted: '#555555',
        },
      },
    },
  },
  plugins: [],
};
export default config;
