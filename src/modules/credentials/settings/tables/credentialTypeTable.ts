import type { UniversalTableColumn } from "@/types/tables";

export const credentialTypeTable: UniversalTableColumn[] = [
  {
    name: "name",
    label: "ID",
    hidden: true,
  },
  {
    name: "label",
    label: "Type name",
    defaultSort: true,
    defaultSortOrder: 1,
    sortable: true,
    filterable: true,
  },
];
