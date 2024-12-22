import type { UniversalTableColumn } from "@/types/tables";
import UniversalIcon from "@/components/icons/UniversalIcon.vue";

export const standardActionColumn: UniversalTableColumn = {
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
};

export const idColumn = {
  id: "id",
  label: "Id",
  hidden: true,
};
