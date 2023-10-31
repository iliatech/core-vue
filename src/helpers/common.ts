import type { AuthorizedUser } from "@/types/user";

export const fullUserName = (user?: AuthorizedUser) => {
  return `${user?.firstName} ${user?.lastName}`;
};
