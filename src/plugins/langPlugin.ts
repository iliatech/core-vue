import type { App } from "vue";

import lang from "@/lang";

export default {
  install: (app: App) => (app.config.globalProperties.$lang = lang),
};
