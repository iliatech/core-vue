import { defineStore } from "pinia";
import { ref } from "vue";

export const useTagsFilteringStore = defineStore("tagsFilteringStore", () => {
  const selectedTags = ref<string[]>([]);

  const changeSelectedTags = async (event: { value: string[] }) => {
    selectedTags.value = event.value;
  };

  return { selectedTags, changeSelectedTags };
});
