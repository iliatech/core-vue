<template>
  <MyDialog
    :title="editMode ? $lang.title.editSlot : $lang.title.addSlot"
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
          :options="filteredClients"
          :placeholder="$lang.label.client"
          :class="{ 'p-invalid': validated && !client && !comment }"
          option-label="name"
          show-clear
        />
      </div>
      <InputText
        v-model="comment"
        :placeholder="lang.label.comment"
        :class="{ 'p-invalid': validated && !client && !comment }"
      />
    </div>
  </MyDialog>
</template>

<script setup lang="ts">
import MyDialog from "@/components/dialogs/MyDialog.vue";
import InputText from "primevue/inputtext";
import { computed, ref } from "vue";
import Dropdown from "primevue/dropdown";
import { useScheduleStore } from "@/store/scheduleStore";
import { storeToRefs } from "pinia";
import type { Client, TimeSlotShort, TimeSlot } from "@/types/schedule";
import { parseSlotTime, stringifySlotTime } from "@/helpers/schedule";
import { TimeZoneName } from "@/settings/schedule";
import { lang } from "@/lang";

const scheduleStore = useScheduleStore();
const { clients, userProfileConfig } = storeToRefs(scheduleStore);
const { addSlot, deleteSlot, saveSchedule } = scheduleStore;

let selectedDate: string | null = null;
let editSlotConfig: TimeSlot | null = null;
const timezoneOptions = [TimeZoneName.Esp, TimeZoneName.Msk, TimeZoneName.Geo];

const dialog = ref();
const hour = ref<string | null>(null);
const minute = ref<string | null>(null);
const timezone = ref<string | null>(
  userProfileConfig.value.defaultInputTimezoneName
);
const client = ref<Client | null>(null);
const comment = ref();
const validated = ref<boolean>(false);
const editMode = ref<boolean>(false);

const filteredClients = computed<Client[]>(() => {
  return clients.value.filter((item) => !item.archived);
});

const generateHourOptions = (): string[] => {
  const options = [];

  const getHourString = (hour: number): string =>
    `${hour}`.length < 2 ? `0${hour}` : `${hour}`;

  for (let hour = 8; hour <= 23; hour++) {
    options.push(getHourString(hour));
  }

  for (let hour = 0; hour <= 7; hour++) {
    options.push(getHourString(hour));
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
  // TODO
};

const handleConfirm = async () => {
  if (!selectedDate) {
    return;
  }

  if (
    !hour.value ||
    !minute.value ||
    !timezone.value ||
    (!client.value && !comment.value)
  ) {
    validated.value = true;
    return;
  }

  if (editSlotConfig) {
    await deleteSlot(editSlotConfig);
  }

  addSlot(selectedDate, {
    clientId: client.value?.id ?? null,
    time: stringifySlotTime(hour.value, minute.value, timezone.value),
    comment: comment.value,
  });

  await saveSchedule();

  dialog.value.close();
  handleCancel();
};

const open = (date: string, slot?: TimeSlotShort) => {
  hour.value = null;
  minute.value = null;
  timezone.value = userProfileConfig.value.defaultInputTimezoneName;
  comment.value = undefined;
  client.value = null;
  validated.value = false;

  selectedDate = date;

  editMode.value = !!slot;

  console.log("SL", slot);

  if (slot) {
    [hour.value, minute.value, timezone.value] = parseSlotTime(slot.time);

    const foundClient = clients.value.find((item) => item.id === slot.clientId);

    if (foundClient) {
      client.value = foundClient;
    }

    comment.value = slot.comment;

    editSlotConfig = { date, ...slot };
  } else {
    editSlotConfig = null;
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
