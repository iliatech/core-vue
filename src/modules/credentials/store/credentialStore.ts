import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import type { ICredentialDatabase } from "@/types/universalDatabase";
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

  const fileId = ref();

  const updateCredentialDatabase = (database: ICredentialDatabase) => {
    Object.assign(credentialDatabase, database);
  };

  const updateFileId = (id: string) => {
    fileId.value = id;
  };

  const unloadCredentialDatabase = () => {
    Object.assign(credentialDatabase, cloneDeep(initialDatabaseState));
    fileId.value = undefined;
  };

  return {
    credentialDatabase,
    fileId,
    updateCredentialDatabase,
    unloadCredentialDatabase,
    updateFileId,
  };
});
