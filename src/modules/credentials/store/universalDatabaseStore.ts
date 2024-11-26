import { defineStore } from "pinia";
import { ref } from "vue";
import type { Instance, UniversalDatabase } from "@/modules/credentials/types";
import { v4 as uuidv4 } from "uuid";

export const useUniversalDatabaseStore = defineStore(
  "universalDatabaseStore",
  () => {
    const databases = ref<UniversalDatabase[]>([
      {
        id: "50bda5a6-b1a0-4d73-b7db-301392037f87",
        lastTransactionId: "725a4700-7af6-42f2-a089-6a8524919953",
        updated: "", // TODO
        data: { "": [] },
      },
    ]);

    const getDatabase = (databaseId: string): UniversalDatabase | null => {
      return (
        databases.value.find((database) => database.id === databaseId) ?? null
      );
    };

    const getInstances = (params: {
      databaseId: string;
      objectId: string;
    }): Instance[] | null => {
      const database = getDatabase(params.databaseId);

      if (!database) {
        return null;
      }

      const instances = database.data[params.objectId];

      return instances ?? null;
    };

    const getInstanceById = (params: {
      databaseId: string;
      objectId: string;
      instanceId: string;
    }) => {
      const instances = getInstances(params);

      if (!instances) {
        return null;
      }

      return (
        instances.find((instance) => instance.id === params.instanceId) ?? null
      );
    };

    const addInstance = (
      params: { databaseId: string; objectId: string },
      instance: any
    ) => {
      const database = getDatabase(params.databaseId);

      if (!database) {
        return null;
      }

      if (!database.data[params.objectId]) {
        database.data[params.objectId] = [];
      }

      database.data[params.objectId].push({
        id: uuidv4(),
        ...instance,
      });
    };

    //
    // const fileId = ref();
    //
    // const updateCredentialDatabase = (database: ICredentialDatabase) => {
    //   Object.assign(credentialDatabase, database);
    // };
    //
    // const updateFileId = (id: string) => {
    //   fileId.value = id;
    // };
    //
    // const unloadCredentialDatabase = () => {
    //   Object.assign(credentialDatabase, cloneDeep(initialDatabaseState));
    //   fileId.value = undefined;
    // };
    //
    // return {
    //   credentialDatabase,
    //   fileId,
    //   updateCredentialDatabase,
    //   unloadCredentialDatabase,
    //   updateFileId,
    // };

    return {
      getDatabase,
      getInstances,
      getInstanceById,
      addInstance,
    };
  }
);
