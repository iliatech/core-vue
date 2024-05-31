import type { UniversalTableColumn } from "@/types/tables";
import UniversalIcon from "@/components/icons/UniversalIcon.vue";

export const credentialTypeTableConfig: UniversalTableColumn[] = [
  {
    name: "id",
    label: "Id",
    hidden: true,
  },
  {
    name: "name",
    label: "Name",
    defaultSort: true,
    defaultSortOrder: 1,
    sortable: true,
    filterable: true,
  },
  {
    name: "actions",
    label: "Actions",
    getComponents: ({ value, emit, item }) => [
      {
        component: UniversalIcon,
        props: {
          onClick: () => {
            console.log("I", item);
            emit("my:event", item);
          },
        },
      },
    ],
  },
];
