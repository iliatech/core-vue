import { defineStore } from "pinia";
import { ref } from "vue";

export const useTagsFilteringStore = defineStore("tagsFilteringStore", () => {
  const filterTags = ref<string[]>([]);

  const changeSelectedTags = async (event: { value: string[] }) => {
    filterTags.value = event.value;
  };

  return { filterTags, changeSelectedTags };
});
