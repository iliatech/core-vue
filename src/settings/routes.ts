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

  register: {
    path: "/register",
    name: "register",
    title: "Register",
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
    title: "Word Game",
    isPublic: false,
  },

  credentials: {
    path: "/credentials",
    name: "credentials",
    title: "Credentials",
    isPublic: false,
  },
  credentialsCredentials: {
    path: "credentials",
    name: "credentialsCredentials",
    title: "Credentials",
    isPublic: false,
  },
  credentialsTypes: {
    path: "types",
    name: "credentialsTypes",
    title: "Credential Types",
    isPublic: false,
  },
};

export const credentialsRoutes = Object.values(routes).filter((item) =>
  ["credentialsCredentials", "credentialsTypes"].includes(item.name)
);

export const publicRouteNames = [
  routes.login.name,
  routes.register.name,
  routes.home.name,
  routes.usefulLinks.name,
];

export const mainPrivatePage = routes.schedule;
