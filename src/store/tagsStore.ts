import { defineStore } from "pinia";
import { ref } from "vue";
import Api from "@/api/Api";
import { apiPaths } from "@/settings/api";
import { sortCollator } from "@/settings/collators";
import type { ApiTagResponse } from "@/types/tag";

export const useTagsStore = defineStore("tagsStore", () => {
  const tags = ref<ApiTagResponse[]>([]);

  const loadTags = async () => {
    tags.value = await Api.request({
      path: apiPaths.tag,
      isDataResult: true,
    });

    tags.value.sort((a, b) => sortCollator.compare(a.name, b.name));
  };

  return { tags, loadTags };
});
