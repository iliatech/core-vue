export interface BaseTableColumn {
  name: string;
  label: string;
  defaultSort?: boolean;
  defaultSortOrder?: -1 | 1;
  sortable?: boolean;
  hidden?: boolean;
}
