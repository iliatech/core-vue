<template>
  <div class="tabs-view">
    <div class="tabs-view__tabs">
      <div
        class="tabs-view__tabs-item"
        :class="{
          'tabs-view__tabs-item--selected': item.name === route.name,
        }"
        v-for="item in wordsRoutes"
        :key="item.title"
        @click="handleClickMenuItem(item.name)"
      >
        {{ item.title }}
      </div>
      <div class="tabs-view__tabs-item-last">
        <UniversalButton
          v-if="actionLabel"
          @click="handleClickAction"
          :label="actionLabel"
        />
      </div>
    </div>
    <div class="tabs-view__content">
      <RouterView />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { LocalStorageKeys } from "@/settings/app";
import { computed, onMounted, ref } from "vue";
import type UniversalDialog from "@/components/dialogs/UniversalDialog.vue";
import { CredentialDatabase } from "@/modules/credentials/classes/CredentialDatabase";
import { wordsRoutes } from "@/settings/routes";
import { useRoute, useRouter } from "vue-router";
import UniversalButton from "@/components/buttons/UniversalButton.vue";

const router = useRouter();
const route = useRoute();

const actionLabel = computed(() => {
  // TODO Make universal.
  switch (route.name) {
    case "words-training.words":
      return "Add Word";
    default:
      return null;
  }
});

const handleClickMenuItem = (routeName: string) => {
  router.push({ name: routeName });
};

const handleClickAction = () => {
  let action = null;

  switch (route.name) {
    case "words-training.words":
      action = "add-item";
      break;
  }

  router.push({
    path: route.path,
    query: { action },
  });
};
</script>
<style lang="scss" scoped>
@import "@/assets/fonts";
@import "@/assets/variables";
.tabs-view {
  height: 100%;
  padding: 0 $px-60;
  display: flex;
  flex-direction: column;

  &__tabs {
    display: flex;
    margin-top: $px-10;
    margin-bottom: $px-20;
    padding: 0 0 $px-5;
    flex-wrap: wrap;
    gap: $px-20;
  }

  &__content {
    flex-grow: 1;
  }

  &__tabs-item {
    cursor: pointer;
    border-bottom: 2px solid #ccc;
    padding-left: $px-20;
    padding-right: $px-20;
    padding-bottom: $px-5;
  }

  &__tabs-item-last {
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
  }

  &__tabs-item--selected {
    font-weight: bold;
    border-bottom-color: #666;
  }
}
</style>
