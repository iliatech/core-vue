<template>
  <div className="login-page">
    <form className="login-page__form">
      <div className="login-page__title">{{ lang.title.login }}</div>
      <label className="login-page__field-label">{{ lang.label.email }}</label>
      <InputText v-model="email" />
      <label className="login-page__field-label">{{
        lang.label.password
      }}</label>

      <!-- TODO: Should we write false? -->
      <Password
        v-model="password"
        :feedback="false"
        autocomplete="current-password"
      />

      <div className="login-page__button-container">
        <Button
          :label="lang.button.login"
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
import { lang } from "@/lang";
import { showToast } from "@/helpers/toast";
import { ToastType } from "@/types/toasts";
import Api from "@/api/Api";
import { RequestMethods } from "@/types/api";
import { apiPaths } from "@/settings/api";
import {
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
    showToast({ type: ToastType.Error, text: lang.error.loginFailed });
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
      showToast({ type: ToastType.Success, text: lang.success.login });
      await router.push({ name: routes.home.name });
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
@import "@/assets/fonts.scss";

.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  &__form {
  }

  &__field-label {
    display: block;
    margin-bottom: $space-ten;
    margin-top: $space-twenty;
  }

  &__button-container {
    margin-top: $space-twenty;
  }

  &__title {
    @include header-medium;
    margin-bottom: $space-thirty;
  }
}
</style>
