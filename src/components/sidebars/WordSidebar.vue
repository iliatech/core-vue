<template>
  <Sidebar
    v-model:visible="show"
    class="manage-tags-sidebar"
    position="right"
    :dismissable="false"
  >
    <template #header>
      <div class="word-view__title">
        {{ word }}
      </div>
    </template>
    <div class="word-view">
      <div class="word-view__input-container">
        <InputText
          type="text"
          width="500px"
          :model-value="translation"
          :placeholder="$lang.placeholder.offerYourVariant"
          :class="{ 'p-invalid': !translation && isValidated }"
          @update:model-value="onUpdateTranslation"
        />
      </div>
      <div class="word-view__buttons">
        <Button
          @click="onClickAddTranslation"
          :label="$lang.button.addTranslation"
          class="add-button"
        />
        <Button
          @click="onClickClose"
          :label="$lang.button.close"
          class="back-button"
        />
      </div>
      <template v-if="translations.length && isTranslationAdded">
        <div class="word-view__translations-title">
          {{ $lang.phrase.previousTranslations }}:
        </div>
        <ul>
          <li v-for="(item, index) in translations" :key="item.id">
            <span :class="{ 'word-view__item-bold': !index }">{{
              item.text
            }}</span>
          </li>
        </ul>
      </template>
      <div v-else class="word-view__has-been-translated">
        {{ $lang.phrase.hasBeenTranslatedNTimes(translations.length) }}
      </div>
    </div>
  </Sidebar>
</template>

<script lang="ts" setup>
import Button from "primevue/button";

import { onBeforeMount, ref } from "vue";
import { useAppStore } from "@/store/appStore";
import Api from "@/api/Api";
import { apiPaths } from "@/settings/api";
import { RequestMethods } from "@/types/api";
import { lang } from "@/lang";
import InputText from "primevue/inputtext";
import type { Translation } from "@/types/translationType";
import { orderBy } from "lodash";
import Sidebar from "primevue/sidebar";

const wordId = ref<string | null>(null);
const appStore = useAppStore();
const isTranslationAdded = ref(false);

const { startLoading, stopLoading } = appStore;

const translation = ref<string | null>(null);
const isValidated = ref(false);
const word = ref("");
const translations = ref<Translation[]>([]);
const show = ref(false);

onBeforeMount(async () => {
  // startLoading();
  // await loadData();
  // stopLoading();
});

const loadData = async (): Promise<void> => {
  const wordData = await Api.request({
    path: `${apiPaths.word}/${wordId.value}`,
  });

  word.value = wordData.title;

  console.log("D1", wordData);

  const translationsData = await Api.request({
    path: `${apiPaths.translation}?wordId=${wordId.value}`,
    isDataResult: true,
  });

  translations.value = orderBy(translationsData, "createdAt", "desc");
};

const onClickClose = (): void => {
  show.value = false;
  wordId.value = null;
};

const onClickAddTranslation = async (): Promise<void> => {
  isValidated.value = true;

  if (!checkTranslation()) {
    return;
  }

  startLoading();

  await Api.request({
    path: `${apiPaths.translation}/?wordId=${wordId.value}`,
    method: RequestMethods.Post,
    payload: { text: translation.value },
    successToast: lang.success.translationCreated,
  });

  await loadData();

  translation.value = "";
  isTranslationAdded.value = true;

  stopLoading();
};

const checkTranslation = (): boolean => {
  return !!translation.value;
};

const onUpdateTranslation = (value: string): void => {
  translation.value = value;
  isValidated.value = false;
  isTranslationAdded.value = false;
};

const open = async (id: string) => {
  wordId.value = id;
  show.value = true;

  startLoading();
  await loadData();
  stopLoading();
};

defineExpose({ open });
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
@import "@/assets/fonts.scss";
.word-view {
  padding: $space-ten;

  &__title {
    padding: 0 0 $space-ten;
    @include font-extra-large;
  }

  &__buttons {
    display: flex;
    gap: $space-ten;
  }

  &__content {
    padding: $space-twenty 0;
    @include font-small-large;
  }

  &__section {
    padding-bottom: $space-ten;
  }

  &__section-title {
    @include font-medium-bold;
  }

  &__input-container {
    margin-bottom: $space-fifteen;
  }

  &__translations-title {
    margin: $space-twenty 0;
  }

  &__has-been-translated {
    margin-top: $space-twenty;
    color: #666;
  }

  &__item-bold {
    font-weight: bold;
    font-size: 1.25em;
  }
}

:deep(.p-inputtext) {
  width: 320px;
}
</style>
<style lang="scss">
.p-sidebar-header {
  justify-content: space-between !important;
  padding-left: 1.5rem !important;
}
</style>
