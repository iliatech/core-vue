import { defineStore } from "pinia";
import { ref } from "vue";
import type { Ref } from "vue";
import type { Client, ScheduleSlot } from "@/types/schedule";
import type { ScheduleDay } from "@/types/schedule";

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

  const schedule = ref<ScheduleDay[]>([
    {
      date: "12/Nov/2023",
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

  return {
    clients,
    schedule,
    addSlot,
  };
});
