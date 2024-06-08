<template>
  <div class="universal-filters">
    <UniversalText
      v-for="filter in config"
      :model-value="(filterValues[filter.name] ?? '').toString()"
      @update:modelValue="filterValues[filter.name] = $event"
      :placeholder="$lang.label.filterBy(filter.label)"
      :key="filter.name"
      :input-size="'small'"
    />
  </div>
</template>
<script lang="ts" setup>
import type { PropType } from "vue";
import UniversalText from "@/components/fields/UniversalText.vue";
import type { UniversalFilterValues, UniversalFilter } from "@/types/filters";

defineModel("filterValues", {
  type: Object as PropType<UniversalFilterValues>,
  default: {},
});

defineProps({
  config: {
    type: Array as PropType<UniversalFilter[]>,
    required: true,
  },
});
</script>
<style lang="scss" scoped>
@import "@/assets/fonts";
@import "@/assets/variables";

.universal-filters {
  :deep(.universal-text__label) {
    margin-bottom: $px-5;
    @include font-small-medium;
  }
}
</style>
