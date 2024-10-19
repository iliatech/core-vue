<template>
  <CentralBlock :messages="pagesMessages['restorePassword']">
    <template #title>
      {{ lang.title.restorePassword }}
    </template>
    <form class="restore-password__form">
      <UniversalField
        :label="lang.label.email"
        :errors="getValidationErrors(formErrors, 'email')"
      >
        <UniversalText
          v-model="email"
          :placeholder="lang.placeholder.enterEmail"
        />
      </UniversalField>

      <UniversalField :errors="getValidationErrors(formErrors, 'token')">
        <vue-turnstile
          :key="turnstileKey"
          :site-key="CLOUDFLARE_TURNSTILE_SITE_KEY"
          v-model="token"
          theme="light"
        />
      </UniversalField>

      <div class="restore-password__button-container">
        <Button
          :label="lang.button.restore"
          @click="onClickRestore"
          :disabled="!email || !token"
        />
      </div>
    </form>
    <template #notes>
      <div class="restore-password__restore-password">
        {{ lang.phrase.returnToLoginPage }}<br />
        <UniversalButton
          :label="lang.button.login"
          no-border
          text
          @click="handleClickLogin"
        />
      </div>
      <div>
        {{ lang.phrase.dontHaveAccount }}<br />
        <UniversalButton
          :label="lang.button.register"
          no-border
          text
          @click="handleClickRegister"
        />
      </div>
    </template>
  </CentralBlock>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import Button from "primevue/button";
import { lang } from "@/lang";
import Api from "@/api/Api";
import { RequestMethods } from "@/types/api";
import { apiPaths } from "@/settings/api";
import { routes } from "@/settings/routes";
import { useAppStore } from "@/store/appStore";
import UniversalButton from "@/components/buttons/UniversalButton.vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import CentralBlock from "@/components/templates/CentralBlock.vue";
import { getValidationErrors } from "@/helpers/formValidation";
import UniversalField from "@/components/fields/UniversalField.vue";
import type { ApiValidationError } from "@/types/common";
import UniversalText from "@/components/fields/UniversalText.vue";
import { CLOUDFLARE_TURNSTILE_SITE_KEY } from "@/settings/app";
import VueTurnstile from "vue-turnstile";

const router = useRouter();

const appStore = useAppStore();
const { updatePageMessages } = appStore;
const { pagesMessages } = storeToRefs(appStore);

const email = ref("");
const formErrors = ref<ApiValidationError[]>([]);
const token = ref();
const turnstileKey = ref(0);

const onClickRestore = async () => {
  const { success, validationErrors } = await Api.request({
    method: RequestMethods.Post,
    path: apiPaths.restorePassword,
    payload: {
      email: email.value,
      token: token.value,
    },
  });

  formErrors.value = validationErrors;

  token.value = undefined;
  turnstileKey.value++;

  if (validationErrors?.length) {
    updatePageMessages("restorePassword", []);
    return;
  }

  if (success) {
    updatePageMessages("login", [
      {
        text: "We have sent instructions to your email if it's registered in our system",
        color: "green",
      },
    ]);

    await router.push({ name: routes.login.name });
  } else {
    updatePageMessages("restorePassword", [
      {
        text: "Something went wrong when try to restore password",
        color: "red",
      },
    ]);
  }
};

const handleClickRegister = () => {
  router.push({ name: routes.register.name });
};

const handleClickLogin = () => {
  router.push({ name: routes.login.name });
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";
@import "@/assets/fonts.scss";

.restore-password {
  &__field-label {
    display: block;
    margin-bottom: $px-10;
  }

  &__button-container {
    margin-top: $px-20;
  }

  &__title {
    @include header-medium;
    margin-bottom: $px-30;
  }
}
</style>
