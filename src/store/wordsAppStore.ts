import { defineStore } from "pinia";
import { ref } from "vue";
import type { Ref } from "vue";

export enum SortingOptions {
  ById = "by_id",
  ByTranslatedTimes = "by_translated_times",
}

export enum SortingDirectionOptions {
  Asc = "asc",
  Desc = "desc",
}

export const useWordsAppStore = defineStore("wordsAppStore", () => {
  const sortingOptions = [
    { label: "By ID", value: SortingOptions.ById },
    { label: "By Translated Times", value: SortingOptions.ByTranslatedTimes },
  ];

  const sortingDirectionOptions = [
    { label: "Asc", value: SortingDirectionOptions.Asc },
    {
      label: "Desc",
      value: SortingDirectionOptions.Desc,
    },
  ];

  const selectedSorting = ref(SortingOptions.ById);

  const selectedSortingDirection = ref(SortingDirectionOptions.Asc);

  return {
    sortingOptions,
    selectedSorting,
    sortingDirectionOptions,
    selectedSortingDirection,
  };
});
