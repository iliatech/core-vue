<template>
  <div
    class="schedule-button"
    :style="{
      color: scheduleColors[color],
      borderColor: scheduleColors[color],
    }"
  >
    <i v-if="iconPre" class="pi" :class="{ [`pi-${iconPre}`]: !!iconPre }" />
    {{ label }}
    <i v-if="iconPost" class="pi" :class="{ [`pi-${iconPost}`]: !!iconPost }" />
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
  iconPre: String,
  iconPost: String,
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
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
