import { defineStore } from "pinia";
import { ref } from "vue";
import type {
  Client,
  ScheduleDayItem,
  TimeSlotShort,
  TimeSlot,
  SchedulePayload,
  ScheduleConfig,
} from "@/types/schedule";
import Api from "@/api/Api";
import { apiPaths } from "@/settings/api";
import { RequestMethods } from "@/types/api";
import { v4 as uuidv4 } from "uuid";
import { sortWithCollator } from "@/helpers/sort";
import { TimeZoneName } from "@/settings/schedule";

export const useScheduleStore = defineStore("scheduleStore", () => {
  const initialConfig = {
    scheduleTitle: undefined,
    defaultInputTimezoneName: TimeZoneName.Esp,
    dashboardTimezoneName: TimeZoneName.Esp,
  };

  const clients = ref<Client[]>([]);
  const schedule = ref<ScheduleDayItem[]>([]);
  const userProfileConfig = ref<ScheduleConfig>(initialConfig);

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

  const editClient = async (inputClient: Client) => {
    const client = clients.value.find((item) => item.id === inputClient.id);

    if (client) {
      client.name = inputClient.name;
      await saveSchedule();
    }
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
    const data: SchedulePayload = await Api.request({
      path: apiPaths.schedule,
    });

    clients.value = data.clients ?? [];
    schedule.value = data.schedule ?? [];
    userProfileConfig.value = data.config ?? initialConfig;

    sortWithCollator(clients.value, "name");
  };

  const saveSchedule = async () => {
    const payload: SchedulePayload = {
      clients: clients.value,
      schedule: schedule.value,
      config: userProfileConfig.value,
    };

    await Api.request({
      path: apiPaths.schedule,
      method: RequestMethods.Post,
      payload,
    });
  };

  return {
    clients,
    userProfileConfig,
    schedule,
    createClient,
    addSlot,
    archiveClient,
    deleteSlot,
    editClient,
    getClientById,
    getClientNameById,
    loadSchedule,
    saveSchedule,
  };
});
