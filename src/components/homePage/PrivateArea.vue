<template>
  <div class="private-area">
    <div class="private-area__container">
      <h3 class="private-area__header">
        {{ $lang.title.privateArea[0] }}
      </h3>
      <h4 class="private-area__header">
        {{ $lang.title.privateArea[1] }}<br />
        {{ $lang.title.privateArea[2] }}
      </h4>
      <div class="private-area__buttons-container">
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
        <Button
          :label="$lang.button.usefulLinks"
          @click="router.push(routes.usefulLinks.path)"
          text
          raised
          plain
        />
      </div>
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
.private-area {
  display: flex;
  justify-content: center;
  padding: $px-20;

  &__container {
    // Add some styles if needed.
  }

  &__header {
    width: $main-page-buttons-width;
    text-align: center;
    white-space: nowrap;
  }

  &__buttons-container {
    margin-top: $px-40;
    max-width: $main-page-buttons-width;
    display: flex;
    flex-direction: column;
    gap: $px-20;
  }
}
</style>
