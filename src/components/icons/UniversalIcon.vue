<template>
  <span
    class="universal-icon"
    :class="{
      'universal-icon__link': link,
      'universal-icon--disabled': disabled,
    }"
  >
    <i :class="`pi pi-${primeIcon}`" :style="{ fontSize: size }" />
    <span
      v-if="label"
      :class="{
        'universal-icon__link-text': link,
      }"
      :style="linkTextStyle"
    >
      {{ label }}
    </span>
  </span>
</template>
<script lang="ts" setup>
defineProps({
  label: String,
  primeIcon: String,
  link: Boolean,
  disabled: Boolean,
  size: String,
  linkTextStyle: Object,
});
</script>
<style lang="scss" scoped>
@import "@/assets/variables";

.universal-icon {
  display: flex;
  align-items: center;
  gap: $px-5;

  &__link {
    cursor: pointer;
  }

  &__link-text:hover {
    text-decoration: underline;
  }

  &--disabled {
    opacity: 0.5;
  }
}
</style>
