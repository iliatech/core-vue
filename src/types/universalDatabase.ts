import type { UniversalDatabasesIds } from "@/universal/enums";
import type { Instance } from "@/types/common";

export type IUniversalDatabaseData = Record<string, Instance[]>;

export interface IUniversalDatabase {
  id: UniversalDatabasesIds;
  clientTransactionId: string;
  serverTransactionId: string;
  updated: string;
  data: IUniversalDatabaseData;
  encrypted?: boolean;
}

export interface IUniversalDatabaseApi
  extends Omit<IUniversalDatabase, "data"> {
  data: string;
}
