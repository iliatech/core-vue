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

export const mapUniversalRoutes = (apps: SystemApp[]) => {
  return apps.map((app) => {
    return {
      path: `/${app.url}`,
      name: app.url,
      component: () => import("@/views/UniversalTabsView.vue"),
      props: {
        tabs: (app.objects ?? []).map((item) => ({
          ...item,
          name: `${app.url}.${item.url}`,
        })),
      },
      meta: {
        title: lang.title.learnEspanol,
      },
      children: (app.objects ?? []).map((child) => {
        return {
          path: child.url,
          component: () =>
            import("@/components/super/UniversalRepresentation.vue"),
          name: `${app.url}.${child.url}`,
          props: {
            objectId: child.id,
          },
        };
      }),
    };
  });
};
