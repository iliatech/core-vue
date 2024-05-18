import { createRouter, createWebHistory } from "vue-router";
import { publicRouteNames, routes } from "@/settings/routes";
import { getAuthToken, getAuthUser } from "@/helpers/auth";
import { useAppStore } from "@/store/appStore";
import { lang } from "@/lang";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: routes.home.path,
      name: routes.home.name,
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: routes.dashboard.path,
      name: routes.dashboard.name,
      component: () => import("@/views/DashboardView.vue"),
    },
    {
      path: routes.words.path,
      name: routes.words.name,
      component: () => import("@/modules/wordGame/views/WordsView.vue"),
      meta: {
        title: lang.title.wordsApp,
      },
    },
    {
      path: routes.login.path,
      name: routes.login.name,
      component: () => import("@/views/Login.vue"),
    },
    {
      path: routes.usefulLinks.path,
      name: routes.usefulLinks.name,
      component: () =>
        import("@/modules/usefulLinks/views/UsefulLinksView.vue"),
      meta: {
        title: lang.title.usefulLinks,
      },
    },
    {
      path: routes.schedule.path,
      name: routes.schedule.name,
      component: () => import("@/modules/schedule/views/ScheduleView.vue"),
      meta: {
        title: lang.title.clientsSchedule,
      },
    },
    {
      path: routes.credentials.path,
      name: routes.credentials.name,
      component: () =>
        import("@/modules/credentials/views/CredentialsView.vue"),
      meta: {
        title: lang.title.credentials,
      },
    },
  ],
});

router.beforeEach((to) => {
  if (!to.meta.title) {
    to.meta.title = lang.title.siteTitle;
  }

  if (!to.meta.url) {
    to.meta.url = routes.home.path;
  }

  const appStore = useAppStore();
  const { updateIsAuthorized, updateAuthUser } = appStore;
  const user = getAuthUser();

  if (getAuthToken() && user) {
    updateIsAuthorized(true);
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
