import type { ToastConfig } from "@/types/toasts";
import type { ExtendedDocument } from "@/types/document";

export const showToast = (configType: ToastConfig): void => {
  const { type, text } = configType;
  (document as ExtendedDocument).$toast.add({
    severity: type,
    summary: "",
    detail: text,
    life: 3000,
  });
};

export const setGlobalToastObject = (toast: any): void => {
  (document as ExtendedDocument).$toast = toast;
};
