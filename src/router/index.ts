import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/settings/routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: routes.home.path,
      name: "home",
      component: () => import("@/components/views/WordsView.vue"),
    },
    {
      path: `${routes.word.path}/:wordId`,
      name: "category",
      component: () => import("@/components/views/WordView.vue"),
    },
    {
      path: `${routes.createWord.path}`,
      name: "createWord",
      component: () => import("@/components/CreateWord.vue"),
    },
  ],
});

export default router;
