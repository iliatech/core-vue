<script lang="ts" setup>
import UniversalItems from "@/components/tables/UniversalItems.vue";
import { computed, onMounted, ref, watch } from "vue";
import type UniversalDrawer from "@/components/dialogs/UniversalDrawer.vue";
import type { Instance } from "@/modules/credentials/types";
import UniversalDialog from "@/components/dialogs/UniversalDialog.vue";
import { useRoute } from "vue-router";
import router from "@/router";
import SuperDrawer from "@/components/super/SuperDrawer.vue";
import { wordsTable } from "@/modules/dictionary/settings/tables/wordsTable";
import { UniversalDatabase } from "@/modules/credentials/classes/UniversalDatabase";
import type { IUniversalDatabase } from "@/modules/credentials/types";
import { useUniversalDatabaseStore } from "@/modules/credentials/store/universalDatabaseStore";

const databaseId = "50bda5a6-b1a0-4d73-b7db-301392037f87";
const objectId = "2c98151d-4995-49c9-b49e-0070058d951c";

const route = useRoute();

const universalDatabaseStore = useUniversalDatabaseStore();
const { deleteInstanceById } = universalDatabaseStore;

const superDrawerRef = ref<InstanceType<typeof UniversalDrawer>>();
const selectedItem = ref<Instance | null>(null);
const confirmDeleteItemDialog = ref<InstanceType<typeof UniversalDialog>>();
const database = ref<IUniversalDatabase | null>(null);
const objects = computed<Instance[]>(() => {
  return database.value?.data[objectId] ?? [];
});

const tableData = computed<Instance[]>(() => {
  // TODO
  //const credentialTypes = CredentialType.get();
  return objects.value.map((item) => ({
    ...item,
    //type: credentialTypes.find((el) => el.id === item.typeId) ?? null,
  }));
});

const handleClickAddItem = () => {
  superDrawerRef.value?.open();
};

const handleClickDeleteItem = (item: Instance) => {
  selectedItem.value = item;
  confirmDeleteItemDialog.value?.open();
};

const handleClickEditItem = (item: Instance) => {
  superDrawerRef.value?.open(item);
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

  await deleteInstanceById({ databaseId, objectId }, selectedItem.value.id);
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
      :config="wordsTable"
      :data="tableData"
      @click:action-button="handleClickAddItem"
      @click:delete-item="handleClickDeleteItem"
      @click:edit-item="handleClickEditItem"
    />
  </div>
  <SuperDrawer ref="superDrawerRef" @close:drawer="handleCloseDrawer" />
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
