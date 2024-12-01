<script lang="ts" setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import type { PropType } from "vue";
import type { UniversalTableColumn } from "@/types/tables";
import UniversalButton from "@/components/buttons/UniversalButton.vue";
import UniversalFilters from "@/components/filters/UniversalFilters.vue";
import { get, pick } from "lodash";
import type { UniversalFilterValues } from "@/types/filters";
import { computed, ref } from "vue";
import { prepareName } from "@/helpers/strings";
import objectHash from "object-hash";
import UniversalTableCell from "@/components/tables/UniversalTableCell.vue";
import UniversalIcon from "@/components/icons/UniversalIcon.vue";

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
  valueField: {
    type: String,
    default: "name",
  },
  actionButtonText: String,
  tableModeByDefault: Boolean,
  withoutModeSwitcher: Boolean,
});

const isTableMode = ref(props.tableModeByDefault);

const filterValues = ref<UniversalFilterValues>({});

const dataFiltered = computed<any[]>(() => {
  let itemsFiltered = props.data;

  Object.entries(filterValues.value).forEach(([columnName, filterValue]) => {
    itemsFiltered = itemsFiltered.filter((item) => {
      const value = get(item, columnName);

      return prepareName(value)
        .toLowerCase()
        .includes(prepareName(filterValue).toLowerCase());
    });
  });

  return itemsFiltered;
});

const changeMode = () => {
  isTableMode.value = !isTableMode.value;
};
</script>

<template>
  <div class="universal-items">
    <div class="universal-items__header">
      <div class="universal-items__filters">
        <UniversalFilters
          v-model:filter-values="filterValues"
          :config="
            config
              .filter((item) => item.filterable)
              .map((item) => pick(item, [valueField, 'label']))
          "
        />
      </div>
      <div class="universal-items__action-button">
        <UniversalButton
          v-if="actionButtonText"
          @click="emit('click:actionButton')"
          :label="actionButtonText"
        />
      </div>
      <div class="universal-items__mode" v-if="!withoutModeSwitcher">
        <UniversalIcon
          @click="changeMode"
          :prime-icon="!isTableMode ? 'th-large' : 'table'"
          size="20px"
        />
      </div>
    </div>
    <div class="universal-items__container">
      <div class="universal-items__inner-container">
        <div class="items" v-if="!isTableMode">
          <div v-for="item in dataFiltered" :key="item.id" class="item">
            <template
              v-for="(column, index) in config"
              :key="column[valueField]"
            >
              <div v-if="!column.hidden" class="data-item">
                <div v-if="!column.hiddenLabel" class="label">
                  {{ column.label }}
                </div>
                <UniversalTableCell
                  :column-config="column"
                  :index="index"
                  :item="item"
                  :key="objectHash(item)"
                  v-bind="$attrs"
                />
              </div>
            </template>
          </div>
        </div>
        <DataTable
          v-if="isTableMode"
          scrollable
          :show-gridlines="true"
          :striped-rows="true"
          :row-hover="true"
          :value="dataFiltered"
          :sort-field="config.find((item) => item.defaultSort)?.[valueField]"
          :sort-order="
            config.find((item) => item.defaultSortOrder)?.defaultSortOrder
          "
          v-bind="$attrs"
        >
          <template v-for="column in config" :key="column[valueField]">
            <Column
              v-if="!column.hidden"
              :field="column[valueField]"
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
            <div class="universal-items__empty">
              {{ $lang.label.noEntitiesFound }}
            </div>
          </template>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/variables";
@import "@/assets/fonts";

.universal-items {
  min-height: 100%;
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

  &__mode {
    cursor: pointer;
  }
}

:deep(.p-datatable) {
  height: 100%;
}

:deep(.p-datatable-wrapper) {
  max-height: 100%;
  overflow: auto;
}

.grid {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.items {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  height: 100%;
  overflow-y: auto;
}

.item {
  width: 200px;
  border: 1px solid #666;
  border-radius: 3px;
  padding: 10px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 80%;
}

.label {
  font-weight: bold;
  margin-bottom: 2px;
}

.data-item:not(:last-child) {
  margin-bottom: 5px;
}

.header {
  margin-bottom: 15px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
