<template>
  <div class="login-page">
    <form class="login-page__form">
      <label class="login-page__field-label">{{ lang.label.email }}</label>
      <InputText v-model="email" />
      <label class="login-page__field-label">{{ lang.label.password }}</label>

      <Password
        v-model="password"
        :feedback="false"
        autocomplete="current-password"
      />

      <div class="login-page__button-container">
        <Button
          :label="lang.button.login"
          @click="onClickLogin"
          :disabled="!email || !password"
        />
      </div>
      <div class="login-page__register">
        {{ lang.phrase.dontHaveAccount }}
        <UniversalButton
          :label="lang.button.register"
          no-border
          text
          @click="handleClickRegister"
        />
      </div>
    </form>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import Password from "primevue/password";
import InputText from "primevue/inputtext";
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

const router = useRouter();

const appStore = useAppStore();
const { updateIsAuthorized, updateAuthUser } = appStore;

const email = ref("");
const password = ref("");

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
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - $header-height);

  &__form {
    //
  }

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

  &__register {
    @include font-small-medium;
    margin-top: $px-30;
  }
}
</style>
