import { createRouter, createWebHistory } from "vue-router";
import { publicRouteNames, routes } from "@/settings/routes";
import { getAuthToken, getAuthUser } from "@/helpers/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: routes.root.path,
      name: routes.root.name,
      component: () => import("@/views/HomeView.vue"),
      // children: [
      //   {
      //     path: "",
      //     name: routes.home.name,
      //     component: () => import("@/views/WordsView.vue"),
      //   },
      //   {
      //     path: `${routes.word.path}/:wordId`,
      //     name: routes.word.name,
      //     component: () => import("@/views/WordView.vue"),
      //   },
      //   {
      //     path: `${routes.createWord.path}`,
      //     name: routes.createWord.name,
      //     component: () => import("@/components/CreateWord.vue"),
      //   },
      // ],
    },
    {
      path: routes.login.path,
      name: "login",
      component: () => import("@/views/Login.vue"),
    },
  ],
});

router.beforeEach((to) => {
  console.log("A1", to.name);
  if (
    (!getAuthToken() || !getAuthUser()) &&
    !publicRouteNames.includes((to.name as string) ?? "")
  ) {
    console.log("F1");
    return { name: routes.login.name };
  }
});

export default router;
