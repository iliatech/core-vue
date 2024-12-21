<script lang="ts" setup>
import Dropdown from "primevue/dropdown";
import type { PropType } from "vue";
import { sortWithCollator } from "@/helpers/sort";
import { computed } from "vue";

import type { Instance } from "@/types/common";

interface Option {
  id: string;
  name: string;
}

const model = defineModel<string | null>();

const props = defineProps({
  options: {
    type: Object as PropType<Instance[]>,
    required: true,
  },
  idField: {
    type: String,
    default: "id",
  },
  labelField: {
    type: String,
    default: "name",
  },
});

const preparedOptions = computed<Option[]>(() => {
  const items = props.options;
  sortWithCollator(items, props.labelField);
  return items;
});
</script>
<template>
  <div class="universal-selector">
    <Dropdown
      class="universal-selector__dropdown"
      v-model="model"
      :options="preparedOptions"
      :option-label="labelField"
      :option-value="idField"
    />
  </div>
</template>
<style lang="scss" scoped>
.universal-selector {
  &__dropdown {
    width: 100%;
  }
}
</style>
