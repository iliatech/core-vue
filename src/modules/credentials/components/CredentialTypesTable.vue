<template>
  <div class="credentials-tab">
    <div class="credentials-tab__header">
      <UniversalButton
        @click="handleClickAddCredentialType"
        :label="$lang.button.newCredentialType"
      />
    </div>
    <BaseTable :config="credentialTypeTable" :data="CredentialType.get()" />
  </div>

  <CredentialTypeSidebar
    ref="credentialTypeSidebar"
    @add:credential-type="handleAddCredentialType"
  />
</template>
<script lang="ts" setup>
import { credentialTypeTable } from "@/modules/credentials/settings/tables/credentialTypeTable";
import { CredentialType } from "@/modules/credentials/classes/entities/CredentialType";
import BaseTable from "@/components/tables/BaseTable.vue";
import UniversalButton from "@/components/buttons/UniversalButton.vue";
import UniversalSidebar from "@/components/sidebars/UniversalSidebar.vue";
import CredentialTypeSidebar from "@/modules/credentials/components/sidebars/CredentialTypeSidebar.vue";
import { ref } from "vue";

const credentialTypeSidebar = ref<InstanceType<typeof UniversalSidebar>>();

const handleClickAddCredentialType = () => {
  credentialTypeSidebar.value?.open();
};

const handleAddCredentialType = () => {
  credentialTypeSidebar.value?.close();
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables";
.credentials-tab {
  &__header {
    margin-bottom: $px-10;
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
