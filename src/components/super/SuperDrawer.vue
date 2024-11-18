<script lang="ts" setup>
import UniversalDrawer from "@/components/dialogs/UniversalDrawer.vue";
import { computed, reactive, ref, watch } from "vue";
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

enum FieldsTypes {
  Id = "id",
  Password = "password",
  String = "string",
  Text = "text",
  Selector = "selector",
}

const drawerConfig: Record<string, any> = [
  {
    id: "7265b3a6-92e1-436e-bea1-7587b20f0459",
    type: FieldsTypes.String,
    label: "Name",
  },
  {
    id: "a1334c91-bade-46ba-92e1-87a9cc4321a3",
    type: FieldsTypes.Selector,
    label: "Type",
    sourceObjectId: "75ef436e-3d2d-4061-8e60-970e001f40aa",
  },
  {
    id: "729c0e89-eb07-4209-8578-90871942bb6f",
    type: FieldsTypes.Password,
    label: "Password",
  },
  {
    id: "70e5e4805-ab32-4062-8ac2-0b228a6f8faa",
    type: FieldsTypes.Text,
    label: "Description",
  },
];

const sidebar = ref<InstanceType<typeof UniversalDrawer>>();
const discardChangesDialog = ref<InstanceType<typeof UniversalDrawer>>();
const isInputStarted = reactive<IsInputStarted>(isInputStartedInitialValue);
const currentState = reactive<DrawerState>({ ...initialState });

const superCurrentState = ref<Record<string, any>>({});
const superIsInputStarted = ref<Record<string, any>>({});
const superErrorDetails = ref<Record<string, string[]>>({});

const savedState = reactive<DrawerState>({ ...initialState });
const options = reactive<Options>({ type: [] });

const emit = defineEmits(["close:drawer"]);

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

const getOptions = (universalObjectId: string) => {
  return CredentialType.get();
};

const handleCancelDiscardChanges = () => {
  discardChangesDialog.value?.close();
};

const handleConfirmDiscardChanges = () => {
  discardChangesDialog.value?.close();
  sidebar.value?.close();
  emit("close:drawer");
};

const close = () => {
  if (isChanged.value) {
    discardChangesDialog.value?.open();
    return;
  }

  sidebar.value?.close();
  emit("close:drawer");
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
  emit("close:drawer");
};

watch(
  superCurrentState,
  () => {
    if (!Object.keys(superCurrentState.value)) {
      return;
    }

    console.log("hello");

    drawerConfig.forEach((field: any) => {
      if (field.type === FieldsTypes.Id) {
        return;
      }

      superErrorDetails.value[field.id] = [];

      if (
        !prepareName(superCurrentState.value[field.id]) &&
        superIsInputStarted.value[field.id]
      ) {
        superErrorDetails.value[field.id].push(
          lang.error.fieldShouldNotBeEmpty(field.label)
        );
      }
    });
  },
  { deep: true }
);

defineExpose({
  open(item?: ICredentialType) {
    Object.assign(currentState, item ?? initialState);
    Object.assign(savedState, currentState);
    options.type = CredentialType.get();
    Object.assign(isInputStarted, isInputStartedInitialValue);
    sidebar.value?.open();
    drawerConfig.forEach((field) => {
      superCurrentState.value[field.id] = null;
      superIsInputStarted.value[field.id] = null;
    });
  },
  close,
});
</script>

<template>
  <UniversalDrawer
    ref="sidebar"
    :title="isEditMode ? $lang.title.editCredential : $lang.title.addCredential"
    close-button
    @click:close="close"
  >
    <div class="credential-sidebar">
      <UniversalField
        :label="field.label"
        v-for="field in drawerConfig"
        :key="field.id"
      >
        <UniversalText
          v-if="[FieldsTypes.String, FieldsTypes.Password].includes(field.type)"
          v-model="superCurrentState[field.id]"
          v-model:is-input-started="superIsInputStarted[field.id]"
          :errors="superErrorDetails[field.id]"
        />
        <UniversalSelector
          v-if="field.type === FieldsTypes.Selector"
          v-model="superCurrentState[field.id]"
          :options="getOptions(field.sourceObjectId)"
        />
        <UniversalTextarea
          v-if="field.type === FieldsTypes.Text"
          v-model="superCurrentState[field.id]"
          :errors="superErrorDetails[field.id]"
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

<style lang="scss" scoped>
@import "@/assets/variables";
.credential-sidebar {
  // TODO
}
</style>
