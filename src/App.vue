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
    <AppHeader />
    <div class="app-content">
      <ErrorProcessing>
        <RouterView />
      </ErrorProcessing>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { RouterView, useRouter } from "vue-router";
import ProgressSpinner from "primevue/progressspinner";
import Toast from "primevue/toast";
import { useAppStore } from "@/store/appStore";
import { storeToRefs } from "pinia";
import { onBeforeMount, onMounted, ref } from "vue";
import { setGlobalToastObject } from "@/helpers/toast";
import AppHeader from "@/components/toolbars/AppHeader.vue";
import ErrorProcessing from "@/components/error/ErrorProcessing.vue";
import { publicRouteNames } from "@/settings/routes";

const appStore = useAppStore();
const route = useRouter();
const { isLoading, isPersistentLoading } = storeToRefs(appStore);
const { loadAuthUser } = appStore;

const toast = ref();

onBeforeMount(async () => {
  console.log(publicRouteNames);
  if (!publicRouteNames.includes(route.name)) {
    console.log("BU");
    //await loadAuthUser();
  }
});

onMounted(async () => {
  console.log("RN", route.currentRoute.value);
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
