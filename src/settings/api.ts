export const apiUrl = import.meta.env.VITE_API_URL;

export const apiPaths = {
  // Auth.
  login: "auth/login",
  getAuthUser: "auth/user",
  register: "auth/register",
  changePassword: "auth/changePassword",
  confirmEmail: "auth/confirmEmail",
  restorePassword: "auth/restorePassword",

  saveAuthUserConfig: "saveAuthUserConfig",

  // Schedule.
  client: "clients",
  timeSlot: "time-slots",

  // Storage.
  credentialsFile: `file-storage/${import.meta.env.VITE_CREDENTIALS_FILE_ID}`,

  word: "word",
  translation: "translation",
  tag: "tag",
};
