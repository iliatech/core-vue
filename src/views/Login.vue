<template>
  <CenteredBlockTemplate :messages="pagesMessages['login']">
    <template #title>
      {{ lang.title.login }}
    </template>
    <form class="login-page__form">
      <UniversalField
        :label="lang.label.email"
        :errors="getValidationErrors(formErrors, 'email')"
      >
        <UniversalText
          v-model="email"
          :placeholder="lang.placeholder.enterEmail"
        />
      </UniversalField>

      <UniversalField
        :label="lang.label.password"
        :errors="getValidationErrors(formErrors, 'password')"
      >
        <Password
          v-model="password"
          :feedback="false"
          autocomplete="current-password"
        />
      </UniversalField>

      <vue-turnstile
        :site-key="CLOUDFLARE_TURNSTILE_SITE_KEY"
        v-model="token"
        theme="light"
      />

      <div class="login-page__button-container">
        <Button
          :label="lang.button.login"
          @click="onClickLogin"
          :disabled="!email || !password"
        />
      </div>
    </form>
    <template #notes>
      {{ lang.phrase.dontHaveAccount }}
      <UniversalButton
        :label="lang.button.register"
        no-border
        text
        @click="handleClickRegister"
      />
    </template>
  </CenteredBlockTemplate>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import Password from "primevue/password";
import Button from "primevue/button";
import { lang } from "@/lang";
import { showToast } from "@/helpers/toast";
import { ToastType } from "@/types/toasts";
import Api from "@/api/Api";
import { RequestMethods } from "@/types/api";
import { apiPaths } from "@/settings/api";
import { resetAuthToken, resetAuthUser, saveAuthToken } from "@/helpers/auth";
import { mainPrivatePage, routes } from "@/settings/routes";
import { useAppStore } from "@/store/appStore";
import UniversalButton from "@/components/buttons/UniversalButton.vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import CenteredBlockTemplate from "@/components/templates/CenteredBlockTemplate.vue";
import { getValidationErrors } from "@/helpers/formValidation";
import UniversalField from "@/components/fields/UniversalField.vue";
import type { ApiValidationError } from "@/types/common";
import UniversalText from "@/components/fields/UniversalText.vue";
import { CLOUDFLARE_TURNSTILE_SITE_KEY } from "@/settings/app";
import VueTurnstile from "vue-turnstile";

const router = useRouter();

const appStore = useAppStore();
const { updateIsAuthorized, updateAuthUser, updatePageMessages } = appStore;
const { pagesMessages } = storeToRefs(appStore);

const email = ref("");
const password = ref("");
const formErrors = ref<ApiValidationError[]>([]);
const token = ref();

const onClickLogin = async () => {
  const { jwt, user } = await Api.request({
    method: RequestMethods.Post,
    path: apiPaths.login,
    payload: {
      user: email.value,
      password: password.value,
    },
  });

  if (jwt && user) {
    saveAuthToken(jwt);
    updateIsAuthorized(true);
    updateAuthUser(user);
    updatePageMessages("login", []);
    await router.push({ name: mainPrivatePage.name });
  } else {
    resetAuthToken();
    resetAuthUser();
    updateAuthUser(null);
    showToast({ type: ToastType.Error, text: lang.error.loginFailed });
  }
};

const handleClickRegister = () => {
  router.push({ name: routes.register.name });
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";
@import "@/assets/fonts.scss";

.login-page {
  &__field-label {
    display: block;
    margin-bottom: $px-10;
    margin-top: $px-20;
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
