<script setup lang="ts">
import type { PropType } from "vue";
import { computed, ref } from "vue";
import type { UniversalTableColumn } from "@/types/tables";
import type { UniversalFilterValues } from "@/types/filters";
import { get, pick } from "lodash";
import { prepareName } from "@/helpers/strings";
import UniversalButton from "@/components/buttons/UniversalButton.vue";
import UniversalFilters from "@/components/filters/UniversalFilters.vue";
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
  actionButtonText: String,
});

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
</script>

<template>
  <div class="grid">
    <div class="header">
      <div class="filters">
        <UniversalFilters
          v-model:filter-values="filterValues"
          :config="
            config
              .filter((item) => item.filterable)
              .map((item) => pick(item, ['name', 'label']))
          "
        />
      </div>
      <div class="action-button">
        <UniversalButton
          v-if="actionButtonText"
          @click="emit('click:actionButton')"
          :label="actionButtonText"
        />
      </div>
    </div>
    <div class="items">
      <div v-for="item in dataFiltered" :key="item.id" class="item">
        <div class="item-name">
          <div class="label">Name</div>
          {{ item.name }}
        </div>
        <div class="item-type">
          <div class="label">Type</div>
          {{ item.type.name }}
        </div>
        <div class="item-description">
          <div class="label">Description</div>
          {{ item.description || "-" }}
        </div>
        <div class="item-actions">
          <UniversalIcon
            label="Edit"
            prime-icon="pencil"
            link
            @click="emit('click:editItem', item)"
          />
          <UniversalIcon
            label="Delete"
            prime-icon="trash"
            link
            @click="emit('click:deleteItem', item)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.grid {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.items {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.item {
  width: 200px;
  height: 160px;
  border: 1px solid #666;
  border-radius: 3px;
  padding: 10px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 1rem;
}

.label {
  font-size: 90%;
  font-weight: bold;
}

.item-actions {
  display: flex;
  flex-direction: row;
  gap: 20px;
  font-size: 0.75rem;
  font-weight: bold;
}

.header {
  margin-bottom: 15px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filters {
  //
}

.action-button {
  //
}
</style>
