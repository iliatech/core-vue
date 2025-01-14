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

  schedule: {
    path: "/schedule",
    name: "schedule",
    title: "Schedule",
  },

  learnEspanol: {
    path: "/learn-espanol",
    name: "learn-espanol",
    title: "Learn Espanol",
  },

  learnEspanolVerbs: {
    path: "verbs",
    name: "learn-espanol.verbs",
    title: "Español",
    tabTitle: "Verbs",
  },

  learnEspanolVerbsForms: {
    path: "verbs-forms",
    name: "learn-espanol.verbs-forms",
    title: "Verbs Forms",
  },

  learnEspanolVerbsPronombres: {
    path: "verbs-pronombres",
    name: "learn-espanol.verbs-pronombres",
    title: "Verbs Pronombres",
  },

  credentials: {
    path: "/credentials",
    name: "credentials",
    title: "Secrets",
  },
  credentialsCredentials: {
    path: "credentials",
    name: "credentials.items",
    title: "Secrets",
  },
  credentialsTypes: {
    path: "types",
    name: "credentials.types",
    title: "Secret Types",
    parentRouteName: "credentials.items",
  },
};

export const credentialsRoutes = Object.values(routes).filter((item) =>
  ["credentials.items", "credentials.types"].includes(item.name)
);

export const wordsRoutes = Object.values(routes).filter((item) =>
  [
    "learn-espanol.verbs",
    "learn-espanol.verbs-forms",
    "learn-espanol.verbs-pronombres",
  ].includes(item.name)
);

export const publicRouteNames = [
  routes.login.name,
  routes.register.name,
  routes.restorePassword.name,
  routes.changePassword.name,
  routes.home.name,
  routes.portfolio.name,
];

export const mainPrivatePage = routes.schedule;
