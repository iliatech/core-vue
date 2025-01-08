<script lang="ts" setup>
import { lang } from "@/lang";
import router from "@/router";
import { routes } from "@/settings/routes";
import { resetAuthToken, resetAuthUser } from "@/helpers/auth";
import type { PropType } from "vue";
import { computed, ref, watch } from "vue";
import { useAppStore } from "@/store/appStore";
import { storeToRefs } from "pinia";
import type { NavigationItem } from "@/types/common";
import { useRoute } from "vue-router";
import UniversalButton from "@/components/buttons/UniversalButton.vue";
import ProfileSidebar from "@/components/drawers/ProfileSidebar.vue";
import Menu from "primevue/menu";
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

defineProps({
  isPublic: Object as PropType<boolean | null>,
});

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
  // TODO Need to implement 'unloadAll' method.
  //UniversalDatabase.unloadAll();
  resetAuthUser();
  resetAuthToken();
  updateAuthUser(null);
};
</script>
<template>
  <div class="app-header">
    <div class="left-column">
      <img
        v-if="!isPublic"
        class="small-logo"
        src="@/images/rocket-logo.png"
        alt="Rocket Data - smart data"
      />
    </div>
    <div class="center-column">
      <div class="app-logo" v-if="isPublic">
        <div class="top-logo">
          <div class="site-name">
            {{ lang.title.siteName }}
          </div>
          <div class="site-slogan">
            <span>
              {{ lang.title.siteSlogan }}
            </span>
          </div>
        </div>
      </div>
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
    <div class="right-column">
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

  <ProfileSidebar ref="profileSidebar" :isFullWidth="isMobile" />
</template>
<style lang="scss" scoped>
@import "@/assets/variables.scss";
@import "@/assets/fonts.scss";

$toolbar-border: 1px solid #aaa;

.app-header {
  margin-top: 20px;
  margin-bottom: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.top-logo {
  margin-bottom: $px-15;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  gap: $px-5;
  font-family: "Comic Sans MS", sans-serif;
  white-space: nowrap;
}

.site-name {
  font-size: 1.75rem;
  line-height: 1.75rem;
}

.site-slogan {
  font-size: 1.25rem;
  line-height: 1.25rem;
}

.left-column {
  padding-left: 20px;
}

.logo-notes {
  font-size: 1rem;
  text-align: center;
}

.user {
  font-size: 1rem;
  display: flex;
  gap: $px-20;
}

.right-column {
  margin-left: 20px;

  padding-top: $px-5;
  padding-right: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  gap: $px-10;
  white-space: nowrap;

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
  margin: 0;
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
.small-logo {
  width: 50px;
  height: 50px;
  border-radius: 30px;
  margin-top: -10px;
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
