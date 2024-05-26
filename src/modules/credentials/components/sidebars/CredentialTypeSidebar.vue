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
        :label="$lang.label.name"
        :errors="errorDetails"
      />
    </div>
    <template #buttons-after>
      <UniversalButton
        @click="handleClickAdd"
        :label="$lang.button.add"
        width="70px"
        :disabled="!isChanged || isSameNameExists"
      />
    </template>
  </UniversalSidebar>
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

interface DrawerState {
  name: string;
}

const initialState: DrawerState = {
  name: "",
};

const emit = defineEmits(["add:credentialType"]);

const sidebar = ref<InstanceType<typeof UniversalSidebar>>();
const isInputStarted = ref<boolean>(false);
const currentState = reactive<DrawerState>({
  name: "",
});

const isChanged = computed<boolean>(() => {
  return !isEqual(initialState, currentState);
});

const isSameNameExists = computed<boolean>(() => {
  return !!CredentialType.get({ label: prepareName(currentState.name) }).length;
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

const close = () => {
  sidebar.value?.close();
};

const handleClickAdd = async () => {
  await CredentialType.add({ label: currentState.name });
  showToast({
    type: ToastType.Success,
    text: lang.success.credentialTypeAdded,
  });
  emit("add:credentialType");
};

defineExpose({
  open() {
    Object.assign(currentState, initialState);
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
