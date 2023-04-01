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
  </div>
  <BasicDialog
    v-model="deleteItem"
    :type="DialogType.Confirm"
    :text="lang.confirmDeleteTitle(deleteItem?.title)"
    @on-cancel="onCancelDelete"
    @on-confirm="onConfirmDelete"
  />
</template>

<script lang="ts" setup>
import { onBeforeMount, Ref, ref } from "vue";
import { apiPaths } from "@/settings/api";
import Api from "@/api/Api";
import { getPaletteColor } from "@/settings/colorPalette";
import type { ApiCategory } from "@/types/category";
import CategoryTile from "@/components/CategoryTile.vue";
import { useAppStore } from "@/store/appStore";
import PlusTile from "@/components/PlusTile.vue";
import { routes } from "@/settings/routes";
import { useRouter } from "vue-router";
import { RequestMethods } from "@/types/api";
import lang from "@/lang/lang";
import { useToast } from "primevue/usetoast";
import BasicDialog from "@/components/BasicDialog.vue";
import { DialogType } from "@/types/dialog";
const toast = useToast();

const router = useRouter();

const appStore = useAppStore();
const { startLoading, stopLoading } = appStore;

const categories = ref([] as ApiCategory[]);
const deleteItem: Ref<ApiCategory | null> = ref(null);

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
  deleteItem.value = item;
};

const onCancelDelete = () => {
  deleteItem.value = null;
};

const onConfirmDelete = async (): Promise<void> => {
  if (!deleteItem.value) {
    return;
  }

  startLoading();
  const { id, title } = deleteItem.value;

  await Api.request({
    method: RequestMethods.Delete,
    path: `${apiPaths.category}/${id}`,
    toast,
    successToast: lang.successDeleteCategory(title),
    successCallback: () => {
      updateCategories();
    },
  });

  stopLoading();
  deleteItem.value = null;
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";

.categories {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $space-small;
  flex-wrap: wrap;
}
</style>
