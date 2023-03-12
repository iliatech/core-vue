export enum RequestMethods {
  Get = "Get",
  Post = "post",
  Put = "put",
  Patch = "patch",
  Delete = "delete",
}

export interface RequestConfig {
  path: string;
  method?: RequestMethods;
  payload?: unknown;
}
