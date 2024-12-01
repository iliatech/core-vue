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
    title: "GoHome",
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
    title: "MySchedule",
  },

  wordsTraining: {
    path: "/words-training",
    name: "words-training",
    title: "Words",
  },

  words: {
    path: "words",
    name: "words-training.words",
    title: "Words",
  },

  credentials: {
    path: "/credentials",
    name: "credentials",
    title: "MySecrets",
  },
  credentialsCredentials: {
    path: "credentials",
    name: "credentials.items",
    title: "MySecrets",
  },
  credentialsTypes: {
    path: "types",
    name: "credentials.types",
    title: "MySecretTypes",
    parentRouteName: "credentials.items",
  },
};

export const credentialsRoutes = Object.values(routes).filter((item) =>
  ["credentials.items", "credentials.types"].includes(item.name)
);

export const wordsRoutes = Object.values(routes).filter((item) =>
  ["words-training.words"].includes(item.name)
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
