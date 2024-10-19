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
import Menu from "primevue/menu";
import { CredentialDatabase } from "@/modules/credentials/classes/CredentialDatabase";
import { privateTopMenuItems, publicTopMenuItems } from "@/settings/menu";
import UniversalIcon from "@/components/icons/UniversalIcon.vue";
import { getRoute } from "../../helpers/navigation";

const route = useRoute();

const appStore = useAppStore();
const { isAuthorized, user } = storeToRefs(appStore);
const { updateAuthUser } = appStore;

const userMenu = ref();
const navigation = ref();
const profileSidebar = ref();

const links = computed<NavigationItem[]>(() => {
  const items: NavigationItem[] = [];

  const aclPrivateItems = user.value?.config?.acl?.topMenu ?? [];

  const privateItems = aclPrivateItems.length
    ? privateTopMenuItems.filter((name) => aclPrivateItems.includes(name))
    : privateTopMenuItems;

  const itemsNames = isAuthorized.value
    ? [...publicTopMenuItems, ...privateItems]
    : publicTopMenuItems;

  itemsNames.forEach((name) => {
    const route = routes[name];

    if (!route) {
      console.error(`Cannot find route with name ${name}`);
      return;
    }

    items.push({
      name: route.name,
      parentRouteName: route.parentRouteName,
      label: route.title,
    });
  });

  return items;
});

const isMobile = computed<boolean>(() => {
  return window.innerWidth < 500;
});

const userMenuItems = computed(() => {
  return [
    {
      label: user.value?.email,
      items: [
        {
          label: lang.button.signOut,
          command: () => {
            handleClickSignOut();
          },
        },
      ],
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

const handleClickSignOut = () => {
  router.push(routes.home.path);
  CredentialDatabase.unload();
  resetAuthUser();
  resetAuthToken();
  updateAuthUser(null);
};
</script>
<template>
  <div class="app-header">
    <div class="top-line">
      <div class="settings"></div>
      <div></div>
      <div class="auth-block">
        <div v-if="user" class="user">
          <UniversalIcon
            prime-icon="cog"
            class="gear-icon"
            size="20px"
            @click="profileSidebar.open()"
            link
          />
          <UniversalIcon
            prime-icon="user"
            class="gear-icon"
            size="20px"
            @click="handleClickUserMenu"
            link
          />
          <Menu
            ref="userMenu"
            :model="userMenuItems"
            :pt="{ root: { class: 'top-user-menu' } }"
            popup
          />
        </div>
        <UniversalButton
          v-if="!isAuthorized"
          :label="lang.button.signUp"
          @click="router.push({ name: routes.register.name })"
          no-border
        />
        <UniversalButton
          v-if="!isAuthorized"
          :label="lang.button.signIn"
          @click="router.push({ name: routes.login.name })"
          no-border
        />
      </div>
    </div>
    <div class="app-logo">
      <div class="top-logo">
        <div class="top-logo__first">
          {{ lang.title.siteNameBy1 }}
        </div>
        <div class="top-logo__second">
          <span>
            {{ lang.title.siteNameBy2 }}
          </span>
        </div>
      </div>
    </div>
    {{}}
    <div class="links">
      <UniversalButton
        v-for="item in links"
        :label="item.label"
        @click="router.push({ name: item.name })"
        :key="item.label"
        :selected="
          $route.name === item.name ||
          getRoute($route.name)?.parentRouteName === item.name
        "
        no-border
      />
    </div>
  </div>

  <ProfileSidebar ref="profileSidebar" :isFullWidth="isMobile" />
</template>
<style lang="scss" scoped>
@import "@/assets/variables.scss";
@import "@/assets/fonts.scss";

$toolbar-border: 1px solid #aaa;

.app-header {
  //
}

.top-line {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.top-logo {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  gap: $px-5;

  font-family: "Comic Sans MS", sans-serif;

  &__first {
    font-size: 1.75rem;
  }

  &__second {
    font-size: 1.25rem;
  }
}

.settings {
  padding-left: $px-20;
  padding-top: $px-20;
  display: flex;
  flex-direction: row;
}

.logo-notes {
  font-size: 1rem;
  text-align: center;
}

.user {
  font-size: 1rem;
  margin-right: $px-20;
  display: flex;
  gap: $px-20;
}

.auth-block {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding-right: $px-20;
  padding-top: $px-20;
  gap: $px-10;

  :deep(.universal-button) {
    font-size: 1rem;
  }

  :deep(.universal-button:hover) {
    background: none;
    text-decoration: underline;
  }

  :deep(.universal-button--selected) {
    text-decoration: underline;
  }
}

.links {
  margin: $px-30 0;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: $px-20;

  :deep(.universal-button) {
    font-size: 1.125rem;
  }

  :deep(.universal-button:hover) {
    background: none;
    text-decoration: underline;
  }

  :deep(.universal-button--selected) {
    text-decoration: underline;
  }
}
</style>
<style lang="scss">
@import "@/assets/variables.scss";

.top-user-menu {
  box-shadow: none;
  border: 1px solid #666;
  border-radius: 3px;

  .p-submenu-header {
    font-weight: normal;
    font-size: 0.875rem;
    padding: $px-10 $px-20;
  }

  .p-menuitem {
    font-size: 0.875rem;
  }

  .p-menuitem-link {
    background: none;
    padding: $px-10 $px-20;
  }
}
</style>
