<template>
  <UniversalDrawer
    ref="sidebar"
    :title="$lang.title.userSettings"
    @click:close="handleClickClose"
    :position="isFullWidth ? 'full' : 'right'"
    close-button
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
    </div>
  </UniversalDrawer>
</template>

<script setup lang="ts">
import UniversalDrawer from "@/components/dialogs/UniversalDrawer.vue";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useAppStore } from "@/store/appStore";
import { profileSidebarSettings } from "@/settings/profileSidebarSettings";
import type { AuthUser } from "@/types/user";

const appStore = useAppStore();
const { user } = storeToRefs(appStore);

defineProps({
  isFullWidth: Boolean,
});

const sidebar = ref();

const open = () => {
  sidebar.value.open();
};

const handleClickClose = () => {
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

label {
  display: block;
  margin-bottom: $px-5;
}
</style>
