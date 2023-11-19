<template>
  <CustomDialog
    ref="dialog"
    :title="$lang.title.createClient"
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
      <ScheduleButton
        :label="$lang.button.create"
        color="forestGreen"
        outlined
        @click="handleClickCreate"
      />
    </template>
  </CustomDialog>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import CustomDialog from "@/components/dialogs/CustomDialog.vue";
import ScheduleButton from "@/components/schedule/ScheduleButton.vue";
import { useScheduleStore } from "@/store/scheduleStore";
import { showToast } from "@/helpers/toast";
import { ToastType } from "@/types/toasts";
import { lang } from "@/lang";
import { storeToRefs } from "pinia";

const scheduleStore = useScheduleStore();
const { clients } = storeToRefs(scheduleStore);
const { createClient } = scheduleStore;

const name = ref();
const dialog = ref();
const isValidated = ref(false);

const handleClickCreate = async () => {
  isValidated.value = true;

  if (!validate()) {
    return;
  }

  if (clients.value.find((item) => item.name === name.value.trim())) {
    showToast({ type: ToastType.Error, text: lang.error.clientDuplicate });
    return false;
  }

  await createClient(name.value.trim());

  name.value = undefined;
  isValidated.value = false;
  dialog.value.close();
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
