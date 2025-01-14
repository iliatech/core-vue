export default {
  copiedToClipboard: (entityLabel: string) =>
    `${entityLabel} copied to clipboard`,
  databaseSaved: "Database saved",
  instanceAdded: "Instance added",
  instanceUpdated: "Instance updated",
  login: "You are logged in",
  logout: "You are logged out",
  passwordChanged: "Password was changed. Now you can login with new password.",
  secretKeySaved: "Secret key saved",
  userConfigSaved: "User config saved",
  youRegistered: (email: string) =>
    `We sent confirmation to your email ${email}. Once, you confirm email - you can login.`,
};
