import type {
  ICredential,
  ICredentialType,
} from "@/modules/credentials/types/entities";

export interface ICredentialDatabase {
  uuid: string;
  updated: string;
  credentials: ICredential[];
  credentialTypes: ICredentialType[];
}
