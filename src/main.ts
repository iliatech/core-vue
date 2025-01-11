import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import TreeSelect from "primevue/treeselect";
import App from "./App.vue";

import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";

import langPlugin from "@/plugins/langPlugin";

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import "./assets/main.scss";
import "./assets/generic.scss";
import "./assets/prime.scss";
import "./assets/buttons.scss";

import "@fontsource/roboto";
import Api from "@/api/Api";
import { apiPaths } from "@/settings/api";
import type { SystemApp } from "@/types/common";
import { createRouter, createWebHistory } from "vue-router";
import { publicRouteNames, routes } from "@/settings/routes";
import { mapUniversalRoutes } from "@/universal/universalRoutes";
import { useAppStore } from "@/store/appStore";
import { lang } from "@/lang";
import { getAuthToken, getAuthUser } from "@/helpers/auth";

const apps = (await Api.request({
  path: `${apiPaths.universalObject}/apps`,
})) as SystemApp[];

console.log("APPS", apps);

console.log("ROUTER START");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: routes.home.path,
      name: routes.home.name,
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: routes.portfolio.path,
      name: routes.portfolio.name,
      component: () => import("@/views/PortfolioView.vue"),
    },
    {
      path: routes.dashboard.path,
      name: routes.dashboard.name,
      component: () => import("@/views/DashboardView.vue"),
    },
    {
      path: routes.login.path,
      name: routes.login.name,
      component: () => import("@/views/Login.vue"),
    },
    {
      path: routes.register.path,
      name: routes.register.name,
      component: () => import("@/views/Register.vue"),
    },
    {
      path: routes.restorePassword.path,
      name: routes.restorePassword.name,
      component: () => import("@/views/RestorePassword.vue"),
    },
    {
      path: routes.changePassword.path,
      name: routes.changePassword.name,
      component: () => import("@/views/ChangePassword.vue"),
    },
    ...mapUniversalRoutes(apps),
  ],
});

router.beforeEach(async (to) => {
  const appStore = useAppStore();
  const { updateAuthUser } = appStore;

  if (!to.meta.title) {
    to.meta.title = lang.title.siteTitle;
  }

  if (!to.meta.url) {
    to.meta.url = routes.home.path;
  }

  const user = getAuthUser();

  if (getAuthToken() && user) {
    updateAuthUser(user);
  }

  if (
    (!getAuthToken() || !getAuthUser()) &&
    !publicRouteNames.includes((to.name as string) ?? "")
  ) {
    return { name: routes.login.name };
  }
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue);
app.use(langPlugin);
app.use(ToastService);
app.use(ConfirmationService);
app.component("TreeSelect", TreeSelect);
app.mount("#app");
