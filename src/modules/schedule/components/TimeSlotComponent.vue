<template>
  <div class="schedule-timeslot">
    <div class="schedule-timeslot__data">
      <div>
        {{ prepareTime(modelValue.time) }}
      </div>
      <div v-if="modelValue.client">
        {{ modelValue.client.name }}
      </div>
    </div>
    <div v-if="modelValue.comment" class="schedule-timeslot__comment">
      {{ modelValue.comment }}
    </div>
    <div class="schedule-timeslot__actions">
      <IliaButton
        icon-pre="trash"
        color="pink"
        no-border
        @click="handleClickDeleteSlot(modelValue)"
      />
      <IliaButton
        icon-post="pencil"
        color="paleOrange"
        no-border
        @click="handleClickEditSlot(modelValue)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ApiTimeSlotResponse } from "@/types/schedule";
import type { PropType } from "vue";
import { useScheduleStore } from "@/store/scheduleStore";
import IliaButton from "@/components/buttons/IliaButton.vue";

const scheduleStore = useScheduleStore();
const { prepareTime } = scheduleStore;

const emit = defineEmits(["click:delete", "click:edit"]);

defineProps({
  modelValue: {
    type: Object as PropType<ApiTimeSlotResponse>,
    required: true,
  },
});

const handleClickDeleteSlot = (slot: ApiTimeSlotResponse) => {
  emit("click:delete", slot);
};

const handleClickEditSlot = (slot: ApiTimeSlotResponse) => {
  emit("click:edit", slot);
};
</script>

<style scoped lang="scss">
@import "@/assets/variables";
@import "@/assets/fonts";
@import "@/assets/colors";

.schedule-timeslot {
  margin: 0 $px-10;
  border: 1px solid $slot-border-color;
  border-radius: $px-4;
  position: relative;
  justify-content: center;
  line-height: 22px;

  &__data {
    padding: $px-15 $px-10 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
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
