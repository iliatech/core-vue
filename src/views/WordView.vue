<template>
  <div class="word-view">
    <div class="word-view__title">{{ word }}</div>
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
        @click="onClickBack"
        :label="$lang.button.back"
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
</template>

<script lang="ts" setup>
import Button from "primevue/button";

import { useRoute, useRouter } from "vue-router";
import { routes } from "@/settings/routes";
import { onBeforeMount, ref } from "vue";
import { useAppStore } from "@/store/appStore";
import Api from "@/api/Api";
import { apiPaths } from "@/settings/api";
import { RequestMethods } from "@/types/api";
import { lang } from "@/lang";
import InputText from "primevue/inputtext";
import type { Translation } from "@/types/translationType";
import { orderBy } from "lodash";

const route = useRoute();
const router = useRouter();
const wordId = parseInt(route.params.wordId as string);
const appStore = useAppStore();
const isTranslationAdded = ref(false);

const { startLoading, stopLoading } = appStore;

const translation = ref<string | null>(null);
const isValidated = ref(false);
const word = ref("");
const translations = ref<Translation[]>([]);

onBeforeMount(async () => {
  startLoading();
  await loadData();
  stopLoading();
});

const loadData = async (): Promise<void> => {
  const wordData = await Api.request({
    path: `${apiPaths.word}/${wordId}`,
    isDataResult: true,
  });

  word.value = wordData.title;

  const translationsData = await Api.request({
    path: `${apiPaths.translation}?wordId=${wordId}`,
    isDataResult: true,
  });

  translations.value = orderBy(translationsData, "createdAt", "desc");
};

const onClickBack = (): void => {
  router.push({ name: routes.home.name });
};

const onClickAddTranslation = async (): Promise<void> => {
  isValidated.value = true;

  if (!checkTranslation()) {
    return;
  }

  startLoading();

  await Api.request({
    path: `${apiPaths.translation}/?wordId=${wordId}`,
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
