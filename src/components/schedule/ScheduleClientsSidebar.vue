<template>
  <CustomSidebar
    ref="sidebar"
    class="clients-sidebar"
    :title="$lang.title.clients"
    close-button
  >
    <ScheduleButton
      :label="$lang.button.add"
      icon-post="plus"
      @click="handleClickAddClient"
      color="forestGreen"
    />
    <DataTable
      :value="clients"
      class="clients-sidebar__table"
      :sort-field="ClientsTableColumns.Name"
      :sort-order="1"
    >
      <Column
        :field="ClientsTableColumns.Name"
        :header="clientsTableColumns[ClientsTableColumns.Name].title"
        :sortable="true"
      />
      <Column
        :field="ClientsTableColumns.Action"
        :header="clientsTableColumns[ClientsTableColumns.Action].title"
        class="clients-sidebar__action-column"
      >
        <template #body="{ data }">
          <div class="clients-sidebar__action-column">
            <ScheduleButton
              icon-pre="trash"
              @click="deleteTag(data)"
              icon-size="1rem"
              no-border
            />
          </div>
        </template>
      </Column>
      <template #empty> {{ $lang.phrase.noClientsFound }} </template>
    </DataTable>
  </CustomSidebar>
  <ScheduleClientDialog ref="clientDialog" />
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
import { RequestMethods } from "@/types/api";
import { lang } from "@/lang";
import { DialogType } from "@/types/dialog";
import { storeToRefs } from "pinia";
import CustomSidebar from "@/components/sidebars/CustomSidebar.vue";
import ScheduleButton from "@/components/schedule/ScheduleButton.vue";
import {
  clientsTableColumns,
  ClientsTableColumns,
} from "@/settings/tables/clientsTable";
import { useScheduleStore } from "@/store/scheduleStore";
import ScheduleClientDialog from "@/components/schedule/ScheduleClientDialog.vue";

const scheduleStore = useScheduleStore();
const { clients } = storeToRefs(scheduleStore);
const { loadSchedule } = scheduleStore;

const clientDialog = ref();
const selectedTag = ref<ApiTagResponse>();
const sidebar = ref();

const open = () => {
  sidebar.value.open();
};

const handleClickAddClient = () => {
  clientDialog.value.open();
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
  });

  selectedTag.value = undefined;
};

onBeforeMount(async () => {
  await loadSchedule();
});

defineExpose({ open });
</script>
<style lang="scss" scoped>
@import "@/assets/fonts.scss";
@import "@/assets/variables.scss";

.clients-sidebar {
  &__title {
    @include header-one-and-quarter;
    margin-bottom: $px-10;
  }

  &__table {
    margin-top: $px-15;
  }

  &__action-column {
    display: flex;
    justify-content: center;
  }
}

:deep(th.clients-sidebar__action-column .p-column-header-content) {
  justify-content: center !important;
}
</style>
<style lang="scss">
.clients-sidebar.p-sidebar {
  width: 25% !important;
  min-width: 25rem;
}
</style>
