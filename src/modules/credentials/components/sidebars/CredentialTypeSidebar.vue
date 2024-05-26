<template>
  <UniversalSidebar
    ref="sidebar"
    :title="$lang.title.addCredentialType"
    close-button
    @click:close="close"
  >
    <div class="credential-type-sidebar">
      <label class="credential-type-sidebar__name-label">
        {{ $lang.label.name }}
      </label>
      <InputText v-model="currentState.name" />
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
import InputText from "primevue/inputtext";
import UniversalButton from "@/components/buttons/UniversalButton.vue";
import { CredentialType } from "@/modules/credentials/classes/entities/CredentialType";
import { showToast } from "@/helpers/toast";
import { ToastType } from "@/types/toasts";
import { lang } from "@/lang";
import { isEqual } from "lodash";

interface DrawerState {
  name: string;
}

const initialState: DrawerState = {
  name: "",
};

const emit = defineEmits(["add:credentialType"]);

const sidebar = ref<InstanceType<typeof UniversalSidebar>>();
const currentState = reactive<DrawerState>({
  name: "",
});

const isChanged = computed<boolean>(() => {
  return !isEqual(initialState, currentState);
});

const isSameNameExists = computed<boolean>(() => {
  return !!CredentialType.get({ label: currentState.name }).length;
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
  &__name-label {
    display: block;
    margin-bottom: $px-10;
    margin-top: $px-20;
  }
}
</style>
