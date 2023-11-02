<template>
  <CustomSidebar
    ref="sidebar"
    class="manage-tags-sidebar"
    :title="$lang.title.manageTags"
    close-button
  >
    <Button
      :label="$lang.button.add"
      icon="pi pi-plus"
      size="small"
      class="add-button"
      @click="onClickAddTag"
      iconPos="right"
      outlined
    />
    <DataTable :value="tags" class="manage-tags-sidebar__table">
      <Column
        :field="TagsTableColumns.Name"
        :header="tagsTableColumns[TagsTableColumns.Name].title"
        :sortable="true"
      />
      <Column
        :field="TagsTableColumns.Action"
        :header="tagsTableColumns[TagsTableColumns.Action].title"
      >
        <template #body="{ data }">
          <Button icon="pi pi-trash" @click="deleteTag(data)" text />
        </template>
      </Column>
      <template #empty> {{ $lang.phrase.noTagsFound }} </template>
    </DataTable>
  </CustomSidebar>
  <ManageTagDialog ref="manageTagDialog" @change="loadTags" />
  <!--TODO Fix ?? '' -->
  <CustomConfirmDialog
    v-model="selectedTag"
    :type="DialogType.Confirm"
    :text="lang.title.confirmDeleteTag(selectedTag?.name ?? '')"
    :confirm-button-text="$lang.button.delete"
    @on-cancel="cancelDeleteTag"
    @on-confirm="confirmDeleteTag"
  />
</template>
<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";

import CustomConfirmDialog from "@/components/dialogs/CustomConfirmDialog.vue";
import Api from "@/api/Api";
import { apiPaths } from "@/settings/api";
import type { ApiTagResponse } from "@/types/tag";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import {
  tagsTableColumns,
  TagsTableColumns,
} from "@/settings/tables/tagsTable";
import ManageTagDialog from "@/components/dialogs/ManageTagDialog.vue";
import { RequestMethods } from "@/types/api";
import { lang } from "@/lang";
import { DialogType } from "@/types/dialog";
import { useTagsStore } from "@/store/tagsStore";
import { storeToRefs } from "pinia";
import CustomSidebar from "@/components/sidebars/CustomSidebar.vue";

const tagsStore = useTagsStore();
const { tags } = storeToRefs(tagsStore);
const { loadTags } = tagsStore;

const manageTagDialog = ref();
const selectedTag = ref<ApiTagResponse>();
const sidebar = ref();

const open = () => {
  sidebar.value.open();
};

const onClickAddTag = () => {
  manageTagDialog.value.open();
};

const deleteTag = async (tag: ApiTagResponse) => {
  selectedTag.value = tag;
};

const cancelDeleteTag = () => {
  selectedTag.value = undefined;
};

const confirmDeleteTag = async () => {
  if (!selectedTag.value) {
    return;
  }

  await Api.request({
    method: RequestMethods.Delete,
    path: `${apiPaths.tag}/${selectedTag.value.id}`,
    successToast: lang.success.tagDeleted(selectedTag.value.name),
    successCallback: async () => {
      await loadTags();
    },
  });

  selectedTag.value = undefined;
};

onBeforeMount(async () => {
  await loadTags();
});

defineExpose({ open });
</script>
<style lang="scss" scoped>
@import "@/assets/fonts.scss";
@import "@/assets/variables.scss";

.manage-tags-sidebar {
  &__title {
    @include header-one-and-quarter;
    margin-bottom: $px-10;
  }

  &__table {
    margin-top: $px-15;
  }
}
</style>
<style lang="scss">
.manage-tags-sidebar.p-sidebar {
  width: 25% !important;
  min-width: 25rem;
}
</style>
