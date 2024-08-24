<template>
  <div class="plus-tile">
    <i class="pi pi-plus plus-tile__icon" />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
@import "@/assets/variables";
@import "@/assets/colors";

.plus-tile {
  width: 25px;
  height: 25px;
  position: relative;
  background: $tomato;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
  border-radius: 6px;

  &__icon {
    display: block;
    font-size: 20px;
    color: $color-white;
  }
}
</style>
