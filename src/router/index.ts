import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/settings/routes";
import { getAuthToken, getAuthUser } from "@/helpers/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "",
      name: "home",
      component: () => import("@/components/views/HomeView.vue"),
      children: [
        {
          path: routes.words.path,
          name: routes.words.name,
          component: () => import("@/components/views/WordsView.vue"),
        },
        {
          path: `${routes.word.path}/:wordId`,
          name: routes.word.name,
          component: () => import("@/components/views/WordView.vue"),
        },
        {
          path: `${routes.createWord.path}`,
          name: routes.createWord.name,
          component: () => import("@/components/CreateWord.vue"),
        },
      ],
    },
    {
      path: routes.login.path,
      name: "login",
      component: () => import("@/components/views/Login.vue"),
    },
  ],
});

router.beforeEach((to) => {
  if ((!getAuthToken() || !getAuthUser()) && to.name !== routes.login.name) {
    return { name: routes.login.name };
  }
});

export default router;
