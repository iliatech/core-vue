<template>
  <div class="universal-text">
    <label v-if="label" class="universal-text__label">
      {{ $lang.label.name }}
    </label>
    <InputText
      class="universal-text__input"
      :model-value="modelText"
      @update:modelValue="modelText = prepareName($event)"
      @update:model-value="isInputStarted = true"
      :placeholder="placeholder ?? ''"
      :size="inputSize"
    />
    <ErrorDetails :errors="errors" />
  </div>
</template>
<script lang="ts" setup>
import ErrorDetails from "@/components/error/ErrorDetails.vue";
import type { PropType } from "vue/dist/vue";
import InputText from "primevue/inputtext";
import { prepareName } from "@/helpers/strings";

const modelText = defineModel({
  type: String,
  required: true,
});

const isInputStarted = defineModel("isInputStarted", {
  type: Boolean,
});

defineProps({
  label: String,
  placeholder: String,
  inputSize: {
    type: String as PropType<"small" | undefined | "large">,
    default: undefined,
  },
  errors: Object as PropType<string[]>,
});
</script>
<style lang="scss" scoped>
@import "@/assets/variables";

.universal-text {
  width: 100%;

  &__label {
    display: block;
    margin-bottom: $px-10;
  }

  &__input {
    width: 100%;
  }
}
</style>
