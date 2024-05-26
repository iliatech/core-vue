<template>
  <div class="universal-text">
    <label v-if="label" class="universal-text__label">
      {{ $lang.label.name }}
    </label>
    <InputText
      :model-value="modelText"
      @update:modelValue="modelText = prepareName($event)"
      @update:model-value="isInputStarted = true"
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
  errors: Object as PropType<string[]>,
});
</script>
<style lang="scss" scoped>
@import "@/assets/variables";

.universal-text {
  &__label {
    display: block;
    margin-bottom: $px-10;
    margin-top: $px-20;
  }
}
</style>
