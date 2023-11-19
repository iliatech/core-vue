<template>
  <div class="schedule">
    <div class="schedule__top-bar">
      <div class="schedule__week-selector">
        <ScheduleButton
          @click="goPreviousWeek"
          :label="$lang.label.previousWeek"
          color="lightMagenta"
          icon-pre="caret-left"
        />
        <ScheduleButton
          @click="goNextWeek"
          :label="$lang.label.nextWeek"
          color="lightMagenta"
          icon-post="caret-right"
        />
      </div>
      <ScheduleButton
        @click="openClientsSidebar"
        :label="$lang.button.clients"
        color="lightBlue"
        icon-pre="cog"
      />
    </div>

    <div class="schedule__days-container">
      <div
        v-for="day in weekDays"
        :key="day.full"
        class="schedule__day"
        :class="{
          'schedule__day--weekend': [6, 7].includes(day.dayOfWeekNumber),
          'schedule__day--today': today === day.full,
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
            <ScheduleButton
              icon-pre="plus"
              @click="handleClickAddSlot(day.full)"
              no-border
            />
          </div>
          <ScheduleSlot
            v-for="slot in sortSlots(getDaySlots(day.full))"
            :key="`${slot.clientId}_${slot.time}`"
            :model-value="{ ...slot, date: day.full }"
            @click:delete="handleClickDeleteSlot"
            @click:edit="handleClickEditSlot"
          />
        </div>
      </div>
    </div>
  </div>

  <ScheduleClientsSidebar ref="clientsSidebar" />

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

  <TimeSlotDialog ref="slotDialog" />
</template>
<script lang="ts" setup>
import { computed, onBeforeMount, ref } from "vue";
import type { ScheduleDay } from "@/types/schedule";
import { useScheduleStore } from "@/store/scheduleStore";
import { storeToRefs } from "pinia";
import type { TimeSlotShort } from "@/types/schedule";
import { sortWithCollator } from "@/helpers/sort";
import { addDays, format } from "date-fns";
import ScheduleButton from "@/components/schedule/ScheduleButton.vue";
import ScheduleClientsSidebar from "@/components/schedule/ScheduleClientsSidebar.vue";
import ScheduleSlot from "@/components/schedule/ScheduleSlot.vue";
import TimeSlotDialog from "@/components/schedule/TimeSlotDialog.vue";
import ScheduleDialog from "@/components/schedule/ScheduleDialog.vue";
import { TimeSlot } from "@/types/schedule";

const scheduleStore = useScheduleStore();
const { schedule } = storeToRefs(scheduleStore);
const { loadSchedule, deleteSlot, getClientNameById } = scheduleStore;

const slotDialog = ref();
const clientsSidebar = ref();
let deleteSlotConfig = ref<TimeSlot | null>(null);
const deleteSlotDialog = ref();

const today = format(new Date(), "d/MMM/yyyy");
const currentMonday = ref<Date>(
  addDays(new Date(), 1 - Number(format(new Date(), "i")))
);

onBeforeMount(async () => {
  await loadSchedule();
});

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

const openClientsSidebar = () => {
  clientsSidebar.value.open();
};

const goPreviousWeek = () => {
  currentMonday.value = addDays(currentMonday.value, -7);
};

const goNextWeek = () => {
  currentMonday.value = addDays(currentMonday.value, 7);
};

const getDaySlots = (date: string) => {
  const dayIndex = schedule.value.findIndex((item) => item.date === date);

  if (dayIndex === -1) {
    return [];
  }

  return schedule.value[dayIndex].slots;
};

const sortSlots = (slots: TimeSlotShort[]) => {
  sortWithCollator(slots, "time");
  return slots;
};

const cancelDeleteSlot = () => {
  deleteSlotConfig.value = null;
};

const handleClickDeleteSlot = (slot: TimeSlot) => {
  deleteSlotConfig.value = slot;
  openConfirmDeleteDialog();
};

const handleClickAddSlot = (date: string) => {
  slotDialog.value.open(date);
};

const handleClickEditSlot = (slot: TimeSlot) => {
  slotDialog.value.open(slot.date, slot);
};

const openConfirmDeleteDialog = () => {
  deleteSlotDialog.value.open();
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables";
@import "@/assets/fonts";
@import "@/assets/colors";

.schedule {
  &__top-bar {
    display: flex;
    justify-content: space-between;
    margin-bottom: $px-20;
  }

  &__week-selector {
    display: flex;
    gap: $px-10;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
  }

  &__days-container {
    display: flex;
    gap: $px-20;
    flex-wrap: wrap;
  }

  &__day {
    @include zero-eight-hundred-seventy-five;
    min-width: 150px;
    border: 1px solid #888;
    border-radius: $px-2;
    padding-bottom: $px-10;
  }

  &__day--weekend {
    border-color: indianred;
  }

  &__day--today .schedule__day-title {
    font-weight: 600;
    font-size: 1.2rem;
  }

  &__day-title {
    height: 40px;
    border-bottom: 1px solid #888;
    padding: $px-10 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__day-title--weekend {
    border-bottom-color: indianred;
  }

  &__slots {
    display: flex;
    flex-direction: column;
    gap: $px-15;
    padding-top: $px-10;
    padding-bottom: $px-10;
  }

  &__slot-add {
    margin: 0 $px-30;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: forestgreen;
    cursor: pointer;
    :deep(.p-button-icon) {
      color: #333;
    }
  }
}
</style>
