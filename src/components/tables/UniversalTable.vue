<template>
  <div class="universal-table">
    <div class="universal-table__header">
      <div class="universal-table__filters">
        <UniversalFilters
          v-model:filter-values="filterValues"
          :config="
            config
              .filter((item) => item.filterable)
              .map((item) => pick(item, ['name', 'label']))
          "
        />
      </div>
      <div class="universal-table__action-button">
        <UniversalButton
          v-if="actionButtonText"
          @click="emit('click:actionButton')"
          :label="actionButtonText"
        />
      </div>
    </div>
    <div class="universal-table__container">
      <div class="universal-table__inner-container">
        <DataTable
          scrollable
          :show-gridlines="true"
          :striped-rows="true"
          :row-hover="true"
          :value="dataFiltered"
          :sort-field="config.find((item) => item.defaultSort)?.name"
          :sort-order="
            config.find((item) => item.defaultSortOrder)?.defaultSortOrder
          "
          v-bind="$attrs"
        >
          <template v-for="column in config" :key="column.name">
            <Column
              v-if="!column.hidden"
              :field="column.name"
              :header="column.label"
              :sortable="column.sortable"
            >
              <template #body="{ data: item, index }">
                <UniversalTableCell
                  :column-config="column"
                  :index="index"
                  :item="item"
                  :key="objectHash(item)"
                  v-bind="$attrs"
                />
              </template>
            </Column>
          </template>
          <template #empty>
            <div class="universal-table__empty">
              {{ $lang.label.noEntitiesFound }}
            </div>
          </template>
        </DataTable>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import type { PropType } from "vue";
import type { UniversalTableColumn } from "@/types/tables";
import UniversalButton from "@/components/buttons/UniversalButton.vue";
import UniversalFilters from "@/components/filters/UniversalFilters.vue";
import { pick } from "lodash";
import type { UniversalFilterValues } from "@/types/filters";
import { computed, ref } from "vue";
import { prepareName } from "@/helpers/strings";
import objectHash from "object-hash";
import UniversalTableCell from "@/components/tables/UniversalTableCell.vue";

const emit = defineEmits(["click:actionButton"]);

const props = defineProps({
  data: {
    type: Array as PropType<any[]>,
    required: true,
  },
  config: {
    type: Array as PropType<UniversalTableColumn[]>,
    required: true,
  },
  actionButtonText: String,
});

const filterValues = ref<UniversalFilterValues>({});

const dataFiltered = computed<any[]>(() => {
  let itemsFiltered = props.data;

  Object.entries(filterValues.value).forEach(([columnName, filterValue]) => {
    itemsFiltered = itemsFiltered.filter((item) => {
      return prepareName(item[columnName])
        .toLowerCase()
        .includes(prepareName(filterValue).toLowerCase());
    });
  });

  return itemsFiltered;
});
</script>
<style lang="scss" scoped>
@import "@/assets/variables";
@import "@/assets/fonts";

.universal-table {
  height: 100%;
  display: flex;
  flex-direction: column;

  &__header {
    margin-bottom: $px-15;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__filters {
    //
  }

  &__action-button {
    //
  }

  &__empty {
    @include font-medium;
    text-align: center;
  }

  &__container {
    position: relative;
    flex-grow: 1;
  }

  &__inner-container {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
}

:deep(.p-datatable) {
  height: 100%;
}

:deep(.p-datatable-wrapper) {
  max-height: 100%;
  overflow: auto;
}
</style>
