import type { UniversalTableColumn } from "@/types/tables";

export type UniversalFilter = Pick<UniversalTableColumn, "id" | "label">;

export type UniversalFilterValues = Record<string, string>;
