<template>
  <UniversalSidebar
    ref="sidebar"
    :title="isEditMode ? $lang.title.editCredential : $lang.title.addCredential"
    close-button
    @click:close="close"
  >
    <div class="credential-sidebar">
      <UniversalField :label="$lang.label.name">
        <UniversalText
          v-model="currentState.name"
          v-model:is-input-started="isInputStarted"
          :errors="errorDetails"
        />
      </UniversalField>
      <UniversalField :label="$lang.label.type">
        <UniversalSelector
          v-model="currentState.typeId"
          :options="options.type"
        />
      </UniversalField>
    </div>
    <template #buttons-after>
      <UniversalButton
        @click="handleClickSave"
        :label="isEditMode ? $lang.button.save : $lang.button.add"
        width="70px"
        :disabled="!isChanged || !isValid"
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
import UniversalSidebar from "@/components/dialogs/UniversalSidebar.vue";
import { computed, reactive, ref } from "vue";
import UniversalButton from "@/components/buttons/UniversalButton.vue";
import { CredentialType } from "@/modules/credentials/classes/entities/CredentialType";
import { showToast } from "@/helpers/toast";
import { ToastType } from "@/types/toasts";
import { lang } from "@/lang";
import { isEqual } from "lodash";
import { IEntity } from "@/settings/entities";
import { prepareName } from "@/helpers/strings";
import UniversalText from "@/components/fields/UniversalText.vue";
import UniversalDialog from "@/components/dialogs/UniversalDialog.vue";
import UniversalField from "@/components/fields/UniversalField.vue";
import UniversalSelector from "@/components/fields/UniversalSelector.vue";
import { Credential } from "@/modules/credentials/classes/entities/Credential";
import type { ICredentialType } from "@/modules/credentials/types";

interface DrawerState {
  id: string | null;
  name: string;
  typeId: string | null;
}

interface Options {
  type: ICredentialType[];
}

const initialState: DrawerState = {
  id: null,
  name: "",
  typeId: null,
};

const sidebar = ref<InstanceType<typeof UniversalSidebar>>();
const discardChangesDialog = ref<InstanceType<typeof UniversalSidebar>>();
const isInputStarted = ref<boolean>(false);
const currentState = reactive<DrawerState>({ ...initialState });
const savedState = reactive<DrawerState>({ ...initialState });
const options = reactive<Options>({ type: [] });

const isChanged = computed<boolean>(() => {
  return !isEqual(currentState, savedState);
});

const isEditMode = computed<boolean>(() => {
  return !!savedState.id;
});

const isValid = computed<boolean>(() => {
  return !isSameNameExists.value && !!currentState.typeId;
});

const isSameNameExists = computed<boolean>(() => {
  const foundItem = Credential.get({
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
    errors.push(lang.error.entityWithSameNameExists(IEntity.CredentialName));
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
  if (!currentState.typeId) {
    throw new Error("currentState.type  is not defined");
  }

  if (isEditMode.value) {
    if (!currentState.id) {
      throw new Error("currentState.id is not defined");
    }

    await Credential.update({
      id: currentState.id,
      name: currentState.name,
      typeId: currentState.typeId,
    });
  } else {
    await Credential.add({
      name: currentState.name,
      typeId: currentState.typeId,
    });
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
    options.type = CredentialType.get();
    isInputStarted.value = false;
    sidebar.value?.open();
  },
  close,
});
</script>
<style lang="scss" scoped>
@import "@/assets/variables";
.credential-sidebar {
  // TODO
}
</style>
