<template>
  <div class="schedule-view">
    <CredentialsDashboard />
  </div>
</template>
<script lang="ts" setup>
import CredentialsDashboard from "@/modules/credentials/components/CredentialsDashboard.vue";
</script>
<style lang="scss" scoped>
@import "@/assets/fonts";
@import "@/assets/variables";
.schedule-view {
  display: flex;
  justify-content: center;
  padding: $px-20;
}
</style>
