<script lang="ts" setup>
import UniversalItems from "@/components/tables/UniversalItems.vue";
import { computed, onMounted, ref, watch } from "vue";
import type UniversalDrawer from "@/components/dialogs/UniversalDrawer.vue";
import type { Instance } from "@/modules/credentials/types";
import UniversalDialog from "@/components/dialogs/UniversalDialog.vue";
import { useRoute } from "vue-router";
import router from "@/router";
import SuperDrawer from "@/components/super/SuperDrawer.vue";
import { UniversalDatabase } from "@/modules/credentials/classes/UniversalDatabase";
import type { IUniversalDatabase } from "@/modules/credentials/types";
import { useUniversalDatabaseStore } from "@/modules/credentials/store/universalDatabaseStore";
import type { ObjectConfig } from "@/types/common";
import {
  getDatabaseIdByObjectId,
  getDrawerConfigByObjectId,
  getTableConfigByObjectId,
} from "@/settings/entities";
import { sortWithCollator } from "@/helpers/sort";
import { cloneDeep } from "lodash";

const props = defineProps({
  objectId: {
    type: String,
    required: true,
  },
});

const databaseId = getDatabaseIdByObjectId(props.objectId);

if (!databaseId) {
  throw new Error(`Database id not found for object id '${props.objectId}'`);
}

const drawerConfig = getDrawerConfigByObjectId(props.objectId);

const tableConfig = getTableConfigByObjectId(props.objectId);

const objectConfig: ObjectConfig = {
  databaseId,
  objectId: props.objectId,
  fields: drawerConfig,
};

const route = useRoute();

const universalDatabaseStore = useUniversalDatabaseStore();
const { deleteInstanceById, getInstances } = universalDatabaseStore;

const defaultSortColumn = tableConfig.find((item) => item.defaultSort);

const superDrawerRef = ref<InstanceType<typeof UniversalDrawer>>();
const selectedItem = ref<Instance | null>(null);
const confirmDeleteItemDialog = ref<InstanceType<typeof UniversalDialog>>();
const database = ref<IUniversalDatabase | null>(null);
const objects = computed<Instance[]>(() => {
  let items = database.value?.data[props.objectId] ?? [];
  if (defaultSortColumn) {
    sortWithCollator(items, defaultSortColumn.name);
  }
  return items;
});

const tableData = computed<Instance[]>(() => {
  const linkedFields = tableConfig.filter((field) => field.linkedObjectId);

  if (!linkedFields.length) {
    return objects.value;
  }

  const linkedInstances: Record<string, Instance[]> = {};

  linkedFields.forEach((field) => {
    if (!field.linkedObjectId) {
      return;
    }

    linkedInstances[field.linkedObjectId] = getInstances({
      databaseId: getDatabaseIdByObjectId(field.linkedObjectId),
      objectId: field.linkedObjectId,
    });
  });

  return objects.value.map((item) => {
    item.linkedInstance = {};
    linkedFields.forEach((field) => {
      const foundInstance = linkedInstances[field.linkedObjectId].find(
        (instance) => {
          return instance.id === item[field.name];
        }
      );
      const linkedInstance = foundInstance
        ? cloneDeep(foundInstance)
        : undefined;
      if (linkedInstance?.linkedInstance) {
        delete linkedInstance.linkedInstance;
      }
      item.linkedInstance[field.linkedObjectId] = linkedInstance;
    });

    return item;
  });
});

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

  await deleteInstanceById(
    { databaseId, objectId: props.objectId },
    selectedItem.value.id
  );
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
  () => {
    runAction();
  },
  { deep: true }
);

onMounted(async () => {
  await UniversalDatabase.load(databaseId);
  database.value = UniversalDatabase.get(databaseId);
  runAction();
});
</script>

<template>
  <div class="words">
    <UniversalItems
      :config="tableConfig"
      :data="tableData"
      @click:action-button="handleClickAddItem"
      @click:delete-item="handleClickDeleteItem"
      @click:edit-item="handleClickEditItem"
    />
  </div>
  <SuperDrawer
    ref="superDrawerRef"
    @close:drawer="handleCloseDrawer"
    title-add="Add word"
    title-edit="Edit word"
    :object-config="objectConfig"
  />
  <UniversalDialog
    :title="$lang.title.confirmDeleteCredentialType"
    ref="confirmDeleteItemDialog"
    @cancel="handleCancelDeleteItem"
    @confirm="handleConfirmDeleteItem"
    :z-index="1200"
  >
    {{ $lang.phrase.doYouConfirmDeleteCredentialType }}
  </UniversalDialog>
</template>

<style lang="scss" scoped>
.words {
  height: 100%;
}
</style>
