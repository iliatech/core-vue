<template>
  <div class="plus-tile">
    <i class="pi pi-plus plus-tile__icon"></i>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.plus-tile {
  position: relative;
  background: $plus-tile-background;
  aspect-ratio: $tile-aspect-ratio;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden;

  &__icon {
    display: block;
    font-size: 10vw;
    color: $color-white;
  }
}
</style>
