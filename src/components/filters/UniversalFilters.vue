<template>
  <div class="universal-filters">
    <UniversalText
      v-for="filter in config"
      :model-value="(filterValues[filter.id] ?? '').toString()"
      @update:modelValue="filterValues[filter.id] = $event"
      :placeholder="$lang.label.filterBy(filter.label)"
      :key="filter.id"
      :input-size="'small'"
    />
  </div>
</template>
<script lang="ts" setup>
import type { PropType } from "vue";
import UniversalText from "@/components/fields/UniversalText.vue";
import type { UniversalFilterValues } from "@/types/filters";
import type { UniversalTableColumn } from "@/types/tables";

defineModel("filterValues", {
  type: Object as PropType<UniversalFilterValues>,
  default: {},
});

defineProps({
  config: {
    type: Array as PropType<UniversalTableColumn[]>,
    required: true,
  },
});
</script>
<style lang="scss" scoped>
@import "@/assets/fonts";
@import "@/assets/variables";

.universal-filters {
  display: flex;
  flex-direction: row;
  gap: $px-20;

  :deep(.universal-text__label) {
    margin-bottom: $px-5;
    @include font-small-medium;
  }
}
</style>
