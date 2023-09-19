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
    </DataTable>
  </Sidebar>
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

const show = ref(false);
const tags = ref<ApiTagResponse[]>([]);

const loadTags = async () => {
  // TODO In all the places remove passing the toast object to API method.

  // TODO
  tags.value = await Api.request({
    path: apiPaths.tag,
    isDataResult: true,
  });
};

const open = () => {
  show.value = true;
};

onBeforeMount(async () => {
  await loadTags();
});

const onClickAddTag = () => {
  //
};

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
.p-sidebar-right .p-sidebar {
  width: 40% !important;
  min-width: 30rem;
}
</style>
