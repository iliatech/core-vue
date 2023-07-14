export default {
  selectItem: "Select Item",
  chooseRegionPlease: "Choose region, please",
  description:
    "In this project given model value narrows down wide set of all available<br/> geographic options to more narrow set<br/> " +
    "limited by lowest level values.",
  back: "Back",
  category: "Word or phrase",
  categoryContent: {
    rest: "Rest",
    spent: "Spent",
    currentWeek: "current week",
    previousWeek: "previous week",
    currentMonth: "current month",
    previousMonth: "previous month",
  },
  emptyCategoryHistory: "It's empty",
  addTranslation: "Add translation",
  authTokenIsInvalid: "Authorization token is invalid",
  loaderLabel: "Loading",
  createCategory: "Create...",
  save: "Save",
  categoryName: "Word or phrase",
  successCreateCategory: "You just created something",
  errorCreateCategoryTitleDuplicate: "Duplicate word or phrase by title",
  successDeleteCategory: (title: string): string =>
    `Category '${title}' deleted`,
  confirmDeleteTitle: (title: string) => `Delete "${title}"?`,
  cancelButton: "Cancel",
  confirmButton: "Confirm",
};
