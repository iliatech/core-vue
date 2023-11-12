<template>
  <div class="schedule-view">
    <ScheduleTable />
  </div>
</template>
<script lang="ts" setup>
import ScheduleTable from "@/components/schedule/ScheduleTable.vue";
</script>
<style lang="scss" scoped>
@import "@/assets/fonts";
@import "@/assets/variables";
.schedule-view {
  display: flex;
  justify-content: center;
}
</style>
