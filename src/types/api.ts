export enum RequestMethods {
  Get = "get",
  Post = "post",
  Put = "put",
  Patch = "patch",
  Delete = "delete",
}

export interface RequestConfig {
  path: string;
  method?: RequestMethods;
  payload?: unknown;
  successToast?: string;
  successCallback?: any;
  isDataResult?: boolean;
  withoutLoader?: boolean;
}
