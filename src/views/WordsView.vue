<template>
  <div class="words-view">
    <TopToolbar :title="$lang.title.wordsApp" />
    <div class="words-view__top">
      <div class="words-view__top-left">
        <WordSorting />
        <WordFiltering />
      </div>
      <div class="words-view__top-button">
        <Button
          :label="$lang.button.manageTags"
          @click="openManageTagsSidebar"
          outlined
          size="small"
        />
      </div>
    </div>
    <div class="words">
      <PlusTile @click="onClickPlus" />
      <WordTile
        v-for="(item, index) in wordsSortedAndFiltered"
        :key="item.id"
        :data="item"
        :background-color="getPaletteColor(index)"
        @on-click="onClickWord(item.id)"
        @on-click-delete="onClickDelete(item)"
        @change-tags="loadWords"
      />
    </div>
  </div>
  <BasicDialog
    v-model="deleteItem"
    :type="DialogType.Confirm"
    :text="lang.title.confirmDeleteWord(deleteItem?.title ?? '')"
    :confirm-button-text="$lang.button.delete"
    @on-cancel="onCancelDelete"
    @on-confirm="onConfirmDelete"
  />
  <ManageTagsSidebar ref="manageTagsSidebar" />
  <WordSidebar ref="wordSidebar" />
</template>

<script lang="ts" setup>
import type { Ref } from "vue";
import { computed, onBeforeMount, ref } from "vue";
import { apiPaths } from "@/settings/api";
import Api from "@/api/Api";
import { getPaletteColor } from "@/settings/colorPalette";
import type { ApiWordResponse } from "@/types/word";
import WordTile from "@/components/WordTile.vue";
import Button from "primevue/button";
import { useAppStore } from "@/store/appStore";
import PlusTile from "@/components/PlusTile.vue";
import WordSorting from "@/components/WordSorting.vue";
import { routes } from "@/settings/routes";
import { useRouter } from "vue-router";
import { RequestMethods } from "@/types/api";
import { lang } from "@/lang";
import BasicDialog from "@/components/dialogs/BasicDialog.vue";
import { DialogType } from "@/types/dialog";
import { orderBy } from "lodash";
import { SortingOptions, useWordsAppStore } from "@/store/wordsAppStore";
import { storeToRefs } from "pinia";
import ManageTagsSidebar from "@/components/sidebars/ManageTagsSidebar.vue";
import WordFiltering from "@/components/WordFiltering.vue";
import { useTagsFilteringStore } from "@/store/tagsFilteringStore";
import TopToolbar from "@/components/toolbars/TopToolbar.vue";
import WordSidebar from "@/components/sidebars/WordSidebar.vue";

const router = useRouter();

const appStore = useAppStore();
const wordsAppStore = useWordsAppStore();
const tagsFilteringStore = useTagsFilteringStore();

const { startLoading, stopLoading } = appStore;

const { selectedSorting, selectedSortingDirection } =
  storeToRefs(wordsAppStore);

const { filterTags } = storeToRefs(tagsFilteringStore);

const manageTagsSidebar = ref();
const words = ref([] as ApiWordResponse[]);
const deleteItem: Ref<ApiWordResponse | null> = ref(null);
const wordSidebar = ref();

onBeforeMount(async () => {
  startLoading();
  await loadWords();
  stopLoading();
});

const wordsSortedAndFiltered = computed<ApiWordResponse[]>(() => {
  const wordsFiltered = filterTags.value.length
    ? words.value.filter(
        (item) =>
          !item.tags.length ||
          item.tags.some((el) => filterTags.value.includes(el.id))
      )
    : words.value;

  switch (selectedSorting.value) {
    case SortingOptions.ByTranslatedTimes:
      return orderBy(
        wordsFiltered,
        (item) => item.translations.length,
        selectedSortingDirection.value
      );
    case SortingOptions.ById:
    default:
      return orderBy(wordsFiltered, "id", selectedSortingDirection.value);
  }
});

const loadWords = async (): Promise<void> => {
  const data = await Api.request({
    path: apiPaths.word,
  });

  words.value = data?.length ? (data as ApiWordResponse[]) : [];
};
const onClickWord = (wordId: string): void => {
  wordSidebar.value.open(wordId);
};

const onClickPlus = (): void => {
  router.push(`${routes.createWord.path}`);
};

const onClickDelete = async (item: ApiWordResponse): Promise<void> => {
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
    successToast: lang.success.wordDeleted(title),
    successCallback: () => {
      loadWords();
    },
  });

  stopLoading();
  deleteItem.value = null;
};

const openManageTagsSidebar = () => {
  manageTagsSidebar.value.open();
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
    justify-content: space-between;
    align-items: center;
    margin-bottom: $space-fifteen;
    margin-top: $space-ten;
  }

  &__top-left {
    display: flex;
    gap: $space-twenty;
  }

  &__top-button {
    //:deep(.p-button) {
    //  font-size: 0.9em;
    //  padding: 0;
    //}
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
