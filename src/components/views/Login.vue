<template>
  <div className="login-page">
    <form className="login-page__form">
      <div className="login-page__title">{{ lang.login }}</div>
      <label className="login-page__field-label">{{ lang.email }}</label>
      <InputText v-model="email" />
      <label className="login-page__field-label">{{ lang.password }}</label>

      <!-- TODO: Should we write false? -->
      <Password
        v-model="password"
        :feedback="false"
        autocomplete="current-password"
      />

      <div className="login-page__button-container">
        <Button
          :label="lang.login"
          @click="onClickLogin"
          :disabled="!email || !password"
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
import lang from "@/lang/lang";
import type { ApiLoginRequest, ApiLoginResponse } from "@/types/api";
import { showToast } from "@/helpers/toast";
import { ToastType } from "@/types/toasts";
import Api from "@/api/Api";
import { RequestMethods } from "@/types/api";
import { apiPaths } from "@/settings/api";
import {
  getAuthToken,
  resetAuthToken,
  resetAuthUser,
  saveAuthToken,
  saveAuthUser,
} from "@/helpers/auth";
import router from "@/router";
import { routes } from "@/settings/routes";

const email = ref("");
const password = ref("");

const onClickLogin = async () => {
  const failedAuthorization = () => {
    resetAuthToken();
    resetAuthUser();
    showToast({ type: ToastType.Error, text: lang.loginFailed });
  };

  const loginResult = await Api.request({
    method: RequestMethods.Post,
    path: apiPaths.login,
    payload: {
      user: email.value,
      password: password.value,
    },
  });

  if (loginResult) {
    const authorizationResult = await Api.request({
      method: RequestMethods.Post,
      path: apiPaths.authorization,
      payload: {
        token: loginResult.jwt,
      },
    });

    if (authorizationResult.authorized) {
      saveAuthUser(authorizationResult.user);
      saveAuthToken(loginResult.jwt);
      showToast({ type: ToastType.Success, text: lang.loginSuccess });
      await router.push(`${routes.root.path}${routes.home.path}`);
    } else {
      failedAuthorization();
    }
  } else {
    failedAuthorization();
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";
@import "@/assets/fontMixins.scss";

.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  &__form {
  }

  &__field-label {
    display: block;
    margin-bottom: $space-small;
    margin-top: $space-medium;
  }

  &__button-container {
    margin-top: $space-medium;
  }

  &__title {
    @include header-medium;
    margin-bottom: $space-large;
  }
}
</style>
