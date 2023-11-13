<template>
  <div class="schedule">
    <div v-for="day in schedule" :key="day.date" class="schedule__day">
      <div class="schedule__day-title">
        {{ prepareDate(day.date) }}
      </div>
      <div class="schedule__slots">
        <div
          v-for="slot in sortSlots(day.slots)"
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
          {{ getClientNameById(slot.clientId) }}
        </div>
        <div class="schedule__slot-add" @click="handleClickAddSlot(day.date)">
          +
        </div>
      </div>
    </div>
  </div>
  <ScheduleDialog
    :title="$lang.title.confirmDeleteSlot"
    ref="deleteSlotDialog"
    @cancel="cancelDeleteSlot"
    @confirm="deleteSlot"
  >
    {{
      `${deleteSlotConfig?.date} ${deleteSlotConfig?.time} ${deleteSlotConfig?.clientId}`
    }}
  </ScheduleDialog>
  <ScheduleSlotDialog ref="slotDialog" />
</template>
<script lang="ts" setup>
import { ref } from "vue";
import ScheduleDialog from "@/components/schedule/ScheduleDialog.vue";
import ScheduleSlotDialog from "@/components/schedule/ScheduleSlotDialog.vue";
import type { DeleteSlotConfig } from "@/types/schedule";
import { useScheduleStore } from "@/store/scheduleStore";
import { storeToRefs } from "pinia";
import { ScheduleSlot } from "@/types/schedule";
import { sortWithCollator } from "@/helpers/sort";

const scheduleStore = useScheduleStore();
const { clients, schedule } = storeToRefs(scheduleStore);

const MOUSEDOWN_DELAY_TO_REMOVE_SLOT = 1_000;
let deleteSlotConfig = ref<DeleteSlotConfig | null>(null);

const deleteSlotDialog = ref();
const slotDialog = ref();

let pressTimer: number | undefined = undefined;

const handleMouseDownSlot = (config: DeleteSlotConfig) => {
  pressTimer = window.setTimeout(() => {
    // TODO
    //deleteSlotConfig.value = config;
    //openConfirmDeleteDialog();

    slotDialog.value.open(config.date, {
      time: config.time,
      clientId: config.clientId,
    });
  }, MOUSEDOWN_DELAY_TO_REMOVE_SLOT);
};

const handleMouseUpSlot = () => {
  clearTimeout(pressTimer);
};

const handleClickAddSlot = (date: string) => {
  slotDialog.value.open(date);
};

const deleteSlot = () => {
  const config = deleteSlotConfig.value;
  if (!config) {
    return;
  }

  const dayIndex = schedule.value.findIndex(
    (item) => item.date === config.date
  );

  if (dayIndex === -1) {
    return;
  }

  let slotIndex = schedule.value[dayIndex]?.slots.findIndex(
    (item) => item.time === config.time && item.clientId === config.clientId
  );

  if (slotIndex === -1) {
    return;
  }

  schedule.value[dayIndex].slots.splice(slotIndex, 1);
};

const openConfirmDeleteDialog = () => {
  deleteSlotDialog.value.open();
};

const cancelDeleteSlot = () => {
  deleteSlotConfig.value = null;
};

const prepareDate = (date: string) => {
  return date.substring(0, 6);
};

const getClientNameById = (id: string): string | undefined => {
  const client = clients.value.find((item) => item.id === id);
  return client?.name ?? undefined;
};

const sortSlots = (slots: ScheduleSlot[]) => {
  sortWithCollator(slots, "time");
  return slots;
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
