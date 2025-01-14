import Api from "@/api/Api";
import { apiPaths } from "@/settings/api";
import { AES, enc } from "crypto-js";
import { debugInfo } from "@/helpers/debug";
import { LocalStorageKeys } from "@/settings/app";
import { useCredentialStore } from "@/modules/credentials/store/credentialStore";
import { cloneDeep } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { RequestMethods } from "@/types/api";
import { showToast } from "@/helpers/toast";
import { ToastType } from "@/types/toasts";
import { lang } from "@/lang";

export class CredentialDatabase {
  public static async save(): Promise<void> {
    const database = cloneDeep(useCredentialStore().credentialDatabase);
    database.uuid = uuidv4();
    database.updated = new Date().toISOString();

    const encryptedData = this.encryptDatabase(
      JSON.stringify(database),
      this.getSecretKey()
    );

    const { fileId } = useCredentialStore();

    await Api.request({
      path: `${apiPaths.fileStorage}/${fileId}`,
      method: RequestMethods.Put,
      payload: { data: encryptedData },
    });
  }

  public static async load(secretKey?: string): Promise<void> {
    const file = await Api.request({
      path: apiPaths.authUserFileByType,
    });

    if (!file) {
      CredentialDatabase.unload();
      return;
    }

    useCredentialStore().updateFileId(file.id);

    secretKey =
      secretKey ??
      localStorage.getItem(LocalStorageKeys.CredentialDatabaseKey) ??
      undefined;

    if (!secretKey) {
      throw new Error("Secret key is not defined");
    }

    try {
      const decryptedData = this.decryptDatabase(file.data, secretKey);
      const parsedAndDecryptedData = await JSON.parse(decryptedData);

      debugInfo("CURRENT DATA", parsedAndDecryptedData);

      useCredentialStore().updateCredentialDatabase(parsedAndDecryptedData);
    } catch {
      throw new Error("Cannot decrypt data with this secret key");
    }
  }

  public static unload = () => {
    useCredentialStore().unloadCredentialDatabase();
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
