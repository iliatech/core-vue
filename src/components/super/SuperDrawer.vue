<script lang="ts" setup>
import UniversalDrawer from "@/components/dialogs/UniversalDrawer.vue";
import type { PropType } from "vue";
import { computed, onBeforeMount, reactive, ref, watch } from "vue";
import UniversalButton from "@/components/buttons/UniversalButton.vue";
import { showToast } from "@/helpers/toast";
import { ToastType } from "@/types/toasts";
import { lang } from "@/lang";
import { cloneDeep, isEqual } from "lodash";
import { prepareName } from "@/helpers/strings";
import UniversalText from "@/components/fields/UniversalText.vue";
import UniversalDialog from "@/components/dialogs/UniversalDialog.vue";
import UniversalField from "@/components/fields/UniversalField.vue";
import UniversalSelector from "@/components/fields/UniversalSelector.vue";
import UniversalTextarea from "@/components/fields/UniversalTextarea.vue";
import { useUniversalDatabaseStore } from "@/store/universalDatabaseStore";
import type {
  ConfigurationObject,
  FieldConfig,
  Instance,
} from "@/types/common";
import { FieldsTypes, noDrawerFieldsTypes } from "@/types/common";

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

const isInputStartedInitialValue = {
  name: false,
  password: false,
  description: false,
};

const sidebar = ref<InstanceType<typeof UniversalDrawer>>();
const discardChangesDialog = ref<InstanceType<typeof UniversalDrawer>>();
const isInputStarted = reactive<IsInputStarted>(isInputStartedInitialValue);

const superCurrentState = ref<Record<string, any>>({});
const superSavedState = ref<Record<string, any>>({});
const superIsInputStarted = ref<Record<string, any>>({});
const superErrorDetails = ref<Record<string, string[]>>({});

const optionsArrays = ref<Record<string, Instance[]>>({});

const emit = defineEmits(["close:drawer"]);

const universalDatabaseStore = useUniversalDatabaseStore();
const { addOrUpdateInstance, getInstances } = universalDatabaseStore;

const props = defineProps({
  titleAdd: { type: String, required: true },
  titleEdit: { type: String, required: true },
  objectConfig: {
    type: Object as PropType<{
      object: ConfigurationObject;
      fields: FieldConfig[];
    }>,
    required: true,
  },
});

const fieldsConfig = computed<FieldConfig[]>(() =>
  props.objectConfig?.fields.filter((field) => field.type !== FieldsTypes.Order)
);

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
  // if (!prepareName(currentState.name)) {
  //   errors.name.push(lang.error.entityShouldNotBeEmpty(IEntity.CredentialName));
  // }

  // TODO Restore for Universal object.
  // Type.
  // if (!currentState.typeId) {
  //   errors.type.push(lang.error.entityShouldNotBeEmpty(IEntity.CredentialType));
  // }

  // TODO Restore for Universal object.
  // Password.
  // if (!prepareName(currentState.password)) {
  //   errors.password.push(
  //     lang.error.entityShouldNotBeEmpty(IEntity.CredentialPassword)
  //   );
  // }

  return errors;
});

const getOptions = async (field: FieldConfig): Promise<Instance[]> => {
  if (!field.linkedObjectId) {
    throw new Error(
      `linkedObjectId is not defined in field config for field ${field.id}`
    );
  }

  let instances = await getInstances({
    objectId: field.linkedObjectId,
  });

  if (field.selectorFilter?.fieldId) {
    instances = instances.filter(
      (instance) =>
        instance[field.selectorFilter.fieldId] === field.selectorFilter.value
    );
  }

  console.log("INS", instances);

  return instances;
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
        objectId: props.objectConfig?.object.id,
        instanceId: superSavedState.value.id,
      },
      superCurrentState.value
    );
  } else {
    await addOrUpdateInstance(
      {
        objectId: props.objectConfig?.object.id,
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
      if (noDrawerFieldsTypes.includes(field.type)) {
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

onBeforeMount(async () => {
  for (let field of fieldsConfig.value) {
    if (field.type === FieldsTypes.Selector) {
      console.log("FF", field);
      optionsArrays.value[field.id] = await getOptions(field);
    }
  }

  console.log("getOpt", optionsArrays.value);
});

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
      <template v-for="field in fieldsConfig" :key="field.id">
        <UniversalField
          v-if="!noDrawerFieldsTypes.includes(field.type)"
          :label="field.label"
        >
          <UniversalText
            v-if="
              [FieldsTypes.String, FieldsTypes.Password].includes(field.type)
            "
            v-model="superCurrentState[field.id]"
            v-model:is-input-started="superIsInputStarted[field.id]"
            :errors="superErrorDetails[field.id]"
          />
          <UniversalSelector
            v-if="
              field.type === FieldsTypes.Selector && optionsArrays[field.id]
            "
            v-model="superCurrentState[field.id]"
            :options="optionsArrays[field.id]"
            :label-field="field.linkedObjectFieldId"
          />
          <UniversalTextarea
            v-if="field.type === FieldsTypes.Text"
            v-model="superCurrentState[field.id]"
            :errors="superErrorDetails[field.id]"
          />
        </UniversalField>
      </template>
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
