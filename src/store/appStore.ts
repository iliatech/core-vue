import { defineStore } from "pinia";
import type { Ref } from "vue";
import { reactive, ref } from "vue";
import type { AuthUser, AuthUserConfig } from "@/types/user";
import Api from "@/api/Api";
import { apiPaths } from "@/settings/api";
import { authorizedUserField, initialUserConfig } from "@/settings/auth";
import { RequestMethods } from "@/types/api";
import type { RegisteredError } from "@/types/errors";
import type { PageMessage, PagesMessages } from "@/types/common";
import { lang } from "@/lang";

export const useAppStore = defineStore("appStore", () => {
  const isLoading: Ref<boolean> = ref(false);
  const isPersistentLoading: Ref<boolean> = ref(false);
  const isAuthorized: Ref<boolean> = ref(false);
  const user = ref<AuthUser | null>(null);
  const globalError = ref<RegisteredError | undefined>();
  const pagesMessages = reactive<PagesMessages>({
    login: [],
  });

  const authUserConfig = ref<AuthUserConfig>(initialUserConfig);

  const startLoading = (): void => {
    isLoading.value = true;
  };

  const stopLoading = (): void => {
    isLoading.value = false;
  };

  const startPersistentLoading = (): void => {
    isPersistentLoading.value = true;
  };

  const stopPersistentLoading = (): void => {
    isPersistentLoading.value = false;
  };

  const updateIsAuthorized = (value: boolean) => {
    isAuthorized.value = value;
  };

  const updateAuthUser = (value: AuthUser | null) => {
    user.value = value;

    authUserConfig.value = user.value?.config ?? initialUserConfig;

    const userString = JSON.stringify(value);

    if (userString) {
      localStorage.setItem(authorizedUserField, userString);
    }
  };

  const loadAuthUser = async () => {
    const user = await Api.request({
      path: apiPaths.getAuthUser,
    });

    if (user) {
      updateAuthUser(user);
    }
  };

  const saveAuthUserConfig = async () => {
    await Api.request({
      method: RequestMethods.Put,
      path: apiPaths.saveAuthUserConfig,
      payload: { config: authUserConfig.value },
    });
  };

  const setGlobalError = (value: RegisteredError | undefined) => {
    globalError.value = value;
  };

  const updatePageMessages = (
    pageName: keyof PagesMessages,
    messages: PageMessage[]
  ) => {
    pagesMessages[pageName] = messages;
  };

  return {
    globalError,
    isAuthorized,
    isLoading,
    isPersistentLoading,
    user,
    authUserConfig,
    pagesMessages,
    loadAuthUser,
    saveAuthUserConfig,
    setGlobalError,
    startLoading,
    stopLoading,
    startPersistentLoading,
    stopPersistentLoading,
    updateIsAuthorized,
    updateAuthUser,
    updatePageMessages,
  };
});
