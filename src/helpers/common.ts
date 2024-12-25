import type { Instance } from "@/types/common";
import { maxBy } from "lodash";

export const initializeOrders = (
  instances: Instance[],
  orderFieldId: string
) => {
  const maxOrderInstance = maxBy(instances, orderFieldId);
  const maxOrder = maxOrderInstance ? maxOrderInstance[orderFieldId] : -1;
  instances.forEach((item, index) => {
    if (item[orderFieldId] === undefined) {
      item[orderFieldId] = maxOrder + index + 1;
    }
  });
};
