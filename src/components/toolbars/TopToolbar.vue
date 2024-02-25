<template>
  <div class="top-toolbar">
    <div class="top-toolbar__left">
      <div class="top-toolbar__logo">
        {{
          user?.firstName || user?.lastName
            ? `${user?.firstName} ${user?.lastName}`
            : $lang.title.iliaDomyshev
        }}
      </div>
      <div class="top-toolbar__nav">
        <IliaButton
          v-for="item in navigationOptions"
          :label="item.label"
          @click="router.push({ name: item.name })"
          :key="item.label"
          size="small"
          color="orange"
          :selected="$route.name === item.name"
        />
      </div>
    </div>
    <div class="top-toolbar__right">
      <IliaButton
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
import IliaButton from "@/components/schedule/IliaButton.vue";
import ProfileSidebar from "@/components/schedule/ProfileSidebar.vue";
import { generateAvailableAppsList } from "@/helpers/navigation";

const route = useRoute();

const appStore = useAppStore();
const { isAuthorized, user } = storeToRefs(appStore);
const { updateIsAuthorized } = appStore;

const userMenu = ref();
const navigation = ref();
const profileSidebar = ref();

const navigationOptions = computed<NavigationItem[]>(() => {
  let items: NavigationItem[] = [
    {
      label: routes.home.title ?? "",
      name: routes.root.name,
    },
  ];

  if (isAuthorized.value) {
    items = [...items, ...generateAvailableAppsList()];
  }

  if (!isAuthorized.value) {
    items.push({
      label: routes.login.title,
      name: routes.login.name,
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

$toolbar-border: 1px solid #aaa;

.top-toolbar {
  display: flex;
  justify-content: space-between;
  border-bottom: $toolbar-border;
  background: #f1eceb;

  &__left {
    display: flex;
    gap: $px-10;
    line-height: 1.5rem;
    align-items: center;
  }

  &__logo {
    padding: $px-10 $px-20;
    border-right: $toolbar-border;
  }

  &__nav {
    display: flex;
    gap: $px-10;
    padding: 0 $px-20;
  }

  &__center-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__right {
    display: flex;
    padding-right: $px-20;
    justify-content: flex-end;
    gap: 50px;
  }

  :deep(.p-button) {
    color: #999;
  }
}
</style>
