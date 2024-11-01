<template>
  <Toast ref="toast" />
  <div v-if="isLoading || isPersistentLoading" class="app-loader">
    <ProgressSpinner
      stroke-width="2"
      class="app-loader__content"
      :aria-label="$lang.label.loader"
    />
  </div>

  <div class="app-container">
    <AppHeader :is-public="isPublic" />
    <div class="app-content">
      <ErrorProcessing>
        <RouterView />
      </ErrorProcessing>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { RouterView, useRoute } from "vue-router";
import ProgressSpinner from "primevue/progressspinner";
import Toast from "primevue/toast";
import { useAppStore } from "@/store/appStore";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { setGlobalToastObject } from "@/helpers/toast";
import AppHeader from "@/components/toolbars/AppHeader.vue";
import ErrorProcessing from "@/components/error/ErrorProcessing.vue";
import { publicRouteNames } from "@/settings/routes";

const appStore = useAppStore();
const route = useRoute();
const { isLoading, isPersistentLoading } = storeToRefs(appStore);
const { loadAuthUser } = appStore;

const toast = ref();
const isPublic = ref<boolean | null>(null);

watch(route, async () => {
  if (!publicRouteNames.includes(route.name as string)) {
    await loadAuthUser();
    isPublic.value = false;
  } else {
    isPublic.value = true;
  }
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
  flex-grow: 1;
  padding-bottom: $px-40;
}
</style>
