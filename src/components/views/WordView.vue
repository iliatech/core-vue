<template>
  <div class="word-view">
    <div class="word-view__title">{{ categoryName }}</div>
    <div class="word-view__buttons">
      <Button
        @click="onClickAdd"
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
    <div class="word-view__translations-title">{{ $lang.translations }}:</div>
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
import lang from "@/lang/lang";
import { useToast } from "primevue/usetoast";
import InputText from "primevue/inputtext";

const route = useRoute();
const router = useRouter();
const categoryName = route.params.word as string;
const appStore = useAppStore();
const toast = useToast();

const { startLoading, stopLoading } = appStore;

const translation = ref<string | null>(null);
const isValidated = ref(false);

onBeforeMount(() => {
  // It's a stub;
  startLoading();
  stopLoading();
});

const onClickBack = (): void => {
  router.push(routes.home.path);
};

const onClickAdd = async (): Promise<void> => {
  isValidated.value = true;

  if (!checkTranslation()) {
    return;
  }

  await Api.request({
    path: apiPaths.translation,
    method: RequestMethods.Post,
    payload: { word_id: null, translation }, // TODO: Add correct word id;
    toast,
    successToast: lang.successCreateWord,
    successCallback: async () => {
      await router.push(routes.home.path);
    },
  });
};

const checkTranslation = (): boolean => {
  return !!translation.value;
};

const onUpdateTranslation = (value: string): void => {
  translation.value = value;
  isValidated.value = false;
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
}

:deep(.p-inputtext) {
  width: 320px;
}
</style>
