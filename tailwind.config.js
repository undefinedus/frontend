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
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(100%)", opacity: "0" },
        },
      },
      animation: {
        spinFull: "spinFull 500ms ease-in-out", // 1초 동안 360도 회전
        slideUp: "slideUp 0.3s ease-out",
        slideDown: "slideDown 0.3s ease-in",
      },
      gridTemplateColumns: {
        MyBookGrid: "0.4fr 1fr",
        MemberLayoutGrid: "0.4fr 1fr 0.4fr",
      },
      backdropBlur: {
        xs: "2px", // 2px 블러 강도 추가
      },
      fontFamily: {
        sans: ["NanumSquareNeo", "sans-serif"], // 기본 글꼴 설정
      },
      fontWeight: {
        heavy: "900", // Custom weight
      },

      colors: {
        undclickbrown: "#51392F", // click 브라운(상단 타이틀)
        undhoverbrown: "#65493C", // hover 브라운
        undpoint: "#7D5C4D", // 포인트 커피색
        undlightpoint: "#A68171", // 연한 갈색
        undbgmain: "#FDFCFA", // 배경색(연한 화이트)
        undbgsub: "#F9F7F5", // 보조 배경색(연한 베이지)
        undtextgray: "#78716C", // 회색 텍스트
        undtextdark: "#0C0A09", // 진한 텍스트(거의 검정)
        unddisabled: "#EEE9E4", // 비활성화 버튼 컬러
        undgold: "#FFD400", // 1순위(금)
        undsilver: "#CDCDCD", // 2순위(은)
        undbronze: "#8D6627", // 2순위(은)
        undred: "#D55636", // 빨강(경고 문구)
        undgreen: "#07BE60", // 초록(안전 문구)
        undagree: "#A0CDDF", // 찬성
        unddisagree: "#DFA0B5", // 반대
      },
      fontSize: {
        und24: "1.5rem", // text-2xl와 동일한 크기
        und20: "1.25rem", // xl와 동일한 크기
        und18: "1.125rem", // 18px 크기
        und16: "1rem", // text-base와 동일한 크기
        und14: "0.875rem", // text-sm와 동일한 크기
        und12: "0.75rem", // text-xs와 동일한 크기
      },
    },
  },

  plugins: [],
};
