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
        <IliaButton
          v-for="item in generateAvailableAppsList()"
          :key="item.label"
          :label="item.label"
          @click="router.push({ name: item.name })"
          color="superLightMagenta"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import router from "@/router";
import { generateAvailableAppsList } from "@/helpers/navigation";
import IliaButton from "@/components/schedule/IliaButton.vue";
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
