export default {
  selectItem: "Select Item",
  chooseRegionPlease: "Choose region, please",
  description:
    "In this project given model value narrows down wide set of all available<br/> geographic options to more narrow set<br/> " +
    "limited by lowest level values.",
  back: "Back",
  category: "Category",
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
  createCategory: "Add category",
  create: "Create",
  categoryName: "Category Name",
  successCreateCategory: "Category created",
  errorCreateCategoryTitleDuplicate: "Duplicate category by title",
  successDeleteCategory: (title: string): string =>
    `Category '${title}' deleted`,
  confirmDeleteCategory: (title: string) => `Delete category '${title}'?`,
  deleteTitle: "Delete",
};
