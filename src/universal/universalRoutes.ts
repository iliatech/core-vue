import { lang } from "@/lang";
import { UniversalObjectsIds } from "@/universal/enums";

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

export const mapUniversalRoutes = () => {
  return universalRoutes.map((universalRoute) => {
    return {
      path: `/${universalRoute.name}`,
      name: universalRoute.name,
      component: () => import("@/views/UniversalTabsView.vue"),
      props: {
        tabsRoutes: (universalRoute.children ?? []).map((item) => ({
          ...item,
          name: `${universalRoute.name}.${item.name}`,
        })),
      },
      meta: {
        title: lang.title.learnEspanol,
      },
      children: (universalRoute.children ?? []).map((child) => {
        return {
          path: child.name,
          component: () =>
            import("@/components/super/UniversalRepresentation.vue"),
          name: `${universalRoute.name}.${child.name}`,
          props: {
            objectId: child.objectId,
          },
        };
      }),
    };
  });
};
