<template>
  <div class="universal-field">
    <div class="universal-field__label" v-if="label">
      {{ label }}
    </div>
    <div class="universal-field__container">
      <slot />
    </div>
    <div class="universal-field__errors" v-if="errors?.length">
      <ErrorDetails :errors="errors" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { PropType } from "vue";
import ErrorDetails from "@/components/error/ErrorDetails.vue";

defineProps({
  label: String,
  errors: Array as PropType<string[]>,
});
</script>
<style lang="scss" scoped>
@import "@/assets/variables";
@import "@/assets/fonts";

.universal-field {
  margin-bottom: $px-20;

  &__label {
    @include font-medium;
    font-weight: bold;
    margin-bottom: $px-10;
  }

  &__container {
    //
  }

  &__errors {
    //
  }
}
</style>
