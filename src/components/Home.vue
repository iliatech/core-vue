<template>
  <div class="home">
    <CategoryTile
      v-for="(category, index) in categories"
      :key="category.id"
      :data="category"
      :background-color="getPaletteColor(index)"
    />
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";
import { apiPaths } from "@/settings/api";
import Api from "@/api/Api";
import { getPaletteColor } from "@/settings/colorPalette";
import type { Category } from "@/types/category";
import CategoryTile from "@/components/CategoryTile.vue";
import { useAppStore } from "@/store/appStore";

const appStore = useAppStore();
const { startLoading, stopLoading } = appStore;

const categories = ref([] as Category[]);

onBeforeMount(async () => {
  startLoading();
  const result = await Api.request({
    path: apiPaths.category,
  });
  categories.value = result?.length ? (result as Category[]) : [];
  stopLoading();
});
</script>
