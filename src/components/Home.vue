<template>
  <div class="hello">
    <div
      v-for="tile in tiles"
      :key="tile.title"
      class="hello__tile"
      :style="{ background: tile.color }"
      @click="onClickTile(tile.name)"
    >
      {{ tile.title }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { tilesMock } from "@/mockData/tiles";
import { ref } from "vue";
import { routes } from "@/settings/routes";
import { useRouter } from "vue-router";

const router = useRouter();
const tiles = ref(tilesMock);

const onClickTile = (tileName: string): void => {
  router.push(`${routes.category.path}/${tileName}`);
};
</script>

<style lang="scss" scoped>
@import "@/assets/fonts.scss";
@import "@/assets/variables.scss";

.hello {
  &__tile {
    margin: $space-s;
    width: $tile-width;
    height: $tile-height;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px #eee solid;
    cursor: pointer;
    @include font-l;
  }
}
</style>
