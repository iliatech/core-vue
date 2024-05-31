import type { Component } from "vue";

export interface UniversalTableCellComponentProp {
  component: Component;
  props: Record<string, any>;
}

export interface UniversalTableColumn {
  name: string;
  label: string;
  defaultSort?: boolean;
  defaultSortOrder?: -1 | 1;
  sortable?: boolean;
  hidden?: boolean;
  filterable?: boolean;
  getComponents?: (props: {
    value: any;
    item: any;
    emit: any;
    index: number;
  }) => UniversalTableCellComponentProp[];
}
