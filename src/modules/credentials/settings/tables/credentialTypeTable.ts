import type { BaseTableColumn } from "@/types/tables";

export const credentialTypeTable: BaseTableColumn[] = [
  {
    name: "name",
    label: "ID",
    hidden: true,
  },
  {
    name: "label",
    label: "Name",
    defaultSort: true,
    defaultSortOrder: 1,
    sortable: true,
  },
];
