<template>
  <div class="schedule-view">
    <ScheduleDashboard />
  </div>
</template>
<script lang="ts" setup>
import ScheduleDashboard from "@/modules/schedule/components/ScheduleDashboard.vue";
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
