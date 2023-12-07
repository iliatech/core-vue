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
        {{ user?.[setting.name as keyof AuthUser] }}
      </div>
      <div class="subtitle">
        {{ $lang.title.scheduleSettings }}
      </div>
      <div>
        <label>
          {{ $lang.label.scheduleTitle }}
        </label>
        <InputText v-model="userScheduleConfig.title" style="width: 100%" />
      </div>
      <div>
        <label>
          {{ $lang.label.defaultInputTimezoneName }}
        </label>
        <Dropdown
          v-model="userScheduleConfig.defaultInputTimezoneName"
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
          v-model="userScheduleConfig.dashboardTimezoneName"
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
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { timeZones } from "@/settings/schedule";
import Button from "primevue/button";
import { useAppStore } from "@/store/appStore";
import { profileSidebarSettings } from "@/settings/profileSidebarSettings";
import InputText from "primevue/inputtext";
import { cloneDeep } from "lodash";
import { showToast } from "@/helpers/toast";
import { ToastType } from "@/types/toasts";
import { lang } from "@/lang";
import type { AuthUser, AuthUserScheduleConfig } from "@/types/user";

const appStore = useAppStore();
const { user, authUserConfig } = storeToRefs(appStore);

const sidebar = ref();

let savedUserScheduleConfig: AuthUserScheduleConfig | null = null;

const userScheduleConfig = computed(() => {
  return authUserConfig.value.schedule;
});

const open = () => {
  savedUserScheduleConfig = cloneDeep(userScheduleConfig.value);
  sidebar.value.open();
};

const handleClickSave = () => {
  // TODO: Add call to api saveAuthUserConfig.

  sidebar.value.close();
  showToast({
    type: ToastType.Success,
    text: lang.success.profileSettingsWereSaved,
  });
};

const handleClickClose = () => {
  if (!savedUserScheduleConfig) {
    return;
  }

  authUserConfig.value.schedule = savedUserScheduleConfig;
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
