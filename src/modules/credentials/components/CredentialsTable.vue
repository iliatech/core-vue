<template>
  <div class="credentials-tab">
    <UniversalTable
      :config="credentialsTable"
      :data="Credential.get()"
      @my:event="onClickMyEvent"
    />
  </div>
</template>
<script lang="ts" setup>
import UniversalTable from "@/components/tables/UniversalTable.vue";
import { credentialsTable } from "@/modules/credentials/settings/tables/credentialsTable";
import { Credential } from "@/modules/credentials/classes/entities/Credentials";

const onClickMyEvent = (item: unknown) => {
  console.log("M E", item);
};
</script>
<style lang="scss" scoped></style>
