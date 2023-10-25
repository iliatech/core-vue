<template>
  <div class="top-toolbar">
    <div class="top-toolbar__left">
      {{ $lang.title.wordsApp }}
    </div>

    <div class="top-toolbar__right">
      <Button icon="pi pi-bars" @click="toggleUserMenu" outlined rounded />
      <Menu ref="userMenu" id="user_menu" :model="menuItems" popup />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { lang } from "@/lang";
import router from "@/router";
import { routes } from "@/settings/routes";
import { getAuthUser, resetAuthToken, resetAuthUser } from "@/helpers/auth";
import Button from "primevue/button";
import Menu from "primevue/menu";
import { showToast } from "@/helpers/toast";
import { ToastType } from "@/types/toasts";
import { computed, ref } from "vue";

const userMenu = ref();

const menuItems = computed(() => {
  const items = [];

  if (getAuthUser()) {
    items.push({
      label: lang.menu.logout,
      icon: "pi pi-sign-out",
      command: () => {
        onClickLogout();
      },
    });
  } else {
    items.push({
      label: lang.menu.login,
      icon: "pi pi-sign-out",
      command: () => {
        onClickLogin();
      },
    });
  }

  return items;
});

const toggleUserMenu = (event: Event) => {
  userMenu.value.toggle(event);
};

const onClickLogin = () => {
  router.push(routes.login.path);
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
@import "@/assets/fonts.scss";
.top-toolbar {
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
