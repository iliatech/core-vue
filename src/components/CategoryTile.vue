<template>
  <div class="word-tile" :style="{ backgroundColor }">
    <div class="word-tile__title">
      {{ data.title }}
    </div>
    <div class="word-tile__delete">
      <i @click="emit('onClickDelete')" class="pi pi-trash" />
    </div>
    <div @click="emit('onClick')" class="word-tile__clickable" />
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
  position: relative;
  aspect-ratio: $tile-aspect-ratio;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: $space-medium;

  &__title {
    font-size: 1.5rem;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box !important;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
  }

  &__delete {
    position: absolute;
    right: $space-small;
    bottom: $space-small;

    i {
      font-size: 1rem;
      cursor: pointer;
    }
  }

  &__clickable {
    position: absolute;
    width: 80%;
    height: 80%;
    margin: auto;
    cursor: pointer;
  }
}
</style>
