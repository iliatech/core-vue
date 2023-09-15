<template>
  <div class="word-view">
    <div class="word-view__title">{{ word }}</div>
    <div class="word-view__buttons">
      <Button
        @click="onClickAddTranslation"
        :label="$lang.addTranslation"
        class="p-button-outlined p-button-rounded p-button-danger"
      />
      <Button
        @click="onClickBack"
        :label="$lang.back"
        class="p-button-outlined p-button-rounded button-grey-tough"
      />
    </div>
    <div class="word-view__input-container">
      <InputText
        type="text"
        width="500px"
        :model-value="translation"
        :placeholder="$lang.translation"
        :class="{ 'p-invalid': !translation && isValidated }"
        @update:model-value="onUpdateTranslation"
      />
    </div>
    <template v-if="translations.length && isTranslationAdded">
      <div class="word-view__translations-title">
        {{ $lang.previousTranslations }}:
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
      {{ $lang.hasBeenTranslatedNTimes(translations.length) }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from "primevue/button";

import { useRoute, useRouter } from "vue-router";
import { routes } from "@/settings/routes";
import { computed, onBeforeMount, ref } from "vue";
import { useAppStore } from "@/store/appStore";
import Api from "@/api/Api";
import { apiPaths } from "@/settings/api";
import { RequestMethods } from "@/types/api";
import lang from "@/lang/lang";
import { useToast } from "primevue/usetoast";
import InputText from "primevue/inputtext";
import type { Translation } from "@/types/translationType";
import { orderBy } from "lodash";

const route = useRoute();
const router = useRouter();
const wordId = parseInt(route.params.wordId as string);
const appStore = useAppStore();
const toast = useToast();
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
  const data = await Api.request({
    path: `${apiPaths.word}/${wordId}`,
  });

  word.value = data.title;

  const dataTranslations = await Api.request({
    path: `${apiPaths.translation}?wordId=${wordId}`,
  });

  translations.value = orderBy(dataTranslations, "createdAt", "desc");
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
    toast,
    successToast: lang.successCreateTranslation,
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
@import "@/assets/fontMixins.scss";
.word-view {
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

  &__input-container {
    margin-top: $space-medium;
  }

  &__translations-title {
    margin: $space-medium 0;
  }

  &__has-been-translated {
    margin-top: $space-medium;
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
