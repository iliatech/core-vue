<template>
  <span class="universal-icon" :class="{ 'universal-icon__link': link }">
    <i :class="`pi pi-${primeIcon}`" />
    <span v-if="label" :class="{ 'universal-icon__link-text': link }">
      {{ label }}
    </span>
  </span>
</template>
<script lang="ts" setup>
defineProps({
  label: String,
  primeIcon: String,
  link: Boolean,
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
}
</style>
