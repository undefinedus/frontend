// vite.config.js
import { defineConfig } from "file:///C:/udf_book/udf_frontend/node_modules/vite/dist/node/index.js";
import react from "file:///C:/udf_book/udf_frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
import tailwindcss from "file:///C:/udf_book/udf_frontend/node_modules/tailwindcss/lib/index.js";
import basicSsl from "file:///C:/udf_book/udf_frontend/node_modules/@vitejs/plugin-basic-ssl/dist/index.mjs";
import { VitePWA } from "file:///C:/udf_book/udf_frontend/node_modules/vite-plugin-pwa/dist/index.js";
var vite_config_default = defineConfig(({ mode }) => ({
  base: "/",
  plugins: [
    react(),
    mode === "development" ? basicSsl() : null,
    VitePWA({
      registerType: "autoUpdate",
      // 서비스 워커 자동 업데이트
      devOptions: {
        enabled: mode === "development"
        // 개발 모드에서 PWA 활성화
      },
      manifest: {
        name: "\uACF5\uCC45 - \uACF5\uC720\uD574\uC694, \uB2F9\uC2E0\uC758 \uCC45\uC7A5",
        short_name: "\uACF5\uCC45",
        start_url: "/",
        display: "standalone",
        background_color: "#FDFCFA",
        theme_color: "#7D5C4D",
        icons: [
          {
            src: "/assets/logos/Logo1.png",
            sizes: "192x192",
            type: "image/png"
          }
        ]
      }
    })
  ],
  css: {
    postcss: {
      plugins: [tailwindcss()]
    }
  },
  server: {
    host: true,
    https: false
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFx1ZGZfYm9va1xcXFx1ZGZfZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXHVkZl9ib29rXFxcXHVkZl9mcm9udGVuZFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovdWRmX2Jvb2svdWRmX2Zyb250ZW5kL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgdGFpbHdpbmRjc3MgZnJvbSBcInRhaWx3aW5kY3NzXCI7XHJcbmltcG9ydCBiYXNpY1NzbCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tYmFzaWMtc3NsXCI7XHJcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tIFwidml0ZS1wbHVnaW4tcHdhXCI7XHJcblxyXG4vLyBodHRwczovL3ZpdGUuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4gKHtcclxuICBiYXNlOiBcIi9cIixcclxuICBwbHVnaW5zOiBbXHJcbiAgICByZWFjdCgpLFxyXG4gICAgbW9kZSA9PT0gXCJkZXZlbG9wbWVudFwiID8gYmFzaWNTc2woKSA6IG51bGwsXHJcbiAgICBWaXRlUFdBKHtcclxuICAgICAgcmVnaXN0ZXJUeXBlOiBcImF1dG9VcGRhdGVcIiwgLy8gXHVDMTFDXHVCRTQ0XHVDMkE0IFx1QzZDQ1x1Q0VFNCBcdUM3OTBcdUIzRDkgXHVDNUM1XHVCMzcwXHVDNzc0XHVEMkI4XHJcbiAgICAgIGRldk9wdGlvbnM6IHtcclxuICAgICAgICBlbmFibGVkOiBtb2RlID09PSBcImRldmVsb3BtZW50XCIsIC8vIFx1QUMxQ1x1QkMxQyBcdUJBQThcdUI0RENcdUM1RDBcdUMxMUMgUFdBIFx1RDY1Q1x1QzEzMVx1RDY1NFxyXG4gICAgICB9LFxyXG4gICAgICBtYW5pZmVzdDoge1xyXG4gICAgICAgIG5hbWU6IFwiXHVBQ0Y1XHVDQzQ1IC0gXHVBQ0Y1XHVDNzIwXHVENTc0XHVDNjk0LCBcdUIyRjlcdUMyRTBcdUM3NTggXHVDQzQ1XHVDN0E1XCIsXHJcbiAgICAgICAgc2hvcnRfbmFtZTogXCJcdUFDRjVcdUNDNDVcIixcclxuICAgICAgICBzdGFydF91cmw6IFwiL1wiLFxyXG4gICAgICAgIGRpc3BsYXk6IFwic3RhbmRhbG9uZVwiLFxyXG4gICAgICAgIGJhY2tncm91bmRfY29sb3I6IFwiI0ZERkNGQVwiLFxyXG4gICAgICAgIHRoZW1lX2NvbG9yOiBcIiM3RDVDNERcIixcclxuICAgICAgICBpY29uczogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6IFwiL2Fzc2V0cy9sb2dvcy9Mb2dvMS5wbmdcIixcclxuICAgICAgICAgICAgc2l6ZXM6IFwiMTkyeDE5MlwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgICB9LFxyXG4gICAgfSksXHJcbiAgXSxcclxuICBjc3M6IHtcclxuICAgIHBvc3Rjc3M6IHtcclxuICAgICAgcGx1Z2luczogW3RhaWx3aW5kY3NzKCldLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHNlcnZlcjoge1xyXG4gICAgaG9zdDogdHJ1ZSxcclxuICAgIGh0dHBzOiBmYWxzZSxcclxuICB9LFxyXG59KSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBZ1EsU0FBUyxvQkFBb0I7QUFDN1IsT0FBTyxXQUFXO0FBQ2xCLE9BQU8saUJBQWlCO0FBQ3hCLE9BQU8sY0FBYztBQUNyQixTQUFTLGVBQWU7QUFHeEIsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE9BQU87QUFBQSxFQUN6QyxNQUFNO0FBQUEsRUFDTixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixTQUFTLGdCQUFnQixTQUFTLElBQUk7QUFBQSxJQUN0QyxRQUFRO0FBQUEsTUFDTixjQUFjO0FBQUE7QUFBQSxNQUNkLFlBQVk7QUFBQSxRQUNWLFNBQVMsU0FBUztBQUFBO0FBQUEsTUFDcEI7QUFBQSxNQUNBLFVBQVU7QUFBQSxRQUNSLE1BQU07QUFBQSxRQUNOLFlBQVk7QUFBQSxRQUNaLFdBQVc7QUFBQSxRQUNYLFNBQVM7QUFBQSxRQUNULGtCQUFrQjtBQUFBLFFBQ2xCLGFBQWE7QUFBQSxRQUNiLE9BQU87QUFBQSxVQUNMO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsVUFDUjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gsU0FBUztBQUFBLE1BQ1AsU0FBUyxDQUFDLFlBQVksQ0FBQztBQUFBLElBQ3pCO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLEVBQ1Q7QUFDRixFQUFFOyIsCiAgIm5hbWVzIjogW10KfQo=
