<template>
  <div class="word-filtering">
    {{ $lang.label.selectFiltering }}:
    <MultiSelect
      :model-value="filterTags"
      display="chip"
      :options="tags"
      option-label="name"
      option-value="id"
      :placeholder="$lang.placeholder.selectTags"
      :maxSelectedLabels="3"
      filter
      @change="changeSelectedTags"
    />
  </div>
</template>
<script lang="ts" setup>
import MultiSelect from "primevue/multiselect";
import { useTagsFilteringStore } from "@/store/tagsFilteringStore";
import { storeToRefs } from "pinia";
import { useTagsStore } from "@/store/tagsStore";

const tagsStore = useTagsStore();
const tagsFilteringStore = useTagsFilteringStore();

const { tags } = storeToRefs(tagsStore);

const { filterTags } = storeToRefs(tagsFilteringStore);
const { changeSelectedTags } = tagsFilteringStore;
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

.word-filtering {
  display: flex;
  gap: $px-10;
  align-items: center;
  overflow: hidden;

  :deep(.p-multiselect) {
    background: none;
    border: 0;
  }

  :deep(.p-multiselect-label) {
    padding: 0 !important;
  }

  :deep(.p-multiselect-token) {
    padding: 5px 12px;
    background: #eee;
  }

  :deep(.p-multiselect-label.p-placeholder) {
    color: #444;
    margin-right: $px-5;
  }

  :deep(.p-multiselect-trigger) {
    width: auto;
    color: #222;
  }
}
</style>
