<template>
  <div className="login-page">
    <div className="login-page__form">
      <div className="login-page__title">{{ lang.login }}</div>
      <label className="login-page__field-label">{{ lang.email }}</label>
      <InputText v-model="email" />
      <label className="login-page__field-label">{{ lang.password }}</label>

      <!-- TODO: Should we write false? -->
      <Password v-model="password" :feedback="false" />

      <div className="login-page__button-container">
        <Button
          :label="lang.login"
          @click="onClickLogin"
          :disabled="!email || !password"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import Password from "primevue/password";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import lang from "@/lang/lang";

const email = ref("");
const password = ref("");

const onClickLogin = async () => {
  console.log("click login");
  // TODO
  //await useLogin(navigate, email, password);
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
    @include font-extra-large;
    margin-bottom: $space-large;
  }
}
</style>
