<template>
  <div class="credentials-table">
    <UniversalTable
      :config="credentialsTable"
      :data="tableData"
      :action-button-text="$lang.button.newCredential"
      @click:action-button="handleClickAddCredential"
      @click:delete-item="handleClickDeleteItem"
      @click:edit-item="handleClickEditItem"
    />
  </div>
  <CredentialSidebar ref="credentialSidebar" />
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
<script lang="ts" setup>
import UniversalTable from "@/components/tables/UniversalTable.vue";
import { credentialsTable } from "@/modules/credentials/settings/tables/credentialsTable";
import { Credential } from "@/modules/credentials/classes/entities/Credential";
import CredentialSidebar from "@/modules/credentials/components/sidebars/CredentialSidebar.vue";
import { computed, ref } from "vue";
import type UniversalDrawer from "@/components/dialogs/UniversalDrawer.vue";
import type {
  ICredential,
  ICredentialsTableItem,
} from "@/modules/credentials/types";
import UniversalDialog from "@/components/dialogs/UniversalDialog.vue";
import { CredentialType } from "@/modules/credentials/classes/entities/CredentialType";

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
};

const handleConfirmDeleteItem = () => {
  if (!selectedItem.value) {
    throw new Error("selectedItem is undefined");
  }

  Credential.delete(selectedItem.value.id);
  confirmDeleteItemDialog.value?.close();
};
</script>
<style lang="scss" scoped>
.credentials-table {
  height: 100%;
}
</style>
