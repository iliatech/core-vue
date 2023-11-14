<template>
  <div class="schedule-view">
    <ScheduleDashboard />
  </div>
</template>
<script lang="ts" setup>
import ScheduleDashboard from "@/components/schedule/ScheduleDashboard.vue";
</script>
<style lang="scss" scoped>
@import "@/assets/fonts";
@import "@/assets/variables";
.schedule-view {
  display: flex;
  justify-content: flex-start;
}
</style>
