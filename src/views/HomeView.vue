<template>
  <div class="main-toolbar">
    <Button
      severity="danger"
      icon="pi pi-bars"
      @click="toggleUserMenu"
      text
      rounded
    />
    <Menu ref="userMenu" id="user_menu" :model="menuItems" popup />
  </div>
  <RouterView />
</template>
<script lang="ts" setup>
import Button from "primevue/button";
import Menu from "primevue/menu";
import { resetAuthToken, resetAuthUser } from "@/helpers/auth";
import { routes } from "@/settings/routes";
import router from "@/router";
import { showToast } from "@/helpers/toast";
import { ToastType } from "@/types/toasts";
import lang from "@/lang/lang";
import { ref } from "vue";

const userMenu = ref();

const menuItems = [
  {
    label: lang.logout,
    icon: "pi pi-sign-out",
    command: () => {
      onClickLogout();
    },
  },
];

const toggleUserMenu = (event: Event) => {
  userMenu.value.toggle(event);
};

const onClickLogout = () => {
  router.push(routes.login.path);
  resetAuthUser();
  resetAuthToken();
  showToast({ type: ToastType.Warning, text: lang.logoutSuccess });
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
