<template>
  <UniversalDrawer
    ref="sidebar"
    :title="
      isEditMode
        ? $lang.title.editCredentialType
        : $lang.title.addCredentialType
    "
    close-button
    @click:close="close"
  >
    <div class="credential-type-sidebar">
      <UniversalField :label="lang.label.name">
        <UniversalText
          v-model="currentState.name"
          v-model:is-input-started="isInputStarted.name"
          :errors="showErrors(isInputStarted.name, errorDetails.name)"
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
        :disabled="!isChanged || isSameNameExists"
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
import type { ComputedRef } from "vue";
import { computed, reactive, ref } from "vue";
import UniversalButton from "@/components/buttons/UniversalButton.vue";
import { CredentialType } from "@/modules/credentials/classes/entities/CredentialType";
import { showToast } from "@/helpers/toast";
import { ToastType } from "@/types/toasts";
import { lang } from "@/lang";
import { isEqual, omit } from "lodash";
import { IEntity } from "@/settings/entities";
import { prepareName } from "@/helpers/strings";
import UniversalText from "@/components/fields/UniversalText.vue";
import UniversalDialog from "@/components/dialogs/UniversalDialog.vue";
import UniversalField from "@/components/fields/UniversalField.vue";
import type { ICredentialType } from "@/modules/credentials/types";
import UniversalTextarea from "@/components/fields/UniversalTextarea.vue";
import { showErrors } from "@/helpers/formValidation";

interface DrawerState {
  id: string | null;
  name: string;
  description: string;
}

interface ErrorsDetails {
  name: string[];
  description: string[];
}

interface IsInputStarted {
  name: boolean;
  description: boolean;
}

const isInputStartedInitialValue = {
  name: false,
  description: false,
};

const initialState: DrawerState = {
  id: null,
  name: "",
  description: "",
};

const sidebar = ref<InstanceType<typeof UniversalDrawer>>();
const discardChangesDialog = ref<InstanceType<typeof UniversalDrawer>>();
const isInputStarted = reactive<IsInputStarted>(isInputStartedInitialValue);
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

const errorDetails: ComputedRef<ErrorsDetails> = computed(() => {
  const errors: ErrorsDetails = {
    name: [],
    description: [],
  };

  // Name.
  if (isSameNameExists.value) {
    errors.name.push(
      lang.error.entityWithSameNameExists(IEntity.CredentialType)
    );
  }

  if (!prepareName(currentState.name)) {
    errors.name.push(
      lang.error.entityShouldNotBeEmpty(IEntity.CredentialTypeName)
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
  if (isEditMode.value) {
    await CredentialType.update(currentState as ICredentialType);
  } else {
    await CredentialType.add(omit(currentState, ["id"]));
  }

  Object.assign(savedState, currentState);

  showToast({
    type: ToastType.Success,
    text: isEditMode.value
      ? lang.success.credentialTypeSaved
      : lang.success.credentialTypeAdded,
  });

  sidebar.value?.close();
};

defineExpose({
  open(item?: ICredentialType) {
    Object.assign(currentState, item ?? initialState);
    Object.assign(savedState, currentState);
    Object.assign(isInputStarted, isInputStartedInitialValue);
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
