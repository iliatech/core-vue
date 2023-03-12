import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import TreeSelect from "primevue/treeselect";
import App from "./App.vue";
import router from "./router";

import langPlugin from "@/plugins/langPlugin";

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import "./assets/main.scss";
import "./assets/prime.scss";

import "@fontsource/roboto";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue);
app.use(langPlugin);
app.component("TreeSelect", TreeSelect);
app.mount("#app");
