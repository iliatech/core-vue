// The name of the route should be equal to key.
import type { LocalRoute } from "@/types/common";

export const routes: Record<string, LocalRoute> = {
  login: {
    path: "/login",
    name: "login",
    title: "Login",
  },

  register: {
    path: "/register",
    name: "register",
    title: "Register",
  },

  restorePassword: {
    path: "/restorePassword",
    name: "restorePassword",
    title: "Restore Password",
  },

  changePassword: {
    path: "/changePassword",
    name: "changePassword",
    title: "Change Password",
  },

  home: {
    path: "/",
    name: "home",
    title: "Home",
  },

  portfolio: {
    path: "/",
    name: "portfolio",
    title: "Portfolio",
  },

  dashboard: {
    path: "/dashboard",
    name: "dashboard",
    title: "Dashboard",
  },

  learnEspanol: {
    path: "/learn-espanol",
    name: "learn-espanol",
    title: "Learn Espanol",
  },

  learnEspanolVerbs: {
    path: "verbs",
    name: "espanol.verbs",
    title: "Español",
    tabTitle: "Verbs",
  },

  learnEspanolVerbsForms: {
    path: "verbs-forms",
    name: "espanol.verbs-forms",
    title: "Verbs Forms",
  },

  learnEspanolVerbsPronombres: {
    path: "verbs-pronombres",
    name: "espanol.verbs-pronombres",
    title: "Verbs Pronombres",
  },
};

export const publicRouteNames = [
  routes.login.name,
  routes.register.name,
  routes.restorePassword.name,
  routes.changePassword.name,
  routes.home.name,
  routes.portfolio.name,
];

export const mainPrivatePage = routes.home;
