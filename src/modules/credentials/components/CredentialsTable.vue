<template>
  <div class="credentials-tab">
    <BaseTable :config="credentialsTable" :data="Credential.get()" />
  </div>
</template>
<script lang="ts" setup>
import BaseTable from "@/components/tables/BaseTable.vue";
import { credentialsTable } from "@/modules/credentials/settings/tables/credentialsTable";
import { Credential } from "@/modules/credentials/classes/entities/Credentials";
</script>
<style lang="scss" scoped></style>
