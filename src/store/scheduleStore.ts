import { defineStore } from "pinia";
import type { Ref } from "vue";
import { ref } from "vue";
import type {
  Client,
  ScheduleDayItem,
  TimeSlotShort,
  TimeSlot,
} from "@/types/schedule";
import Api from "@/api/Api";
import { apiPaths } from "@/settings/api";
import { RequestMethods } from "@/types/api";
import { v4 as uuidv4 } from "uuid";
import { sortWithCollator } from "@/helpers/sort";

export const useScheduleStore = defineStore("scheduleStore", () => {
  const clients: Ref<Client[]> = ref([]);

  const schedule = ref<ScheduleDayItem[]>([]);

  const addSlot = (date: string, slot: TimeSlotShort) => {
    const day = schedule.value.find((item) => item.date === date);

    if (!day) {
      schedule.value.push({ date, slots: [slot] });
      return;
    }

    day.slots.push(slot);
  };

  const deleteSlot = async (config: TimeSlot | undefined | null) => {
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

    await saveSchedule();
  };

  const createClient = async (name: string) => {
    clients.value.push({ name, id: uuidv4() });

    await saveSchedule();
  };

  const getClientById = (id: string | undefined | null): Client | undefined => {
    if (!id) {
      return undefined;
    }

    const client = clients.value.find((item) => item.id === id);
    return client ?? undefined;
  };

  const getClientNameById = (
    id: string | undefined | null
  ): string | undefined => {
    if (!id) {
      return undefined;
    }

    const client = clients.value.find((item) => item.id === id);
    return client?.name ?? undefined;
  };

  const archiveClient = async (id: string) => {
    const client = clients.value.find((item) => item.id === id);

    if (client) {
      client.archived = true;
    }

    await saveSchedule();
  };

  const loadSchedule = async () => {
    const data = await Api.request({
      path: apiPaths.schedule,
    });

    clients.value = data.clients ?? [];
    schedule.value = data.schedule ?? [];

    sortWithCollator(clients.value, "name");
  };

  const saveSchedule = async () => {
    const payload = {
      clients: clients.value,
      schedule: schedule.value,
    };

    await Api.request({
      path: apiPaths.schedule,
      method: RequestMethods.Post,
      payload,
    });
  };

  return {
    clients,
    schedule,

    createClient,
    addSlot,
    archiveClient,
    deleteSlot,
    getClientById,
    getClientNameById,
    loadSchedule,
    saveSchedule,
  };
});
