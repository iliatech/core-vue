<script lang="ts" setup>
import UniversalDrawer from "@/components/dialogs/UniversalDrawer.vue";
import type { PropType } from "vue";
import { computed, reactive, ref, watch } from "vue";
import UniversalButton from "@/components/buttons/UniversalButton.vue";
import { CredentialType } from "@/modules/credentials/classes/entities/CredentialType";
import { showToast } from "@/helpers/toast";
import { ToastType } from "@/types/toasts";
import { lang } from "@/lang";
import { cloneDeep, isEqual } from "lodash";
import { IEntity } from "@/settings/entities";
import { prepareName } from "@/helpers/strings";
import UniversalText from "@/components/fields/UniversalText.vue";
import UniversalDialog from "@/components/dialogs/UniversalDialog.vue";
import UniversalField from "@/components/fields/UniversalField.vue";
import UniversalSelector from "@/components/fields/UniversalSelector.vue";
import { Credential } from "@/modules/credentials/classes/entities/Credential";
import type { ICredentialType } from "@/modules/credentials/types";
import UniversalTextarea from "@/components/fields/UniversalTextarea.vue";
import { UniversalObject } from "@/modules/credentials/classes/entities/UniversalObject";
import { useUniversalDatabaseStore } from "@/modules/credentials/store/universalDatabaseStore";
import { UniversalDatabase } from "@/modules/credentials/classes/UniversalDatabase";
import type { FieldConfig, ObjectConfig } from "@/types/common";
import { FieldsTypes } from "@/types/common";

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

const superCurrentState = ref<Record<string, any>>({});
const superSavedState = ref<Record<string, any>>({});
const superIsInputStarted = ref<Record<string, any>>({});
const superErrorDetails = ref<Record<string, string[]>>({});
const objectId = ref<string | null>(null);

const savedState = reactive<DrawerState>({ ...initialState });
const options = reactive<Options>({ type: [] });

const emit = defineEmits(["close:drawer"]);

const universalDatabaseStore = useUniversalDatabaseStore();
const { addInstance, getInstances } = universalDatabaseStore;

const props = defineProps({
  titleAdd: { type: String, required: true },
  titleEdit: { type: String, required: true },
  objectConfig: { type: Object as PropType<ObjectConfig>, required: true },
});

const drawerConfig: FieldConfig[] = props.objectConfig?.fields;

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
  // TODO
  console.log(universalObjectId);
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
  drawerConfig.forEach((field) => {
    if (field.required && !superCurrentState.value[field.id]) {
      // TODO Add field to array of errors, error should be shown under the field.
    }
  });

  await addInstance(
    {
      databaseId: "50bda5a6-b1a0-4d73-b7db-301392037f87",
      objectId: "2c98151d-4995-49c9-b49e-0070058d951c",
    },
    superCurrentState.value
  );

  console.log(
    "INSTANCES",
    getInstances({
      databaseId: "50bda5a6-b1a0-4d73-b7db-301392037f87",
      objectId: "2c98151d-4995-49c9-b49e-0070058d951c",
    })
  );

  return;

  if (!currentState.typeId) {
    throw new Error("currentState.type  is not defined");
  }

  if (isEditMode.value) {
    if (!objectId.value) {
      throw new Error("objectId is null");
    }

    await UniversalObject.update(objectConfig.id, {
      id: objectId.value,
      ...superCurrentState.value,
    });
  } else {
    await Credential.add({
      name: currentState.name,
      typeId: currentState.typeId,
      password: currentState.password,
      description: currentState.description,
    });
  }

  superSavedState.value = cloneDeep(superCurrentState.value);

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
  async open(item?: ICredentialType) {
    Object.assign(currentState, item ?? initialState);
    Object.assign(savedState, currentState);
    options.type = CredentialType.get();
    Object.assign(isInputStarted, isInputStartedInitialValue);
    sidebar.value?.open();
    drawerConfig.forEach((field) => {
      superCurrentState.value[field.id] = null;
      superIsInputStarted.value[field.id] = null;
    });

    await UniversalDatabase.load("50bda5a6-b1a0-4d73-b7db-301392037f87");
  },
  close,
});
</script>

<template>
  <UniversalDrawer
    ref="sidebar"
    :title="isEditMode ? titleEdit : titleAdd"
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
      />
      <!-- TODO :disabled="!isChanged || !isValid" -->
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
