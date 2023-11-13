<template>
  <ScheduleDialog
    :title="$lang.title.addSlot"
    ref="dialog"
    @cancel="handleCancel"
    @confirm="handleConfirm"
    not-close-on-confirm
  >
    <div class="schedule-slot-dialog">
      <div class="schedule-slot-dialog__date-time">
        <Dropdown
          v-model="hour"
          :options="generateHourOptions()"
          :placeholder="$lang.label.hour"
          :class="{ 'p-invalid': validated && !hour }"
        />
        <Dropdown
          v-model="minute"
          :options="generateMinuteOptions()"
          :placeholder="$lang.label.minute"
          :class="{ 'p-invalid': validated && !minute }"
        />
        <Dropdown
          v-model="timezone"
          :options="timezoneOptions"
          :placeholder="$lang.label.timezone"
          :class="{ 'p-invalid': validated && !timezone }"
        />
      </div>
      <div class="schedule-slot-dialog__client">
        <Dropdown
          v-model="client"
          :options="clients"
          :placeholder="$lang.label.client"
          :class="{ 'p-invalid': validated && !client }"
          option-label="name"
        />
      </div>
    </div>
  </ScheduleDialog>
</template>

<script setup lang="ts">
import ScheduleDialog from "@/components/schedule/ScheduleDialog.vue";
import { ref } from "vue";
import Dropdown from "primevue/dropdown";
import { useScheduleStore } from "@/store/scheduleStore";
import { storeToRefs } from "pinia";
import type { Client, ScheduleSlot } from "@/types/schedule";
import { parseSlotTime } from "@/helpers/schedule";

const scheduleStore = useScheduleStore();
const { clients } = storeToRefs(scheduleStore);
const { addSlot } = scheduleStore;

let selectedDate: string | null = null;
const timezoneOptions = ["ESP", "MSK"];

const dialog = ref();
const hour = ref<string | null>(null);
const minute = ref<string | null>(null);
const timezone = ref<string | null>(null);
const client = ref<Client | null>(null);
const validated = ref<boolean>(false);

const generateHourOptions = (): string[] => {
  const options = [];

  for (let hour = 8; hour <= 22; hour++) {
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
  client.value = null;
  validated.value = false;
};

const handleConfirm = () => {
  if (!selectedDate) {
    return;
  }

  if (!hour.value || !minute.value || !timezone.value || !client.value) {
    validated.value = true;
    return;
  }

  addSlot(selectedDate, {
    clientId: client.value.id,
    time: `${hour.value}:${minute.value}${timezone.value}`,
  });

  dialog.value.close();
  handleCancel();
};

const open = (date: string, slot?: ScheduleSlot) => {
  selectedDate = date;

  if (slot) {
    [hour.value, minute.value, timezone.value] = parseSlotTime(slot.time);

    const foundClient = clients.value.find((item) => item.id === slot.clientId);

    if (foundClient) {
      client.value = foundClient;
    }
  }

  dialog.value.open();
};

defineExpose({ open });
</script>

<style scoped lang="scss">
@import "@/assets/variables";
.schedule-slot-dialog {
  display: flex;
  flex-direction: column;
  gap: $px-10;

  &__date-time {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: $px-10;
  }

  &__client {
    :deep(.p-dropdown) {
      width: 100%;
    }
  }
}
</style>
