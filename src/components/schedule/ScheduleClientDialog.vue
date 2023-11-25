<template>
  <CustomDialog
    ref="dialog"
    :title="id ? $lang.title.editClient : $lang.title.createClient"
    class="client-dialog"
    @click:cancel="onCancel"
  >
    <div class="client-dialog__content">
      <InputText
        type="text"
        v-model.trim="name"
        :placeholder="$lang.placeholder.inputClientName"
        :class="{ 'p-invalid': !validate() && isValidated }"
      />
    </div>
    <template #buttons-before>
      <MyButton
        :label="id ? $lang.button.save : $lang.button.create"
        color="forestGreen"
        outlined
        @click="handleClickSave"
      />
    </template>
  </CustomDialog>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import CustomDialog from "@/components/dialogs/CustomDialog.vue";
import MyButton from "@/components/schedule/MyButton.vue";
import { useScheduleStore } from "@/store/scheduleStore";
import { showToast } from "@/helpers/toast";
import { ToastType } from "@/types/toasts";
import { lang } from "@/lang";
import { storeToRefs } from "pinia";
import type { Client } from "@/types/schedule";

const scheduleStore = useScheduleStore();
const { clients } = storeToRefs(scheduleStore);
const { createClient, editClient } = scheduleStore;

const id = ref();
const name = ref();
const dialog = ref();
const isValidated = ref(false);

const handleClickSave = async () => {
  isValidated.value = true;

  if (!validate()) {
    return;
  }

  if (
    clients.value.find(
      (item) =>
        item.name === name.value.trim() && (!id.value || id.value !== item.id)
    )
  ) {
    showToast({ type: ToastType.Error, text: lang.error.clientDuplicate });
    return false;
  }

  if (id.value) {
    await editClient({ id: id.value, name: name.value.trim() });
  } else {
    await createClient(name.value.trim());
  }

  dialog.value.close();
};

const validate = (): boolean => {
  return !!name.value;
};
const onCancel = () => {
  // TODO
};

const open = (client?: Client) => {
  id.value = null;
  name.value = undefined;
  isValidated.value = false;

  if (client) {
    id.value = client.id;
    name.value = client.name;
  }

  dialog.value.open();
};

defineExpose({ open });
</script>
<style lang="scss" scoped>
@import "@/assets/fonts.scss";
@import "@/assets/variables.scss";

.client-dialog {
  &__content {
    margin-bottom: $px-20;
  }
}
</style>
<style lang="scss" scoped></style>
<style lang="scss">
@import "@/assets/variables.scss";
.client-dialog .p-dialog-header {
  padding-bottom: $px-10 !important;
}
</style>
