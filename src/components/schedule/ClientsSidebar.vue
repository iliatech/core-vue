<template>
  <CustomSidebar
    ref="sidebar"
    class="clients-sidebar"
    :title="$lang.title.clients"
    close-button
  >
    <MyButton
      :label="$lang.button.add"
      icon-post="plus"
      @click="handleClickAddClient"
      color="forestGreen"
    />
    <DataTable
      :value="clientsFiltered"
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
            <MyButton
              icon-pre="download"
              @click="handleClickDeleteClient(data)"
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
  <MyDialog
    ref="deleteClientDialog"
    :title="$lang.title.confirmDeleteClient"
    @cancel="cancelDeleteClient"
    @confirm="confirmDeleteClient"
    :z-index="1200"
  >
    {{ $lang.label.clientName }}: {{ clientToDelete?.name }}
  </MyDialog>
</template>
<script lang="ts" setup>
import { computed, onBeforeMount, ref } from "vue";

import type { ApiTagResponse } from "@/types/tag";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { storeToRefs } from "pinia";
import CustomSidebar from "@/components/sidebars/CustomSidebar.vue";
import MyButton from "@/components/schedule/MyButton.vue";
import {
  clientsTableColumns,
  ClientsTableColumns,
} from "@/settings/tables/clientsTable";
import { useScheduleStore } from "@/store/scheduleStore";
import ScheduleClientDialog from "@/components/schedule/ScheduleClientDialog.vue";
import type { Client } from "@/types/schedule";
import MyDialog from "@/components/dialogs/MyDialog.vue";

const scheduleStore = useScheduleStore();
const { clients } = storeToRefs(scheduleStore);
const { archiveClient } = scheduleStore;

const clientDialog = ref();
const clientToDelete = ref<Client>();
const sidebar = ref();
const deleteClientDialog = ref();

const clientsFiltered = computed(() => {
  return clients.value.filter((item) => !item.archived);
});

const open = () => {
  sidebar.value.open();
};

const handleClickAddClient = () => {
  clientDialog.value.open();
};

const handleClickDeleteClient = async (tag: ApiTagResponse) => {
  clientToDelete.value = tag;
  deleteClientDialog.value.open();
};

const cancelDeleteClient = () => {
  clientToDelete.value = undefined;
};

const confirmDeleteClient = async () => {
  if (!clientToDelete.value) {
    return;
  }

  await archiveClient(clientToDelete.value.id);

  clientToDelete.value = undefined;
};

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
