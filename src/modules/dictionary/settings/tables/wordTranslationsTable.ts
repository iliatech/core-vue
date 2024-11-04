import type { UniversalTableColumn } from "@/types/tables";
import UniversalIcon from "@/components/icons/UniversalIcon.vue";
import IconLibrary from "@/components/icons/IconLibrary.vue";

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
        component: IconLibrary,
        props: {
          icon: "linkA",
          width: "13px",
          height: "13px",
          link: true,
          onClick: () => {
            return emit("click:link", item);
          },
        },
      },
      {
        component: IconLibrary,
        props: {
          icon: "unlinkB",
          link: true,
          onClick: () => {
            return emit("click:unlink", item);
          },
        },
      },
    ],
  },
];
