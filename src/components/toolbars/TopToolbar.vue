<template>
  <div
    class="top-toolbar"
    :class="{
      'top-toolbar__inner-page-style': !mainPageStyle,
      'top-toolbar__main-page-style': mainPageStyle,
    }"
  >
    <div class="top-toolbar__left">{{ props.title }}</div>

    <div class="top-toolbar__right">
      <Button icon="pi pi-bars" @click="toggleUserMenu" outlined rounded />
      <Menu
        ref="userMenu"
        id="user_menu"
        :model="isAuthorized ? menuAuthorized : menuPublic"
        popup
      />
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
import { useAppStore } from "@/store/appStore";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { updateIsAuthorized } = appStore;
const { isAuthorized } = storeToRefs(appStore);

const goHomeMenuItem = {
  label: lang.menu.home,
  command: () => {
    router.push(routes.root.path);
  },
};

const props = defineProps({
  title: String,
  mainPageStyle: Boolean,
});

const userMenu = ref();

const menuAuthorized = computed(() => {
  const user = getAuthUser();

  return [
    {
      label: `${user?.firstName} ${user?.lastName}`,
      icon: "pi pi-user",
    },
    goHomeMenuItem,
    {
      label: lang.menu.logout,
      icon: "pi pi-sign-out",
      command: () => {
        onClickLogout();
      },
    },
  ];
});

const menuPublic = computed(() => {
  return [
    {
      label: lang.menu.login,
      icon: "pi pi-sign-out",
      command: () => {
        onClickLogin();
      },
    },
    goHomeMenuItem,
  ];
});

const toggleUserMenu = (event: Event) => {
  userMenu.value.toggle(event);
};

const onClickLogin = () => {
  router.push(routes.login.path);
};

const onClickLogout = () => {
  router.push(routes.root.path);
  resetAuthUser();
  resetAuthToken();
  updateIsAuthorized(false);
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
    flex-grow: 1;
  }

  &__right {
    display: flex;
    flex-grow: 1;
    justify-content: flex-end;
  }

  :deep(.p-button) {
    color: #999;
  }

  &__inner-page-style {
    @include header-large;
    color: #333;
  }

  &__main-page-style {
    @include header-extra-large;
    color: darkorange;
  }
}
</style>
