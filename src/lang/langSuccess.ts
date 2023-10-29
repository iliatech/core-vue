export default {
  login: "You are logged in",
  logout: "You are logged out",
  tagAdded: "Tag added",
  tagDeleted: (name: string): string => `Tag '${name}' deleted`,
  tagsUpdated: "Tags list updated",
  translationCreated: "Translation added.",
  wordCreated: "Word created",
  wordDeleted: (title: string): string => `Word '${title}' deleted`,
};
