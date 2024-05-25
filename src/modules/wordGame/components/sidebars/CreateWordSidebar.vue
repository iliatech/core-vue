<template>
  <UniversalSidebar
    ref="sidebar"
    position="right"
    :dismissable="false"
    :title="$lang.title.createWord"
    cancel-button
    @click:close="onClose"
    class="create-word-sidebar"
  >
    <div class="word-sidebar__create-translation">
      <InputText
        type="text"
        width="500px"
        v-model="word"
        :placeholder="$lang.placeholder.inputWord"
        :class="{ 'p-invalid': !word && isValidated }"
      />
    </div>
    <template #buttons-after>
      <Button
        @click="onClickCreateWord"
        :label="$lang.button.create"
        class="add-button"
        :disabled="!validate()"
        outlined
      />
    </template>
  </UniversalSidebar>
</template>

<script lang="ts" setup>
import Button from "primevue/button";

import { ref } from "vue";
import Api from "@/api/Api";
import { apiPaths } from "@/settings/api";
import { RequestMethods } from "@/types/api";
import { lang } from "@/lang";
import InputText from "primevue/inputtext";
import UniversalSidebar from "@/components/sidebars/UniversalSidebar.vue";

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

const onClose = () => {
  word.value = null;
};

defineExpose({ open });
</script>

<style lang="scss" scoped>
@import "@/assets/variables";
@import "@/assets/fonts";

:deep(.p-inputtext) {
  width: 80%;
}
</style>
<style lang="scss">
.p-sidebar-header {
  justify-content: space-between !important;
  padding-left: 1.5rem !important;
}
</style>
