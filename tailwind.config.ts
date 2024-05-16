import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        body: '#FEFBF6',
        primary: '#222831',
        hover: '#5A96E3',
        skeleton: '#ECE9E4',
        darkSkeleton: '#2F3640',
        aiButton: '#6f42c1',
      },
      borderWidth: {
        6: '6px',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
export default config;
