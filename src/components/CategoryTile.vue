<template>
  <div
    class="category-tile"
    @click="onClickCategory(data.title)"
    :style="{ backgroundColor }"
  >
    <div class="categories__tile"></div>
    {{ data.title }}
  </div>
</template>
<script lang="ts" setup>
import Category from "@/components/Category.vue";
import { routes } from "@/settings/routes";
import { useRouter } from "vue-router";

const router = useRouter();

defineProps({
  data: Category,
  backgroundColor: String,
});

const onClickCategory = (categoryTitle: string): void => {
  router.push(`${routes.category.path}/${categoryTitle}`);
};
</script>
<style lang="scss" scoped>
@import "@/assets/fonts.scss";
@import "@/assets/variables.scss";

.category-tile {
  position: relative;
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
</style>
