<template>
  <div class="words-view">
    <div class="words-view__top">
      <div>
        {{ $lang.selectSorting }}:
        <Dropdown
          v-model="selectedSorting"
          :options="sortingOptions"
          :placeholder="$lang.selectSorting"
          option-label="label"
          option-value="value"
        />
      </div>
      <div>
        <Dropdown
          v-model="selectedSortingDirection"
          :options="sortingDirectionOptions"
          :placeholder="$lang.selectSortingDirection"
          option-label="label"
          option-value="value"
        />
      </div>
    </div>
    <div class="words">
      <PlusTile @click="onClickPlus" />
      <WordTile
        v-for="(item, index) in wordsSorted"
        :key="item.id"
        :data="item"
        :background-color="getPaletteColor(index)"
        @on-click="onClickWord(item.id)"
        @on-click-delete="onClickDelete(item)"
      />
    </div>
  </div>
  <BasicDialog
    v-model="deleteItem"
    :type="DialogType.Confirm"
    :text="lang.confirmDeleteWordTitle(deleteItem?.title ?? '')"
    @on-cancel="onCancelDelete"
    @on-confirm="onConfirmDelete"
  />
</template>

<script lang="ts" setup>
import type { Ref } from "vue";
import { computed, onBeforeMount, ref } from "vue";
import { apiPaths } from "@/settings/api";
import Api from "@/api/Api";
import { getPaletteColor } from "@/settings/colorPalette";
import type { ApiWord } from "@/types/wordType";
import WordTile from "@/components/WordTile.vue";
import { useAppStore } from "@/store/appStore";
import PlusTile from "@/components/PlusTile.vue";
import { routes } from "@/settings/routes";
import { useRouter } from "vue-router";
import { RequestMethods } from "@/types/api";
import lang from "@/lang/lang";
import { useToast } from "primevue/usetoast";
import BasicDialog from "@/components/dialogs/BasicDialog.vue";
import Dropdown from "primevue/dropdown";
import { DialogType } from "@/types/dialog";
import { orderBy } from "lodash";
import { SortingOptions, useWordsAppStore } from "@/store/wordsAppStore";
import { storeToRefs } from "pinia";

const toast = useToast();

const router = useRouter();

const appStore = useAppStore();
const wordsAppStore = useWordsAppStore();

const { startLoading, stopLoading } = appStore;

const { selectedSorting, selectedSortingDirection } =
  storeToRefs(wordsAppStore);

const { sortingOptions, sortingDirectionOptions } = wordsAppStore;

const words = ref([] as ApiWord[]);
const deleteItem: Ref<ApiWord | null> = ref(null);

onBeforeMount(async () => {
  startLoading();
  await updateWords();
  stopLoading();
});

const wordsSorted = computed<ApiWord[]>(() => {
  switch (selectedSorting.value) {
    case SortingOptions.ByTranslatedTimes:
      return orderBy(
        words.value,
        (item) => item.translations.length,
        selectedSortingDirection.value
      );
    case SortingOptions.ById:
    default:
      return orderBy(words.value, "id", selectedSortingDirection.value);
  }
});

const updateWords = async (): Promise<void> => {
  const data = await Api.request({
    path: apiPaths.word,
    isDataResult: true,
  });
  words.value = data?.length ? (data as ApiWord[]) : [];
};
const onClickWord = (wordId: number): void => {
  router.push(`${routes.word.path}/${wordId}`);
};

const onClickPlus = (): void => {
  router.push(`${routes.createWord.path}`);
};

const onClickDelete = async (item: ApiWord): Promise<void> => {
  deleteItem.value = item;
};

const onCancelDelete = () => {
  deleteItem.value = null;
};

const onConfirmDelete = async (): Promise<void> => {
  if (!deleteItem.value) {
    return;
  }

  startLoading();
  const { id, title } = deleteItem.value;

  await Api.request({
    method: RequestMethods.Delete,
    path: `${apiPaths.word}/${id}`,
    toast,
    successToast: lang.successDeleteWord(title),
    successCallback: () => {
      updateWords();
    },
  });

  stopLoading();
  deleteItem.value = null;
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";

@mixin flex-wrap-fix($flex-basis, $max-viewport-width: 2000px) {
  flex-grow: 1;
  flex-basis: $flex-basis;
  max-width: 100%;

  $multiplier: 1;
  $current-width: 0px;

  @while $current-width < $max-viewport-width {
    $current-width: $current-width + $flex-basis;
    $multiplier: $multiplier + 1;

    @media (min-width: $flex-basis * $multiplier) {
      max-width: calc(1 / $multiplier);
    }
  }
}

.words-view {
  &__top {
    display: flex;
    flex-grow: 1;
    gap: $space-ten;
    align-items: center;
    margin-bottom: $space-fifteen;
  }
}

.words {
  display: flex;
  flex-wrap: wrap;
  gap: $space-thirty;
  div {
    min-width: 350px;
    @include flex-wrap-fix(250px);
  }
}
</style>
