<script lang="ts" setup>
import UniversalTable from "@/components/tables/UniversalTable.vue";
import { credentialsTable } from "@/modules/credentials/settings/tables/credentialsTable";
import { Credential } from "@/modules/credentials/classes/entities/Credential";
import CredentialSidebar from "@/modules/credentials/components/sidebars/CredentialSidebar.vue";
import { computed, onMounted, ref, watch } from "vue";
import type UniversalDrawer from "@/components/dialogs/UniversalDrawer.vue";
import type {
  ICredential,
  ICredentialsTableItem,
} from "@/modules/credentials/types";
import UniversalDialog from "@/components/dialogs/UniversalDialog.vue";
import { CredentialType } from "@/modules/credentials/classes/entities/CredentialType";
import { useRoute } from "vue-router";
import router from "@/router";

const route = useRoute();

const credentialSidebar = ref<InstanceType<typeof UniversalDrawer>>();
const selectedItem = ref<ICredential | null>(null);
const confirmDeleteItemDialog = ref<InstanceType<typeof UniversalDialog>>();

const tableData = computed<ICredentialsTableItem[]>(() => {
  const credentialTypes = CredentialType.get();
  return Credential.get().map((item) => ({
    ...item,
    type: credentialTypes.find((el) => el.id === item.typeId) ?? null,
  }));
});

const handleClickAddCredential = () => {
  credentialSidebar.value?.open();
};

const handleClickDeleteItem = (item: ICredential) => {
  selectedItem.value = item;
  confirmDeleteItemDialog.value?.open();
};

const handleClickEditItem = (item: ICredential) => {
  credentialSidebar.value?.open(item);
};

const handleCancelDeleteItem = () => {
  confirmDeleteItemDialog.value?.close();
  selectedItem.value = null;
  router.push({
    path: route.path,
  });
};

const handleConfirmDeleteItem = () => {
  if (!selectedItem.value) {
    throw new Error("selectedItem is undefined");
  }

  Credential.delete(selectedItem.value.id);
  confirmDeleteItemDialog.value?.close();
};

const handleCloseDrawer = () => {
  router.push({
    path: route.path,
  });
};

const runAction = () => {
  if (route.query.action === "add-credential") {
    handleClickAddCredential();
  }
};

watch(
  route,
  () => {
    runAction();
  },
  { deep: true }
);

onMounted(() => {
  runAction();
});
</script>

<template>
  <div class="credentials">
    <UniversalTable
      :config="credentialsTable"
      :data="tableData"
      @click:action-button="handleClickAddCredential"
      @click:delete-item="handleClickDeleteItem"
      @click:edit-item="handleClickEditItem"
    />
  </div>
  <CredentialSidebar
    ref="credentialSidebar"
    @close:drawer="handleCloseDrawer"
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
.credentials {
  height: 100%;
}
</style>
