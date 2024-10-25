<template>
  <div class="plus-tile">
    <i class="pi pi-plus plus-tile__icon"></i>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@import "@/assets/variables";
@import "@/assets/colors";

.plus-tile {
  position: relative;
  border: 3px dotted $tomato;
  display: flex;
  height: 60px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
  border-radius: $border-radius;

  &__icon {
    display: block;
    font-size: 2rem;
    color: $color-white;
  }
}
</style>
