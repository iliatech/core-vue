<template>
  <Sidebar
    v-model:visible="show"
    class="manage-tags-sidebar"
    position="right"
    :dismissable="false"
  >
    <div class="manage-tags-sidebar__title">
      {{ $lang.title.manageTags }}
    </div>
    <Button
      :label="$lang.button.add"
      icon="pi pi-plus"
      size="small"
      class="add-button"
      @click="onClickAddTag"
    />
    <DataTable :value="tags" class="manage-tags-sidebar__table">
      <Column
        :field="TagsTableColumns.Name"
        :header="tagsTableColumns[TagsTableColumns.Name].title"
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
  </Sidebar>
  <ManageTagDialog ref="manageTagDialog" @change="loadTags" />
  <BasicDialog
    v-model="selectedTag"
    :type="DialogType.Confirm"
    :text="lang.title.confirmDeleteWord(selectedTag?.name)"
    :confirm-button-text="$lang.button.delete"
    @on-cancel="cancelDeleteTag"
    @on-confirm="confirmDeleteTag"
  />
</template>
<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";

import Sidebar from "primevue/sidebar";
import BasicDialog from "@/components/dialogs/BasicDialog.vue";
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

const tagsStore = useTagsStore();
const { tags } = storeToRefs(tagsStore);
const { loadTags } = tagsStore;

const manageTagDialog = ref();
const show = ref(false);
const selectedTag = ref<ApiTagResponse>();

const open = () => {
  show.value = true;
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
    margin-bottom: $space-ten;
  }

  &__table {
    margin-top: $space-fifteen;
  }
}
</style>
<style lang="scss">
.manage-tags-sidebar.p-sidebar {
  width: 25% !important;
  min-width: 25rem;
}
</style>
