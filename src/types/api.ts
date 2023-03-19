export enum RequestMethods {
  Get = "Get",
  Post = "post",
  Put = "put",
  Patch = "patch",
  Delete = "delete",
}

export enum RequestResults {
  Success = "success",
}

export interface RequestConfig {
  path: string;
  method?: RequestMethods;
  payload?: unknown;
  toast?: any;
  successToast?: string;
  successCallback?: any;
}
