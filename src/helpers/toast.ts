import type { ToastConfig } from "@/types/toasts";
import { ToastType } from "@/types/toasts";
import type { ExtendedDocument } from "@/types/document";
import { lang } from "@/lang";

export const showToast = (toastConfig: ToastConfig): void => {
  const { type, text } = toastConfig;

  const config: any = {
    // TODO: Refactor any with primevue type for toast config;
    severity: type,
    detail: text,
    life: 400,
  };

  if (type === ToastType.Error) {
    config.summary = lang.title.error;
  }

  (document as ExtendedDocument).$toast.add(config);
};

export const setGlobalToastObject = (toast: any): void => {
  (document as ExtendedDocument).$toast = toast;
};
