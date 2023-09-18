<template>
  <div class="main-toolbar">
    <div class="main-toolbar__left">
      {{ $lang.wordsAppTitle }}
    </div>
    <div class="main-toolbar__central">
      <Dropdown
        v-model="selectedSorting"
        :options="sortingOptions"
        :placeholder="$lang.selectSorting"
        option-label="label"
        option-value="value"
      />
      <Dropdown
        v-model="selectedSortingDirection"
        :options="sortingDirectionOptions"
        :placeholder="$lang.selectSortingDirection"
        option-label="label"
        option-value="value"
      />
    </div>
    <div class="main-toolbar__right">
      <Button icon="pi pi-bars" @click="toggleUserMenu" outlined rounded />
      <Menu ref="userMenu" id="user_menu" :model="menuItems" popup />
    </div>
  </div>
  <RouterView />
</template>
<script lang="ts" setup>
import Button from "primevue/button";
import Menu from "primevue/menu";
import Dropdown from "primevue/dropdown";
import { resetAuthToken, resetAuthUser } from "@/helpers/auth";
import { routes } from "@/settings/routes";
import router from "@/router";
import { showToast } from "@/helpers/toast";
import { ToastType } from "@/types/toasts";
import lang from "@/lang/lang";
import { ref } from "vue";
import { useWordsAppStore } from "@/store/wordsAppStore";
import { storeToRefs } from "pinia";

const wordsAppStore = useWordsAppStore();
const { selectedSorting, selectedSortingDirection } =
  storeToRefs(wordsAppStore);
const { sortingOptions, sortingDirectionOptions } = wordsAppStore;

const userMenu = ref();

const menuItems = [
  {
    label: lang.logout,
    icon: "pi pi-sign-out",
    command: () => {
      onClickLogout();
    },
  },
];

const toggleUserMenu = (event: Event) => {
  userMenu.value.toggle(event);
};

const onClickLogout = () => {
  router.push(routes.login.path);
  resetAuthUser();
  resetAuthToken();
  showToast({ type: ToastType.Warning, text: lang.logoutSuccess });
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";
@import "@/assets/fontMixins.scss";
.main-toolbar {
  display: flex;
  justify-content: space-between;
  margin-bottom: $space-ten;

  &__left {
    @include header-large;
    flex-grow: 1;
  }

  &__central {
    display: flex;
    flex-grow: 1;
    gap: $space-ten;
  }

  &__right {
    display: flex;
    flex-grow: 1;
    justify-content: flex-end;
  }

  :deep(.p-button) {
    color: #ddd;
  }
}
</style>
