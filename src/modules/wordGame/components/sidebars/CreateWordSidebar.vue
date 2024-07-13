<template>
  <UniversalSidebar
    ref="sidebar"
    :dismissable="false"
    :title="$lang.title.createWord"
    @click:close="handleClickClose"
    close-button
  >
    <div class="add-word-sidebar">
      <InputText
        type="text"
        width="500px"
        v-model="word"
        :placeholder="$lang.placeholder.enterWord"
        :class="{ 'p-invalid': !word && isValidated }"
      />
    </div>
    <template #buttons-after>
      <UniversalButton
        @click="onClickCreateWord"
        :label="$lang.button.create"
        :disabled="!validate()"
        outlined
      />
    </template>
  </UniversalSidebar>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Api from "@/api/Api";
import { apiPaths } from "@/settings/api";
import { RequestMethods } from "@/types/api";
import { lang } from "@/lang";
import InputText from "primevue/inputtext";
import UniversalSidebar from "@/components/dialogs/UniversalSidebar.vue";
import UniversalButton from "@/components/buttons/UniversalButton.vue";

const sidebar = ref();
const isValidated = ref(false);
const word = ref<string | null>(null);

const emit = defineEmits(["create:word"]);

const validate = (): boolean => {
  return !!word.value;
};

const onClickCreateWord = async (): Promise<void> => {
  isValidated.value = true;

  if (!validate()) {
    return;
  }

  const res = await Api.request({
    path: apiPaths.word,
    method: RequestMethods.Post,
    payload: { title: word.value },
    successToast: lang.success.wordCreated,
  });

  if (res) {
    isValidated.value = false;
    emit("create:word");
    sidebar.value.close();
  }
};

const open = async () => {
  sidebar.value.open();
};

const handleClickClose = () => {
  word.value = null;
  sidebar.value.close();
};

defineExpose({ open });
</script>
