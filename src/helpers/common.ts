import type { AuthorizedUser } from "@/types/user";

export const fullUserName = (user?: AuthorizedUser | null) => {
  return `${user?.firstName} ${user?.lastName}`;
};
