import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";
import type {
  ApiTimeSlotResponse,
  Client,
  TimeSlotCreate,
  TimeSlotUpdate,
} from "@/types/schedule";
import Api from "@/api/Api";
import { apiPaths } from "@/settings/api";
import { RequestMethods } from "@/types/api";
import { showToast } from "@/helpers/toast";
import { ToastType } from "@/types/toasts";
import { lang } from "@/lang";
import { isNil, omitBy } from "lodash";
import { convertTime, parseSlotTime } from "@/helpers/schedule";
import { useAppStore } from "@/store/appStore";

export const useScheduleStore = defineStore("scheduleStore", () => {
  const appStore = useAppStore();
  const { authUserConfig } = storeToRefs(appStore);

  const clients = ref<Client[]>([]);
  const timeSlots = ref<ApiTimeSlotResponse[]>([]);

  const createTimeSlot = async (slot: TimeSlotCreate) => {
    await Api.request({
      path: apiPaths.timeSlot,
      method: RequestMethods.Post,
      payload: omitBy(slot, isNil),
      successCallback: async () => {
        await loadTimeSlots();
      },
    });
  };

  const updateTimeSlot = async (slot: TimeSlotUpdate) => {
    await Api.request({
      path: `${apiPaths.timeSlot}/${slot.id}`,
      method: RequestMethods.Put,
      payload: slot,
      successCallback: async () => {
        await loadTimeSlots();
      },
    });
  };

  const deleteTimeSlot = async (timeSlot: ApiTimeSlotResponse | null) => {
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

  const archiveClient = async (client: Client) => {
    await Api.request({
      path: `${apiPaths.client}/${client.id}`,
      method: RequestMethods.Patch,
      payload: { archived: true },
      successCallback: async () => {
        await loadClients();
        await loadTimeSlots();
      },
    });
  };

  const loadTimeSlots = async () => {
    timeSlots.value =
      (await Api.request({
        path: apiPaths.timeSlot,
      })) ?? [];
  };

  const prepareTime = (time?: string) => {
    if (!time) {
      throw new Error("Time is not specified for method.");
    }

    const timezoneName = authUserConfig.value.schedule.dashboardTimezoneName;
    const [hours, minutes, timezone] = parseSlotTime(time);

    return `${convertTime(
      Number(hours),
      timezone,
      timezoneName
    )}:${minutes} ${timezoneName}`;
  };

  return {
    clients,
    timeSlots,
    loadClients,
    createClient,
    createTimeSlot,
    archiveClient,
    deleteTimeSlot,
    updateClient,
    updateTimeSlot,
    loadTimeSlots,
    prepareTime,
  };
});
