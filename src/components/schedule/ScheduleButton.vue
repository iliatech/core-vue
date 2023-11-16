<template>
  <div
    class="schedule-button"
    :style="{
      color: scheduleColors[color],
      borderColor: scheduleColors[color],
      width,
      height,
    }"
  >
    <i
      v-if="iconPre"
      class="pi schedule-button__pre-icon"
      :class="{ [`pi-${iconPre}`]: !!iconPre }"
    />
    <span>{{ label }}</span>
    <i
      v-if="iconPost"
      class="pi schedule-button__post-icon"
      :class="{ [`pi-${iconPost}`]: !!iconPost }"
    />
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
  width: String,
  height: String,
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

  i {
    font-size: 0.8em;
  }

  &__icon {
    padding-right: $px-2;
  }

  &__pre-icon {
    padding-right: $px-2;
  }

  &__post-icon {
    padding-left: $px-2;
  }
}
</style>
