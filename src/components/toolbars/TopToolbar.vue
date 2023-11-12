<template>
  <div class="top-toolbar">
    <div class="top-toolbar__left">
      <span class="top-toolbar__navigation-label">
        {{ $lang.label.navigation }}:
      </span>
      <Dropdown
        class="top-toolbar__navigation-dropdown"
        :model-value="navigation"
        :options="navigationOptions"
        option-label="label"
        option-value="path"
        @update:model-value="onChangeNavigation"
      />
    </div>
    <div
      class="top-toolbar__center"
      :class="{
        'top-toolbar__inner-page-style': !isMainPageStyle,
        'top-toolbar__main-page-style': isMainPageStyle,
      }"
    >
      {{ title }}
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
import { fullUserName } from "@/helpers/common";

const route = useRoute();

const appStore = useAppStore();
const { updateIsAuthorized } = appStore;
const { isAuthorized } = storeToRefs(appStore);

const userMenu = ref();
const navigation = ref();

const title = computed(() => {
  return route.meta.title;
});

const url = computed(() => {
  return route.meta.url;
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
    {
      label: "Clients Schedule",
      path: routes.schedule.path,
    },
    {
      label: "Useful Links",
      path: routes.usefulLinks.path,
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
      label: "Words Cards",
      path: routes.words.path,
    });
  }

  return items;
});

const menuAuthorized = computed(() => {
  const user = getAuthUser();

  return [
    {
      label: fullUserName(user),
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
  router.push(routes.login.path);
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
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  padding: $px-20;
  margin-bottom: $px-20;
  border-bottom: 1px solid #aaa;
  background: #f1eceb;

  &__left {
    display: flex;
    gap: $px-10;
    align-items: center;
  }

  &__center {
    text-align: center;
  }

  &__navigation-dropdown {
    width: 200px;
  }

  &__right {
    display: flex;

    justify-content: flex-end;
    gap: 50px;
  }

  :deep(.p-button) {
    color: #999;
  }

  &__inner-page-style,
  &__inner-page-style a {
    @include header-large;
    color: #333;
    text-decoration: none;
  }

  &__main-page-style,
  &__main-page-style a {
    @include header-large;
    color: #333;
    text-decoration: none;
  }
}
</style>
