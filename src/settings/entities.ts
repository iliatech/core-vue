import type { ConfigurationObject, FieldConfig } from "@/types/common";
import { idColumn, standardActionColumn } from "@/universal/standardColumns";

export const getDrawerConfigByObject = (
  object: ConfigurationObject
): FieldConfig[] => {
  return [idColumn, ...object.fields, standardActionColumn];
};

export const getTableConfigByObject = (
  object: ConfigurationObject
): FieldConfig[] => {
  return [idColumn, ...object.fields, standardActionColumn];
};
