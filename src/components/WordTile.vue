<template>
  <div class="word-tile" :style="{ backgroundColor }">
    <div class="word-tile__top" @click="emit('onClick')">
      <i class="pi pi-eye word-tile__top-icon" />
    </div>
    <div class="word-tile__content">
      <div class="word-tile__text">{{ data.title }}</div>
    </div>
    <div class="word-tile__bottom">
      <div class="word-tile__number">
        {{ $lang.numberOfTranslations }}: {{ data.translations.length }}
      </div>
      <i @click="emit('onClickDelete')" class="pi pi-trash" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { PropType } from "vue";
import type { ApiWord } from "@/types/wordType";

defineProps({
  data: { type: Object as PropType<ApiWord>, required: true },
  backgroundColor: String,
});

const emit = defineEmits(["onClick", "onClickDelete"]);
</script>
<style lang="scss" scoped>
@import "@/assets/fontMixins.scss";
@import "@/assets/variables.scss";

.word-tile {
  aspect-ratio: $tile-aspect-ratio;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: $space-twenty;
  border-radius: $border-radius;

  &__top {
    flex-grow: 0;
  }

  &__top-icon {
    cursor: pointer;
  }

  &__number {
    color: #333;
    font-size: 0.875rem;
  }

  &__content {
    font-size: 1.5rem;
    text-overflow: ellipsis;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
    flex-grow: 1;
  }

  &__text {
    position: relative;
    display: block;
    z-index: 100;
  }

  &__bottom {
    display: flex;
    justify-content: space-between;
    right: $space-ten;
    bottom: $space-ten;
    flex-grow: 0;

    i {
      font-size: 1rem;
      cursor: pointer;
    }
  }
}
</style>
