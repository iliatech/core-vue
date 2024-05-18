<template>
  <div class="credentials-dashboard">
    <DataTable :value="secretDatabase">
      <Column field="name" header="Name"></Column>
      <Column field="type" header="Type"></Column>
    </DataTable>
  </div>
</template>
<script lang="ts" setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";

const secretDatabase = [
  {
    type: "type1",
    name: "name1",
  },
];
</script>
