<template>
  <div class="universal-table-cell">
    <template v-if="components?.length">
      <div
        v-for="(component, indexKey) in components"
        :key="indexKey"
        class="universal-table-cell__item"
      >
        <component
          :is="component.component"
          v-bind="mergeProps(component.props, $attrs)"
        />
      </div>
    </template>
    <template v-else>
      {{ getValue(item, columnConfig) }}
    </template>
  </div>
</template>
<script lang="ts" setup>
import type { PropType } from "vue";
import type {
  UniversalTableCellComponentProp,
  UniversalTableColumn,
} from "@/types/tables";
import { computed, mergeProps } from "vue";

import type { FieldConfig, Instance } from "@/types/common";

const emit = defineEmits([]);

const props = defineProps({
  objectConfig: {
    type: Array as PropType<FieldConfig[]>,
    required: true,
  },
  columnConfig: {
    type: Object as PropType<FieldConfig>,
    required: true,
  },
  item: { type: Object as PropType<any>, required: true },
  index: { type: Number, required: true },
});

const components = computed<UniversalTableCellComponentProp[] | null>(() => {
  const item = props.item;
  const value = item[props.columnConfig.id];
  const index = props.index;

  if (typeof props.columnConfig.getComponents === "function") {
    return (
      props.columnConfig.getComponents({
        value,
        item,
        index,
        emit,
        fieldConfig: props.columnConfig,
        objectConfig: props.objectConfig,
      }) ?? []
    );
  }

  return null;
});

const getValue = (item: Instance, columnConfig: UniversalTableColumn) => {
  let value = null;

  if (
    columnConfig.linkedObjectId &&
    columnConfig.linkedObjectFieldId &&
    item.linkedInstance
  ) {
    value =
      item.linkedInstance[columnConfig.linkedObjectId]?.[
        columnConfig.linkedObjectFieldId
      ];
  } else {
    value = item[columnConfig.id];
  }

  return value ?? "-";
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables";

.universal-table-cell {
  display: flex;
  gap: 10px;

  &__item {
    display: block;
  }
}
</style>
