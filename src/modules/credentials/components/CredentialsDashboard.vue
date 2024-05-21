<template>
  <div class="credentials-dashboard">
    <BaseTable :config="credentialTypeTable" :data="CredentialType.get()" />
    <IliaButton @click="CredentialDatabase.save()" label="save database" />
  </div>
</template>
<script lang="ts" setup>
import { CredentialType } from "@/modules/credentials/classes/entities/CredentialType";
import BaseTable from "@/components/tables/BaseTable.vue";
import { credentialTypeTable } from "@/modules/credentials/settings/tables/credentialTypeTable";
import { onBeforeMount } from "vue";
import { CredentialDatabase } from "@/modules/credentials/classes/CredentialDatabase";
import IliaButton from "@/components/buttons/IliaButton.vue";

onBeforeMount(() => {
  CredentialDatabase.load();
});
</script>
