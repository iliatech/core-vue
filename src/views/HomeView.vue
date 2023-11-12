<template>
  <div class="home-page">
    <PublicApplications />
    <PrivateApplications />
  </div>
</template>
<script lang="ts" setup>
import PrivateApplications from "@/components/homePage/PrivateApplications.vue";
import PublicApplications from "@/components/homePage/PublicApplications.vue";
</script>
<style lang="scss" scoped>
@import "@/assets/variables";
.home-page {
  margin-right: auto;
  margin-left: auto;
  margin-top: $px-15;
  display: flex;
  flex-direction: column;
  gap: $px-30;
  width: $main-page-buttons-width;
}
</style>
