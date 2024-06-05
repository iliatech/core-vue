<template>
  <div class="universal-field">
    <div class="universal-field__label" v-if="label">
      {{ label }}
    </div>
    <div class="universal-field__container">
      <slot />
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  label: String,
});
</script>
<style lang="scss" scoped>
@import "@/assets/variables";
@import "@/assets/fonts";

.universal-field {
  &__label {
    @include font-medium;
    font-weight: bold;
    margin-bottom: $px-10;
  }

  &__container {
    //
  }

  margin-bottom: $px-20;
}
</style>
