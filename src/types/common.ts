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
  sourceObjectFieldId?: string;
  defaultSort?: boolean;
  defaultSortOrder?: -1 | 1;
  sortable?: boolean;
  filterable?: boolean;
}

export type DrawerConfig = FieldConfig[];

export interface ObjectConfig {
  databaseId: string;
  objectId: string;
  fields: FieldConfig[];
}

export interface Instance {
  id: string;
  linkedInstance?: Record<string, Instance>; // Key is objectId here.
  [key: string]: any;
}
