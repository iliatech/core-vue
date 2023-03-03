import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/settings/routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: routes.home.path,
      name: "home",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: `${routes.category.path}/:categoryName`,
      name: "category",
      component: () => import("@/components/Category.vue"),
    },
  ],
});

export default router;
