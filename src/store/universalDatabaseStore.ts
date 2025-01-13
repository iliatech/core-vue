import { defineStore } from "pinia";
import { ref } from "vue";
import type { IUniversalDatabase } from "@/types/universalDatabase";
import { v4 as uuidv4 } from "uuid";
import { UniversalDatabase } from "@/classes/UniversalDatabase";

import { UniversalDatabasesIds } from "@/universal/enums";
import type { Instance } from "@/types/common";
import { FieldsTypes } from "@/types/common";
import {
  getTableConfigByObject,
  getTableConfigByObjectId,
} from "@/settings/entities";
import { maxBy } from "lodash";
import { initializeOrders } from "@/helpers/common";
import Api from "@/api/Api";
import { apiPaths } from "@/settings/api";

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

    const getInstances = async (params: {
      objectId: string;
    }): Promise<Instance[]> => {
      return await Api.request({
        path: `${apiPaths.universalObject}/${params.objectId}/instances`,
      });
    };

    const addOrUpdateInstance = async (
      params: { objectId: string; instanceId?: string },
      instance: Instance
    ) => {
      // TODO Refactor for updated API.

      // TODO Change here to take object
      const objectConfig = getTableConfigByObject(params.object);

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
        const itemToAdd = {
          ...instance,
          id: uuidv4(),
        };

        database.data[params.objectId].push(itemToAdd);
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

    return {
      getDatabase,
      getInstances,
      addOrUpdateInstance,
      deleteInstanceById,
      unloadDatabase,
      updateDatabase,
    };
  }
);
