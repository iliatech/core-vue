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
  [key: string]: any;
}

export interface UniversalDatabase {
  id: string;
  lastTransactionId: string;
  updated: string;
  data: Record<string, Instance[]>;
}

export interface ICredentialsTableItem extends ICredential {
  type: ICredentialType | null;
}

export interface ICredentialTypesTableItem extends ICredentialType {
  credentialsNumber: number;
}
