import type { ToastConfig } from "@/types/toasts";

export const showToast = (toast: any, configType: ToastConfig): void => {
  const { type, text } = configType;
  toast.add({
    severity: type,
    summary: "",
    detail: text,
    life: 3000,
  });
};
