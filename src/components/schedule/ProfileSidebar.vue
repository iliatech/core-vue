<template>
  <CustomSidebar ref="sidebar" :title="$lang.title.profile" close-button>
    <div class="profile-sidebar">
      <div>{{}}</div>
      <div>
        <label>
          {{ $lang.label.defaultInputTimezoneName }}
        </label>
        <Dropdown
          v-model="config.defaultInputTimezoneName"
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
          v-model="config.dashboardTimezoneName"
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

const appStore = useAppStore();

const scheduleStore = useScheduleStore();
const { config } = storeToRefs(scheduleStore);
const { saveSchedule } = scheduleStore;

const sidebar = ref();

const open = () => {
  sidebar.value.open();
};

const handleClickSave = () => {
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

.timezone-shift {
  margin-bottom: $px-10;
}

label {
  display: block;
  margin-bottom: $px-5;
}
</style>
