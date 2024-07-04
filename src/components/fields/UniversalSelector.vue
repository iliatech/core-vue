<template>
  <div class="universal-selector">
    <Dropdown
      class="universal-selector__dropdown"
      v-model="model"
      :options="preparedOptions"
      :option-label="fieldName"
      :option-value="fieldId"
    />
  </div>
</template>
<script lang="ts" setup>
import Dropdown from "primevue/dropdown";
import type { PropType } from "vue";
import { sortWithCollator } from "@/helpers/sort";
import { computed } from "vue";

interface Option {
  id: string;
  name: string;
}

const model = defineModel<string | null>();

const props = defineProps({
  options: {
    type: Object as PropType<Option[]>,
    required: true,
  },
  fieldId: {
    type: String,
    default: "id",
  },
  fieldName: {
    type: String,
    default: "name",
  },
});

const preparedOptions = computed<Option[]>(() => {
  const items = props.options;
  sortWithCollator(items, props.fieldName);
  return items;
});
</script>
<style lang="scss" scoped>
.universal-selector {
  &__dropdown {
    width: 100%;
  }
}
</style>
