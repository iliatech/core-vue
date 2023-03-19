<template>
  <div class="categories">
    <PlusTile @click="onClickPlus" />
    <CategoryTile
      v-for="(item, index) in categories"
      :key="item.id"
      :data="item"
      :background-color="getPaletteColor(index)"
      @click="onClickCategory(item.title)"
    />
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";
import { apiPaths } from "@/settings/api";
import Api from "@/api/Api";
import { getPaletteColor } from "@/settings/colorPalette";
import type { ApiCategory } from "@/types/category";
import CategoryTile from "@/components/CategoryTile.vue";
import { useAppStore } from "@/store/appStore";
import PlusTile from "@/components/PlusTile.vue";
import { routes } from "@/settings/routes";
import { useRouter } from "vue-router";

const router = useRouter();

const appStore = useAppStore();
const { startLoading, stopLoading } = appStore;

const categories = ref([] as ApiCategory[]);

onBeforeMount(async () => {
  startLoading();
  const result = await Api.request({
    path: apiPaths.category,
  });
  categories.value = result?.length ? (result as ApiCategory[]) : [];
  stopLoading();
});
const onClickCategory = (categoryTitle: string): void => {
  router.push(`${routes.category.path}/${categoryTitle}`);
};

const onClickPlus = (): void => {
  router.push(`${routes.createCategory.path}`);
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";

.categories {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $space-s;
  flex-wrap: wrap;
}
</style>
