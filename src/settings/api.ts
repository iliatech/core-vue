export const apiUrl = import.meta.env.VITE_API_URL;

export const apiPaths = {
  // Auth.
  login: "auth/login",
  getAuthUser: "auth/user",
  register: "auth/register",
  changePassword: "auth/change-password",
  confirmEmail: "auth/confirm-email",
  restorePassword: "auth/restore-password",

  // Storage.
  fileStorage: `file-storage`,
};
