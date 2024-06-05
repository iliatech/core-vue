import { CredentialDatabase } from "@/modules/credentials/classes/CredentialDatabase";
import { useCredentialStore } from "@/modules/credentials/store/credentialStore";
import { v4 as uuidv4 } from "uuid";
import type { ICredentialType } from "@/modules/credentials/types";

type SearchObject = Record<
  string,
  string | number | boolean | undefined | null
>;

export class CredentialType {
  public static get(searchObject?: SearchObject): ICredentialType[] {
    let items = useCredentialStore().credentialDatabase.credentialTypes;

    if (searchObject) {
      Object.entries(searchObject).forEach(([key, value]) => {
        items = items.filter(
          (item) => item[key as keyof ICredentialType] === value
        );
      });
    }

    return items;
  }

  public static async add(item: Omit<ICredentialType, "id">): Promise<void> {
    useCredentialStore().credentialDatabase.credentialTypes.push({
      id: uuidv4(),
      ...item,
    });

    await this.save();
  }

  public static async update(credentialType: ICredentialType): Promise<void> {
    const found = useCredentialStore().credentialDatabase.credentialTypes.find(
      (item) => item.id === credentialType.id
    );

    if (!found) {
      throw new Error(
        `Credential type with id '${credentialType.id}' not found`
      );
    }

    Object.assign(found, credentialType);

    await this.save();
  }

  public static async delete(id: string): Promise<void> {
    const index =
      useCredentialStore().credentialDatabase.credentialTypes.findIndex(
        (item) => item.name === id
      );

    if (index > -1) {
      useCredentialStore().credentialDatabase.credentialTypes.splice(index, 1);
    }

    await this.save();
  }

  public static async save(): Promise<void> {
    await CredentialDatabase.save();
  }
}
