<template>
  <div class="top-line">
    <div></div>
    <div class="top-logo">
      <div>{{ lang.title.siteName }}</div>
      <div class="top-toolbar__logo-notes">by Ilia Domyshev</div>
    </div>
    <div class="auth-block">
      <div>Sign Up</div>
      <div>Sign In</div>
      <div>Sign Out</div>
    </div>
  </div>
  <div class="top-menu">
    <UniversalButton
      v-for="item in topMenuItems"
      :label="item.label"
      @click="router.push({ name: item.name })"
      :key="item.label"
      :selected="$route.name === item.name"
      no-border
    />
  </div>

  <div class="top-toolbar">
    <div class="top-toolbar__logo">
      <UniversalButton
        @click="handleClickUserMenu"
        :label="lang.title.siteName"
        font-size="1.125rem"
        no-border
      />
      <div class="top-toolbar__logo-notes">by Ilia Domyshev</div>
      <Menu
        ref="userMenu"
        :model="isAuthorized ? menuAuthorized : menuPublic"
        popup
      />
    </div>
  </div>
  <ProfileSidebar ref="profileSidebar" :isFullWidth="isMobile" />
</template>
<script lang="ts" setup>
import { lang } from "@/lang";
import router from "@/router";
import { routes } from "@/settings/routes";
import { resetAuthToken, resetAuthUser } from "@/helpers/auth";
import { computed, ref, watch } from "vue";
import { useAppStore } from "@/store/appStore";
import { storeToRefs } from "pinia";
import type { NavigationItem } from "@/types/common";
import { useRoute } from "vue-router";
import UniversalButton from "@/components/buttons/UniversalButton.vue";
import ProfileSidebar from "@/modules/schedule/components/sidebars/ProfileSidebar.vue";
import { generateAvailableAppsList } from "@/helpers/navigation";
import Menu from "primevue/menu";
import { CredentialDatabase } from "@/modules/credentials/classes/CredentialDatabase";
import { privateTopMenuItems, publicTopMenuItems } from "@/settings/menu";

const route = useRoute();

const appStore = useAppStore();
const { isAuthorized, user } = storeToRefs(appStore);
const { updateIsAuthorized } = appStore;

const topMenuItems = computed(() => {
  const items: NavigationItem[] = [];

  const itemsNames = [
    ...publicTopMenuItems,
    ...privateTopMenuItems.filter((name) =>
      (user.value?.config?.acl?.topMenu ?? []).includes(name)
    ),
  ];

  itemsNames.forEach((name) => {
    const route = routes[name];

    items.push({
      name: route.name,
      label: route.title,
    });
  });

  return items;
});

const userMenu = ref();
const navigation = ref();
const profileSidebar = ref();

const isMobile = computed<boolean>(() => {
  return window.innerWidth < 500;
});

const navigationOptions = computed<NavigationItem[]>(() => {
  if (!route.name) {
    return [];
  }

  const localRoute = routes[route.name.toString()];

  if (!localRoute) {
    console.error("Error: local route is not found: ", route.name);
    return [];
  }

  let items: NavigationItem[] = [];

  if (localRoute.isPublic) {
    items = [
      {
        label: routes.home.title,
        name: routes.home.name,
      },
      {
        label: routes.usefulLinks.title,
        name: routes.usefulLinks.name,
      },
    ];

    if (!isAuthorized.value) {
      items.push({
        label: routes.login.title,
        name: routes.login.name,
      });
    }
  } else {
    items = [
      { name: routes.dashboard.name, label: routes.dashboard.title },
      ...generateAvailableAppsList(),
    ];
  }

  return items;
});

const menuAuthorized = computed(() => {
  return [
    {
      label: lang.label.profile,
      items: [
        {
          label: user.value?.email,
          icon: "pi pi-user",
          command: () => {
            profileSidebar.value.open();
          },
        },
      ],
    },
    {
      label: lang.label.navigation,
      items: [
        {
          label: lang.label.goToPublicArea,
          icon: "pi pi-user",
          command: () => {
            router.push({ name: routes.home.name });
          },
        },
        {
          label: lang.label.goToPrivateArea,
          icon: "pi pi-user",
          command: () => {
            router.push({ name: routes.dashboard.name });
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
  CredentialDatabase.unload();
  resetAuthUser();
  resetAuthToken();
  updateIsAuthorized(false);
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";
@import "@/assets/fonts.scss";

$toolbar-border: 1px solid #aaa;

.top-line {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.top-logo {
  margin-top: $px-30;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  gap: $px-5;
  font-size: 1.75rem;
}

.auth-block {
  display: flex;
  justify-content: flex-end;
  padding-top: $px-10;
  padding-right: $px-20;
  gap: $px-10;
}

.top-menu {
  margin: $px-30 0 $px-50;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: $px-20;

  :deep(.universal-button) {
    font-size: 1.5rem;
  }

  :deep(.universal-button:hover) {
    background: none;
  }

  :deep(.universal-button--selected) {
    text-decoration: underline;
  }
}

.top-toolbar {
  width: 100%;
  display: flex;
  gap: $px-10;
  align-items: center;
  border-bottom: $toolbar-border;
  background: #f1eceb;
  line-height: 1.5rem;

  &__logo {
    padding: $px-10 $px-20;
    border-right: $toolbar-border;
  }

  &__link {
    font-size: 1rem;
    color: black;
  }

  &__logo-notes {
    font-size: 0.75em;
    line-height: 0.75em;
  }

  &__nav-container {
    position: relative;
    flex-grow: 1;
    height: 100%;
  }

  &__nav {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow-x: auto;
    display: flex;
    gap: $px-10;
    padding: $px-8 0;
    position: absolute;

    @media (min-width: 600px) {
      gap: $px-20;
      padding: $px-10 $px-10;
    }
  }

  :deep(.p-button) {
    color: #999;
  }
}
</style>
