interface LocalRoute {
  path: string;
  name: string;
  title: string;
}

// The name of the route should be equal to key.
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

  contacts: {
    path: "/contacts",
    name: "contacts",
    title: "Contacts",
  },

  usefulLinks: {
    path: "/useful-links",
    name: "usefulLinks",
    title: "Links",
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

  words: {
    path: "/words",
    name: "words",
    title: "Dictionary",
  },

  credentials: {
    path: "/credentials",
    name: "credentials",
    title: "Credentials",
  },
  credentialsCredentials: {
    path: "credentials",
    name: "credentialsCredentials",
    title: "Credentials",
  },
  credentialsTypes: {
    path: "types",
    name: "credentialsTypes",
    title: "Credential Types",
  },
};

export const credentialsRoutes = Object.values(routes).filter((item) =>
  ["credentialsCredentials", "credentialsTypes"].includes(item.name)
);

export const publicRouteNames = [
  routes.login.name,
  routes.register.name,
  routes.restorePassword.name,
  routes.changePassword.name,
  routes.home.name,
  routes.usefulLinks.name,
  routes.contacts.name,
];

export const mainPrivatePage = routes.schedule;
