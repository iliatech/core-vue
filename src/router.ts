import { createRouter, createWebHistory } from "vue-router";
import { publicRouteNames, routes } from "@/settings/routes";
import { getAuthToken, getAuthUser } from "@/helpers/auth";
import { useAppStore } from "@/store/appStore";
import { storeToRefs } from "pinia";
import { lang } from "@/lang";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: routes.root.path,
      name: routes.root.name,
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: routes.words.path,
      name: routes.words.name,
      component: () => import("@/views/WordsView.vue"),
      meta: {
        title: lang.title.wordsApp,
      },
    },
    {
      path: routes.login.path,
      name: "login",
      component: () => import("@/views/Login.vue"),
    },
  ],
});

router.beforeEach((to) => {
  if (!to.meta.title) {
    to.meta.title = lang.title.siteTitle;
  }

  if (!to.meta.url) {
    to.meta.url = routes.root.path;
  }

  const appStore = useAppStore();
  const { updateIsAuthorized } = appStore;
  if (getAuthToken() && getAuthUser()) {
    updateIsAuthorized(true);
  }

  if (
    (!getAuthToken() || !getAuthUser()) &&
    !publicRouteNames.includes((to.name as string) ?? "")
  ) {
    return { name: routes.login.name };
  }
});

export default router;
