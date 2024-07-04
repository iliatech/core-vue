import type { UniversalTableColumn } from "@/types/tables";

export type UniversalFilter = Pick<UniversalTableColumn, "name" | "label">;

export type UniversalFilterValues = Record<string, string>;
