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
      path: `${routes.category.path}/:categoryName`,
      name: "category",
      component: () => import("@/components/views/WordView.vue"),
    },
    {
      path: `${routes.createCategory.path}`,
      name: "createCategory",
      component: () => import("@/components/CreateCategory.vue"),
    },
  ],
});

export default router;
