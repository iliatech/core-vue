<script lang="ts" setup>
import UniversalDrawer from "@/components/dialogs/UniversalDrawer.vue";
import type { PropType } from "vue";
import { computed, reactive, ref, watch } from "vue";
import UniversalButton from "@/components/buttons/UniversalButton.vue";
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
import UniversalTextarea from "@/components/fields/UniversalTextarea.vue";
import { useUniversalDatabaseStore } from "@/store/universalDatabaseStore";
import type { FieldConfig, Instance, ObjectConfig } from "@/types/common";
import { FieldsTypes } from "@/types/common";

interface DrawerState {
  id: string | null;
  name: string;
  typeId: string | null;
  description: string;
  password: string;
}

// TODO Make universal.
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

const emit = defineEmits(["close:drawer"]);

const universalDatabaseStore = useUniversalDatabaseStore();
const { addOrUpdateInstance, getInstances } = universalDatabaseStore;

const props = defineProps({
  titleAdd: { type: String, required: true },
  titleEdit: { type: String, required: true },
  objectConfig: { type: Object as PropType<ObjectConfig>, required: true },
});

const fieldsConfig = computed<FieldConfig[]>(() => props.objectConfig?.fields);

const isChanged = computed<boolean>(() => {
  return !isEqual(superCurrentState.value, superSavedState.value);
});

const isEditMode = computed<boolean>(() => {
  return !!superSavedState.value.id;
});

// TODO Restore check of validity.
const isValid = computed<boolean>(() => {
  let isError = false;

  Object.values(errorDetails.value).forEach((value) => {
    if (value.length) {
      isError = true;
    }
  });

  return !isError;
});

// TODO Make Universal.
const errorDetails = computed<ErrorsDetails>(() => {
  const errors: ErrorsDetails = {
    name: [],
    type: [],
    password: [],
    description: [],
  };

  // TODO Restore for Universal object.
  // Name.
  if (!prepareName(currentState.name)) {
    errors.name.push(lang.error.entityShouldNotBeEmpty(IEntity.CredentialName));
  }

  // TODO Restore for Universal object.
  // Type.
  if (!currentState.typeId) {
    errors.type.push(lang.error.entityShouldNotBeEmpty(IEntity.CredentialType));
  }

  // TODO Restore for Universal object.
  // Password.
  if (!prepareName(currentState.password)) {
    errors.password.push(
      lang.error.entityShouldNotBeEmpty(IEntity.CredentialPassword)
    );
  }

  return errors;
});

const getOptions = (field: FieldConfig): Instance[] => {
  if (!field.sourceObjectId) {
    throw new Error(
      `sourceObjectId is not defined in field config for field ${field.id}`
    );
  }

  return getInstances({
    databaseId: props.objectConfig?.databaseId,
    objectId: field.sourceObjectId,
  });
};

const handleCancelDiscardChanges = () => {
  discardChangesDialog.value?.close();
};

const handleConfirmDiscardChanges = () => {
  discardChangesDialog.value?.close();
  sidebar.value?.close();
  emitCloseDrawer();
};

const close = () => {
  if (isChanged.value) {
    discardChangesDialog.value?.open();
    return;
  }

  sidebar.value?.close();
  emitCloseDrawer();
};

const handleClickSave = async () => {
  fieldsConfig.value.forEach((field) => {
    if (field.required && !superCurrentState.value[field.id]) {
      // TODO Add field to array of errors, error should be shown under the field.
    }
  });

  if (isEditMode.value) {
    await addOrUpdateInstance(
      {
        databaseId: props.objectConfig?.databaseId,
        objectId: props.objectConfig?.objectId,
        instanceId: superSavedState.value.id,
      },
      superCurrentState.value
    );
  } else {
    await addOrUpdateInstance(
      {
        databaseId: props.objectConfig?.databaseId,
        objectId: props.objectConfig?.objectId,
      },
      superCurrentState.value
    );
  }

  superSavedState.value = cloneDeep(superCurrentState.value);

  showToast({
    type: ToastType.Success,
    text: isEditMode.value
      ? lang.success.instanceUpdated
      : lang.success.instanceAdded,
  });

  sidebar.value?.close();

  emitCloseDrawer();
};

const emitCloseDrawer = () => {
  emit("close:drawer");
  superCurrentState.value = {};
  superSavedState.value = {};
  superIsInputStarted.value = {};
  superErrorDetails.value = {};
};

watch(
  superCurrentState,
  () => {
    if (!Object.keys(superCurrentState.value)) {
      return;
    }

    fieldsConfig.value.forEach((field: any) => {
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
  async open(item?: Instance) {
    // Clean.
    fieldsConfig.value.forEach((field) => {
      superCurrentState.value[field.id] = null;
      superSavedState.value[field.id] = null;
      superIsInputStarted.value[field.id] = null;
    });

    // In case of edit.
    if (item) {
      Object.assign(superCurrentState.value, item);
    }

    Object.assign(superSavedState.value, superCurrentState.value);

    // // TODO ?
    Object.assign(isInputStarted, isInputStartedInitialValue);
    //
    sidebar.value?.open();
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
    <div class="super-drawer">
      <UniversalField
        :label="field.label"
        v-for="field in fieldsConfig"
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
          :options="getOptions(field)"
          :label-field="field.sourceObjectFieldId"
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
.super-drawer {
  // TODO
}
</style>
