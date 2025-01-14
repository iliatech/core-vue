<template>
  <CentralBlock>
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
            toggle-mask
          />
        </div>
      </UniversalField>

      <UniversalField :errors="getValidationErrors(formErrors, 'token')">
        <vue-turnstile
          :key="turnstileKey"
          :site-key="CLOUDFLARE_TURNSTILE_SITE_KEY"
          v-model="token"
          theme="light"
        />
      </UniversalField>

      <div class="register-page__button-container">
        <Button
          :label="lang.button.register"
          @click="onClickRegister"
          :disabled="
            !email ||
            !passwordMain ||
            passwordConfirm !== passwordMain ||
            !token
          "
        />
      </div>
    </form>
    <template #notes>
      <div>
        {{ lang.phrase.alreadyHaveAccount }}<br />
        <UniversalButton
          :label="lang.button.login"
          no-border
          text
          @click="handleClickLogin"
        />
      </div>
    </template>
  </CentralBlock>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import Password from "primevue/password";
import Button from "primevue/button";
import { lang } from "@/lang";
import VueTurnstile from "vue-turnstile";
import Api from "@/api/Api";
import { RequestMethods } from "@/types/api";
import { apiPaths } from "@/settings/api";
import { routes } from "@/settings/routes";
import { useAppStore } from "@/store/appStore";
import UniversalField from "@/components/fields/UniversalField.vue";
import { getValidationErrors } from "@/helpers/formValidation";
import type { ApiValidationError } from "@/types/common";
import UniversalText from "@/components/fields/UniversalText.vue";
import CentralBlock from "@/components/templates/CentralBlock.vue";
import UniversalButton from "@/components/buttons/UniversalButton.vue";
import { CLOUDFLARE_TURNSTILE_SITE_KEY } from "@/settings/app";
import { useRouter } from "vue-router";

const appStore = useAppStore();
const { updatePageMessages } = appStore;

const router = useRouter();

const email = ref("");
const passwordMain = ref("");
const passwordConfirm = ref("");
const validationErrors = ref<ApiValidationError[]>([]);
const token = ref();
const turnstileKey = ref(0);

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
      token: token.value,
    },
  });

  token.value = undefined;
  turnstileKey.value++;

  const { created, validationErrors: errors } = res;

  validationErrors.value = errors ?? [];

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
