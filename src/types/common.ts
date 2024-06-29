export interface NavigationItem {
  label: string;
  name: string;
}

export interface ApiValidationError {
  path: string;
  type: string;
  value: string;
  msg: string;
  location: string;
}
