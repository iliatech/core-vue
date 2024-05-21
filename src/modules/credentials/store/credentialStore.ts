import { defineStore } from "pinia";
import type { ICredentialDatabase } from "@/modules/credentials/types/database";
import { reactive } from "vue";

export const useCredentialStore = defineStore("credentialStore", () => {
  const credentialDatabase = reactive<ICredentialDatabase>({
    uuid: "",
    updated: "",
    credentials: [],
    credentialTypes: [],
  });

  const updateCredentialDatabase = (database: ICredentialDatabase) => {
    Object.assign(credentialDatabase, database);
  };

  return {
    credentialDatabase,
    updateCredentialDatabase,
  };
});
