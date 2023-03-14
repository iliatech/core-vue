<template>
  <div v-if="isLoading" class="app-loader">
    <ProgressSpinner
      stroke-width="2"
      class="app-loader__content"
      :aria-label="$lang.loaderLabel"
    />
  </div>

  <RouterView />
</template>
<script lang="ts" setup>
import { RouterView } from "vue-router";
import ProgressSpinner from "primevue/progressspinner";

import { useAppStore } from "@/store/appStore";
import { storeToRefs } from "pinia";
const appStore = useAppStore();
const { isLoading } = storeToRefs(appStore);
</script>

<style lang="scss" scoped>
.app-loader {
  position: fixed;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.5);
  &__content {
    width: 70px;
    height: 70px;
  }
}
</style>
