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
  add: "Add",
  authTokenIsInvalid: "Authorization token is invalid",
  loaderLabel: "Loading",
  createCategory: "Add word or phrase",
  create: "Create",
  categoryName: "Word or phrase",
  successCreateCategory: "Word or phrase created",
  errorCreateCategoryTitleDuplicate: "Duplicate word or phrase by title",
  successDeleteCategory: (title: string): string =>
    `Category '${title}' deleted`,
  confirmDeleteCategory: (title: string) => `Delete word or phrase '${title}'?`,
  deleteCategoryTitle: "Delete word or phrase",
};
