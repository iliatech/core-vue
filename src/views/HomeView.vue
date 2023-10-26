<template>
  <TopToolbar :title="$lang.title.siteTitle" main-page-style />
  <div class="home-page">
    <PrivateFeatures v-if="isAuthorized" />
  </div>
</template>
<script lang="ts" setup>
import TopToolbar from "@/components/toolbars/TopToolbar.vue";
import PrivateFeatures from "@/components/homePage/PrivateFeatures.vue";
import { useAppStore } from "@/store/appStore";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { isAuthorized } = storeToRefs(appStore);
</script>
<style lang="scss" scoped>
@import "@/assets/variables";
.home-page {
  margin-top: $space-fifteen;
}
</style>
