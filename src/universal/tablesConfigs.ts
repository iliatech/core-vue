import type { TableConfig } from "@/types/tables";
import UniversalIcon from "@/components/icons/UniversalIcon.vue";
import UniversalPassword from "@/components/fields/UniversalPassword.vue";

import { UniversalObjectsIds } from "@/universal/enums";

export const tablesConfigs: Record<string, TableConfig> = {
  [UniversalObjectsIds.Credentials]: [
    {
      name: "id",
      label: "Id",
      hidden: true,
    },
    {
      name: "7265b3a6-92e1-436e-bea1-7587b20f0459",
      label: "Name",
      defaultSort: true,
      defaultSortOrder: 1,
      sortable: true,
      filterable: true,
    },
    {
      name: "a1334c91-bade-46ba-92e1-87a9cc4321a3",
      // TODO Link instance.
      // linkedObjectId: UniversalObjectsIds.CredentialsTypes,
      // linkedFieldId: "6efe79d6-eb60-4e8b-b903-92a60325b294",
      linkedObjectId: UniversalObjectsIds.Credentials,
      linkedFieldId: "7265b3a6-92e1-436e-bea1-7587b20f0459",
      label: "Type",
      filterable: true,
    },
    {
      name: "70e5e4805-ab32-4062-8ac2-0b228a6f8faa",
      label: "Description",
      filterable: true,
    },
    {
      name: "password",
      label: "Password",
      getComponents: ({ value }) => [
        {
          component: UniversalPassword,
          props: {
            value: value,
            entityLabel: "Password",
          },
        },
      ],
    },
    {
      name: "actions",
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
  [UniversalObjectsIds.CredentialsTypes]: [
    {
      name: "id",
      label: "Id",
      hidden: true,
    },
    {
      name: "6efe79d6-eb60-4e8b-b903-92a60325b294",
      label: "Name",
      defaultSort: true,
      defaultSortOrder: 1,
      sortable: true,
      filterable: true,
    },
  ],
};
