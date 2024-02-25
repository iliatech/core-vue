interface LocalRoute {
  path: string;
  name: string;
  title: string;
}

export const routes: Record<string, LocalRoute> = {
  login: {
    path: "/login",
    name: "login",
    title: "Login",
  },

  root: {
    path: "/",
    name: "root",
    title: "",
  },

  home: {
    path: "",
    name: "home",
    title: "Home",
  },

  schedule: {
    path: "/schedule",
    name: "schedule",
    title: "Schedule",
  },

  words: {
    path: "/words",
    name: "words",
    title: "Words Cards",
  },

  usefulLinks: {
    path: "/useful-links",
    name: "usefulLinks",
    title: "Useful links",
  },
};

export const publicRouteNames = [
  routes.login.name,
  routes.root.name,
  routes.usefulLinks,
];

export const mainPrivatePage = routes.schedule;
