<template>
  <div class="public-apps">
    <h3 class="public-apps__header">
      {{ $lang.title.publicFeatures }}
    </h3>
    <div class="public-apps__buttons-container">
      <Button
        :label="$lang.button.usefulLinks"
        @click="router.push(routes.usefulLinks.path)"
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
</script>
<style lang="scss" scoped>
@import "@/assets/variables";

.public-apps {
  display: flex;
  flex-direction: column;
  justify-content: center;

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
