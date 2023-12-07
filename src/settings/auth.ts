import { TimeZoneName } from "@/settings/schedule";
import type { AuthUserConfig } from "@/types/user";
import langTitle from "@/lang/langTitle";

export const jwtTokenField = "jwt";

export const authorizedUserField = "authorized_user";

export const initialUserConfig: AuthUserConfig = {
  schedule: {
    title: langTitle.schedule,
    defaultInputTimezoneName: TimeZoneName.Esp,
    dashboardTimezoneName: TimeZoneName.Esp,
  },
};
