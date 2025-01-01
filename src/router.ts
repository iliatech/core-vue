import { createRouter, createWebHistory } from "vue-router";
import { publicRouteNames, routes } from "@/settings/routes";
import { getAuthToken, getAuthUser } from "@/helpers/auth";
import { useAppStore } from "@/store/appStore";
import { lang } from "@/lang";

import { mapUniversalRoutes } from "@/universal/universalRoutes";

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
    ...mapUniversalRoutes(),
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

export default router;
