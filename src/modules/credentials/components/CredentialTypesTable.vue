<template>
  <div class="credentials-tab">
    <UniversalTable
      :config="credentialTypeTableConfig"
      :data="CredentialType.get()"
      :action-button-text="$lang.button.newCredentialType"
      @click:action-button="handleClickAddCredentialType"
      @click:delete-item="handleClickDeleteItem"
      @click:edit-item="handleClickEditItem"
    />
  </div>
  <CredentialTypeSidebar ref="credentialTypeSidebar" />
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
import { credentialTypeTableConfig } from "@/modules/credentials/settings/tables/credentialTypeTableConfig";
import { CredentialType } from "@/modules/credentials/classes/entities/CredentialType";
import UniversalTable from "@/components/tables/UniversalTable.vue";
import type UniversalSidebar from "@/components/sidebars/UniversalSidebar.vue";
import CredentialTypeSidebar from "@/modules/credentials/components/sidebars/CredentialTypeSidebar.vue";
import { ref } from "vue";
import type { ICredentialType } from "@/modules/credentials/types/entities";
import UniversalDialog from "@/components/dialogs/UniversalDialog.vue";

const credentialTypeSidebar = ref<InstanceType<typeof UniversalSidebar>>();
const confirmDeleteItemDialog = ref<InstanceType<typeof UniversalDialog>>();
const selectedItem = ref<ICredentialType | null>(null);

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
    // TODO Use InternalWarning instead.
    throw new Error("selectedItem is undefined");
  }

  CredentialType.delete(selectedItem.value.name); // TODO should be .id
  confirmDeleteItemDialog.value?.close();
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables";
.credentials-tab {
  //
}
</style>
