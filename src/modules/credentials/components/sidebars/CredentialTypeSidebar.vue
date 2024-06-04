<template>
  <UniversalSidebar
    ref="sidebar"
    :title="$lang.title.addCredentialType"
    close-button
    @click:close="close"
  >
    <div class="credential-type-sidebar">
      <UniversalText
        v-model="currentState.name"
        v-model:is-input-started="isInputStarted"
        :placeholder="$lang.label.fillInField($lang.label.name)"
        :errors="errorDetails"
      />
    </div>
    <template #buttons-after>
      <UniversalButton
        @click="handleClickSave"
        :label="isEditMode ? $lang.button.save : $lang.button.add"
        width="70px"
        :disabled="!isChanged || isSameNameExists"
      />
    </template>
  </UniversalSidebar>
  <UniversalDialog
    :title="$lang.title.discardChanges"
    ref="discardChangesDialog"
    @cancel="handleCancelDiscardChanges"
    @confirm="handleConfirmDiscardChanges"
    :z-index="1200"
  >
    {{ $lang.phrase.areYouSureToDiscardChanges }}
  </UniversalDialog>
</template>
<script lang="ts" setup>
import UniversalSidebar from "@/components/sidebars/UniversalSidebar.vue";
import { computed, reactive, ref } from "vue";
import UniversalButton from "@/components/buttons/UniversalButton.vue";
import { CredentialType } from "@/modules/credentials/classes/entities/CredentialType";
import { showToast } from "@/helpers/toast";
import { ToastType } from "@/types/toasts";
import { lang } from "@/lang";
import { isEqual } from "lodash";
import { IEntity } from "@/settings/entities";
import { prepareName } from "@/helpers/strings";
import UniversalText from "@/components/UniversalText.vue";
import UniversalDialog from "@/components/dialogs/UniversalDialog.vue";
import type { ICredentialType } from "@/modules/credentials/types/entities";

interface DrawerState {
  id: string | null;
  name: string;
}

const initialState: DrawerState = {
  id: null,
  name: "",
};

const sidebar = ref<InstanceType<typeof UniversalSidebar>>();
const discardChangesDialog = ref<InstanceType<typeof UniversalSidebar>>();
const isInputStarted = ref<boolean>(false);
const currentState = reactive<DrawerState>({ ...initialState });
const savedState = reactive<DrawerState>({ ...initialState });

const isChanged = computed<boolean>(() => {
  return !isEqual(currentState, savedState);
});

const isEditMode = computed<boolean>(() => {
  return !!savedState.id;
});

const isSameNameExists = computed<boolean>(() => {
  const foundItem = CredentialType.get({
    name: prepareName(currentState.name),
  })?.[0];

  return !!foundItem && foundItem.id !== currentState.id;
});

const errorDetails = computed<string[]>(() => {
  if (!isInputStarted.value) {
    return [];
  }

  const errors = [];

  if (isSameNameExists.value) {
    errors.push(lang.error.entityWithSameNameExists(IEntity.CredentialType));
  }

  if (!prepareName(currentState.name)) {
    errors.push(lang.error.entityShouldNotBeEmpty(IEntity.CredentialName));
  }

  return errors;
});

const handleCancelDiscardChanges = () => {
  discardChangesDialog.value?.close();
};

const handleConfirmDiscardChanges = () => {
  discardChangesDialog.value?.close();
  sidebar.value?.close();
};

const close = () => {
  if (isChanged.value) {
    discardChangesDialog.value?.open();
    return;
  }

  sidebar.value?.close();
};

const handleClickSave = async () => {
  if (isEditMode.value) {
    await CredentialType.update(currentState as ICredentialType);
  } else {
    await CredentialType.add({ name: currentState.name });
  }

  Object.assign(savedState, currentState);

  showToast({
    type: ToastType.Success,
    text: isEditMode.value
      ? lang.success.credentialTypeAdded
      : lang.success.credentialTypeSaved,
  });

  sidebar.value?.close();
};

defineExpose({
  open(item?: ICredentialType) {
    Object.assign(currentState, item ?? initialState);
    Object.assign(savedState, currentState);
    isInputStarted.value = false;
    sidebar.value?.open();
  },
  close,
});
</script>
<style lang="scss" scoped>
@import "@/assets/variables";
.credential-type-sidebar {
  // TODO
}
</style>
