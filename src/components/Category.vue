<template>
  <div class="category">
    <div class="category__title">{{ $lang.category }}: {{ categoryName }}</div>
    <Button
      @click="onClickBack"
      :label="$lang.back"
      class="p-button-outlined p-button-rounded"
    />
    <div class="category__content">
      <b>{{ $lang.categoryContent.spent }}</b
      >: {{ $lang.categoryContent.currentWeek }}: {{ total.currentWeek }}<br />
      {{ $lang.categoryContent.previousWeek }}: {{ total.previousWeek }}<br />
      {{ $lang.categoryContent.currentMonth }}: {{ total.currentMonth }}<br />
      {{ $lang.categoryContent.previousMonth }}: {{ total.previousMonth }}
      <div class="category__history">
        <div class="category__history-title">History:</div>
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
import { routes } from "@/settings/routes";
import { computed, reactive, ref } from "vue";
import { categoriesHistoryMock } from "@/mockData/categoriesHistory";
import type { CategoryHistory, CategoryHistoryItem } from "@/types/category";
const route = useRoute();
const router = useRouter();
const categoryName = route.params.categoryName as string;

const total = reactive({
  currentWeek: 0,
  previousWeek: 0,
  currentMonth: 0,
  previousMonth: 0,
});

const history = computed((): CategoryHistory => {
  return categoriesHistoryMock[categoryName] ?? [];
});

const onClickBack = (): void => {
  router.push(routes.home.path);
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
@import "@/assets/fonts.scss";
.category {
  padding: $space-s;

  &__title {
    padding: 0 0 $space-s;
    @include font-l;
  }

  &__content {
    padding: $space-m 0;
    @include font-m;
  }

  &__history {
    padding-top: $space-s;
    @include font-sm;
  }

  &__history-title {
    @include font-m-b;
  }
}
</style>
