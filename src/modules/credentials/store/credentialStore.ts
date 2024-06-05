import { defineStore } from "pinia";
import { reactive } from "vue";
import type { ICredentialDatabase } from "@/modules/credentials/types";

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
