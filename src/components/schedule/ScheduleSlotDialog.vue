<template>
  <ScheduleDialog
    :title="$lang.title.addSlot"
    ref="dialog"
    @cancel="handleCancel"
    @confirm="handleConfirm"
    class="schedule-slot-dialog"
  >
    <div class="schedule-slot-dialog__date-time">
      <Dropdown
        v-model="hour"
        :options="generateHourOptions()"
        :label="$lang.label.hour"
      />
      <Dropdown
        v-model="minute"
        :options="generateMinuteOptions()"
        :label="$lang.label.minute"
      />
    </div>
  </ScheduleDialog>
</template>

<script setup lang="ts">
import ScheduleDialog from "@/components/schedule/ScheduleDialog.vue";
import { ref } from "vue";
import Dropdown from "primevue/dropdown";

let day: string | null = null;

const dialog = ref();
const hour = ref<string | null>(null);
const minute = ref<string | null>(null);
const timezone = ref<string | null>(null);
const clientId = ref<string | null>(null);

const generateHourOptions = (): string[] => {
  const options = [];

  for (let hour = 7; hour <= 22; hour++) {
    const hourString = `${hour}`.length < 2 ? `0${hour}` : `${hour}`;
    options.push(hourString);
  }

  return options;
};

const generateMinuteOptions = (): string[] => {
  const options = [];

  for (let minute = 0; minute <= 55; minute += 5) {
    const minuteString = `${minute}`.length < 2 ? `0${minute}` : `${minute}`;
    options.push(minuteString);
  }

  return options;
};

const handleCancel = () => {
  hour.value = null;
  minute.value = null;
  timezone.value = null;
  clientId.value = null;
};

const handleConfirm = () => {
  // TODO
};

const open = (date: string) => {
  day = date;
  dialog.value.open();
};

defineExpose({ open });
</script>

<style scoped lang="scss">
.schedule-slot-dialog {
  &__date-time {
    display: flex;
  }
}
</style>
