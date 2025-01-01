import type { UniversalTableColumn } from "@/types/tables";

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
  tabTitle?: string;
  parentRouteName?: string;
}

export enum FieldsTypes {
  Id = "id",
  Order = "order",
  Password = "password",
  Selector = "selector",
  String = "string",
  Text = "text",
  Actions = "actions",
}

export const noDrawerFieldsTypes = [FieldsTypes.Id, FieldsTypes.Actions];

export interface FieldConfig extends UniversalTableColumn {
  id: string;
  type: FieldsTypes;
  selectorFilter?: {
    fieldId: string;
    value: string | number | boolean;
  };
  label?: string;
  required?: boolean;
  linkedObjectFieldId?: string;
  linkedObjectId?: string;
  defaultSort?: boolean;
  defaultSortOrder?: -1 | 1;
  sortable?: boolean;
  filterable?: boolean;
}

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
