<template>
  <div class="register-page">
    <div class="register-page__container">
      <form class="register-page__form">
        <div class="register-page__title">
          {{ lang.title.registration }}
        </div>
        <UniversalField
          :label="lang.label.email"
          :errors="getValidationErrors(formErrors, 'email')"
        >
          <UniversalText
            v-model="email"
            style="width: 100%"
            :placeholder="lang.placeholder.enterEmail"
          />
        </UniversalField>
        <UniversalField
          :label="lang.label.password"
          :errors="getValidationErrors(formErrors, 'password')"
        >
          <div class="register-page__passwords">
            <Password
              v-model="passwordMain"
              :input-props="{ autocomplete: 'new-password' }"
              :placeholder="lang.placeholder.enterPassword"
              toggle-mask
            />
            <Password
              v-model="passwordConfirm"
              :placeholder="lang.placeholder.confirmPassword"
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
import { getValidationErrors } from "@/helpers/formValidation";
import type { ApiValidationError } from "@/types/common";
import UniversalText from "@/components/fields/UniversalText.vue";

const appStore = useAppStore();
const { updateIsAuthorized, updateAuthUser } = appStore;

const email = ref("");
const passwordMain = ref("");
const passwordConfirm = ref("");
const formErrors = ref<ApiValidationError[]>([]);

const onClickRegister = async () => {
  const res = await Api.request({
    method: RequestMethods.Post,
    path: apiPaths.register,
    payload: {
      email: email.value,
      password: passwordMain.value,
    },
  });

  const { created, validationErrors } = res;

  formErrors.value = validationErrors;

  console.log("V E", formErrors);

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
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: calc(100vh - $header-height);

  &__button-container {
    margin-top: $px-20;
  }

  &__title {
    flex-grow: 1;
    @include header-large;
    margin-bottom: $px-30;
  }

  &__passwords {
    display: flex;
    flex-direction: column;
    gap: $px-10;
  }

  &__container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>
