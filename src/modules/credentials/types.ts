import type { UniversalDatabasesIds } from "@/universal/enums";

export type SearchObject = Record<
  string,
  string | number | boolean | undefined | null
>;

export interface ICredentialType {
  id: string;
  name: string;
  description: string;
}

export interface ICredential {
  id: string;
  name: string;
  typeId: string;
  description: string;
  password: string;
  // type: string;
  // u_field: string;
  // p_field: string;
  // comment: string;
}

export interface ICredentialDatabase {
  uuid: string;
  updated: string;
  credentials: ICredential[];
  credentialTypes: ICredentialType[];
}

export interface Instance {
  id: string;
  linkedInstance?: Record<string, Instance>; // Key is objectId here.
  [key: string]: any;
}

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

export interface ICredentialsTableItem extends ICredential {
  type: ICredentialType | null;
}

export interface ICredentialTypesTableItem extends ICredentialType {
  credentialsNumber: number;
}
