<template>
  <UniversalDrawer
    ref="sidebar"
    :title="isEditMode ? $lang.title.editCredential : $lang.title.addCredential"
    close-button
    @click:close="close"
  >
    <div class="credential-sidebar">
      <UniversalField :label="$lang.label.name">
        <UniversalText
          v-model="currentState.name"
          v-model:is-input-started="isInputStarted.name"
          :errors="showErrors(isInputStarted.name, errorDetails.name)"
        />
      </UniversalField>
      <UniversalField :label="$lang.label.type">
        <UniversalSelector
          v-model="currentState.typeId"
          :options="options.type"
        />
      </UniversalField>
      <UniversalField :label="$lang.label.password">
        <UniversalText
          v-model="currentState.password"
          v-model:is-input-started="isInputStarted.password"
          :errors="showErrors(isInputStarted.password, errorDetails.password)"
        />
      </UniversalField>
      <UniversalField :label="lang.label.description">
        <UniversalTextarea
          v-model="currentState.description"
          v-model:is-input-started="isInputStarted.description"
          :errors="
            showErrors(isInputStarted.description, errorDetails.description)
          "
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
  </UniversalDrawer>
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
import UniversalDrawer from "@/components/dialogs/UniversalDrawer.vue";
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
import UniversalTextarea from "@/components/fields/UniversalTextarea.vue";
import { showErrors } from "@/helpers/formValidation";

interface DrawerState {
  id: string | null;
  name: string;
  typeId: string | null;
  description: string;
  password: string;
}

interface Options {
  type: ICredentialType[];
}

interface IsInputStarted {
  name: boolean;
  password: boolean;
  description: boolean;
}

interface ErrorsDetails {
  name: string[];
  type: string[];
  password: string[];
  description: string[];
}

const initialState: DrawerState = {
  id: null,
  name: "",
  typeId: null,
  description: "",
  password: "",
};

const isInputStartedInitialValue = {
  name: false,
  password: false,
  description: false,
};

const sidebar = ref<InstanceType<typeof UniversalDrawer>>();
const discardChangesDialog = ref<InstanceType<typeof UniversalDrawer>>();
const isInputStarted = reactive<IsInputStarted>(isInputStartedInitialValue);
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
  let isError = false;

  Object.values(errorDetails.value).forEach((value) => {
    if (value.length) {
      isError = true;
    }
  });

  return !isError;
});

const errorDetails = computed<ErrorsDetails>(() => {
  const errors: ErrorsDetails = {
    name: [],
    type: [],
    password: [],
    description: [],
  };

  // Name.
  if (!prepareName(currentState.name)) {
    errors.name.push(lang.error.entityShouldNotBeEmpty(IEntity.CredentialName));
  }

  // Type.
  if (!currentState.typeId) {
    errors.type.push(lang.error.entityShouldNotBeEmpty(IEntity.CredentialType));
  }

  // Password.
  if (!prepareName(currentState.password)) {
    errors.password.push(
      lang.error.entityShouldNotBeEmpty(IEntity.CredentialPassword)
    );
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
      password: currentState.password,
      description: currentState.description,
    });
  } else {
    await Credential.add({
      name: currentState.name,
      typeId: currentState.typeId,
      password: currentState.password,
      description: currentState.description,
    });
  }

  Object.assign(savedState, currentState);

  showToast({
    type: ToastType.Success,
    text: isEditMode.value
      ? lang.success.credentialSaved
      : lang.success.credentialAdded,
  });

  sidebar.value?.close();
};

defineExpose({
  open(item?: ICredentialType) {
    Object.assign(currentState, item ?? initialState);
    Object.assign(savedState, currentState);
    options.type = CredentialType.get();
    Object.assign(isInputStarted, isInputStartedInitialValue);
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
