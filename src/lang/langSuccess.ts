export default {
  login: "You were logged in",
  logout: "You were logged out",
  tagAdded: "Tag added",
  tagDeleted: (name: string): string => `Tag '${name}' deleted`,
  translationCreated: "Translation added.",
  wordCreated: "Word created",
  wordDeleted: (title: string): string => `Word '${title}' deleted`,
};
