import { defineStore } from "pinia";
import { ref } from "vue";
import type { Ref } from "vue";

export const useAppStore = defineStore("appStore", () => {
  const isLoading: Ref<boolean> = ref(false);

  const startLoading = (): void => {
    isLoading.value = true;
  };

  const stopLoading = (): void => {
    isLoading.value = false;
  };

  return { isLoading, startLoading, stopLoading };
});
