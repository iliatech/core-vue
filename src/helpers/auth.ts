import { jwtTokenField } from "@/settings/auth";

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
