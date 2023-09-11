<template>
  <div class="main-toolbar">
    <Button severity="danger" @click="onClickLogout">
      {{ $lang.logout }}
    </Button>
  </div>
  <RouterView />
</template>
<script lang="ts" setup>
import Button from "primevue/button";
import Toolbar from "primevue/toolbar";
import { resetAuthToken, resetAuthUser } from "@/helpers/auth";
import { routes } from "@/settings/routes";
import router from "@/router";
import { showToast } from "@/helpers/toast";
import { ToastType } from "@/types/toasts";
import lang from "@/lang/lang";

const onClickLogout = () => {
  router.push(routes.login.path);
  resetAuthUser();
  resetAuthToken();
  showToast({ type: ToastType.Error, text: lang.logoutSuccess });
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";
.main-toolbar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: $space-small;
}
</style>
