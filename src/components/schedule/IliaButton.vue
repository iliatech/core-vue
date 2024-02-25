<template>
  <div
    class="schedule-button"
    :class="{
      'schedule-button--no-border': noBorder,
      'schedule-button--small': size === 'small',
      'schedule-button--selected': selected,
      'schedule-button--nowrap': nowrap,
    }"
    :style="{
      color: scheduleColors[color],
      borderColor: scheduleColors[color],
      width,
      height,
      marginTop,
      fontSize,
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
import type { PropType } from "vue";

defineProps({
  color: {
    type: String as PropType<keyof typeof scheduleColors>,
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
  size: {
    type: String as PropType<"small" | "medium" | "large">,
    default: "medium",
  },
  selected: Boolean,
  nowrap: Boolean,
  fontSize: String,
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

  &--small {
    padding: $px-2 $px-5;
  }

  &--selected {
    font-weight: bold;
    font-size: 1.1em;
  }

  &--nowrap {
    white-space: nowrap;
  }

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
