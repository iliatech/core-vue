<template>
  <CenteredBlockTemplate :messages="pagesMessages['changePassword']">
    <template #title>
      {{ lang.title.changePassword }}
    </template>
    <form class="change-password__form">
      <UniversalField
        :label="lang.label.newPassword"
        :errors="getValidationErrors(formErrors, 'password')"
      >
        <div class="change-password__passwords">
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

      <div class="change-password__button-container">
        <Button
          :label="lang.button.changePassword"
          @click="onClickChangePassword"
          :disabled="
            !passwordMain || passwordConfirm !== passwordMain || !token
          "
        />
      </div>
    </form>
  </CenteredBlockTemplate>
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
import router from "@/router";
import { routes } from "@/settings/routes";
import { useAppStore } from "@/store/appStore";
import UniversalField from "@/components/fields/UniversalField.vue";
import { getValidationErrors } from "@/helpers/formValidation";
import type { ApiValidationError } from "@/types/common";
import CenteredBlockTemplate from "@/components/templates/CenteredBlockTemplate.vue";
import { CLOUDFLARE_TURNSTILE_SITE_KEY } from "@/settings/app";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { updatePageMessages } = appStore;
const { pagesMessages } = storeToRefs(appStore);

const route = useRoute();

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

const onClickChangePassword = async () => {
  const email = route.query?.email;
  const rpCode = route.query?.rpCode;

  if (!email || !rpCode) {
    throw new Error("Not enough query params");
  }

  const res = await Api.request({
    method: RequestMethods.Post,
    path: apiPaths.changePassword,
    payload: {
      password: passwordMain.value,
      email,
      rpCode,
      token: token.value,
    },
  });

  token.value = undefined;
  turnstileKey.value++;

  const { success, validationErrors: errors } = res;

  validationErrors.value = errors ?? [];

  if (success) {
    updatePageMessages("login", [
      { text: lang.success.passwordChanged, color: "green" },
    ]);

    await router.push({ name: routes.login.name });
  } else {
    updatePageMessages("changePassword", [
      { text: lang.error.passwordNotChanged, color: "red" },
    ]);
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";
@import "@/assets/fonts.scss";

.change-password {
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
