import { defineStore } from "pinia";
import { ref } from "vue";
import type { Ref } from "vue";
import type { Client, ScheduleSlot } from "@/types/schedule";
import type { ScheduleDayItem } from "@/types/schedule";
import type { ScheduleSlotExtended } from "@/types/schedule";

export const useScheduleStore = defineStore("scheduleStore", () => {
  // TODO Remove mock data.
  const clients: Ref<Client[]> = ref([
    {
      id: "uuid1",
      name: "Ivan Ivanov",
    },
    {
      id: "uuid2",
      name: "Petr Petrov",
    },
  ]);

  const schedule = ref<ScheduleDayItem[]>([
    {
      date: "15/Nov/2023",
      slots: [
        {
          clientId: "uuid1",
          time: "17:00MSK",
        },
        {
          clientId: "uuid2",
          time: "16:00ESP",
        },
      ],
    },
  ]);

  const addSlot = (date: string, slot: ScheduleSlot) => {
    const day = schedule.value.find((item) => item.date === date);

    if (!day) {
      schedule.value.push({ date, slots: [slot] });
      return;
    }

    day.slots.push(slot);
  };

  const deleteSlot = (config: ScheduleSlotExtended | undefined | null) => {
    if (!config) {
      return;
    }

    const dayIndex = schedule.value.findIndex(
      (item) => item.date === config.date
    );

    if (dayIndex === -1) {
      return;
    }

    const slotIndex = schedule.value[dayIndex]?.slots.findIndex(
      (item) => item.time === config.time && item.clientId === config.clientId
    );

    if (slotIndex === -1) {
      return;
    }

    schedule.value[dayIndex].slots.splice(slotIndex, 1);
  };

  const getClientNameById = (id: string): string | undefined => {
    const client = clients.value.find((item) => item.id === id);
    return client?.name ?? undefined;
  };

  return {
    clients,
    schedule,
    addSlot,
    deleteSlot,
    getClientNameById,
  };
});
