export enum ToastType {
  Success = "success",
  Info = "info",
  Error = "error",
}

export interface ToastConfig {
  type: ToastType;
  text: string;
}
