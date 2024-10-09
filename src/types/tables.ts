import type { Component } from "vue";
import type { ICredentialTypesTableItem } from "@/modules/credentials/types";

export interface UniversalTableCellComponentProp {
  component: Component;
  props: Record<string, any>;
}

export interface UniversalTableColumn {
  name: string;
  label: string;
  hiddenLabel?: boolean;
  defaultSort?: boolean;
  defaultSortOrder?: -1 | 1;
  sortable?: boolean;
  hidden?: boolean;
  filterable?: boolean;
  getComponents?: (props: {
    value: any;
    item: ICredentialTypesTableItem;
    emit: any;
    index: number;
  }) => UniversalTableCellComponentProp[];
}
