import type { UniversalTableColumn } from "@/types/tables";
import UniversalIcon from "@/components/icons/UniversalIcon.vue";

export const credentialTypesTable: UniversalTableColumn[] = [
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
    name: "credentialsNumber",
    label: "Linked Credentials Number",
    defaultSort: true,
    defaultSortOrder: 1,
    sortable: true,
  },
  {
    name: "description",
    label: "Description",
  },
  {
    name: "actions",
    label: "Actions",
    getComponents: ({ value, emit, item }) => [
      {
        component: UniversalIcon,
        props: {
          label: "edit",
          primeIcon: "pencil",
          link: true,
          onClick: () => {
            return emit("click:edit-item", item);
          },
        },
      },
      {
        component: UniversalIcon,
        props: {
          label: "delete",
          primeIcon: "trash",
          link: true,
          disabled: !!item.credentialsNumber,
          onClick: !item.credentialsNumber
            ? () => {
                return emit("click:delete-item", item);
              }
            : null,
        },
      },
    ],
  },
];
