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
      {{ get(item, columnConfig.name) || "-" }}
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
import { get } from "lodash";

const emit = defineEmits([]);

const props = defineProps({
  columnConfig: {
    type: Object as PropType<UniversalTableColumn>,
    required: true,
  },
  item: { type: Object as PropType<any>, required: true },
  index: { type: Number, required: true },
});

const components = computed<UniversalTableCellComponentProp[] | null>(() => {
  const item = props.item;
  const value = item[props.columnConfig.name];
  const index = props.index;

  if (typeof props.columnConfig.getComponents === "function") {
    return props.columnConfig.getComponents({ value, item, index, emit }) ?? [];
  }

  return null;
});
</script>
<style lang="scss" scoped>
@import "@/assets/variables";

.universal-table-cell {
  display: flex;
  gap: 20px;

  &__item {
    display: block;
  }
}
</style>
