<template>
  <div class="home-page">
    <PrivateArea v-if="isAuthorized" />
    <PublicArea v-else />
  </div>
</template>
<script lang="ts" setup>
import PrivateArea from "@/components/homePage/PrivateArea.vue";
import PublicArea from "@/components/homePage/PublicArea.vue";
import { useAppStore } from "@/store/appStore";

const appStore = useAppStore();

const { isAuthorized } = appStore;
</script>
<style lang="scss" scoped>
@import "@/assets/variables";
.home-page {
  // Add styles if needed.
}
</style>
