<template>
  <div class="credentials-tab">
    <UniversalTable
      :config="credentialsTable"
      :data="Credential.get()"
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
import { Credential } from "@/modules/credentials/classes/entities/Credentials";
import CredentialSidebar from "@/modules/credentials/components/sidebars/CredentialSidebar.vue";
import { ref } from "vue";
import type UniversalSidebar from "@/components/sidebars/UniversalSidebar.vue";
import type { ICredential } from "@/modules/credentials/types";
import UniversalDialog from "@/components/dialogs/UniversalDialog.vue";
import { CredentialType } from "@/modules/credentials/classes/entities/CredentialType";

const credentialSidebar = ref<InstanceType<typeof UniversalSidebar>>();
const selectedItem = ref<ICredential | null>(null);
const confirmDeleteItemDialog = ref<InstanceType<typeof UniversalDialog>>();

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
<style lang="scss" scoped></style>
