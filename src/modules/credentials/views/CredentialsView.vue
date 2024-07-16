<template>
  <div class="credentials-view">
    <div class="credentials-view__tabs">
      <div
        class="credentials-view__tabs-item"
        :class="{
          'credentials-view__tabs-item--selected': item.name === route.name,
        }"
        v-for="item in credentialsRoutes"
        :key="item.title"
        @click="handleClickMenuItem(item.name)"
      >
        {{ item.title }}
      </div>
      <div
        class="credentials-view__tabs-item credentials-view__tabs-item-last"
      />
    </div>
    <div class="credentials-view__content">
      <RouterView />
    </div>
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
import { LocalStorageKeys } from "@/settings/app";
import { onMounted, ref } from "vue";
import UniversalDialog from "@/components/dialogs/UniversalDialog.vue";
import UniversalText from "@/components/fields/UniversalText.vue";
import { prepareName } from "@/helpers/strings";
import { CredentialDatabase } from "@/modules/credentials/classes/CredentialDatabase";
import { showErrorToast, showSuccessToast } from "@/helpers/toast";
import { lang } from "@/lang";
import { credentialsRoutes, routes } from "@/settings/routes";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

console.log("R", routes);

const secretKeyDialog = ref<InstanceType<typeof UniversalDialog>>();
const secretKey = ref<string>("");

onMounted(() => {
  const secretKey = localStorage.getItem(
    LocalStorageKeys.CredentialDatabaseKey
  );

  if (!secretKey) {
    secretKeyDialog.value?.open();
  }

  CredentialDatabase.load();
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

const handleClickMenuItem = (routeName: string) => {
  router.push({ name: routeName });
};
</script>
<style lang="scss" scoped>
@import "@/assets/fonts";
@import "@/assets/variables";
.credentials-view {
  height: 100%;
  padding: 0 $px-60;
  display: flex;
  flex-direction: column;

  &__tabs {
    display: flex;
    margin-top: $px-10;
    margin-bottom: $px-20;
    padding: 0 $px-5 $px-5;
  }

  &__content {
    flex-grow: 1;
  }

  &__tabs-item {
    cursor: pointer;
    border-bottom: 2px solid #ccc;
    padding-left: $px-20;
    padding-right: $px-20;
    padding-bottom: $px-5;
  }

  &__tabs-item-last {
    flex-grow: 1;
  }

  &__tabs-item--selected {
    font-weight: bold;
    border-bottom-color: #666;
  }
}
</style>
