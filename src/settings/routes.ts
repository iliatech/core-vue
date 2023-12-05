export const routes = {
  login: {
    path: "/login",
    name: "login",
  },

  root: {
    path: "/",
    name: "root",
  },

  home: {
    path: "",
    name: "home",
  },

  schedule: {
    path: "/schedule",
    name: "schedule",
  },

  words: {
    path: "/words",
    name: "words",
  },

  usefulLinks: {
    path: "/useful-links",
    name: "usefulLinks",
  },
};

export const publicRouteNames = [
  routes.login.name,
  routes.root.name,
  routes.usefulLinks,
];

export const mainPrivatePage = routes.schedule;
