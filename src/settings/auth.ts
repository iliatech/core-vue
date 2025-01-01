import type { AuthUserConfig } from "@/types/user";

export const jwtTokenField = "jwt";

export const authorizedUserField = "authorized_user";

export const initialUserConfig: AuthUserConfig = {
  acl: {
    topMenu: [],
  },
};
