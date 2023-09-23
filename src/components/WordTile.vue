<template>
  <div class="word-tile" :style="{ backgroundColor }">
    <div class="word-tile__top">
      <MultiSelect
        :model-value="selectedTags"
        display="chip"
        :options="tagOptions"
        option-label="name"
        option-value="id"
        :placeholder="$lang.placeholder.selectTags"
        :maxSelectedLabels="3"
        style="max-width: 100%"
        filter
        @change="changeSelectedTags"
      />
    </div>
    <div class="word-tile__content">
      <i class="pi pi-eye word-tile__top-icon" @click="emit('onClick')" />
      <div class="word-tile__text">{{ data.title }}</div>
    </div>
    <div class="word-tile__bottom">
      <div class="word-tile__number">
        {{ $lang.phrase.numberOfTranslations }}: {{ data.translations.length }}
      </div>
      <i @click="emit('onClickDelete')" class="pi pi-trash" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { PropType } from "vue";
import type { ApiWordResponse } from "@/types/word";
import MultiSelect from "primevue/multiselect";
import type { ApiTagResponse } from "@/types/tag";
import { onBeforeMount, ref } from "vue";
import Api from "@/api/Api";
import { apiPaths } from "@/settings/api";
import { sortCollator } from "@/settings/collators";
import { RequestMethods } from "@/types/api";
import { lang } from "@/lang";

const props = defineProps({
  data: { type: Object as PropType<ApiWordResponse>, required: true },
  backgroundColor: String,
});

const tagOptions = ref<ApiTagResponse[]>([]);
const selectedTags = ref<string[]>([]);

const changeSelectedTags = async (event: { value: string[] }) => {
  selectedTags.value = event.value;

  await Api.request({
    method: RequestMethods.Post,
    path: `${apiPaths.word}/${props.data.id}/updateTags`,
    payload: {
      tags: selectedTags.value,
    },
    successToast: lang.success.tagsUpdated,
  });
};
const loadTags = async () => {
  tagOptions.value = await Api.request({
    path: apiPaths.tag,
    isDataResult: true,
  });

  tagOptions.value.sort((a, b) => sortCollator.compare(a.name, b.name));
};

onBeforeMount(async () => {
  // TODO Fetch tags once for the app, but not every tile.
  await loadTags();

  selectedTags.value = props.data?.tags.map((item) => item.id) ?? [];
});

const emit = defineEmits(["onClick", "onClickDelete"]);
</script>
<style lang="scss" scoped>
@import "@/assets/fonts.scss";
@import "@/assets/variables.scss";

.word-tile {
  aspect-ratio: $tile-aspect-ratio;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: $space-twenty;
  border-radius: $border-radius;

  &__top {
    overflow: hidden;
    flex-grow: 0;

    button {
      margin: 0;
      padding: 0;
      width: initial;
      color: #666;

      :deep(.pi) {
        font-size: 0.9em;
      }
    }
  }

  &__top-icon {
    cursor: pointer;
    font-size: 1.1em;
    margin-right: 10px;
    margin-top: 3px;
  }

  &__number {
    color: #333;
    font-size: 0.875rem;
  }

  &__content {
    font-size: 1.5rem;
    text-overflow: ellipsis;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
    flex-grow: 1;
  }

  &__text {
    position: relative;
    display: block;
    z-index: 100;
  }

  &__bottom {
    display: flex;
    justify-content: space-between;
    right: $space-ten;
    bottom: $space-ten;
    flex-grow: 0;

    i {
      font-size: 1rem;
      cursor: pointer;
    }
  }
}
</style>
