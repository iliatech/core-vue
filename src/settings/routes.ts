interface LocalRoute {
  path: string;
  name: string;
  title: string;
  isPublic: boolean;
}

// The name of the route should be equal to key.
export const routes: Record<string, LocalRoute> = {
  login: {
    path: "/login",
    name: "login",
    title: "Login",
    isPublic: true,
  },

  home: {
    path: "/",
    name: "home",
    title: "Home",
    isPublic: true,
  },

  usefulLinks: {
    path: "/useful-links",
    name: "usefulLinks",
    title: "Useful links",
    isPublic: true,
  },

  dashboard: {
    path: "/dashboard",
    name: "dashboard",
    title: "Dashboard",
    isPublic: false,
  },

  schedule: {
    path: "/schedule",
    name: "schedule",
    title: "Schedule",
    isPublic: false,
  },

  words: {
    path: "/words",
    name: "words",
    title: "Words Cards",
    isPublic: false,
  },
};

export const publicRouteNames = [
  routes.login.name,
  routes.home.name,
  routes.usefulLinks.name,
];

export const mainPrivatePage = routes.schedule;
