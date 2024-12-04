export interface NavigationItem {
  label: string;
  name: string;
  parentRouteName?: string;
}

export interface ApiValidationError {
  path: string | undefined;
  type?: string;
  value?: string;
  msg?: string;
  location?: string;
  customMessage?: string;
}

export interface PageMessage {
  text: string;
  color: "green" | "red";
}

export interface PagesMessages {
  login: PageMessage[];
  restorePassword: PageMessage[];
  changePassword: PageMessage[];
}

export interface LocalRoute {
  path: string;
  name: string;
  title: string;
  parentRouteName?: string;
}

export enum FieldsTypes {
  Id = "id",
  Password = "password",
  String = "string",
  Text = "text",
  Selector = "selector",
}

export interface FieldConfig {
  id: string;
  type: FieldsTypes;
  label?: string;
  required?: boolean;
  sourceObjectId?: string;
}

export interface ObjectConfig {
  id: string;
  fields: FieldConfig[];
}
