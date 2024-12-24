import type { UniversalTableColumn } from "@/types/tables";
import UniversalIcon from "@/components/icons/UniversalIcon.vue";
import { FieldsTypes } from "@/types/common";

export const standardActionColumn: UniversalTableColumn = {
  id: "actions",
  label: "Actions",
  hiddenLabel: true,
  getComponents: ({ value, emit, item, objectConfig }) => [
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
    ...(() => {
      if (!objectConfig.find((field) => field.type === FieldsTypes.Order)) {
        return [];
      }

      return [
        {
          component: UniversalIcon,
          props: {
            primeIcon: "arrow-up",
            link: true,
            size: "0.85rem",
            linkTextStyle: {
              fontSize: "0.8rem",
              fontWeight: "bold",
            },
            onClick: () => {
              return emit("click:order-up", item, objectConfig);
            },
          },
        },
        {
          component: UniversalIcon,
          props: {
            primeIcon: "arrow-down",
            link: true,
            size: "0.85rem",
            linkTextStyle: {
              fontSize: "0.8rem",
              fontWeight: "bold",
            },
            onClick: () => {
              return emit("click:order-down", item, objectConfig);
            },
          },
        },
      ];
    })(),
  ],
};

export const idColumn = {
  id: "id",
  label: "Id",
  hidden: true,
};
