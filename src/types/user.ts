export interface AuthUserConfig {
  acl: {
    topMenu: string[];
  };
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
