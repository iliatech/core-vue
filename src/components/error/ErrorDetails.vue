<template>
  <div v-if="errors && errors.length" class="error-details">
    <div v-for="error in errors" :key="error">{{ error }}</div>
  </div>
</template>
<script lang="ts" setup>
import type { PropType } from "vue";

defineProps({
  errors: Object as PropType<string[]>,
});
</script>
<style lang="scss" scoped>
@import "@/assets/fonts";
@import "@/assets/variables";

.error-details {
  margin-top: $px-5;
  @include font-small-medium;
  color: red;
}
</style>
