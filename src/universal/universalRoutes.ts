import { lang } from "@/lang";
import { UniversalObjectsIds } from "@/universal/enums";
import type { SystemApp } from "@/types/common";

export interface UniversalRoute {
  name: string;
  title?: string;
  tabTitle?: string;
  children?: UniversalRoute[];
  objectId?: string;
}

export const universalRoutes: UniversalRoute[] = [
  {
    name: "learn-espanol",
    children: [
      {
        name: "verbs",
        title: "Español",
        tabTitle: "Verbs",
        objectId: UniversalObjectsIds.Verbs,
      },
      {
        name: "verbs-forms",
        title: "Verbs Forms",
        objectId: UniversalObjectsIds.VerbsForms,
      },
      {
        name: "verbs-pronombres",
        title: "Verbs Pronombres",
        objectId: UniversalObjectsIds.VerbsPronombres,
      },
    ],
  },
];

export const mapUniversalRoutes = (appsArray: SystemApp[]) => {
  return appsArray.map((universalRoute) => {
    return {
      path: `/${universalRoute.url}`,
      name: universalRoute.url,
      component: () => import("@/views/UniversalTabsView.vue"),
      props: {
        tabsRoutes: (universalRoute.objects ?? []).map((item) => ({
          ...item,
          name: `${universalRoute.url}.${item.url}`,
        })),
      },
      meta: {
        title: lang.title.learnEspanol,
      },
      children: (universalRoute.objects ?? []).map((child) => {
        return {
          path: child.url,
          component: () =>
            import("@/components/super/UniversalRepresentation.vue"),
          name: `${universalRoute.url}.${child.url}`,
          props: {
            objectId: child.id,
          },
        };
      }),
    };
  });
};
