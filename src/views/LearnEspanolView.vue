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
        {{ item.tabTitle ?? item.title }}
      </div>
      <div class="tabs-view__tabs-item-last">
        <UniversalButton
          v-if="actionLabel"
          @click="handleClickAction"
          :label="actionLabel"
        />
      </div>
    </div>
    <div class="tabs-view__content" :key="tabId">
      <RouterView />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import { wordsRoutes } from "@/settings/routes";
import { useRoute, useRouter } from "vue-router";
import UniversalButton from "@/components/buttons/UniversalButton.vue";

const router = useRouter();
const route = useRoute();

const tabId = ref<number>(0);

const actionLabel = computed(() => {
  return "Add Item";
});

const handleClickMenuItem = (routeName: string) => {
  // tabId.value++;
  router.push({ name: routeName });
};

const handleClickAction = () => {
  let action = null;

  switch (route.name) {
    case "learn-espanol.verbs":
      action = "add-item";
      break;
    case "learn-espanol.verbs-forms":
      action = "add-item";
      break;
    case "learn-espanol.verbs-pronombres":
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
    flex-wrap: wrap;
    gap: $px-20;
    align-items: center;
  }

  &__content {
    flex-grow: 1;
  }

  &__tabs-item {
    height: 22px;
    font-size: 0.875rem;
    line-height: 0.875rem;
    cursor: pointer;
    border-bottom: 2px solid #ccc;
    padding: 0 $px-10;
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
