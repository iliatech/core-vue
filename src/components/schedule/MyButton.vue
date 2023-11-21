<template>
  <div
    class="schedule-button"
    :class="{ 'schedule-button--no-border': noBorder }"
    :style="{
      color: scheduleColors[color],
      borderColor: scheduleColors[color],
      width,
      height,
      marginTop,
    }"
  >
    <i
      v-if="iconPre"
      class="pi schedule-button__pre-icon"
      :class="{ [`pi-${iconPre}`]: !!iconPre }"
      :style="{ fontSize: iconSize }"
    />
    <span>{{ label }}</span>
    <i
      v-if="iconPost"
      class="pi schedule-button__post-icon"
      :class="{ [`pi-${iconPost}`]: !!iconPost }"
      :style="{ fontSize: iconSize }"
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
  noBorder: Boolean,
  iconSize: { type: String, default: "0.8rem" },
  marginTop: String,
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
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &__icon {
    padding-right: $px-2;
  }

  &__pre-icon {
    padding-right: $px-5;
  }

  &__post-icon {
    padding-left: $px-5;
  }

  &--no-border {
    border: none;
    padding: 0;
  }
}
</style>
