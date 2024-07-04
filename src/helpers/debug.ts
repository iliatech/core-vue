import { NodeMode } from "@/settings/app";

export const debugInfo = (...args: any[]) => {
  if (process.env.NODE_ENV === NodeMode.Development) {
    console.log(...args);
  }
};
