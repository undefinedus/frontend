/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        spinFull: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
      },
      animation: {
        spinFull: "spinFull 500ms ease-in-out", // 1초 동안 360도 회전
      },
      gridTemplateColumns: {
        MyBookGrid: "0.4fr 1fr",
        MemberLayoutGrid: "0.4fr 1fr 0.4fr",
      },

      fontFamily: {
        sans: ["NanumSquareNeo", "sans-serif"], // 기본 글꼴 설정
      },

      colors: {
        undpoint: "#7D5C4D",
        undlightpoint: "#A68171",
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
