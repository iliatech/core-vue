<template>
  <CenteredBlockTemplate>
    <template #title>
      {{ lang.title.registration }}
    </template>
    <form class="register-page__form">
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
          :disabled="
            !email || !passwordMain || passwordConfirm !== passwordMain
          "
        />
      </div>
    </form>
    <template #notes>
      {{ lang.phrase.alreadyHaveAccount }}
      <UniversalButton
        :label="lang.button.login"
        no-border
        text
        @click="handleClickLogin"
      />
    </template>
  </CenteredBlockTemplate>
</template>
<script lang="ts" setup>
import { computed, ref, watch } from "vue";
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
import CenteredBlockTemplate from "@/components/templates/CenteredBlockTemplate.vue";
import UniversalButton from "@/components/buttons/UniversalButton.vue";

const appStore = useAppStore();
const { updateIsAuthorized, updateAuthUser, updatePageMessages } = appStore;

const email = ref("");
const passwordMain = ref("");
const passwordConfirm = ref("");
const validationErrors = ref<ApiValidationError[]>([]);

const formErrors = computed<ApiValidationError[]>(() => {
  const errors: ApiValidationError[] = [];

  if (passwordMain.value !== passwordConfirm.value && passwordConfirm.value) {
    errors.push({
      path: "password",
      customMessage: lang.error.passwordAndConfirmationAreDifferent,
    });
  }

  return [...errors, ...validationErrors.value];
});

const onClickRegister = async () => {
  const res = await Api.request({
    method: RequestMethods.Post,
    path: apiPaths.register,
    payload: {
      email: email.value,
      password: passwordMain.value,
    },
  });

  const { created, validationErrors: errors } = res;

  validationErrors.value = errors;

  if (created) {
    updatePageMessages("login", [
      { text: lang.success.youRegistered(email.value), color: "green" },
    ]);
    await router.push({ name: routes.login.name });
  }
};

const handleClickLogin = () => {
  router.push({ name: routes.login.name });
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";
@import "@/assets/fonts.scss";

.register-page {
  &__button-container {
    margin-top: $px-20;
  }

  &__passwords {
    display: flex;
    flex-direction: column;
    gap: $px-10;
  }
}
</style>
