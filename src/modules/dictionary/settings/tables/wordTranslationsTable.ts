import type { UniversalTableColumn } from "@/types/tables";
import UniversalIcon from "@/components/icons/UniversalIcon.vue";

export const wordTranslationsTable: UniversalTableColumn[] = [
  {
    name: "id",
    label: "Id",
    hidden: true,
  },
  {
    name: "title",
    label: "Name",
    defaultSort: true,
    defaultSortOrder: 1,
    sortable: true,
    filterable: true,
  },
  {
    name: "language.name",
    label: "Language",
    sortable: true,
    filterable: true,
  },
  {
    name: "actions",
    label: "Actions",
    hiddenLabel: true,
    getComponents: ({ value, emit, item }) => [
      {
        component: UniversalIcon,
        props: {
          primeIcon: "link",
          link: true,
          size: "0.85rem",
          linkTextStyle: {
            fontSize: "0.8rem",
            fontWeight: "bold",
          },
          onClick: () => {
            return emit("click:link", item);
          },
        },
      },
      {
        component: UniversalIcon,
        props: {
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
];
