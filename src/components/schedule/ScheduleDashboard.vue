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
          <div
            class="schedule__slot-delete-button"
            @click="
              handleDeleteSlot({
                date: day.date,
                time: slot.time,
                clientId: slot.clientId,
              })
            "
          ></div>
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
    @confirm="deleteSlot(deleteSlotConfig)"
  >
    {{ $lang.label.client }}:
    {{ getClientNameById(deleteSlotConfig?.clientId) }}
    <br />
    {{ $lang.label.date }}:
    {{ deleteSlotConfig?.date }}
    <br />
    {{ $lang.label.time }}:
    {{ deleteSlotConfig?.time }}
  </ScheduleDialog>
  <ScheduleSlotDialog ref="slotDialog" />
</template>
<script lang="ts" setup>
import { ref } from "vue";
import ScheduleDialog from "@/components/schedule/ScheduleDialog.vue";
import ScheduleSlotDialog from "@/components/schedule/ScheduleSlotDialog.vue";
import type { ScheduleSlotExtended } from "@/types/schedule";
import { useScheduleStore } from "@/store/scheduleStore";
import { storeToRefs } from "pinia";
import { ScheduleSlot } from "@/types/schedule";
import { sortWithCollator } from "@/helpers/sort";

const scheduleStore = useScheduleStore();
const { schedule } = storeToRefs(scheduleStore);
const { deleteSlot, getClientNameById } = scheduleStore;

const MOUSEDOWN_DELAY_TO_REMOVE_SLOT = 1_000;
let deleteSlotConfig = ref<ScheduleSlotExtended | null>(null);

const deleteSlotDialog = ref();
const slotDialog = ref();

let pressTimer: number | undefined = undefined;

const handleDeleteSlot = (config: ScheduleSlotExtended) => {
  console.log("D", config);
  deleteSlotConfig.value = config;
  openConfirmDeleteDialog();
};

const handleMouseDownSlot = (config: ScheduleSlotExtended) => {
  pressTimer = window.setTimeout(() => {
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

const openConfirmDeleteDialog = () => {
  deleteSlotDialog.value.open();
};

const cancelDeleteSlot = () => {
  deleteSlotConfig.value = null;
};

const prepareDate = (date: string) => {
  return date.substring(0, 6);
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
    position: relative;
  }

  &__slot-delete-button {
    position: absolute;
    right: 0;
    top: 0;
    width: 7px;
    height: 7px;
    background: red;
    cursor: pointer;
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
