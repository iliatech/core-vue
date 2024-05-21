<template>
  <div class="base-table">
    <DataTable :value="data">
      <Column
        v-for="column in config"
        :field="column.name"
        :header="column.label"
        :key="column.name"
      ></Column>
    </DataTable>
  </div>
</template>
<script lang="ts" setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import type { PropType } from "vue";
import type { BaseTableColumn } from "@/types/tables";

defineProps({
  data: {
    type: Array as PropType<any>,
    required: true,
  },
  config: {
    type: Array as PropType<BaseTableColumn[]>,
    required: true,
  },
});
</script>
<style lang="scss" scoped></style>
