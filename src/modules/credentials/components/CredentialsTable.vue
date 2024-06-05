<template>
  <div class="credentials-tab">
    <UniversalTable
      :config="credentialsTable"
      :data="Credential.get()"
      :action-button-text="$lang.button.newCredential"
      @click:action-button="handleClickAddCredential"
    />
  </div>
  <CredentialSidebar ref="credentialSidebar" />
</template>
<script lang="ts" setup>
import UniversalTable from "@/components/tables/UniversalTable.vue";
import { credentialsTable } from "@/modules/credentials/settings/tables/credentialsTable";
import { Credential } from "@/modules/credentials/classes/entities/Credentials";
import CredentialSidebar from "@/modules/credentials/components/sidebars/CredentialSidebar.vue";
import { ref } from "vue";
import type UniversalSidebar from "@/components/sidebars/UniversalSidebar.vue";

const credentialSidebar = ref<InstanceType<typeof UniversalSidebar>>();

const handleClickAddCredential = () => {
  credentialSidebar.value?.open();
};
</script>
<style lang="scss" scoped></style>
