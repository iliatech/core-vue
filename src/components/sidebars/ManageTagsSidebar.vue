<template>
  <Sidebar v-model:visible="show" class="manage-tags-sidebar" position="right">
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
    </DataTable>
  </Sidebar>
  <ManageTagDialog ref="manageTagDialog" @change="loadTags" />
</template>
<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";

import Sidebar from "primevue/sidebar";
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
import { sortCollator } from "@/settings/collators";
import { RequestMethods } from "@/types/api";
import { lang } from "@/lang";

const manageTagDialog = ref();
const show = ref(false);
const tags = ref<ApiTagResponse[]>([]);

const loadTags = async () => {
  // TODO In all the places remove passing the toast object to API method.

  // TODO
  tags.value = await Api.request({
    path: apiPaths.tag,
    isDataResult: true,
  });

  tags.value.sort((a, b) => sortCollator.compare(a.name, b.name));
};

const open = () => {
  show.value = true;
};

const onClickAddTag = () => {
  manageTagDialog.value.open();
};

const deleteTag = async (tag: ApiTagResponse) => {
  await Api.request({
    method: RequestMethods.Delete,
    path: `${apiPaths.tag}/${tag.id}`,
    successToast: lang.success.tagDeleted(tag.name),
    successCallback: async () => {
      await loadTags();
    },
  });
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
