import { defineStore } from "pinia";
import { reactive } from "vue";
import type { ICredentialDatabase } from "@/modules/credentials/types";
import { cloneDeep } from "lodash";

const initialDatabaseState = {
  uuid: "",
  updated: "",
  credentials: [],
  credentialTypes: [],
};

export const useCredentialStore = defineStore("credentialStore", () => {
  const credentialDatabase = reactive<ICredentialDatabase>(
    cloneDeep(initialDatabaseState)
  );

  const updateCredentialDatabase = (database: ICredentialDatabase) => {
    Object.assign(credentialDatabase, database);
  };

  const unloadCredentialDatabase = () => {
    Object.assign(credentialDatabase, cloneDeep(initialDatabaseState));
  };

  return {
    credentialDatabase,
    updateCredentialDatabase,
    unloadCredentialDatabase,
  };
});
