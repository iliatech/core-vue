<template>
  <div class="credentials-tab">
    <UniversalTable
      :config="credentialTypeTableConfig"
      :data="CredentialType.get()"
      :action-button-text="$lang.button.newCredentialType"
      @click:action-button="handleClickAddCredentialType"
      @click:delete-item="handleClickDeleteItem"
      @click:edit-item="handleClickEditItem"
    >
    </UniversalTable>
  </div>

  <CredentialTypeSidebar ref="credentialTypeSidebar" />
</template>
<script lang="ts" setup>
import { credentialTypeTableConfig } from "@/modules/credentials/settings/tables/credentialTypeTableConfig";
import { CredentialType } from "@/modules/credentials/classes/entities/CredentialType";
import UniversalTable from "@/components/tables/UniversalTable.vue";
import type UniversalSidebar from "@/components/sidebars/UniversalSidebar.vue";
import CredentialTypeSidebar from "@/modules/credentials/components/sidebars/CredentialTypeSidebar.vue";
import { ref } from "vue";
import type { ICredentialType } from "@/modules/credentials/types/entities";

const credentialTypeSidebar = ref<InstanceType<typeof UniversalSidebar>>();

const handleClickAddCredentialType = () => {
  credentialTypeSidebar.value?.open();
};

const handleClickDeleteItem = (item: ICredentialType) => {
  console.log("D I", item);
};

const handleClickEditItem = (item: ICredentialType) => {
  console.log("E I", item);
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables";
.credentials-tab {
  //
}
</style>
