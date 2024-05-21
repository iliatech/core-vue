import type { ICredentialType } from "@/modules/credentials/types/entities";
import { CredentialDatabase } from "@/modules/credentials/classes/CredentialDatabase";
import { useCredentialStore } from "@/modules/credentials/store/credentialStore";

export class CredentialType {
  public static get(): ICredentialType[] {
    return useCredentialStore().credentialDatabase.credentialTypes;
  }

  public static save(): void {
    CredentialDatabase.save();
  }
}
