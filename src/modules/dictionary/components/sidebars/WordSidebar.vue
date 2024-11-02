<script lang="ts" setup>
import { ref } from "vue";
import Api from "@/api/Api";
import { apiPaths } from "@/settings/api";
import { RequestMethods } from "@/types/api";
import { lang } from "@/lang";
import UniversalDrawer from "@/components/dialogs/UniversalDrawer.vue";
import UniversalButton from "@/components/buttons/UniversalButton.vue";
import ErrorDetails from "@/components/error/ErrorDetails.vue";
import type { ApiValidationError } from "@/types/common";
import UniversalText from "@/components/fields/UniversalText.vue";
import UniversalField from "@/components/fields/UniversalField.vue";
import UniversalSelector from "@/components/fields/UniversalSelector.vue";
import type { ApiLanguage } from "@/modules/dictionary/types";
import UniversalItems from "@/components/tables/UniversalItems.vue";
import { wordTranslationsTable } from "@/modules/dictionary/settings/tables/wordTranslationsTable";
import type { ApiWordResponse } from "@/types/word";

const sidebar = ref();
const isValidated = ref(false);
const word = ref<string | null>(null);
const generalValidationErrors = ref<string[]>([]);
const languageOptions = ref<ApiLanguage[]>([]);
const language = ref<string | null>(null);
const wordId = ref<string | undefined>(undefined);
const wordObject = ref<ApiWordResponse | null>(null);

const emit = defineEmits(["create:word"]);

const validate = (): boolean => {
  return !!word.value && !!language.value;
};

const handleClickActionButton = async (): Promise<void> => {
  isValidated.value = true;

  if (!validate()) {
    return;
  }

  const { validationErrors } = await Api.request({
    path: wordId.value ? `${apiPaths.word}/${wordId.value}` : apiPaths.word,
    method: wordId.value ? RequestMethods.Put : RequestMethods.Post,
    payload: { title: word.value, languageId: language.value },
    successToast: lang.success.wordCreated,
  });

  if (validationErrors?.length) {
    generalValidationErrors.value = validationErrors
      .filter(
        (item: ApiValidationError) =>
          item.customMessage && item.path === undefined
      )
      .map((item: ApiValidationError) => item.customMessage);
  } else {
    isValidated.value = false;
    emit("create:word");
    sidebar.value.close();
  }
};

const open = async (id?: string) => {
  if (id) {
    wordId.value = id;

    const data = await Api.request({
      path: `${apiPaths.word}/${id}`,
      method: RequestMethods.Get,
    });

    word.value = data.title;
    wordObject.value = data;
    language.value = data.languageId;
  }

  languageOptions.value = await Api.request({
    path: apiPaths.languages,
    method: RequestMethods.Get,
  });

  sidebar.value.open();
  generalValidationErrors.value = [];
};

const handleClickClose = () => {
  word.value = null;
  sidebar.value.close();
};

defineExpose({ open });
</script>

<template>
  <UniversalDrawer
    ref="sidebar"
    :dismissable="false"
    :title="$lang.title.createWord"
    @click:close="handleClickClose"
    close-button
  >
    <div class="word-sidebar">
      <UniversalField :label="lang.label.wordOrPhrase">
        <UniversalText
          v-model="word"
          :placeholder="$lang.placeholder.enterWord"
        />
      </UniversalField>
      <UniversalField :label="lang.label.language">
        <UniversalSelector v-model="language" :options="languageOptions" />
      </UniversalField>
      <UniversalField :label="lang.label.translations">
        <div class="word-translations">
          <UniversalButton :label="lang.button.add" width="80px" />
          <UniversalItems
            v-if="wordObject"
            :config="wordTranslationsTable"
            :data="wordObject.translating"
            table-mode-by-default
            without-mode-switcher
          />
        </div>
      </UniversalField>
      <ErrorDetails :errors="generalValidationErrors" />
    </div>
    <template #buttons-after>
      <UniversalButton
        @click="handleClickActionButton"
        :label="wordId ? $lang.button.save : $lang.button.create"
        :disabled="!validate()"
        outlined
      />
    </template>
  </UniversalDrawer>
</template>

<style lang="scss">
.word-sidebar {
  display: flex;
  flex-direction: column;
}

.word-translations {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
