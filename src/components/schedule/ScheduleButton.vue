<template>
  <div
    class="schedule-button"
    :style="{
      color: scheduleColors[color],
      borderColor: scheduleColors[color],
    }"
  >
    {{ label }}
  </div>
</template>

<script setup lang="ts">
import { scheduleColors } from "@/settings/schedule";

defineProps({
  color: {
    type: String,
    default: scheduleColors.grey,
  },
  label: String,
});
</script>

<style scoped lang="scss">
@import "@/assets/variables";
@import "@/assets/fonts";

.schedule-button {
  @include font-small-medium;
  cursor: pointer;
  border-radius: $border-radius-px-4;
  border: 1px solid;
  padding: $px-5 $px-10;
  text-align: center;
}
</style>
