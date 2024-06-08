<template>
  <div class="universal-textarea">
    <label v-if="label" class="universal-textarea__label">
      {{ $lang.label.name }}
    </label>
    <Textarea
      class="universal-textarea__input"
      :model-value="modelText"
      @update:modelValue="modelText = prepareName($event)"
      @update:model-value="isInputStarted = true"
      :placeholder="placeholder ?? ''"
      :rows="rows"
      :cols="cols"
    />
    <ErrorDetails :errors="errors" />
  </div>
</template>
<script lang="ts" setup>
import ErrorDetails from "@/components/error/ErrorDetails.vue";
import type { PropType } from "vue/dist/vue";
import Textarea from "primevue/textarea";
import { prepareName } from "@/helpers/strings";
import type { Numberish } from "primevue/ts-helpers";

const modelText = defineModel({
  type: Object as PropType<Numberish>,
  required: true,
});

const isInputStarted = defineModel("isInputStarted", {
  type: Boolean,
});

defineProps({
  label: String,
  placeholder: String,
  rows: {
    type: Number as PropType<Numberish>,
    default: 5,
  },
  cols: {
    type: Number as PropType<Numberish>,
  },
  errors: Object as PropType<string[]>,
});
</script>
<style lang="scss" scoped>
@import "@/assets/variables";

.universal-textarea {
  &__label {
    display: block;
    margin-bottom: $px-10;
  }

  &__input {
    width: 100%;
  }
}
</style>
