<template>
  <UniversalSidebar
    ref="sidebar"
    :title="$lang.title.profile"
    close-button
    @click:close="handleClickClose"
    :position="isFullWidth ? 'full' : 'left'"
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
        <InputText
          v-model="authUserConfig.schedule.title"
          style="width: 100%"
        />
      </div>
      <div>
        <label>
          {{ $lang.label.defaultInputTimezoneName }}
        </label>
        <Dropdown
          v-model="authUserConfig.schedule.defaultInputTimezoneName"
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
          v-model="authUserConfig.schedule.dashboardTimezoneName"
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
  </UniversalSidebar>
</template>

<script setup lang="ts">
import UniversalSidebar from "@/components/sidebars/UniversalSidebar.vue";
import Dropdown from "primevue/dropdown";
import { ref } from "vue";
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
const { saveAuthUserConfig } = appStore;

defineProps({
  isFullWidth: Boolean,
});

const sidebar = ref();

let savedUserScheduleConfig: AuthUserScheduleConfig | null = null;

const open = () => {
  savedUserScheduleConfig = cloneDeep(authUserConfig.value.schedule);
  sidebar.value.open();
};

const handleClickSave = () => {
  saveAuthUserConfig();

  sidebar.value.close();
  showToast({
    type: ToastType.Success,
    text: lang.success.userConfigSaved,
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
