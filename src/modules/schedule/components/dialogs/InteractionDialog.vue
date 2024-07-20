<template>
  <UniversalDialog
    ref="dialogRef"
    :title="id ? $lang.title.editInteraction : $lang.title.createInteraction"
    class="interaction-drawer"
    @click:cancel="onCancel"
    z-index="1200"
    :confirm-button-label="lang.button.save"
    confirm-button-color="mediumPurple"
    @confirm="handleClickSave"
  >
    <div class="client-dialog__content">
      <UniversalField :label="lang.label.name">
        <UniversalText
          v-model="name"
          :placeholder="$lang.placeholder.inputClientName"
          :class="{ 'p-invalid': !validate() && isValidated }"
        />
      </UniversalField>
    </div>
  </UniversalDialog>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useScheduleStore } from "@/store/scheduleStore";
import { showToast } from "@/helpers/toast";
import { ToastType } from "@/types/toasts";
import { lang } from "@/lang";
import { storeToRefs } from "pinia";
import type { Client } from "@/types/schedule";
import UniversalDialog from "@/components/dialogs/UniversalDialog.vue";
import UniversalText from "@/components/fields/UniversalText.vue";
import UniversalField from "@/components/fields/UniversalField.vue";

const scheduleStore = useScheduleStore();
const { clients } = storeToRefs(scheduleStore);
const { createClient, updateClient } = scheduleStore;

const id = ref();
const name = ref();
const dialogRef = ref();
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
    showToast({ type: ToastType.Error, text: lang.error.interactionDuplicate });
    return false;
  }

  if (id.value) {
    await updateClient({ id: id.value, name: name.value });
  } else {
    await createClient(name.value);
  }

  dialogRef.value.close();
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

  dialogRef.value.open();
};

defineExpose({ open });
</script>
<style lang="scss" scoped>
@import "@/assets/fonts";
@import "@/assets/variables";

.interaction-drawer {
  &__content {
    margin-bottom: $px-20;
  }
}
</style>
<style lang="scss" scoped></style>
<style lang="scss">
@import "@/assets/variables";
.interaction-drawer .p-dialog-header {
  padding-bottom: $px-10 !important;
}
</style>
