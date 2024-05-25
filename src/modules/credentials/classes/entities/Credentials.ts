import type { ICredential } from "@/modules/credentials/types/entities";
import { CredentialDatabase } from "@/modules/credentials/classes/CredentialDatabase";
import { useCredentialStore } from "@/modules/credentials/store/credentialStore";

export class Credential {
  public static get(): ICredential[] {
    return useCredentialStore().credentialDatabase.credentials;
  }

  public static async save(): Promise<void> {
    await CredentialDatabase.save();
  }
}
