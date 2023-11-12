<template>
  <div class="schedule">
    <div v-for="day in days" :key="day.date" class="schedule__day">
      <div class="schedule__day-title">
        {{ schedule.prepareDate(day.date) }}
      </div>
      <div class="schedule__slots">
        <div
          v-for="slot in schedule.sortSlots(day.slots)"
          :key="slot.clientId + slot.time"
          class="schedule__slot"
          @mousedown="
            handleMouseDownSlot({
              date: day.date,
              time: slot.time,
              clientId: slot.clientId,
            })
          "
          @mouseup="handleMouseUpSlot"
        >
          {{ slot.time }}<br />
          {{ schedule.getClientNameById(slot.clientId) }}
        </div>
        <div class="schedule__slot-add" @click="handleClickSlot">+</div>
      </div>
    </div>
  </div>
  <ScheduleConfirmDialog
    :title="$lang.title.confirmDeleteSlot"
    :message="`${deleteSlotConfig?.date} ${deleteSlotConfig?.time} ${deleteSlotConfig?.clientId}`"
    ref="deleteSlotDialog"
    @cancel="cancelDeleteSlot"
    @confirm="deleteSlot"
  />
</template>
<script lang="ts" setup>
import { ref } from "vue";
import type { ScheduleDay } from "@/types/schedule";
import { Schedule } from "@/classes/Schedule";
import ScheduleConfirmDialog from "@/components/schedule/ScheduleConfirmDialog.vue";

interface DeleteSlotConfig {
  date: string;
  time: string;
  clientId: string;
}

const schedule = new Schedule();
const MOUSEDOWN_DELAY_TO_REMOVE_SLOT = 1_000;
let deleteSlotConfig = ref<DeleteSlotConfig | null>(null);

const deleteSlotDialog = ref();

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

let pressTimer: number | undefined = undefined;

const handleMouseDownSlot = (config: DeleteSlotConfig) => {
  pressTimer = window.setTimeout(() => {
    deleteSlotConfig.value = config;
    openConfirmDeleteDialog();
  }, MOUSEDOWN_DELAY_TO_REMOVE_SLOT);
};

const handleMouseUpSlot = () => {
  clearTimeout(pressTimer);
};

const handleClickSlot = () => {
  console.log("handle click slot");
};

const deleteSlot = () => {
  const config = deleteSlotConfig.value;
  if (!config) {
    return;
  }

  const dayIndex = days.value.findIndex((item) => item.date === config.date);

  if (dayIndex === -1) {
    return;
  }

  let slotIndex = days.value[dayIndex]?.slots.findIndex(
    (item) => item.time === config.time && item.clientId === config.clientId
  );

  if (slotIndex === -1) {
    return;
  }

  days.value[dayIndex].slots.splice(slotIndex, 1);
};

const openConfirmDeleteDialog = () => {
  deleteSlotDialog.value.open();
};

const cancelDeleteSlot = () => {
  deleteSlotConfig.value = null;
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables";
@import "@/assets/fonts";
@import "@/assets/colors";
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
    background: $slot-background;
    padding: $px-5 $px-10;
  }

  &__slot-add {
    background: #999;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    cursor: pointer;
  }
}
</style>
