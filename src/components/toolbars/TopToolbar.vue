<template>
  <div class="top-toolbar">
    <div class="top-toolbar__left"></div>
    <div
      class="top-toolbar__center"
      :class="{
        'top-toolbar__inner-page-style': !isMainPageStyle,
        'top-toolbar__main-page-style': isMainPageStyle,
      }"
    >
      {{ title }}
      <ScheduleButton
        icon-pre="angle-down"
        width="14px"
        height="20px"
        @click="openNavMenu"
        no-border
        icon-size="1rem"
      />
      <Menu ref="navMenu" :model="navigationOptions" popup>
        <template #item="{ item }">
          <div @click="router.push(item.path)">
            <div class="top-toolbar__navigation-menu-item">
              {{ item.label }}
            </div>
          </div>
        </template>
      </Menu>
    </div>
    <div class="top-toolbar__right">
      <Button icon="pi pi-bars" @click="toggleUserMenu" outlined rounded />
      <Menu
        ref="userMenu"
        :model="isAuthorized ? menuAuthorized : menuPublic"
        popup
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { lang } from "@/lang";
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
import ScheduleButton from "@/components/schedule/ScheduleButton.vue";

const route = useRoute();

const appStore = useAppStore();
const { updateIsAuthorized } = appStore;
const { isAuthorized } = storeToRefs(appStore);

const userMenu = ref();
const navMenu = ref();
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
      label: lang.label.profile,
      items: [
        {
          label: fullUserName(user),
          icon: "pi pi-user",
        },
      ],
    },
    {
      label: lang.label.logout,
      items: [
        {
          label: lang.menu.logout,
          icon: "pi pi-sign-out",
          command: () => {
            onClickLogout();
          },
        },
      ],
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

const openNavMenu = (event: Event) => {
  navMenu.value.toggle(event);
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
    flex-direction: column;
    gap: $px-10;
    align-items: flex-start;
  }

  &__center {
    margin-top: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    gap: $px-10;
  }

  &__navigation-menu-item {
    padding: $px-10 $px-20;
    cursor: pointer;
  }

  :deep(.schedule-button) {
    padding-left: 10px;
    padding-right: 8px;
    margin-bottom: 2px;
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
