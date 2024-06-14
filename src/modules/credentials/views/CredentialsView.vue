<template>
  <div class="schedule-view">
    <CredentialsDashboard />
  </div>
  <UniversalDialog
    :title="$lang.title.enterSecretKey"
    ref="secretKeyDialog"
    @confirm="handleConfirmSecretKey"
    not-close-on-confirm
  >
    <UniversalText v-model="secretKey" :placeholder="$lang.label.secretKey" />
  </UniversalDialog>
</template>
<script lang="ts" setup>
import CredentialsDashboard from "@/modules/credentials/components/CredentialsDashboard.vue";
import { LocalStorageKeys } from "@/settings/app";
import { onMounted, ref } from "vue";
import UniversalDialog from "@/components/dialogs/UniversalDialog.vue";
import UniversalText from "@/components/fields/UniversalText.vue";
import { prepareName } from "@/helpers/strings";
import { CredentialDatabase } from "@/modules/credentials/classes/CredentialDatabase";
import { showErrorToast, showSuccessToast } from "@/helpers/toast";
import { lang } from "@/lang";

const secretKeyDialog = ref<InstanceType<typeof UniversalDialog>>();
const secretKey = ref<string>("");

onMounted(() => {
  const secretKey = localStorage.getItem(
    LocalStorageKeys.CredentialDatabaseKey
  );

  if (!secretKey) {
    secretKeyDialog.value?.open();
  }
});

const handleConfirmSecretKey = async () => {
  const key = prepareName(secretKey.value);

  if (key) {
    console.log("handleConfirmSecretKey");
    try {
      await CredentialDatabase.load(key);
      localStorage.setItem(LocalStorageKeys.CredentialDatabaseKey, key);
      showSuccessToast({ text: lang.success.secretKeySaved });
      secretKeyDialog.value?.close();
    } catch {
      showErrorToast({ text: lang.error.secretKeyIsWrong });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/fonts";
@import "@/assets/variables";
.schedule-view {
  display: flex;
  justify-content: center;
  padding: $px-20;
}
</style>
