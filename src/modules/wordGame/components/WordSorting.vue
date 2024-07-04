<template>
  <div class="word-sorting">
    <div>
      {{ $lang.label.selectSorting }}:
      <Dropdown
        v-model="selectedSorting"
        :options="sortingOptions"
        option-label="label"
        option-value="value"
      />
    </div>
    <div>
      <Dropdown
        v-model="selectedSortingDirection"
        :options="sortingDirectionOptions"
        option-label="label"
        option-value="value"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import Dropdown from "primevue/dropdown";
import { useWordsAppStore } from "@/store/wordsAppStore";
import { storeToRefs } from "pinia";

const wordsAppStore = useWordsAppStore();

const { sortingOptions, sortingDirectionOptions } = wordsAppStore;

const { selectedSorting, selectedSortingDirection } =
  storeToRefs(wordsAppStore);
</script>

<style lang="scss" scoped>
@import "@/assets/variables";

.word-sorting {
  display: flex;
  gap: $px-10;
}
</style>
