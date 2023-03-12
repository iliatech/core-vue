<template>
  <div class="hello">
    <div
      v-for="(category, index) in categories"
      :key="category.id"
      class="hello__tile"
      :style="{ background: getPaletteColor(index) }"
      @click="onClickCategory(category.id)"
    >
      {{ category.title }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";
import { routes } from "@/settings/routes";
import { useRouter } from "vue-router";
import { apiPaths } from "@/settings/api";
import Api from "@/api/Api";
import { getPaletteColor } from "@/settings/colorPalette";

const router = useRouter();
const categories = ref([]);

onBeforeMount(async () => {
  const result = await Api.request<any>({
    path: apiPaths.category,
  });
  categories.value = result?.length ? result : [];
});

const onClickCategory = (tileName: string): void => {
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
