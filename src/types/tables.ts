import type { Component } from "vue";
import type { ICredentialTypesTableItem } from "@/modules/credentials/types";
import type { UniversalObjectsIds } from "@/universal/enums";

export interface UniversalTableCellComponentProp {
  component: Component;
  props: Record<string, any>;
}

export interface UniversalTableColumn {
  name: string; // Field name. Normally it's uuid of field.
  label: string;
  hiddenLabel?: boolean;
  defaultSort?: boolean;
  defaultSortOrder?: -1 | 1;
  sortable?: boolean;
  hidden?: boolean;
  filterable?: boolean;
  linkedObjectId?: UniversalObjectsIds;
  linkedFieldId?: string;
  getComponents?: (props: {
    value: any;
    item: ICredentialTypesTableItem;
    emit: any;
    index: number;
  }) => UniversalTableCellComponentProp[];
}

export type TableConfig = UniversalTableColumn[];
