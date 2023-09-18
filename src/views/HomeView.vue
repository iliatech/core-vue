<template>
  <div class="main-toolbar">
    <div class="main-toolbar__left">
      {{ $lang.title.wordsApp }}
    </div>

    <div class="main-toolbar__right">
      <Button icon="pi pi-bars" @click="toggleUserMenu" outlined rounded />
      <Menu ref="userMenu" id="user_menu" :model="menuItems" popup />
    </div>
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
import { lang } from "@/lang";
import { ref } from "vue";

const userMenu = ref();

const menuItems = [
  {
    label: lang.menu.logout,
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
  showToast({ type: ToastType.Warning, text: lang.success.logout });
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";
@import "@/assets/fontMixins.scss";
.main-toolbar {
  display: flex;
  justify-content: space-between;

  &__left {
    @include header-large;
    flex-grow: 1;
  }

  &__right {
    display: flex;
    flex-grow: 1;
    justify-content: flex-end;
  }

  :deep(.p-button) {
    color: #ddd;
  }
}
</style>
