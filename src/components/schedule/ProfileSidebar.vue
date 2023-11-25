<template>
  <CustomSidebar ref="sidebar" :title="$lang.title.profile" close-button>
    <div class="profile-sidebar">
      <div
        v-for="setting in profileSidebarSettings.userMeta"
        :key="`${setting.label}_${setting.name}`"
      >
        <label>
          {{ setting.label }}
        </label>
        {{ user[setting.name] }}
      </div>
      <div class="subtitle">
        {{ $lang.title.scheduleSettings }}
      </div>
      <div>
        <label>
          {{ $lang.label.scheduleTitle }}
        </label>
        <InputText v-model="scheduleTitle" style="width: 100%" />
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

const appStore = useAppStore();
const { user } = storeToRefs(appStore);

const scheduleStore = useScheduleStore();
const { userProfileConfig } = storeToRefs(scheduleStore);
const { saveSchedule } = scheduleStore;

const sidebar = ref();
const scheduleTitle = ref();

const open = () => {
  scheduleTitle.value = userProfileConfig.value.scheduleTitle;
  sidebar.value.open();
};

const handleClickSave = () => {
  userProfileConfig.value.scheduleTitle = scheduleTitle.value;
  saveSchedule();
  sidebar.value.close();
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
