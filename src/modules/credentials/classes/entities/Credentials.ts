import { CredentialDatabase } from "@/modules/credentials/classes/CredentialDatabase";
import { useCredentialStore } from "@/modules/credentials/store/credentialStore";
import type { ICredential, SearchObject } from "@/modules/credentials/types";
import { v4 as uuidv4 } from "uuid";

export class Credential {
  public static get(searchObject?: SearchObject): ICredential[] {
    let items = useCredentialStore().credentialDatabase.credentials;

    if (searchObject) {
      Object.entries(searchObject).forEach(([key, value]) => {
        items = items.filter(
          (item) => item[key as keyof ICredential] === value
        );
      });
    }

    return items;
  }

  public static async add(item: Omit<ICredential, "id">): Promise<void> {
    useCredentialStore().credentialDatabase.credentials.push({
      id: uuidv4(),
      ...item,
    });

    await this.save();
  }

  public static async update(credential: ICredential): Promise<void> {
    const found = useCredentialStore().credentialDatabase.credentials.find(
      (item) => item.id === credential.id
    );

    if (!found) {
      throw new Error(`Credential with id '${credential.id}' not found`);
    }

    Object.assign(found, credential);

    await this.save();
  }

  public static async delete(id: string): Promise<void> {
    const index = useCredentialStore().credentialDatabase.credentials.findIndex(
      (item) => item.id === id
    );

    if (index > -1) {
      useCredentialStore().credentialDatabase.credentials.splice(index, 1);
    }

    await this.save();
  }

  public static async save(): Promise<void> {
    await CredentialDatabase.save();
  }
}
