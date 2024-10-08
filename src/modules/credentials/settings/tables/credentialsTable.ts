import type { UniversalTableColumn } from "@/types/tables";
import UniversalIcon from "@/components/icons/UniversalIcon.vue";
import UniversalPassword from "@/components/fields/UniversalPassword.vue";

export const credentialsTable: UniversalTableColumn[] = [
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
    name: "type.name",
    label: "Type",
    filterable: true,
  },
  {
    name: "description",
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
];
