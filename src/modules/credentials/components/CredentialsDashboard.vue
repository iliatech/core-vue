<template>
  <div class="credentials-dashboard">
    <TabView>
      <TabPanel :header="$lang.title.credentials">
        <CredentialsTable />
      </TabPanel>
      <TabPanel :header="$lang.title.credentialTypes">
        <CredentialTypesTable />
      </TabPanel>
    </TabView>
  </div>
</template>
<script lang="ts" setup>
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import { onBeforeMount } from "vue";
import { CredentialDatabase } from "@/modules/credentials/classes/CredentialDatabase";
import CredentialTypesTable from "@/modules/credentials/components/CredentialTypesTable.vue";
import CredentialsTable from "@/modules/credentials/components/CredentialsTable.vue";

onBeforeMount(() => {
  CredentialDatabase.load();
});
</script>
<style lang="scss" scoped>
.credentials-dashboard {
  width: 100%;
}
</style>
