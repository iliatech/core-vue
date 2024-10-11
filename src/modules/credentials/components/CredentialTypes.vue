<script lang="ts" setup>
import { credentialTypesTable } from "@/modules/credentials/settings/tables/credentialTypesTable";
import { CredentialType } from "@/modules/credentials/classes/entities/CredentialType";
import { Credential } from "@/modules/credentials/classes/entities/Credential";
import UniversalTable from "@/components/tables/UniversalTable.vue";
import type UniversalDrawer from "@/components/dialogs/UniversalDrawer.vue";
import CredentialTypeSidebar from "@/modules/credentials/components/sidebars/CredentialTypeSidebar.vue";
import { computed, ref, watch } from "vue";
import UniversalDialog from "@/components/dialogs/UniversalDialog.vue";
import type {
  ICredentialType,
  ICredentialTypesTableItem,
} from "@/modules/credentials/types";
import { useRoute } from "vue-router";
import router from "@/router";

const credentialTypeSidebar = ref<InstanceType<typeof UniversalDrawer>>();
const confirmDeleteItemDialog = ref<InstanceType<typeof UniversalDialog>>();
const selectedItem = ref<ICredentialType | null>(null);

const route = useRoute();

const tableData = computed<ICredentialTypesTableItem[]>(() => {
  const credentials = Credential.get();
  return CredentialType.get().map((item) => ({
    ...item,
    credentialsNumber: credentials.filter((el) => el.typeId === item.id).length,
  }));
});

const handleClickAddCredentialType = () => {
  credentialTypeSidebar.value?.open();
};

const handleClickDeleteItem = (item: ICredentialType) => {
  selectedItem.value = item;
  confirmDeleteItemDialog.value?.open();
};

const handleClickEditItem = (item: ICredentialType) => {
  credentialTypeSidebar.value?.open(item);
};

const handleCancelDeleteItem = () => {
  confirmDeleteItemDialog.value?.close();
  selectedItem.value = null;
};

const handleConfirmDeleteItem = () => {
  if (!selectedItem.value) {
    throw new Error("selectedItem is undefined");
  }

  CredentialType.delete(selectedItem.value.id);
  confirmDeleteItemDialog.value?.close();
};

const handleCloseDrawer = () => {
  router.push({
    path: route.path,
  });
};

watch(
  route,
  () => {
    if (route.query.action === "add-credential-type") {
      handleClickAddCredentialType();
    }
  },
  { deep: true }
);
</script>

<template>
  <div class="credential-types-table">
    <UniversalTable
      :config="credentialTypesTable"
      :data="tableData"
      @click:action-button="handleClickAddCredentialType"
      @click:delete-item="handleClickDeleteItem"
      @click:edit-item="handleClickEditItem"
    />
  </div>
  <CredentialTypeSidebar
    ref="credentialTypeSidebar"
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
@import "@/assets/variables";
.credential-types-table {
  height: 100%;
}
</style>
