<template>
  <div class="category-tile" :style="{ backgroundColor }">
    <div class="categories__tile"></div>
    {{ data.title }}
  </div>
</template>
<script lang="ts" setup>
import Category from "@/components/Category.vue";

defineProps({
  data: Category,
  backgroundColor: String,
});
</script>
<style lang="scss" scoped>
@import "@/assets/fonts.scss";
@import "@/assets/variables.scss";

.category-tile {
  position: relative;
  aspect-ratio: $tile-aspect-ratio;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  @include font-l;
}
</style>
