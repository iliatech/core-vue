<template>
  <div class="categories">
    <PlusTile @click="onClickPlus" />
    <CategoryTile
      v-for="(item, index) in categories"
      :key="item.id"
      :data="item"
      :background-color="getPaletteColor(index)"
      @on-click="onClickCategory(item.title)"
      @on-click-delete="onClickDelete(item)"
    />
    <ConfirmDialog />
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";
import { apiPaths } from "@/settings/api";
import Api from "@/api/Api";
import { getPaletteColor } from "@/settings/colorPalette";
import type { ApiCategory } from "@/types/category";
import CategoryTile from "@/components/CategoryTile.vue";
import ConfirmDialog from "primevue/confirmdialog";
import { useAppStore } from "@/store/appStore";
import PlusTile from "@/components/PlusTile.vue";
import { routes } from "@/settings/routes";
import { useRouter } from "vue-router";
import { RequestMethods } from "@/types/api";
import lang from "@/lang/lang";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
const toast = useToast();

const router = useRouter();

const appStore = useAppStore();
const { startLoading, stopLoading } = appStore;
const confirm = useConfirm();

const categories = ref([] as ApiCategory[]);

onBeforeMount(async () => {
  startLoading();
  await updateCategories();
  stopLoading();
});

const updateCategories = async (): Promise<void> => {
  const result = await Api.request({
    path: apiPaths.category,
  });
  categories.value = result?.length ? (result as ApiCategory[]) : [];
};
const onClickCategory = (categoryTitle: string): void => {
  router.push(`${routes.category.path}/${categoryTitle}`);
};

const onClickPlus = (): void => {
  router.push(`${routes.createCategory.path}`);
};

const onClickDelete = async (item: ApiCategory): Promise<void> => {
  confirm.require({
    message: lang.confirmDeleteCategory(item.title),
    header: lang.deleteCategoryTitle,
    accept: async () => {
      await onConfirmDelete(item);
    },
  });
};

const onConfirmDelete = async (item: ApiCategory): Promise<void> => {
  startLoading();

  await Api.request({
    method: RequestMethods.Delete,
    path: `${apiPaths.category}/${item.id}`,
    toast,
    successToast: lang.successDeleteCategory(item.title),
    successCallback: () => {
      updateCategories();
    },
  });

  stopLoading();
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";

.categories {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $space-s;
  flex-wrap: wrap;
}
</style>
