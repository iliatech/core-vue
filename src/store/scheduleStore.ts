import { defineStore } from "pinia";
import { ref } from "vue";
import type {
  Client,
  ScheduleConfig,
  ScheduleDayItem,
  SchedulePayload,
  TimeSlot,
  TimeSlotShort,
} from "@/types/schedule";
import Api from "@/api/Api";
import { apiPaths } from "@/settings/api";
import { RequestMethods } from "@/types/api";
import { TimeZoneName } from "@/settings/schedule";
import { showToast } from "@/helpers/toast";
import { ToastType } from "@/types/toasts";
import { lang } from "@/lang";
import { sortWithCollator } from "@/helpers/sort";

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

  const loadClients = async () => {
    clients.value =
      (await Api.request({
        path: apiPaths.client,
      })) ?? [];
  };

  const createClient = async (name: string) => {
    await Api.request({
      path: apiPaths.client,
      method: RequestMethods.Post,
      payload: { name },
      successCallback: async () => {
        showToast({
          type: ToastType.Success,
          text: lang.success.clientCreated,
        });

        await loadClients();
      },
    });
  };

  const editClient = async (client: Client) => {
    await Api.request({
      path: `${apiPaths.client}/${client.id}`,
      method: RequestMethods.Put,
      payload: { name: client.name },
      successCallback: async () => {
        await loadClients();

        showToast({
          type: ToastType.Success,
          text: lang.success.clientUpdated,
        });
      },
    });
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

  const archiveClient = async (client: Client) => {
    await Api.request({
      path: `${apiPaths.client}/${client.id}`,
      method: RequestMethods.Patch,
      payload: { archived: true },
    });

    await loadClients();
  };

  const loadSchedule = async () => {
    const data: SchedulePayload = await Api.request({
      path: apiPaths.schedule,
    });

    schedule.value = data.schedule ?? [];
    userProfileConfig.value = data.config ?? initialConfig;
  };

  const saveSchedule = async () => {
    const payload: SchedulePayload = {
      clients: clients.value,
      schedule: schedule.value,
      config: userProfileConfig.value,
    };

    await Api.request({
      path: apiPaths.schedule,
      method: RequestMethods.Put,
      payload,
    });
  };

  return {
    clients,
    userProfileConfig,
    schedule,
    loadClients,
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
