import type { TableConfig } from "@/types/tables";
import UniversalIcon from "@/components/icons/UniversalIcon.vue";

import { UniversalObjectsIds } from "@/universal/enums";
import { drawersConfigs } from "@/universal/drawersConfigs";

export const tablesConfigs: Record<string, TableConfig> = {
  [UniversalObjectsIds.Verbs]: [
    {
      id: "id",
      label: "Id",
      hidden: true,
    },
    ...drawersConfigs[UniversalObjectsIds.Verbs],
    // {
    //   id: "a1334c91-bade-46ba-92e1-87a9cc4321a3",
    //   // TODO Link instance.
    //   linkedObjectId: UniversalObjectsIds.CredentialsTypes,
    //   linkedObjectFieldId: "7beefc42-7fd7-4322-b9a8-c48bad098f01",
    //   label: "Type",
    //   filterable: true,
    // },
    // {
    //   id: "password",
    //   label: "Password",
    //   getComponents: ({ value }) => [
    //     {
    //       component: UniversalPassword,
    //       props: {
    //         value: value,
    //         entityLabel: "Password",
    //       },
    //     },
    //   ],
    // },
    {
      id: "actions",
      label: "Actions",
      hiddenLabel: true,
      getComponents: ({ value, emit, item }) => [
        {
          component: UniversalIcon,
          props: {
            label: "Edit",
            primeIcon: "pencil",
            link: true,
            size: "0.85rem",
            linkTextStyle: {
              fontSize: "0.8rem",
              fontWeight: "bold",
            },
            onClick: () => {
              return emit("click:edit-item", item);
            },
          },
        },
        {
          component: UniversalIcon,
          props: {
            label: "Delete",
            primeIcon: "trash",
            link: true,
            size: "0.85rem",
            linkTextStyle: {
              fontSize: "0.8rem",
              fontWeight: "bold",
            },
            onClick: () => {
              return emit("click:delete-item", item);
            },
          },
        },
      ],
    },
  ],
  [UniversalObjectsIds.VerbsForms]: [
    {
      id: "id",
      label: "Id",
      hidden: true,
    },
    ...drawersConfigs[UniversalObjectsIds.VerbsForms],
    {
      id: "actions",
      label: "Actions",
      hiddenLabel: true,
      getComponents: ({ value, emit, item }) => [
        {
          component: UniversalIcon,
          props: {
            label: "Edit",
            primeIcon: "pencil",
            link: true,
            size: "0.85rem",
            linkTextStyle: {
              fontSize: "0.8rem",
              fontWeight: "bold",
            },
            onClick: () => {
              return emit("click:edit-item", item);
            },
          },
        },
        {
          component: UniversalIcon,
          props: {
            label: "Delete",
            primeIcon: "trash",
            link: true,
            size: "0.85rem",
            linkTextStyle: {
              fontSize: "0.8rem",
              fontWeight: "bold",
            },
            onClick: () => {
              return emit("click:delete-item", item);
            },
          },
        },
      ],
    },
  ],
};
