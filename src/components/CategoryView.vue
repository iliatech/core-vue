<template>
  <div class="category">
    <div class="category__title">{{ categoryName }}</div>
    <div class="category__buttons">
      <Button
        @click="onClickAdd"
        :label="$lang.explain"
        class="p-button-outlined p-button-rounded p-button-danger"
      />
      <Button
        @click="onClickBack"
        :label="$lang.back"
        class="p-button-outlined p-button-rounded button-grey-tough"
      />
    </div>
    <div class="category__content">
      <div class="category__section">
        <div class="category__section-title">
          {{ $lang.categoryContent.rest }}
        </div>
        USD: {{ rest.usd }}<br />
        GEL: {{ rest.gel }}
      </div>
      <div class="category__section">
        <div class="category__section-title">
          {{ $lang.categoryContent.spent }}
        </div>
        {{ $lang.categoryContent.currentWeek }}: {{ total.currentWeek }}<br />
        {{ $lang.categoryContent.previousWeek }}: {{ total.previousWeek }}<br />
        {{ $lang.categoryContent.currentMonth }}: {{ total.currentMonth }}<br />
        {{ $lang.categoryContent.previousMonth }}: {{ total.previousMonth }}
      </div>
      <div class="category__section">
        <div class="category__section-title">History:</div>
        <div
          v-for="historyItem in history"
          :key="
            historyItem.name +
            historyItem.currency +
            historyItem.name +
            historyItem.amount
          "
        >
          {{ historyItem.date }} / {{ historyItem.name }} /
          {{ historyItem.amount }}
          {{ historyItem.currency }}
        </div>
        <div v-if="!history.length">
          {{ $lang.emptyCategoryHistory }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from "primevue/button";

import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { routes } from "@/settings/routes";
import { computed, onBeforeMount, reactive } from "vue";
import { categoriesHistoryMock } from "@/mockData/categoriesHistory";
import type { CategoryHistory } from "@/types/category";
import { useTotalsStore } from "@/store/totalsStore";
import { useAppStore } from "@/store/appStore";

const route = useRoute();
const router = useRouter();
const categoryName = route.params.categoryName as string;
const totalsStore = useTotalsStore();
const appStore = useAppStore();

const { rest } = storeToRefs(totalsStore);
const { startLoading, stopLoading } = appStore;

const total = reactive({
  currentWeek: 0,
  previousWeek: 0,
  currentMonth: 0,
  previousMonth: 0,
});

onBeforeMount(() => {
  // It's a stub;
  startLoading();
  stopLoading();
});

const history = computed((): CategoryHistory => {
  return categoriesHistoryMock[categoryName] ?? [];
});

const onClickBack = (): void => {
  router.push(routes.home.path);
};

const onClickAdd = (): void => {
  console.log("add item");
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
@import "@/assets/fontMixins.scss";
.category {
  padding: $space-small;

  &__title {
    padding: 0 0 $space-small;
    @include font-extra-large;
  }

  &__buttons {
    display: flex;
    gap: $space-small;
  }

  &__content {
    padding: $space-medium 0;
    @include font-small-large;
  }

  &__section {
    padding-bottom: $space-small;
  }

  &__section-title {
    @include font-medium-bold;
  }
}
</style>
