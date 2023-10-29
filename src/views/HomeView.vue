<template>
  <div class="home-page">
    <PrivateFeatures />
  </div>
</template>
<script lang="ts" setup>
import PrivateFeatures from "@/components/homePage/PrivateFeatures.vue";
import { useAppStore } from "@/store/appStore";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { isAuthorized } = storeToRefs(appStore);
</script>
<style lang="scss" scoped>
@import "@/assets/variables";
.home-page {
  margin-top: $px-15;
}
</style>
