<template>
  <span class="universal-icon">
    <span v-if="label">{{ label }}</span>
  </span>
</template>
<script lang="ts" setup>
defineProps({
  label: String,
});
</script>
<style lang="scss" scoped>
.universal-icon {
  //
}
</style>
