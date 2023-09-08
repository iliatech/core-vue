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
  toast?: any;
  successToast?: string;
  successCallback?: any;
}

export interface ApiLoginResponse {
  jwt: string;
}

export interface ApiLoginRequest {
  password: string;
  email: string;
}

export interface ApiUserResponse {
  created_at: string;
  email: string;
  email_verified_at: string | null;
  id: number;
  name: string;
  updated_at: string;
}
