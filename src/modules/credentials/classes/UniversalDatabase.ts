import Api from "@/api/Api";
import { apiPaths } from "@/settings/api";
import { AES, enc } from "crypto-js";
import { LocalStorageKeys } from "@/settings/app";
import { cloneDeep } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { RequestMethods } from "@/types/api";
import { showToast } from "@/helpers/toast";
import { ToastType } from "@/types/toasts";
import { lang } from "@/lang";
import { useUniversalDatabaseStore } from "@/store/universalDatabaseStore";
import type { IUniversalDatabaseApi } from "@/modules/credentials/types";

export class UniversalDatabase {
  public static get(databaseId: string) {
    return useUniversalDatabaseStore().getDatabase(databaseId);
  }

  public static async save(databaseId: string): Promise<void> {
    const database = cloneDeep(
      useUniversalDatabaseStore().getDatabase(databaseId)
    );

    if (!database) {
      throw new Error(`Database with id ${databaseId} not found`);
    }

    database.serverTransactionId = database.clientTransactionId;
    database.clientTransactionId = uuidv4();
    database.updated = new Date().toISOString();

    const databaseData = database.encrypted
      ? {
          ...database,
          data: this.encryptDatabase(
            JSON.stringify(database.data),
            this.getSecretKey()
          ),
        }
      : database;

    //database.data = {};

    console.log("SAVED DATABASE DATA", database.data);

    const data = JSON.stringify(databaseData);

    await Api.request({
      path: `${apiPaths.fileStorage}/${databaseId}`,
      method: RequestMethods.Put,
      payload: { data },
    });
  }

  public static async load(
    databaseId: string,
    secretKey?: string
  ): Promise<void> {
    const databaseApi: IUniversalDatabaseApi | null =
      (await Api.request({
        path: `${apiPaths.fileStorage}/${databaseId}`,
      })) ?? null;

    if (!databaseApi) {
      this.unload(databaseId);
      return;
    }

    secretKey =
      secretKey ??
      localStorage.getItem(LocalStorageKeys.CredentialDatabaseKey) ??
      undefined;

    // TODO Use dedicated secret key for each database?
    if (!secretKey) {
      throw new Error("Secret key is not defined");
    }

    try {
      // TODO Test encrypted case.
      const decryptedData = databaseApi.encrypted
        ? JSON.stringify(this.decryptDatabase(databaseApi.data, secretKey))
        : databaseApi.data;

      useUniversalDatabaseStore().updateDatabase(databaseId, {
        ...databaseApi,
        data: decryptedData,
      });
    } catch (e) {
      console.error(e);
      throw new Error("Cannot decrypt data with this secret key");
    }
  }

  public static unload = (databaseId: string) => {
    useUniversalDatabaseStore().unloadDatabase(databaseId);
  };

  private static getSecretKey = (): string => {
    const secretKey = localStorage.getItem(
      LocalStorageKeys.CredentialDatabaseKey
    );

    if (!secretKey) {
      showToast({
        type: ToastType.Error,
        text: lang.error.secretKeyIsNotDefined,
      });

      throw new Error("Secret key is not defined");
    }

    return secretKey;
  };

  private static encryptDatabase(text: string, key: string): string {
    return AES.encrypt(text, key).toString();
  }

  private static decryptDatabase(text: string, key: string): string {
    const bytes = AES.decrypt(text, key);
    return bytes.toString(enc.Utf8);
  }
}
