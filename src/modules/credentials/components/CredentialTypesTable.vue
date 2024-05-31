<template>
  <div class="credentials-tab">
    <UniversalTable
      :config="credentialTypeTable"
      :data="CredentialType.get()"
      :action-button-text="$lang.button.newCredentialType"
      @click:action-button="handleClickAddCredentialType"
    >
    </UniversalTable>
  </div>

  <CredentialTypeSidebar
    ref="credentialTypeSidebar"
    @added:credential-type="handleFinishAddCredentialType"
  />
</template>
<script lang="ts" setup>
import { credentialTypeTable } from "@/modules/credentials/settings/tables/credentialTypeTable";
import { CredentialType } from "@/modules/credentials/classes/entities/CredentialType";
import UniversalTable from "@/components/tables/UniversalTable.vue";
import type UniversalSidebar from "@/components/sidebars/UniversalSidebar.vue";
import CredentialTypeSidebar from "@/modules/credentials/components/sidebars/CredentialTypeSidebar.vue";
import { ref } from "vue";

const credentialTypeSidebar = ref<InstanceType<typeof UniversalSidebar>>();

const handleClickAddCredentialType = () => {
  credentialTypeSidebar.value?.open();
};

const handleFinishAddCredentialType = () => {
  credentialTypeSidebar.value?.close();
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables";
.credentials-tab {
  //
}
</style>
