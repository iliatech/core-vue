<template>
  <CustomSidebar
    ref="sidebar"
    position="right"
    :dismissable="false"
    :title="word"
    close-button
    class="word-sidebar"
  >
    <div class="word-sidebar__create-translation">
      {{ $lang.label.createTranslation }}
      <InputText
        type="text"
        width="500px"
        :model-value="translation"
        :placeholder="$lang.placeholder.translationName"
        :class="{ 'p-invalid': !translation && isValidated }"
        @update:model-value="onUpdateTranslation"
      />
    </div>
    <div class="word-sidebar__buttons">
      <Button
        @click="onClickAddTranslation"
        :label="$lang.button.create"
        class="add-button"
        outlined
      />
    </div>
    <div class="translations-section">
      {{ $lang.label.translations }}

      <template v-if="translations.length && isTranslationAdded">
        <ul>
          <li v-for="(item, index) in translations" :key="item.id">
            <span :class="{ 'word-sidebar__item-bold': !index }">{{
              item.text
            }}</span>
          </li>
        </ul>
      </template>
      <div v-else class="word-sidebar__has-been-translated">
        {{ $lang.phrase.hasBeenTranslatedNTimes(translations.length) }}
      </div>
    </div>
  </CustomSidebar>
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
import CustomSidebar from "@/components/sidebars/CustomSidebar.vue";

const wordId = ref<string | null>(null);
const appStore = useAppStore();
const isTranslationAdded = ref(false);
const sidebar = ref();

const { startLoading, stopLoading } = appStore;

const translation = ref<string | null>(null);
const isValidated = ref(false);
const word = ref("");
const translations = ref<Translation[]>([]);

const loadData = async (): Promise<void> => {
  const wordData = await Api.request({
    path: `${apiPaths.word}/${wordId.value}`,
  });

  word.value = wordData.title;

  const translationsData = await Api.request({
    path: `${apiPaths.translation}?wordId=${wordId.value}`,
    isDataResult: true,
  });

  translations.value = orderBy(translationsData, "createdAt", "desc");
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
  isValidated.value = false;

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

  sidebar.value.open();

  startLoading();
  await loadData();
  stopLoading();
};

defineExpose({ open });
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
@import "@/assets/fonts.scss";
.word-sidebar {
  &__title {
    padding: 0 0 $px-10;
    @include font-extra-large;
  }

  &__buttons {
    display: flex;
    gap: $px-10;
  }

  &__content {
    padding: $px-20 0;
    @include font-small-large;
  }

  &__section {
    padding-bottom: $px-10;
  }

  &__section-title {
    @include font-medium-bold;
  }

  &__create-translation {
    margin-bottom: $px-15;
    display: flex;
    flex-direction: column;
    gap: $px-10;
  }

  &__has-been-translated {
    color: #666;
  }

  &__item-bold {
    font-weight: bold;
  }
}

:deep(.p-inputtext) {
  width: 320px;
}

.custom-sidebar__content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.translations-section {
  margin-top: $px-20;
  display: flex;
  flex-direction: column;
  gap: $px-10;

  ul {
    margin: 0 0 0 $px-20;
    padding: 0;
    @include font-medium;
  }
}
</style>
<style lang="scss">
.p-sidebar-header {
  justify-content: space-between !important;
  padding-left: 1.5rem !important;
}
</style>
