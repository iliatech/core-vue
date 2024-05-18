<template>
  <CustomDialog
    ref="dialog"
    :title="$lang.title.createTag"
    class="manage-tag-dialog"
    @click:cancel="onCancel"
  >
    <div class="manage-tag-dialog__content">
      <InputText
        type="text"
        v-model.trim="name"
        :placeholder="$lang.placeholder.inputTagName"
        :class="{ 'p-invalid': !validate() && isValidated }"
      />
    </div>
    <template #buttons-before>
      <Button
        :label="$lang.button.create"
        class="add-button"
        outlined
        @click="addTag"
      />
    </template>
  </CustomDialog>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Api from "@/api/Api";
import { apiPaths } from "@/settings/api";
import { RequestMethods } from "@/types/api";
import { lang } from "@/lang";
import { useTagsStore } from "@/store/tagsStore";
import CustomDialog from "@/components/dialogs/CustomDialog.vue";

const tagsStore = useTagsStore();
const { loadTags } = tagsStore;

const name = ref();
const dialog = ref();
const isValidated = ref(false);

const emit = defineEmits(["change"]);

const addTag = async () => {
  isValidated.value = true;
  if (!validate()) {
    return;
  }

  const payload = {
    name: name.value.trim(),
  };

  await Api.request({
    path: apiPaths.tag,
    method: RequestMethods.Post,
    payload,
    successToast: lang.success.tagAdded,
    successCallback: async () => {
      emit("change");
      await loadTags();
      name.value = undefined;
      isValidated.value = false;
      dialog.value.close();
    },
  });
};

const validate = (): boolean => {
  return !!name.value;
};
const onCancel = () => {
  name.value = undefined;
};

const open = () => {
  dialog.value.open();
};

defineExpose({ open });
</script>
<style lang="scss" scoped>
@import "@/assets/fonts";
@import "@/assets/variables";

.manage-tag-dialog {
  &__content {
    margin-bottom: $px-20;
  }
}
</style>
<style lang="scss" scoped></style>
<style lang="scss">
@import "@/assets/variables";
.manage-tag-dialog .p-dialog-header {
  padding-bottom: $px-10 !important;
}
</style>
