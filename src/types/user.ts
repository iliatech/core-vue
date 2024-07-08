export interface AuthUserScheduleConfig {
  title: string;
  defaultInputTimezoneName: string;
  dashboardTimezoneName: string;
}

export interface AuthUserConfig {
  acl: {
    topMenu: string[];
  };
  schedule: AuthUserScheduleConfig;
}

export interface AuthUser {
  createdAt: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  updatedAt: string;
  username: string;
  config: AuthUserConfig;
}
