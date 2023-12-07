import type { AuthUser } from "@/types/user";

export const fullUserName = (user?: AuthUser | null) => {
  return `${user?.firstName} ${user?.lastName}`;
};
