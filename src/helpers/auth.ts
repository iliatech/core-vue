import { authorizedUserField, jwtTokenField } from "@/settings/auth";
import type { AuthorizedUser } from "@/types/user";

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

export const saveAuthUser = (user: AuthorizedUser) => {
  const userString = JSON.stringify(user);
  if (userString) {
    localStorage.setItem(authorizedUserField, userString);
  }
};

export const getAuthUser = (): AuthorizedUser | undefined => {
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
