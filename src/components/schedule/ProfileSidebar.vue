<template>
  <CustomSidebar
    ref="sidebar"
    :title="$lang.title.profile"
    close-button
    @click:close="handleClickClose"
  >
    <div class="profile-sidebar">
      <div
        v-for="setting in profileSidebarSettings.userMeta"
        :key="`${setting.label}_${setting.name}`"
      >
        <label>
          {{ setting.label }}
        </label>
        {{ user?.[setting.name as keyof AuthorizedUser] }}
      </div>
      <div class="subtitle">
        {{ $lang.title.scheduleSettings }}
      </div>
      <div>
        <label>
          {{ $lang.label.scheduleTitle }}
        </label>
        <InputText
          v-model="userProfileConfig.scheduleTitle"
          style="width: 100%"
        />
      </div>
      <div>
        <label>
          {{ $lang.label.defaultInputTimezoneName }}
        </label>
        <Dropdown
          v-model="userProfileConfig.defaultInputTimezoneName"
          :options="timeZones"
          option-label="name"
          option-value="name"
        />
      </div>
      <div>
        <label>
          {{ $lang.label.dashboardTimezoneName }}
        </label>
        <Dropdown
          v-model="userProfileConfig.dashboardTimezoneName"
          :options="timeZones"
          option-label="name"
          option-value="name"
        />
      </div>
    </div>
    <template #buttons-after>
      <Button
        @click="handleClickSave"
        :label="$lang.button.save"
        class="save-button"
        outlined
      />
    </template>
  </CustomSidebar>
</template>

<script setup lang="ts">
import CustomSidebar from "@/components/sidebars/CustomSidebar.vue";
import Dropdown from "primevue/dropdown";
import { ref } from "vue";
import { useScheduleStore } from "@/store/scheduleStore";
import { storeToRefs } from "pinia";
import { timeZones } from "@/settings/schedule";
import Button from "primevue/button";
import { useAppStore } from "@/store/appStore";
import { profileSidebarSettings } from "@/settings/profileSidebarSettings";
import InputText from "primevue/inputtext";
import type { ScheduleConfig } from "@/types/schedule";
import { cloneDeep } from "lodash";
import { showToast } from "@/helpers/toast";
import { ToastType } from "@/types/toasts";
import { lang } from "@/lang";
import type { AuthorizedUser } from "@/types/user";

const appStore = useAppStore();
const { user } = storeToRefs(appStore);

const scheduleStore = useScheduleStore();
const { userProfileConfig } = storeToRefs(scheduleStore);
const { saveSchedule } = scheduleStore;

const sidebar = ref();

let savedUserProfileConfig: ScheduleConfig | null = null;

const open = () => {
  savedUserProfileConfig = cloneDeep(userProfileConfig.value);
  sidebar.value.open();
};

const handleClickSave = () => {
  saveSchedule();
  sidebar.value.close();
  showToast({
    type: ToastType.Success,
    text: lang.success.profileSettingsWereSaved,
  });
};

const handleClickClose = () => {
  if (!savedUserProfileConfig) {
    return;
  }

  userProfileConfig.value = savedUserProfileConfig;
};

defineExpose({ open });
</script>

<style lang="scss" scoped>
@import "@/assets/variables";
.profile-sidebar {
  display: flex;
  flex-direction: column;
  gap: $px-20;
}

.subtitle {
  font-weight: bold;
}

.timezone-shift {
  margin-bottom: $px-10;
}

label {
  display: block;
  margin-bottom: $px-5;
}
</style>
