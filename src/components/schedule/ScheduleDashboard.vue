<template>
  <div class="schedule">
    <div class="schedule__week-selector">
      <ScheduleButton
        @click="goPreviousWeek"
        :label="$lang.label.previousWeek"
        color="lightBlue"
        icon-pre="chevron-left"
      />
      <ScheduleButton
        @click="goNextWeek"
        :label="$lang.label.nextWeek"
        color="lightBlue"
        icon-post="chevron-right"
      />
    </div>
    <div class="schedule__container">
      <div
        v-for="day in weekDays"
        :key="day.full"
        class="schedule__day"
        :class="{
          'schedule__day--weekend': [6, 7].includes(day.dayOfWeekNumber),
        }"
      >
        <div
          class="schedule__day-title"
          :class="{
            'schedule__day-title--weekend': [6, 7].includes(
              day.dayOfWeekNumber
            ),
          }"
        >
          {{ day.short }}
        </div>
        <div class="schedule__slots">
          <div class="schedule__slot-add">
            <i class="pi pi-plus" @click="handleClickAddSlot(day.full)" />
          </div>
          <div
            v-for="slot in sortSlots(getDaySlots(day.full))"
            :key="`${slot.clientId}_${slot.time}`"
            class="schedule__slot"
            @mousedown="
              handleMouseDownSlot({
                date: day.full,
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
                  date: day.full,
                  time: slot.time,
                  clientId: slot.clientId,
                })
              "
            >
              -
            </div>
            {{ slot.time }}<br />
            {{ getClientNameById(slot.clientId) }}
          </div>
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
import { computed, ref } from "vue";
import ScheduleDialog from "@/components/schedule/ScheduleDialog.vue";
import ScheduleSlotDialog from "@/components/schedule/ScheduleSlotDialog.vue";
import type { ScheduleDay, ScheduleSlotExtended } from "@/types/schedule";
import { useScheduleStore } from "@/store/scheduleStore";
import { storeToRefs } from "pinia";
import { ScheduleSlot } from "@/types/schedule";
import { sortWithCollator } from "@/helpers/sort";
import { addDays, format } from "date-fns";
import ScheduleButton from "@/components/schedule/ScheduleButton.vue";

const scheduleStore = useScheduleStore();
const { schedule } = storeToRefs(scheduleStore);
const { deleteSlot, getClientNameById } = scheduleStore;

const MOUSEDOWN_DELAY_TO_REMOVE_SLOT = 1_000;
let deleteSlotConfig = ref<ScheduleSlotExtended | null>(null);

const deleteSlotDialog = ref();
const slotDialog = ref();

let pressTimer: number | undefined = undefined;
const currentMonday = ref<Date>(
  addDays(new Date(), 1 - Number(format(new Date(), "i")))
);

const weekDays = computed<ScheduleDay[]>(() => {
  const days: ScheduleDay[] = [];

  for (let i = 0; i < 7; i++) {
    const date = addDays(currentMonday.value, i);
    days.push({
      date,
      short: format(date, "E, d MMM"),
      full: format(date, "d/MMM/yyyy"),
      dayOfWeekNumber: Number(format(date, "i")),
    });
  }

  return days;
});

const goPreviousWeek = () => {
  currentMonday.value = addDays(currentMonday.value, -7);
};

const goNextWeek = () => {
  currentMonday.value = addDays(currentMonday.value, 7);
};

const getDaySlots = (date: string) => {
  console.log("X", date);
  const dayIndex = schedule.value.findIndex((item) => item.date === date);

  if (dayIndex === -1) {
    return [];
  }

  return schedule.value[dayIndex].slots;
};

const handleDeleteSlot = (config: ScheduleSlotExtended) => {
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
  &__container {
    max-width: 600px;
    display: flex;
    gap: $px-20;
  }

  &__week-selector {
    margin-bottom: $px-30;
    display: flex;
    gap: $px-30;
    align-items: center;
    font-size: 0.85rem;
  }

  &__day {
    @include zero-eight-hundred-seventy-five;
    min-width: 130px;
    border: 1px solid #d28fc5;
    border-radius: 2px;
    padding: $px-10 0;
  }

  &__day--weekend {
    border-color: #aaa;
  }

  &__day-title {
    border-bottom: 1px solid #d28fc5;
    padding-bottom: $px-10;
    text-align: center;
  }

  &__day-title--weekend {
    color: #888;
    border-bottom-color: #888;
  }

  &__slots {
    display: flex;
    flex-direction: column;
    gap: $px-15;
    padding-top: $px-10;
    padding-bottom: $px-10;
  }

  &__slot {
    margin: 0 $px-10;
    border: 1px solid $slot-border-color;
    padding: $px-15 $px-10 $px-10;
    position: relative;
    display: flex;
    justify-content: center;
    line-height: 22px;
  }

  &__slot-delete-button {
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 18px;
    font-size: 32px;
    color: red;
    cursor: pointer;
  }

  &__slot-add {
    margin: 0 $px-30;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #333;
    cursor: pointer;
    :deep(.p-button-icon) {
      color: #333;
    }
  }
}
</style>
