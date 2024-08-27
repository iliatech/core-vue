<template>
  <div
    class="universal-button"
    :class="{
      'universal-button--no-border': noBorder,
      'universal-button--small': size === 'small',
      'universal-button--selected': selected,
      'universal-button--nowrap': nowrap,
      'universal-button--disabled': disabled,
      'universal-button--text': text,
    }"
    :style="{
      color: scheduleColors[color],
      borderColor: scheduleColors[color],
      width,
      height,
      marginTop,
      fontSize,
    }"
    @click="handleClick"
  >
    <i
      v-if="iconPre"
      class="pi universal-button__pre-icon"
      :class="{ [`pi-${iconPre}`]: !!iconPre }"
      :style="{ fontSize: iconSize }"
    />
    <span>
      {{ label }}
    </span>
    <i
      v-if="iconPost"
      class="pi universal-button__post-icon"
      :class="{ [`pi-${iconPost}`]: !!iconPost }"
      :style="{ fontSize: iconSize }"
    />
  </div>
</template>

<script setup lang="ts">
import { scheduleColors } from "@/settings/schedule";
import type { PropType } from "vue";

const props = defineProps({
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
  disabled: Boolean,
  text: Boolean,
  href: String,
  openInNewTab: Boolean,
});

const handleClick = () => {
  if (props.href) {
    if (props.openInNewTab) {
      window.open(props.href, "_blank");
    } else {
      window.location.href = props.href;
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/variables";
@import "@/assets/fonts";

.universal-button {
  @include font-small-medium;
  cursor: pointer;
  border-radius: $border-radius-px-4;
  border: 1px solid;
  padding: $px-5 $px-10;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  font-family: "Comic Sans MS", sans-serif;

  &:hover {
    // TODO create color in colors library and use it here.
    background: #eee;
  }

  &--small {
    padding: $px-2 $px-5;
  }

  &--selected {
    font-weight: bold;
    text-decoration: none !important;
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

  &--disabled {
    pointer-events: none;
    // TODO create color in colors library and use it here.
    background: #fff;
    // TODO create color in colors library and use it here.
    color: #ccc;
  }

  &--text {
    text-decoration: underline;
  }

  &--text:hover {
    background: none;
    text-decoration: none;
  }
}
</style>
