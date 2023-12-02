export default {
  clientCreated: "Client created",
  clientUpdated: "Client updated",
  login: "You are logged in",
  logout: "You are logged out",
  profileSettingsWereSaved: "Profile settings were saved",
  tagAdded: "Tag added",
  tagDeleted: (name: string): string => `Tag '${name}' deleted`,
  tagsUpdated: "Tags updated",
  translationCreated: "Translation added.",
  wordCreated: "Word created",
  wordDeleted: (title: string): string => `Word '${title}' deleted`,
};
