<template>
  <Toast ref="toast" />
  <div v-if="isLoading" class="app-loader">
    <ProgressSpinner
      stroke-width="2"
      class="app-loader__content"
      :aria-label="$lang.label.loader"
    />
  </div>
  <div class="app-container"><RouterView /></div>
</template>
<script lang="ts" setup>
import { RouterView } from "vue-router";
import ProgressSpinner from "primevue/progressspinner";
import Toast from "primevue/toast";
import { useAppStore } from "@/store/appStore";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { setGlobalToastObject } from "@/helpers/toast";
import { useTagsStore } from "@/store/tagsStore";
const appStore = useAppStore();
const tagsStore = useTagsStore();

const { isLoading } = storeToRefs(appStore);
const { loadTags } = tagsStore;

const toast = ref();

onMounted(async () => {
  setGlobalToastObject(toast.value);
  await loadTags();
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
  margin: 0 auto !important;
}
</style>
