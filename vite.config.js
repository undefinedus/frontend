import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/",
  plugins: [
    react(),
    mode === "development" ? basicSsl() : null,
    VitePWA({
      registerType: "autoUpdate", // 서비스 워커 자동 업데이트
      devOptions: {
        enabled: mode === "development", // 개발 모드에서 PWA 활성화
      },
      manifest: {
        name: "공유해요, 당신의 책장",
        short_name: "공책",
        start_url: "/",
        display: "standalone",
        background_color: "#FDFCFA",
        theme_color: "#7D5C4D",
        icons: [
          {
            src: "./src/assets/logos/gongchaekWithText.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: {
    host: true,
    https: false,
  },
}));
