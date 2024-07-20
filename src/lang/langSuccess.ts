export default {
  credentialAdded: "Credential added",
  credentialSaved: "Credential saved",
  credentialTypeAdded: "Credential type added",
  credentialTypeSaved: "Credential type saved",
  clientCreated: "Interaction created",
  clientUpdated: "Interaction updated",
  copiedToClipboard: (entityLabel: string) =>
    `${entityLabel} copied to clipboard`,
  databaseSaved: "Database saved",
  login: "You are logged in",
  logout: "You are logged out",
  passwordChanged: "Password was changed. Now you can login with new password.",
  secretKeySaved: "Secret key saved",
  tagAdded: "Tag added",
  tagDeleted: (name: string): string => `Tag '${name}' deleted`,
  tagsUpdated: "Tags updated",
  translationCreated: "Translation added.",
  userConfigSaved: "User config saved",
  wordCreated: "Word created",
  wordDeleted: (title: string): string => `Word '${title}' deleted`,
  youRegistered: (email: string) =>
    `We sent confirmation to your email ${email}. Once, you confirm email - you can login.`,
};
