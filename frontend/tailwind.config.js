/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        surface: {
          900: "#0a0a0f",
          800: "#12121a",
          700: "#1a1a27",
          600: "#22223a",
        },
        accent: {
          DEFAULT: "#6366f1",
          light: "#818cf8",
          dark: "#4f46e5",
        },
        invest: "#22c55e",
        pass: "#ef4444",
      },
    },
  },
  plugins: [],
};
