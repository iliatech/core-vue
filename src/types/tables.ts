import type { Component } from "vue";
import type { ICredentialTypesTableItem } from "@/modules/credentials/types";
import type { UniversalObjectsIds } from "@/universal/enums";
import type { FieldConfig, Instance } from "@/types/common";

export interface UniversalTableCellComponentProp {
  component: Component;
  props: Record<string, any>;
}

export interface UniversalTableColumn {
  id: string; // Field name. Normally it's uuid of field.
  label: string;
  hiddenLabel?: boolean;
  defaultSort?: boolean;
  defaultSortOrder?: -1 | 1;
  sortable?: boolean;
  hidden?: boolean;
  filterable?: boolean;
  linkedObjectId?: UniversalObjectsIds;
  linkedObjectFieldId?: string;
  getComponents?: (props: {
    value: any;
    item: Instance;
    emit: any;
    index: number;
    fieldConfig: FieldConfig;
    objectConfig: FieldConfig[];
  }) => UniversalTableCellComponentProp[];
}

export type TableConfig = UniversalTableColumn[];
