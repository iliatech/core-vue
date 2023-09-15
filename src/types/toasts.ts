export enum ToastType {
  Success = "success",
  Info = "info",
  Error = "error",
  Warning = "warn",
}

export interface ToastConfig {
  type: ToastType;
  text: string;
}
