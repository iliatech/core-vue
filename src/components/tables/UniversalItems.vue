<script lang="ts" setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import type { PropType } from "vue";
import { computed, ref } from "vue";
import type { UniversalTableColumn } from "@/types/tables";
import UniversalButton from "@/components/buttons/UniversalButton.vue";
import UniversalFilters from "@/components/filters/UniversalFilters.vue";
import type { UniversalFilterValues } from "@/types/filters";
import { prepareName } from "@/helpers/strings";
import objectHash from "object-hash";
import UniversalTableCell from "@/components/tables/UniversalTableCell.vue";
import UniversalIcon from "@/components/icons/UniversalIcon.vue";
import { sortWithCollator } from "@/helpers/sort";
import type { FieldConfig } from "@/types/common";
import { FieldsTypes } from "@/types/common";
import { getDatabaseIdByObjectId } from "@/settings/entities";
import { useUniversalDatabaseStore } from "@/store/universalDatabaseStore";
import { trim } from "lodash";

const universalDatabaseStore = useUniversalDatabaseStore();
const { getInstances } = universalDatabaseStore;

const emit = defineEmits(["click:actionButton"]);

const props = defineProps({
  data: {
    type: Array as PropType<any[]>,
    required: true,
  },
  objectConfig: {
    type: Array as PropType<FieldConfig[]>,
    required: true,
  },
  valueField: {
    type: String,
    default: "id",
  },
  actionButtonText: String,
  tableModeByDefault: Boolean,
  withoutModeSwitcher: Boolean,
});

const isTableMode = ref(props.tableModeByDefault);

const filterValues = ref<UniversalFilterValues>({});

const dataFiltered = computed<any[]>(() => {
  let itemsFiltered = props.data;

  Object.entries(filterValues.value).forEach(([fieldId, filterValue]) => {
    if (!trim(filterValue)) {
      return;
    }

    const fieldConfig: FieldConfig | undefined = filtersConfig.value.find(
      (field) => field.id === fieldId
    ) as FieldConfig | undefined; // TODO Unite types UniversalTableColumn and FieldConfig

    if (!fieldConfig) {
      return;
    }

    if (fieldConfig.type === FieldsTypes.Selector) {
      if (!fieldConfig.linkedObjectId || !fieldConfig.linkedObjectFieldId) {
        throw new Error(
          `linkedObjectId or linkedObjectFieldId is not defined for selector field ${fieldConfig.id}`
        );
      }

      const linkedInstances = getInstances({
        databaseId: getDatabaseIdByObjectId(fieldConfig.linkedObjectId),
        objectId: fieldConfig.linkedObjectId,
      });

      const linkedInstancesFilteredIds = linkedInstances
        .filter((instance) =>
          prepareName(instance[fieldConfig.linkedObjectFieldId])
            .toLowerCase()
            .includes(prepareName(filterValue).toLowerCase())
        )
        .map((instance) => instance.id);

      itemsFiltered = itemsFiltered.filter((item) => {
        const linkedInstanceId = item[fieldId];
        return linkedInstancesFilteredIds.includes(linkedInstanceId);
      });
    }

    if (fieldConfig.type === FieldsTypes.String) {
      itemsFiltered = itemsFiltered.filter((item) => {
        const value = item[fieldId];

        return prepareName(value)
          .toLowerCase()
          .includes(prepareName(filterValue).toLowerCase());
      });
    }
  });

  // TODO Do we need to sort here?
  sortWithCollator(
    itemsFiltered,
    props.objectConfig.find((item) => item.defaultSort)?.id // TODO ??
  );

  return itemsFiltered;
});

const filtersConfig = computed(() =>
  props.objectConfig.filter((item) => item.filterable)
);

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
          :config="filtersConfig"
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
        <div v-if="!isTableMode" class="items">
          <div v-for="item in dataFiltered" :key="item.id" class="item">
            <template
              v-for="(column, index) in objectConfig"
              :key="column[valueField]"
            >
              <div v-if="!column.hidden" class="data-item">
                <div v-if="!column.hiddenLabel" class="label">
                  {{ column.label }}
                </div>
                <UniversalTableCell
                  :object-config="objectConfig"
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
          v-else
          scrollable
          :show-gridlines="true"
          :striped-rows="true"
          :row-hover="true"
          :value="dataFiltered"
          :sort-field="
            objectConfig.find((item) => item.defaultSort)?.[valueField]
          "
          :sort-order="
            objectConfig.find((item) => item.defaultSortOrder)?.defaultSortOrder
          "
          v-bind="$attrs"
        >
          <template v-for="column in objectConfig" :key="column[valueField]">
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
    margin-left: 20px;
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
  align-items: flex-start;
}

.item {
  width: 200px;
  flex-shrink: 1;
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
