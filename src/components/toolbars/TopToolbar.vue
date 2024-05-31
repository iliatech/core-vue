<template>
  <div class="top-toolbar">
    <div class="top-toolbar__logo">
      <UniversalButton
        @click="handleClickUserMenu"
        :label="logoTitle"
        font-size="1.125rem"
        no-border
      />
      <Menu
        ref="userMenu"
        :model="isAuthorized ? menuAuthorized : menuPublic"
        popup
      />
    </div>
    <div class="top-toolbar__nav-container">
      <div class="top-toolbar__nav">
        <UniversalButton
          v-for="item in navigationOptions"
          :label="item.label"
          @click="router.push({ name: item.name })"
          :key="item.label"
          size="small"
          color="orange"
          :selected="$route.name === item.name"
          nowrap
        />
      </div>
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
import { fullUserName } from "@/helpers/common";
import UniversalButton from "@/components/buttons/UniversalButton.vue";
import ProfileSidebar from "@/modules/schedule/components/sidebars/ProfileSidebar.vue";
import { generateAvailableAppsList } from "@/helpers/navigation";
import Menu from "primevue/menu";

const route = useRoute();

const appStore = useAppStore();
const { isAuthorized, user } = storeToRefs(appStore);
const { updateIsAuthorized } = appStore;

const userMenu = ref();
const navigation = ref();
const profileSidebar = ref();

const isMobile = computed<boolean>(() => {
  return window.innerWidth < 500;
});

const logoTitle = computed<string>(() => {
  return user.value?.firstName || user.value?.lastName
    ? `${user.value?.firstName?.[0]}${user.value?.lastName?.[0]}`
    : lang.title.iliaDomyshev;
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
          label: fullUserName(user.value),
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
