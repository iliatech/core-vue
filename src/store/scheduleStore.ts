import { defineStore } from "pinia";
import { ref } from "vue";
import type {
  ApiTimeSlotResponse,
  Client,
  ScheduleConfig,
  ScheduleDayItem,
  SchedulePayload,
  TimeSlot,
  TimeSlotUpdate,
} from "@/types/schedule";
import Api from "@/api/Api";
import { apiPaths } from "@/settings/api";
import { RequestMethods } from "@/types/api";
import { TimeZoneName } from "@/settings/schedule";
import { showToast } from "@/helpers/toast";
import { ToastType } from "@/types/toasts";
import { lang } from "@/lang";
import { isNil, omitBy } from "lodash";

export const useScheduleStore = defineStore("scheduleStore", () => {
  const initialConfig = {
    scheduleTitle: undefined,
    defaultInputTimezoneName: TimeZoneName.Esp,
    dashboardTimezoneName: TimeZoneName.Esp,
  };

  const clients = ref<Client[]>([]);
  const schedule = ref<ScheduleDayItem[]>([]);
  const userProfileConfig = ref<ScheduleConfig>(initialConfig);
  const timeSlots = ref<ApiTimeSlotResponse[]>([]);

  const createSlot = async (slot: TimeSlot) => {
    await Api.request({
      path: apiPaths.timeSlot,
      method: RequestMethods.Post,
      payload: omitBy(slot, isNil),
      successCallback: async () => {
        await loadTimeSlots();
      },
    });
  };

  const updateSlot = async (slot: TimeSlotUpdate) => {
    console.log("US", slot);
    await Api.request({
      path: `${apiPaths.timeSlot}/${slot.id}`,
      method: RequestMethods.Put,
      payload: slot,
      successCallback: async () => {
        await loadTimeSlots();
      },
    });
  };

  const deleteSlot = async (timeSlot: ApiTimeSlotResponse | null) => {
    if (!timeSlot?.id) {
      return;
    }

    await Api.request({
      path: `${apiPaths.timeSlot}/${timeSlot.id}`,
      method: RequestMethods.Delete,
      successCallback: async () => {
        await loadTimeSlots();
      },
    });
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

  const updateClient = async (client: Client) => {
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
    await loadTimeSlots();
  };

  const loadSchedule = async () => {
    const data: SchedulePayload = await Api.request({
      path: apiPaths.schedule,
    });

    schedule.value = data.schedule ?? [];
    userProfileConfig.value = data.config ?? initialConfig;
  };

  const loadTimeSlots = async () => {
    timeSlots.value =
      (await Api.request({
        path: apiPaths.timeSlot,
      })) ?? [];
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
    timeSlots,
    loadClients,
    createClient,
    createSlot,
    archiveClient,
    deleteSlot,
    updateClient,
    updateSlot,
    getClientById,
    getClientNameById,
    loadSchedule,
    loadTimeSlots,
    saveSchedule,
  };
});
