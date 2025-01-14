import { defineStore } from "pinia";
import type { Ref } from "vue";
import { computed, reactive, ref } from "vue";
import type { AuthUser, AuthUserConfig } from "@/types/user";
import Api from "@/api/Api";
import { apiPaths } from "@/settings/api";
import { authorizedUserField, initialUserConfig } from "@/settings/auth";
import type { RegisteredError } from "@/types/errors";
import type {
  SystemApp,
  SystemField,
  PageMessage,
  PagesMessages,
} from "@/types/common";

export const useAppStore = defineStore("appStore", () => {
  const configurableApps: Ref<SystemApp[]> = ref([]);
  const isLoading: Ref<boolean> = ref(false);
  const isPersistentLoading: Ref<boolean> = ref(false);
  const user = ref<AuthUser | null>(null);
  const globalError = ref<RegisteredError | undefined>();
  const pagesMessages = reactive<PagesMessages>({
    login: [],
    restorePassword: [],
    changePassword: [],
  });

  const authUserConfig = ref<AuthUserConfig>(initialUserConfig);

  const configurableFields = ref<SystemField[]>([]);

  const isAuthorized = computed(() => !!user.value);

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

  const setGlobalError = (value: RegisteredError | undefined) => {
    globalError.value = value;
  };

  const updatePageMessages = (
    pageName: keyof PagesMessages,
    messages: PageMessage[]
  ) => {
    pagesMessages[pageName] = messages;
  };

  const loadSystemApps = async () => {
    // configurableApps.value = await Api.request({
    //   path: `${apiPaths.universalObject}/apps`,
    // });
  };

  const setSystemApps = (apps: SystemApp[]) => {
    configurableApps.value = apps;
  };

  const loadSystemFields = async () => {
    configurableFields.value = await Api.request({
      path: `${apiPaths.universalObject}/fields`,
    });
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
    setGlobalError,
    startLoading,
    stopLoading,
    startPersistentLoading,
    stopPersistentLoading,
    updateAuthUser,
    updatePageMessages,
    loadSystemApps,
    loadSystemFields,
    setSystemApps,
  };
});
