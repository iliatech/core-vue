import type { ICredential, SearchObject } from "@/modules/credentials/types";
import { useCredentialStore } from "@/modules/credentials/store/credentialStore";
import { universalObjects } from "@/settings/entities";

export class UniversalObject {
  public static list(
    universalObjectId: string,
    searchObject?: SearchObject
  ): ICredential[] {
    const universalObject = universalObjects.find((item) => {
      item.id === universalObjectId;
    });

    if (!universalObject) {
      throw new Error(
        `Universal object with id ${universalObjectId} not found`
      );
    }

    // TODO
    let items = useCredentialStore().getUniversalObjectItems(universalObjectId);

    if (searchObject) {
      Object.entries(searchObject).forEach(([key, value]) => {
        items = items.filter((item: any) => item[key] === value);
      });
    }

    return items;
  }
}
