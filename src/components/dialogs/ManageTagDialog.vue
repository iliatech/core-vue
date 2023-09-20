<template>
  <Dialog
    v-model:visible="show"
    :header="$lang.title.addTag"
    class="manage-tag-dialog"
    :style="{ width: '30vw' }"
  >
    <div class="manage-tag-dialog__content">
      <InputText
        type="text"
        v-model.trim="name"
        :placeholder="$lang.placeholder.tagName"
      />
    </div>
    <Button
      :label="$lang.button.add"
      :disabled="!name"
      class="add-button"
      @click="addTag"
    />
  </Dialog>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Api from "@/api/Api";
import { apiPaths } from "@/settings/api";
import { RequestMethods } from "@/types/api";
import { lang } from "@/lang";

const show = ref(false);
const name = ref();

const emit = defineEmits(["change"]);

const open = () => {
  show.value = true;
};

const addTag = async () => {
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
      show.value = false;
      name.value = undefined;
    },
  });
};

defineExpose({ open });
</script>
<style lang="scss" scoped>
@import "@/assets/fonts.scss";
@import "@/assets/variables.scss";

.manage-tag-dialog {
  &__content {
    margin-bottom: $space-ten;
  }
}
</style>
<style lang="scss" scoped></style>
<style lang="scss">
@import "@/assets/variables.scss";
.manage-tag-dialog .p-dialog-header {
  padding-bottom: $space-ten !important;
}
</style>
