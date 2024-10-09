export interface NavigationItem {
  label: string;
  name: string;
  parentRouteName?: string;
}

export interface ApiValidationError {
  path: string;
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
