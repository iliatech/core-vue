import { defineStore } from "pinia";
import { ref } from "vue";
import type { IUniversalDatabase } from "@/modules/credentials/types";
import { v4 as uuidv4 } from "uuid";
import { UniversalDatabase } from "@/modules/credentials/classes/UniversalDatabase";

import { UniversalDatabasesIds } from "@/universal/enums";
import type { Instance } from "@/types/common";
import { FieldsTypes } from "@/types/common";
import { getTableConfigByObjectId } from "@/settings/entities";
import { maxBy, minBy } from "lodash";
import { initializeOrders } from "@/helpers/common";

export const useUniversalDatabaseStore = defineStore(
  "universalDatabaseStore",
  () => {
    const databases = ref<IUniversalDatabase[]>([
      {
        id: UniversalDatabasesIds.MainDatabase,
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
    }): Instance[] => {
      const database = getDatabase(params.databaseId);

      if (!database) {
        return [];
      }

      const instances = database.data[params.objectId];

      return instances ?? [];
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

    const addOrUpdateInstance = async (
      params: { databaseId: string; objectId: string; instanceId?: string },
      instance: Instance
    ) => {
      const database = getDatabase(params.databaseId);

      if (!database) {
        throw new Error(
          `Database with id '${params.databaseId}' not found when try add or update instance`
        );
      }

      if (!database.data[params.objectId]) {
        database.data[params.objectId] = [];
      }

      const objectConfig = getTableConfigByObjectId(params.objectId);

      const orderField = objectConfig.find(
        (field) => field.type === FieldsTypes.Order
      );

      if (orderField) {
        initializeOrders(database.data[params.objectId], orderField.id);

        if (instance[orderField.id] === undefined) {
          const maxOrderInstance = maxBy(
            database.data[params.objectId],
            orderField.id
          );

          const maxOrder = maxOrderInstance
            ? maxOrderInstance[orderField.id]
            : -1;

          instance[orderField.id] = maxOrder + 1;
        }
      }

      if (params.instanceId) {
        const existentInstanceIndex = database.data[params.objectId].findIndex(
          (item) => item.id === params.instanceId
        );

        if (existentInstanceIndex !== -1) {
          database.data[params.objectId].splice(existentInstanceIndex, 1, {
            id: params.instanceId,
            ...instance,
          });
        }
      } else {
        database.data[params.objectId].push({
          id: uuidv4(),
          ...instance,
        });
      }

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

      const objectConfig = getTableConfigByObjectId(params.objectId);

      const orderField = objectConfig.find(
        (field) => field.type === FieldsTypes.Order
      );

      const index = database.data[params.objectId].findIndex(
        (item) => item.id === instanceId
      );

      let itemToDelete: Instance | undefined = undefined;

      if (orderField) {
        itemToDelete = database.data[params.objectId][index];
      }

      database.data[params.objectId].splice(index, 1);

      if (orderField && itemToDelete) {
        database.data[params.objectId].forEach((item) => {
          // @ts-ignore IDE defines itemToDelete as possibly undefined by mistake.
          if (item[orderField.id] > itemToDelete[orderField.id]) {
            item[orderField.id]--;
          }
        });
      }

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

      databases.value[databaseIndex] = databaseData;
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
      addOrUpdateInstance,
      deleteInstanceById,
      unloadDatabase,
      updateDatabase,
    };
  }
);
