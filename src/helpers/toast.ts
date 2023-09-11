import type { ToastConfig } from "@/types/toasts";
import type { ExtendedDocument } from "@/types/document";

export const showToast = (configType: ToastConfig): void => {
  const { type, text } = configType;
  (document as ExtendedDocument).$toast.add({
    severity: type,
    detail: text,
    life: 2000,
  });
};

export const setGlobalToastObject = (toast: any): void => {
  (document as ExtendedDocument).$toast = toast;
};
