import { routes } from "@/settings/routes";
import type { LocalRoute, NavigationItem } from "@/types/common";

export const generateAvailableAppsList = (): NavigationItem[] => {
  const items: NavigationItem[] = [];

  // TODO It's hardcoded now. Alternatively let's use it from user settings.
  const routeNames = ["schedule", "words", "credentialsCredentials"];

  routeNames.forEach((name) => {
    const route = routes[name];

    items.push({
      name: route.name,
      label: route.title,
    });
  });

  return items;
};

export const getRoute = (name: string): LocalRoute | null => {
  return (
    Object.values(routes).find((item: LocalRoute) => item.name === name) ?? null
  );
};
