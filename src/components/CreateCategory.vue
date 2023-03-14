<template>
  <div class="create-category">
    <div class="create-category__title">
      {{ $lang.createCategory }}
    </div>
    <div class="create-category__top-buttons">
      <Button
        @click="onClickBack"
        :label="$lang.back"
        class="p-button-outlined p-button-rounded"
      />
    </div>
    <div class="create-category__content">[Add form here]</div>
    <div class="create-category__bottom-buttons">
      <Button
        @click="onClickCreate"
        :label="$lang.create"
        class="p-button-outlined p-button-rounded"
      />
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

const { startLoading, stopLoading } = appStore;

onBeforeMount(() => {
  // It's a stub;
  startLoading();
  stopLoading();
});

const onClickBack = (): void => {
  router.push(routes.home.path);
};

const onClickCreate = (): void => {
  console.log("it's a stub");
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
@import "@/assets/fonts.scss";

.create-category {
  padding: $space-s;

  &__title {
    padding: 0 0 $space-s;
    @include font-l;
  }

  &__top-buttons {
    display: flex;
    gap: $space-s;
  }

  &__content {
    margin-top: $space-s;
  }

  &__bottom-buttons {
    margin-top: $space-s;
    .p-button.p-button-outlined {
      color: $palette-lost-songs-1;
    }
  }
}
</style>
