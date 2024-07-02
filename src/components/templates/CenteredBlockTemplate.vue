<template>
  <div class="centered-block">
    <div class="centered-block__container">
      <div v-if="$slots.title" class="centered-block__title">
        <slot name="title" />
      </div>
      <div v-if="messages?.length" class="centered-block__messages">
        <div
          v-for="message in messages"
          :key="message.text"
          :style="{ color: message.color }"
        >
          {{ message.text }}
        </div>
      </div>
      <slot />
      <div v-if="$slots.notes" class="centered-block__notes">
        <slot name="notes" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { PageMessage } from "@/types/common";
import type { PropType } from "vue";

defineProps({
  messages: {
    type: Object as PropType<PageMessage[]>,
  },
});
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";
@import "@/assets/fonts.scss";

.centered-block {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: calc(100vh - $header-height);

  &__container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 300px;
  }

  &__title {
    flex-grow: 1;
    @include header-large;
    margin-bottom: $px-30;
  }

  &__messages {
    flex-grow: 1;
    @include font-medium;
    margin-bottom: $px-30;
  }

  &__notes {
    @include font-small-medium;
    margin-top: $px-30;
  }
}
</style>
