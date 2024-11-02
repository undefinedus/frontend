/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        MyBookGrid: "0.4fr 1fr",
      },

      fontFamily: {
        sans: ["NanumSquareNeo", "sans-serif"], // 기본 글꼴 설정
      },

      colors: {
        undpoint: "#7D5C4D",
        undbgmain: "#FDFCFA",
        undbgsub: "#F9F7F5",
        undtextgray: "#78716C",
        undtextdark: "#0C0A09",
        unddisabled: "#EEE9E4",
      },
    },
  },

  plugins: [],
};
