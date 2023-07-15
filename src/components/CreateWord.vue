<template>
  <div class="create-word">
    <div class="create-word__title">
      {{ $lang.createCategory }}
    </div>
    <div class="create-word__top-buttons">
      <Button
        @click="onClickCreate"
        :label="$lang.save"
        class="p-button-outlined p-button-rounded button-tomato"
      />
      <Button
        @click="onClickBack"
        :label="$lang.back"
        class="p-button-outlined p-button-rounded button-baby-powder"
      />
    </div>
    <div class="create-word__content">
      <InputText
        type="text"
        v-model.trim="word.title"
        :placeholder="$lang.categoryName"
        :class="{ 'p-invalid': !word.title && isValidated }"
        @update:model-value="clearValidation"
      />
    </div>
    <div class="create-word__bottom-buttons"></div>
  </div>
</template>

<script lang="ts" setup>
import Button from "primevue/button";

import { useRouter } from "vue-router";
import { routes } from "@/settings/routes";
import { onBeforeMount, reactive, ref } from "vue";
import { useAppStore } from "@/store/appStore";
import InputText from "primevue/inputtext";
import Api from "@/api/Api";
import { apiPaths } from "@/settings/api";
import { RequestMethods } from "@/types/api";
import type { Word } from "@/types/wordType";

import lang from "@/lang/lang";
import { useToast } from "primevue/usetoast";

const router = useRouter();
const appStore = useAppStore();
const toast = useToast();

const { startLoading, stopLoading } = appStore;

const word: Word = reactive({ title: "" });
const isValidated = ref(false);

onBeforeMount(() => {
  // TODO: It's a stub;
  startLoading();
  stopLoading();
});

const onClickBack = (): void => {
  router.push(routes.home.path);
};

const onClickCreate = async (): Promise<void> => {
  isValidated.value = true;

  if (!checkCategory()) {
    return;
  }

  await Api.request({
    path: apiPaths.word,
    method: RequestMethods.Post,
    payload: word,
    toast,
    successToast: lang.successCreateCategory,
    successCallback: async () => {
      await router.push(routes.home.path);
    },
  });
};

const clearValidation = (): void => {
  isValidated.value = false;
};

const checkCategory = (): boolean => {
  return !!word.title;
};
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";
@import "@/assets/fontMixins.scss";
@import "@/assets/colors.scss";

.create-word {
  padding: $space-small;

  &__title {
    padding: 0 0 $space-small;
    @include font-extra-large;
  }

  &__top-buttons {
    display: flex;
    gap: $space-small;
  }

  &__content {
    margin-top: $space-medium;
  }

  &__bottom-buttons {
    margin-top: $space-medium;
    .p-button.p-button-outlined {
      color: $color-dark-blue;
    }
  }
}
</style>
