<template>
  <div class="schedule">
    <div v-for="day in days" :key="day.date" class="schedule__day">
      <div class="schedule__day-title">
        {{ schedule.prepareDate(day.date) }}
      </div>
      <div class="schedule__slots">
        <div
          v-for="slot in day.slots"
          :key="slot.clientId + slot.time"
          class="schedule__slot"
        >
          {{ slot.time }}<br />
          {{ schedule.getClientNameById(slot.clientId) }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import type { ScheduleDay } from "@/types/schedule";
import { Schedule } from "@/classes/Schedule";

const schedule = new Schedule();

const days = ref<ScheduleDay[]>([
  {
    date: "12/Nov/2023",
    slots: [
      {
        clientId: "uuid1",
        time: "17:00",
      },
      {
        clientId: "uuid2",
        time: "16:00",
      },
    ],
  },
]);
</script>
<style lang="scss" scoped>
@import "@/assets/variables";
@import "@/assets/fonts";
.schedule {
  max-width: 600px;

  &__day {
    @include zero-eight-hundred-seventy-five;
    width: 110px;
    background: #dbcbd8;
    padding: $px-10 $px-10 $px-15;
  }

  &__day-title {
    margin-bottom: $px-10;
  }

  &__slots {
    display: flex;
    flex-direction: column;
    gap: $px-10;
  }

  &__slot {
    background: #aaa;
    padding: $px-5 $px-10;
  }
}
</style>
