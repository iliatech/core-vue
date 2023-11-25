<template>
  <div class="schedule-timeslot">
    <div class="schedule-timeslot__data">
      {{ prepareTime(modelValue.time) }}<br />
      {{ getClientNameById(modelValue.clientId) }}
    </div>
    <div v-if="modelValue.comment" class="schedule-timeslot__comment">
      {{ modelValue.comment }}
    </div>
    <div class="schedule-timeslot__actions">
      <MyButton
        icon-pre="trash"
        color="pink"
        no-border
        @click="handleClickDeleteSlot(modelValue)"
      />
      <MyButton
        icon-post="pencil"
        color="paleOrange"
        no-border
        @click="handleClickEditSlot(modelValue)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TimeSlot } from "@/types/schedule";
import type { PropType } from "vue";
import { useScheduleStore } from "@/store/scheduleStore";
import MyButton from "@/components/schedule/MyButton.vue";
import { parseSlotTime } from "@/helpers/schedule";
import { storeToRefs } from "pinia";
import { convertTime } from "@/helpers/timezone";

const scheduleStore = useScheduleStore();
const { userProfileConfig } = storeToRefs(scheduleStore);
const { getClientNameById } = scheduleStore;

const emit = defineEmits(["click:delete", "click:edit"]);

defineProps({
  modelValue: {
    type: Object as PropType<TimeSlot>,
    required: true,
  },
});

const handleClickDeleteSlot = (slot: TimeSlot) => {
  emit("click:delete", slot);
};

const handleClickEditSlot = (slot: TimeSlot) => {
  emit("click:edit", slot);
};

const prepareTime = (time: string) => {
  const [hours, minutes, timezone] = parseSlotTime(time);

  return `${convertTime(
    Number(hours),
    timezone,
    userProfileConfig.value.dashboardTimezoneName
  )}:${minutes} ${userProfileConfig.value.dashboardTimezoneName}`;
};
</script>

<style scoped lang="scss">
@import "@/assets/variables";
@import "@/assets/fonts";
@import "@/assets/colors";

.schedule-timeslot {
  margin: 0 $px-10;
  border: 1px solid $slot-border-color;
  position: relative;
  justify-content: center;
  line-height: 22px;

  &__data {
    padding: $px-15 $px-10 0;
    display: flex;
    justify-content: center;
    text-align: center;
  }

  &__actions {
    margin-top: $px-10;
    padding: $px-5 $px-10;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #eee;
  }

  &__delete-button {
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

  &__comment {
    margin: 0 auto;
    display: flex;
    text-align: center;
    justify-content: center;
    padding: 0 $px-10;
    font-style: italic;
    color: #333;
    white-space: initial;
    max-width: 120px;
  }
}
</style>
