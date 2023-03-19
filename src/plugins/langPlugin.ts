import type { App } from "vue";
import lang from "@/lang/lang";

export default {
  install: (app: App) => (app.config.globalProperties.$lang = lang),
};
