<template>
  <div
    class="top-toolbar"
    :class="{
      'top-toolbar__inner-page-style': !isMainPageStyle,
      'top-toolbar__main-page-style': isMainPageStyle,
    }"
  >
    <div class="top-toolbar__left">
      <div class="top-toolbar__left-title">
        {{ title }}
      </div>
      <Dropdown
        :model-value="navigation"
        :options="navigationOptions"
        option-label="label"
        option-value="path"
        @update:model-value="onChangeNavigation"
      />
    </div>

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
import Dropdown from "primevue/dropdown";
import router from "@/router";
import { publicRouteNames, routes } from "@/settings/routes";
import { getAuthUser, resetAuthToken, resetAuthUser } from "@/helpers/auth";
import Button from "primevue/button";
import Menu from "primevue/menu";
import { showToast } from "@/helpers/toast";
import { ToastType } from "@/types/toasts";
import { computed, ref, watch } from "vue";
import { useAppStore } from "@/store/appStore";
import { storeToRefs } from "pinia";
import type { NavigationItem } from "@/types/common";
import { useRoute } from "vue-router";

const route = useRoute();

const appStore = useAppStore();
const { updateIsAuthorized } = appStore;
const { isAuthorized } = storeToRefs(appStore);

const userMenu = ref();
const navigation = ref();

const title = computed(() => {
  return route.meta.title;
});

const isMainPageStyle = computed(() => {
  return publicRouteNames.includes(route.name as string);
});

const navigationOptions = computed(() => {
  const items: NavigationItem[] = [
    {
      label: "Home Page",
      path: routes.root.path,
    },
  ];

  if (!isAuthorized.value) {
    items.push({
      label: "Login Page",
      path: routes.login.path,
    });
  }

  if (isAuthorized.value) {
    items.push({
      label: "Word Cards",
      path: routes.words.path,
    });
  }

  return items;
});

const menuAuthorized = computed(() => {
  const user = getAuthUser();

  return [
    {
      label: `${user?.firstName} ${user?.lastName}`,
      icon: "pi pi-user",
    },
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
  ];
});

watch(
  () => route.path,
  (value) => {
    navigation.value = value;
  },
  { immediate: true }
);

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

const onChangeNavigation = (path: string) => {
  router.push(path);
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";
@import "@/assets/fonts.scss";
.top-toolbar {
  display: flex;
  justify-content: space-between;
  padding: $px-20;
  margin-bottom: $px-20;
  border-bottom: 1px solid #aaa;
  background: #f1eceb;

  &__left {
    flex-grow: 1;
    display: flex;
    gap: $px-40;
    align-items: center;
  }

  &__left-title {
    width: 350px;
    border-right: 1px dotted #aaa;
  }

  &__right {
    display: flex;
    flex-grow: 1;
    justify-content: flex-end;
    gap: 50px;
  }

  :deep(.p-button) {
    color: #999;
  }

  &__inner-page-style {
    @include header-large;
    color: #333;
  }

  &__main-page-style {
    @include header-large;
    color: darkorange;
  }
}
</style>
