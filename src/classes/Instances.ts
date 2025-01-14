import type { Instance, InstanceWithoutId } from "@/types/common";
import Api from "@/api/Api";
import { apiPaths } from "@/settings/api";
import { RequestMethods } from "@/types/api";

export class Instances {
  static async getAll(objectId: string): Promise<Instance[]> {
    return await Api.request({
      path: `${apiPaths.universalObject}/${objectId}/instances`,
    });
  }

  static async addOne(objectId: string, instance: InstanceWithoutId) {
    return await Api.request({
      path: `${apiPaths.universalObject}/${objectId}/instances`,
      payload: instance,
      method: RequestMethods.Post,
    });
  }

  static async updateOne(objectId: string, instance: Instance) {
    const instanceWithoutId: InstanceWithoutId = { ...instance };
    delete instanceWithoutId.id;

    return await Api.request({
      path: `${apiPaths.universalObject}/${objectId}/instances/${instance.id}`,
      payload: instanceWithoutId,
      method: RequestMethods.Put,
    });
  }

  static async deleteOne(objectId: string, instanceId: string) {
    return await Api.request({
      path: `${apiPaths.universalObject}/${objectId}/instances/${instanceId}`,
      method: RequestMethods.Delete,
    });
  }
}
