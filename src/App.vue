<template>
  <Toast ref="toast" />
  <div v-if="isLoading" class="app-loader">
    <ProgressSpinner
      stroke-width="2"
      class="app-loader__content"
      :aria-label="$lang.label.loader"
    />
  </div>
  <div class="app-container">
    <TopToolbar />
    <div class="app-content">
      <RouterView />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { RouterView } from "vue-router";
import ProgressSpinner from "primevue/progressspinner";
import Toast from "primevue/toast";
import { useAppStore } from "@/store/appStore";
import { storeToRefs } from "pinia";
import { onBeforeMount, onMounted, ref } from "vue";
import { setGlobalToastObject } from "@/helpers/toast";
import TopToolbar from "@/components/toolbars/TopToolbar.vue";
import { useScheduleStore } from "@/store/scheduleStore";

const appStore = useAppStore();
const { isLoading } = storeToRefs(appStore);

const scheduleStore = useScheduleStore();
const { loadSchedule } = scheduleStore;

const toast = ref();

onBeforeMount(async () => {
  await loadSchedule();
});

onMounted(async () => {
  setGlobalToastObject(toast.value);
});
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.app-loader {
  position: fixed;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.5);
  &__content {
    width: 70px;
    height: 70px;
  }
}

.app-container {
  height: 100vh;
  margin: 0 auto !important;
  display: flex;
  flex-direction: column;
}

.app-content {
  padding: 0 $px-20;
}
</style>
