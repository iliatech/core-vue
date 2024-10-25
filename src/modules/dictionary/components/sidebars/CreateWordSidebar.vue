<template>
  <UniversalDrawer
    ref="sidebar"
    :dismissable="false"
    :title="$lang.title.createWord"
    @click:close="handleClickClose"
    close-button
  >
    <div class="add-word-sidebar">
      <UniversalField :label="lang.label.wordOrPhrase">
        <UniversalText
          v-model="word"
          :placeholder="$lang.placeholder.enterWord"
        />
      </UniversalField>
      <UniversalField :label="lang.label.language">
        <UniversalSelector v-model="language" :options="languageOptions" />
      </UniversalField>
      <ErrorDetails :errors="generalValidationErrors" />
    </div>
    <template #buttons-after>
      <UniversalButton
        @click="onClickCreateWord"
        :label="$lang.button.create"
        :disabled="!validate()"
        outlined
      />
    </template>
  </UniversalDrawer>
</template>

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

const sidebar = ref();
const isValidated = ref(false);
const word = ref<string | null>(null);
const generalValidationErrors = ref<string[]>([]);
const languageOptions = ref<ApiLanguage[]>([{ id: "test", name: "testRus" }]);
const language = ref<ApiLanguage | null>(null);

const emit = defineEmits(["create:word"]);

const validate = (): boolean => {
  return !!word.value;
};

const onClickCreateWord = async (): Promise<void> => {
  isValidated.value = true;

  if (!validate()) {
    return;
  }

  const { validationErrors } = await Api.request({
    path: apiPaths.word,
    method: RequestMethods.Post,
    payload: { title: word.value },
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

const open = async () => {
  sidebar.value.open();
  generalValidationErrors.value = [];
};

const handleClickClose = () => {
  word.value = null;
  sidebar.value.close();
};

defineExpose({ open });
</script>
