import { defineStore } from "pinia";
import { ref } from "vue";
import type { Ref } from "vue";
import type { AuthorizedUser } from "@/types/user";

export const useAppStore = defineStore("appStore", () => {
  const isLoading: Ref<boolean> = ref(false);
  const isAuthorized: Ref<boolean> = ref(false);
  const user = ref<AuthorizedUser | null>(null);

  const startLoading = (): void => {
    isLoading.value = true;
  };

  const stopLoading = (): void => {
    isLoading.value = false;
  };

  const updateIsAuthorized = (value: boolean) => {
    isAuthorized.value = value;
  };

  const updateUser = (value: AuthorizedUser | null) => {
    user.value = value;
  };

  return {
    isAuthorized,
    isLoading,
    user,
    startLoading,
    stopLoading,
    updateIsAuthorized,
    updateUser,
  };
});
