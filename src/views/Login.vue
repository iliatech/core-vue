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

      <UniversalField :errors="getValidationErrors(formErrors, 'token')">
        <vue-turnstile
          :key="turnstileKey"
          :site-key="CLOUDFLARE_TURNSTILE_SITE_KEY"
          v-model="token"
          theme="light"
        />
      </UniversalField>

      <div class="login-page__button-container">
        <Button
          :label="lang.button.login"
          @click="onClickLogin"
          :disabled="!email || !password || !token"
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
import { onBeforeMount, ref } from "vue";
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
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import CenteredBlockTemplate from "@/components/templates/CenteredBlockTemplate.vue";
import { getValidationErrors } from "@/helpers/formValidation";
import UniversalField from "@/components/fields/UniversalField.vue";
import type { ApiValidationError } from "@/types/common";
import UniversalText from "@/components/fields/UniversalText.vue";
import { CLOUDFLARE_TURNSTILE_SITE_KEY } from "@/settings/app";
import VueTurnstile from "vue-turnstile";

const router = useRouter();
const route = useRoute();

const appStore = useAppStore();
const { updateIsAuthorized, updateAuthUser, updatePageMessages } = appStore;
const { pagesMessages } = storeToRefs(appStore);

const email = ref("");
const password = ref("");
const formErrors = ref<ApiValidationError[]>([]);
const token = ref();
const turnstileKey = ref(0);

onBeforeMount(async () => {
  const email = route.query?.email;
  const code = route.query?.code;

  if (code && email) {
    const { success } = await Api.request({
      method: RequestMethods.Post,
      path: apiPaths.confirmEmail,
      payload: {
        email,
        code,
      },
    });

    if (success) {
      updatePageMessages("login", [
        {
          text: `Your email ${email} was verified. Now you can login.`,
          color: "green",
        },
      ]);
    } else {
      updatePageMessages("login", [
        {
          text: `Problem with verifying your email ${email} appeared. Please, try again and if no result - contact with our support, please.`,
          color: "red",
        },
      ]);
    }
  }
});

const onClickLogin = async () => {
  const { jwt, user } = await Api.request({
    method: RequestMethods.Post,
    path: apiPaths.login,
    payload: {
      user: email.value,
      password: password.value,
      token: token.value,
    },
  });

  token.value = undefined;
  turnstileKey.value++;

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
