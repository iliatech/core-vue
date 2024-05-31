import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { createHtmlPlugin } from "vite-plugin-html";
import packageJson from "./package.json";

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    createHtmlPlugin({
      inject: {
        data: {
          title: "ILIA DOMYSHEV: Home",
          version: `${packageJson?.version}/${new Date().toISOString()}`,
        },
      },
    }),
  ],
  server: {
    port: 5050,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  define: {
    // enable hydration mismatch details in production build
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "false",
  },
});
