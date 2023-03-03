<template>
  <div class="hello">
    <div
      v-for="tile in tiles"
      :key="tile.title"
      class="hello__tile"
      :style="{ background: tile.color }"
    >
      {{ tile.title }}
    </div>
  </div>
</template>

<script setup>
import { tilesMock } from "@/mockData/tiles";
import { ref } from "vue";

const tiles = ref(tilesMock);
console.log("home vue");
</script>

<style lang="scss" scoped>
@import "@/assets/fonts.scss";
.hello {
  &__tile {
    margin: 10px;
    width: 200px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px #eee solid;
    cursor: pointer;
    @include font-l;
  }
}
</style>
