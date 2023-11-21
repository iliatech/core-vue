<template>
  <div class="login-page">
    <form class="login-page__form">
      <label class="login-page__field-label">{{ lang.label.email }}</label>
      <InputText v-model="email" />
      <label class="login-page__field-label">{{ lang.label.password }}</label>

      <!-- TODO: Should we write false? -->
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
import { mainPrivatePage, routes } from "@/settings/routes";
import { useAppStore } from "@/store/appStore";

const appStore = useAppStore();
const { updateIsAuthorized } = appStore;

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
    saveAuthUser(user);
    saveAuthToken(jwt);
    updateIsAuthorized(true);
    await router.push({ name: mainPrivatePage.name });
  } else {
    resetAuthToken();
    resetAuthUser();
    showToast({ type: ToastType.Error, text: lang.error.loginFailed });
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
  height: calc(100vh - $header-height);

  &__form {
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
}
</style>
