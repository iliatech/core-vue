// TODO Implement.
import type { Instance } from "@/types/common";
import { FieldsTypes } from "@/types/common";
import Api from "@/api/Api";
import { apiPaths } from "@/settings/api";
import {
  getTableConfigByObject,
  getTableConfigByObjectId,
} from "@/settings/entities";
import { maxBy } from "lodash";
import { v4 as uuidv4 } from "uuid";

export class Instances {
  static async getAll(params: { objectId: string }): Promise<Instance[]> {
    return await Api.request({
      path: `${apiPaths.universalObject}/${params.objectId}/instances`,
    });
  }

  static async addOrUpdateOne(
    params: { objectId: string; instanceId?: string },
    instance: Instance
  ) {
    // TODO Refactor for updated API.

    // TODO Change here to take object
    const objectConfig = getTableConfigByObject(params.objectId);

    const orderField = objectConfig.find(
      (field) => field.type === FieldsTypes.Order
    );

    if (orderField) {
      // TODO
      //initializeOrders(database.data[params.objectId], orderField.id);

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
  }

  static async deleteInstanceById(
    params: { databaseId: string; objectId: string },
    instanceId: string
  ) {
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
  }
}
