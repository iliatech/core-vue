import { defineStore } from "pinia";
import { ref } from "vue";
import type { Instance, IUniversalDatabase } from "@/modules/credentials/types";
import { v4 as uuidv4 } from "uuid";
import { UniversalDatabase } from "@/modules/credentials/classes/UniversalDatabase";

export const useUniversalDatabaseStore = defineStore(
  "universalDatabaseStore",
  () => {
    const databases = ref<IUniversalDatabase[]>([
      {
        id: "50bda5a6-b1a0-4d73-b7db-301392037f87",
        clientTransactionId: "725a4700-7af6-42f2-a089-6a8524919953",
        serverTransactionId: "",
        updated: "", // TODO
        data: {},
      },
    ]);

    const getDatabase = (databaseId: string): IUniversalDatabase | null => {
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

    const addInstance = async (
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

      console.log("DB", database);
      await UniversalDatabase.save(params.databaseId);
    };

    const deleteInstanceById = async (
      params: { databaseId: string; objectId: string },
      instanceId: string
    ) => {
      const database = getDatabase(params.databaseId);

      if (!database) {
        return null;
      }

      if (!database.data[params.objectId]) {
        return;
      }

      const index = database.data[params.objectId].findIndex(
        (item) => item.id === instanceId
      );

      database.data[params.objectId].splice(index, 1);

      await UniversalDatabase.save(params.databaseId);
    };

    const unloadDatabase = (databaseId: string) => {
      const databaseIndex = databases.value.findIndex(
        (database) => database.id === databaseId
      );

      if (databaseIndex !== -1) {
        databases.value.splice(databaseIndex);
      }
    };

    const updateDatabase = (
      databaseId: string,
      databaseData: IUniversalDatabase
    ) => {
      const databaseIndex = databases.value.findIndex(
        (database) => database.id === databaseId
      );

      if (databaseIndex === -1) {
        throw new Error(`Database with id ${databaseId} was not updated`);
      }

      console.log("AAA", databases.value[databaseIndex]);

      databases.value[databaseIndex] = databaseData;

      console.log("BBB", databases.value[databaseIndex]);
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
      deleteInstanceById,
      unloadDatabase,
      updateDatabase,
    };
  }
);
