import { authorizedUserField, jwtTokenField } from "@/settings/auth";
import type { AuthUser } from "@/types/user";
import router from "@/router";
import { publicRouteNames, routes } from "@/settings/routes";
import { useAppStore } from "@/store/appStore";

export const saveAuthToken = (value: string) => {
  localStorage.setItem(jwtTokenField, value);
};

export const getAuthToken = (): string => {
  const token = localStorage.getItem(jwtTokenField);
  return token ?? "";
};

export const resetAuthToken = () => {
  localStorage.removeItem(jwtTokenField);
};

export const getAuthUser = (): AuthUser | undefined => {
  const userString = localStorage.getItem(authorizedUserField);
  if (!userString) {
    return undefined;
  }

  const user = JSON.parse(userString);

  return user ?? undefined;
};

export const resetAuthUser = () => {
  localStorage.removeItem(authorizedUserField);
};

export const resetAuthorization = async () => {
  const appStore = useAppStore();
  const { updateAuthUser } = appStore;

  resetAuthToken();
  resetAuthUser();
  updateAuthUser(null);
};
