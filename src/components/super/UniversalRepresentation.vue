<script lang="ts" setup>
import UniversalItems from "@/components/tables/UniversalItems.vue";
import type { PropType } from "vue";
import { computed, onBeforeMount, onMounted, ref, watch } from "vue";
import type UniversalDrawer from "@/components/dialogs/UniversalDrawer.vue";
import UniversalDialog from "@/components/dialogs/UniversalDialog.vue";
import { useRoute, useRouter } from "vue-router";
import SuperDrawer from "@/components/super/SuperDrawer.vue";
import type {
  ConfigurationObject,
  FieldConfig,
  Instance,
  ObjectConfig,
} from "@/types/common";
import {
  getDrawerConfigByObject,
  getTableConfigByObject,
} from "@/settings/entities";
import { Instances } from "@/classes/Instances";

const props = defineProps({
  objectId: {
    type: String,
    required: true,
  },
  object: {
    type: Object as PropType<ConfigurationObject>,
    required: true,
  },
});

const drawerConfig = computed(() => getDrawerConfigByObject(props.object));

const tableConfig = computed(() => getTableConfigByObject(props.object));

const objectConfig = computed<ObjectConfig>(() => ({
  object: props.object,
  fields: drawerConfig.value,
}));

const route = useRoute();
const router = useRouter();

const superDrawerRef = ref<InstanceType<typeof UniversalDrawer>>();
const selectedItem = ref<Instance | null>(null);
const confirmDeleteItemDialog = ref<InstanceType<typeof UniversalDialog>>();

const instances = ref<Instance[]>([]);

// const tableData = computed<Instance[]>(() => {
//   const linkedFields = tableConfig.value.filter(
//     (field) => field.linkedObjectId
//   );
//
//   if (!linkedFields.length) {
//     return objects.value;
//   }
//
//   const linkedInstances: Record<string, Instance[]> = {};
//
//   linkedFields.forEach((field) => {
//     if (!field.linkedObjectId) {
//       return;
//     }
//
//     // TODO Refactor it to take instances again.
//     // linkedInstances[field.linkedObjectId] = getInstances({
//     //   databaseId: getDatabaseIdByObjectId(field.linkedObjectId),
//     //   objectId: field.linkedObjectId,
//     // });
//   });
//
//   return objects.value.map((item) => {
//     item.linkedInstance = {};
//     linkedFields.forEach((field) => {
//       const foundInstance = linkedInstances[field.linkedObjectId].find(
//         (instance) => {
//           return instance.id === item[field.id];
//         }
//       );
//       const linkedInstance = foundInstance
//         ? cloneDeep(foundInstance)
//         : undefined;
//       if (linkedInstance?.linkedInstance) {
//         delete linkedInstance.linkedInstance;
//       }
//       item.linkedInstance[field.linkedObjectId] = linkedInstance;
//     });
//
//     return item;
//   });
// });

const handleClickAddItem = () => {
  superDrawerRef.value?.open();
};

const handleClickEditItem = (item: Instance) => {
  superDrawerRef.value?.open(item);
};

const handleClickDeleteItem = (item: Instance) => {
  selectedItem.value = item;
  confirmDeleteItemDialog.value?.open();
};

const handleClickChangeOrder = async (
  isOrderUp: boolean,
  item: Instance,
  objectConfig: FieldConfig[]
) => {
  // TODO Restore method.
  // const orderField = objectConfig.find(
  //   (field) => field.type === FieldsTypes.Order
  // );
  //
  // if (!orderField) {
  //   throw new Error(
  //     `Order field not found for object config of item with id ${item.id}`
  //   );
  // }
  //
  // const instances = database.value?.data[props.objectId] ?? [];
  //
  // initializeOrders(instances, orderField.id);
  //
  // if (item[orderField.id] === 0 && isOrderUp) {
  //   return;
  // }
  //
  // const maxOrder = maxBy(instances, orderField.id);
  //
  // if (
  //   !isOrderUp &&
  //   maxOrder &&
  //   item[orderField.id] === maxOrder[orderField.id]
  // ) {
  //   return;
  // }
  //
  // let newOrder = 0;
  //
  // if (item[orderField.id] === undefined) {
  //   newOrder = isOrderUp ? 0 : 1;
  // } else {
  //   newOrder = isOrderUp ? item[orderField.id] - 1 : item[orderField.id] + 1;
  // }
  //
  // const previousNewOrderItem = instances.find(
  //   (instance) => instance[orderField.id] === newOrder
  // );
  //
  // if (previousNewOrderItem && item[orderField.id] !== undefined) {
  //   previousNewOrderItem[orderField.id] = item[orderField.id];
  // }
  //
  // item[orderField.id] = newOrder;
  //
  // await addOrUpdateInstance(
  //   {
  //     objectId: props.objectId,
  //     instanceId: item.id,
  //   },
  //   item
  // );
  //
  // if (previousNewOrderItem) {
  //   await addOrUpdateInstance(
  //     {
  //       objectId: props.objectId,
  //       instanceId: previousNewOrderItem.id,
  //     },
  //     previousNewOrderItem
  //   );
  // }
};

const handleClickOrderUp = (item: Instance, objectConfig: FieldConfig[]) => {
  return handleClickChangeOrder(true, item, objectConfig);
};

const handleClickOrderDown = (item: Instance, objectConfig: FieldConfig[]) => {
  return handleClickChangeOrder(false, item, objectConfig);
};

const handleCancelDeleteItem = () => {
  confirmDeleteItemDialog.value?.close();
  selectedItem.value = null;

  router.push({
    path: route.path,
  });
};

const handleConfirmDeleteItem = async () => {
  if (!selectedItem.value) {
    throw new Error("selectedItem is undefined");
  }

  await Instances.deleteOne(props.object.id, selectedItem.value.id);

  confirmDeleteItemDialog.value?.close();
};

const handleCloseDrawer = () => {
  router.push({
    path: route.path,
  });
};

const runAction = () => {
  if (route.query.action === "add-item") {
    handleClickAddItem();
  }
};

watch(
  route,
  async () => {
    instances.value = await Instances.getAll(props.object.id);
    runAction();
  },
  { deep: true }
);

onBeforeMount(async () => {
  instances.value = await Instances.getAll(props.object.id);
});

onMounted(() => {
  runAction();
});
</script>

<template>
  <div class="universal-representation">
    <UniversalItems
      :object-config="tableConfig"
      :data="instances"
      @click:action-button="handleClickAddItem"
      @click:delete-item="handleClickDeleteItem"
      @click:edit-item="handleClickEditItem"
      @click:order-up="handleClickOrderUp"
      @click:order-down="handleClickOrderDown"
    />
  </div>
  <SuperDrawer
    ref="superDrawerRef"
    @close:drawer="handleCloseDrawer"
    title-add="Add item"
    title-edit="Edit item"
    :object-config="objectConfig"
  />
  <UniversalDialog
    :title="$lang.title.confirmAction"
    ref="confirmDeleteItemDialog"
    @cancel="handleCancelDeleteItem"
    @confirm="handleConfirmDeleteItem"
    :z-index="1200"
  >
    {{ $lang.phrase.confirmDeleteItem }}
  </UniversalDialog>
</template>

<style lang="scss" scoped>
.universal-representation {
  height: 100%;
}
</style>
