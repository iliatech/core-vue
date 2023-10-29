import { defineStore } from "pinia";
import { ref } from "vue";
import type { Ref } from "vue";

export const useAppStore = defineStore("appStore", () => {
  const isLoading: Ref<boolean> = ref(false);
  const isAuthorized: Ref<boolean> = ref(false);

  const startLoading = (): void => {
    isLoading.value = true;
  };

  const stopLoading = (): void => {
    isLoading.value = false;
  };

  const updateIsAuthorized = (value: boolean) => {
    isAuthorized.value = value;
  };

  return {
    isAuthorized,
    isLoading,
    startLoading,
    stopLoading,
    updateIsAuthorized,
  };
});
