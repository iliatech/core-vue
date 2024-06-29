<template>
  <div class="register-page">
    <form class="register-page__form">
      <div class="register-page__title">
        {{ lang.title.registration }}
      </div>
      <UniversalField :label="lang.label.email">
        <InputText v-model="email" style="width: 100%" />
      </UniversalField>
      <UniversalField :label="lang.label.password">
        <div class="register-page__passwords">
          <Password
            v-model="passwordMain"
            :input-props="{ autocomplete: 'new-password' }"
            toggle-mask
          />
          <Password
            v-model="passwordConfirm"
            :feedback="false"
            :input-props="{ autocomplete: 'new-password' }"
            name="pass1"
            autocomplete="confirm-password"
            toggle-mask
          />
        </div>
      </UniversalField>

      <div class="register-page__button-container">
        <Button
          :label="lang.button.register"
          @click="onClickRegister"
          :disabled="!email || !passwordMain"
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
import { showErrorToast, showSuccessToast, showToast } from "@/helpers/toast";
import { ToastType } from "@/types/toasts";
import Api from "@/api/Api";
import { RequestMethods } from "@/types/api";
import { apiPaths } from "@/settings/api";
import { resetAuthToken, resetAuthUser, saveAuthToken } from "@/helpers/auth";
import router from "@/router";
import { mainPrivatePage, routes } from "@/settings/routes";
import { useAppStore } from "@/store/appStore";
import UniversalField from "@/components/fields/UniversalField.vue";

const appStore = useAppStore();
const { updateIsAuthorized, updateAuthUser } = appStore;

const email = ref("");
const passwordMain = ref("");
const passwordConfirm = ref("");

const onClickRegister = async () => {
  const { created } = await Api.request({
    method: RequestMethods.Post,
    path: apiPaths.register,
    payload: {
      email: email.value,
      password: passwordMain.value,
    },
  });

  if (created) {
    showSuccessToast({ text: lang.success.userRegistered });
    await router.push({ name: routes.login.name });
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";
@import "@/assets/fonts.scss";

.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - $header-height);

  &__button-container {
    margin-top: $px-20;
  }

  &__title {
    @include font-extra-large;
    margin-bottom: $px-30;
  }

  &__passwords {
    display: flex;
    flex-direction: column;
    gap: $px-10;
  }
}
</style>
