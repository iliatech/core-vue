<template>
  <div class="base-table">
    <DataTable
      :value="data"
      :sort-field="config.find((item) => item.defaultSort)?.name"
      :sort-order="
        config.find((item) => item.defaultSortOrder)?.defaultSortOrder
      "
    >
      <template v-for="column in config" :key="column.name">
        <Column
          v-if="!column.hidden"
          :field="column.name"
          :header="column.label"
          :sortable="column.sortable"
        />
      </template>
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
