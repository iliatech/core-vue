export const apiUrl = import.meta.env.VITE_API_URL;

export const apiPaths = {
  // Auth.
  login: "auth/login",
  getAuthUser: "auth/user",

  changePassword: "changePassword",
  confirmEmail: "confirmEmail",
  register: "register",
  restorePassword: "restorePassword",
  saveAuthUserConfig: "saveAuthUserConfig",

  // Schedule.
  client: "clients",
  timeSlot: "time-slots",

  // Storage.
  fileStorage: "file-storage",

  word: "word",
  translation: "translation",
  tag: "tag",
};
