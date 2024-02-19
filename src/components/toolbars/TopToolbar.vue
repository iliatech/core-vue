<template>
  <div class="top-toolbar">
    <div class="top-toolbar__left">
      Hello! My name is <b>ILIA DOMYSHEV</b>.
      <br />
      I am a full-time JavaScript programmer since 2020.
    </div>
    <div class="top-toolbar__center">
      <div class="top-toolbar__center-container">
        <div class="top-toolbar__nav-title">Navigation:</div>
        <div @click="openNavMenu" class="top-toolbar__nav-button">
          {{ title }}
          <FutureButton
            icon-pre="angle-down"
            width="14px"
            height="20px"
            no-border
            icon-size="1rem"
          />
        </div>
      </div>
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
      <FutureButton
        icon-post="ellipsis-h"
        @click="handleClickUserMenu"
        margin-top="8px"
        no-border
      />
      <Menu
        ref="userMenu"
        :model="isAuthorized ? menuAuthorized : menuPublic"
        popup
      />
    </div>
  </div>
  <ProfileSidebar ref="profileSidebar" />
</template>
<script lang="ts" setup>
import { lang } from "@/lang";
import router from "@/router";
import { routes } from "@/settings/routes";
import { resetAuthToken, resetAuthUser } from "@/helpers/auth";
import Menu from "primevue/menu";
import { computed, ref, watch } from "vue";
import { useAppStore } from "@/store/appStore";
import { storeToRefs } from "pinia";
import type { NavigationItem } from "@/types/common";
import { useRoute } from "vue-router";
import { fullUserName } from "@/helpers/common";
import FutureButton from "@/components/schedule/FutureButton.vue";
import ProfileSidebar from "@/components/schedule/ProfileSidebar.vue";

const route = useRoute();

const appStore = useAppStore();
const { isAuthorized, user, authUserConfig } = storeToRefs(appStore);
const { updateIsAuthorized } = appStore;

const userMenu = ref();
const navMenu = ref();
const navigation = ref();
const profileSidebar = ref();

const title = computed(() => {
  if (
    authUserConfig.value.schedule.title &&
    route.path === routes.schedule.path
  ) {
    return authUserConfig.value.schedule.title;
  }

  return route.meta.title;
});

const navigationOptions = computed(() => {
  const items: NavigationItem[] = [
    {
      label: "Home Page",
      path: routes.root.path,
    },
  ];

  if (isAuthorized.value) {
    items.push(
      {
        label: "Clients Schedule",
        path: routes.schedule.path,
      },

      {
        label: "Words Cards",
        path: routes.words.path,
      },
      {
        label: "Useful Links",
        path: routes.usefulLinks.path,
      }
    );
  }

  if (!isAuthorized.value) {
    items.push({
      label: "Login Page",
      path: routes.login.path,
    });
  }

  return items;
});

const menuAuthorized = computed(() => {
  return [
    {
      label: lang.label.profile,
      items: [
        {
          label: fullUserName(user.value),
          icon: "pi pi-user",
          command: () => {
            profileSidebar.value.open();
          },
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

const handleClickUserMenu = (event: Event) => {
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
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";
@import "@/assets/fonts.scss";
.top-toolbar {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  padding: $px-10 $px-20;
  border-bottom: 1px solid #aaa;
  background: #f1eceb;

  &__left {
    flex-direction: column;
    gap: $px-10;
    align-items: flex-start;
    line-height: 1.5rem;
  }

  &__center {
    @include header-large;
    display: flex;
    justify-content: center;
    color: #333;
    text-decoration: none;
    white-space: nowrap;
  }

  &__center-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__nav-title {
    font-size: 0.875rem;
    margin-bottom: $px-2;
  }

  &__nav-button {
    cursor: pointer;
    font-size: 1.125rem;
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
}
</style>
