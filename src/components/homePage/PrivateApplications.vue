<template>
  <div class="private-apps">
    <h3 class="private-apps__header">{{ $lang.title.privateFeatures }}</h3>
    <div class="private-apps__buttons-container">
      <Button
        :label="$lang.button.wordsApp"
        @click="router.push(routes.words.path)"
        text
        raised
        plain
      />
      <Button
        :label="authUserConfig.schedule.title"
        @click="router.push(routes.schedule.path)"
        text
        raised
        plain
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import Button from "primevue/button";
import router from "@/router";
import { routes } from "@/settings/routes";
import { useAppStore } from "@/store/appStore";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { authUserConfig } = storeToRefs(appStore);
</script>
<style lang="scss" scoped>
@import "@/assets/variables";
.private-apps {
  &__header {
    width: $main-page-buttons-width;
    text-align: center;
  }

  &__buttons-container {
    max-width: $main-page-buttons-width;
    display: flex;
    flex-direction: column;
    gap: $px-20;
  }
}
</style>
