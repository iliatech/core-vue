<template>
  <div class="word-tile" :style="{ borderColor: backgroundColor }">
    <div class="word-tile__top">
      <MultiSelect
        v-if="false"
        :model-value="selectedTags"
        display="chip"
        :options="tags"
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
      <div class="word-tile__text">{{ data.title }}</div>
    </div>
    <div class="word-tile__bottom">
      <div class="word-tile__number">
        {{ $lang.phrase.numberOfTranslations }}: {{ data.translations?.length }}
      </div>
      <div class="actions">
        <i class="pi pi-pencil word-tile__top-icon" @click="emit('onClick')" />
        <i @click="emit('onClickDelete')" class="pi pi-trash" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { PropType } from "vue";
import type { ApiWordResponse } from "@/types/word";
import MultiSelect from "primevue/multiselect";
import { onBeforeMount, ref } from "vue";
import Api from "@/api/Api";
import { apiPaths } from "@/settings/api";
import { RequestMethods } from "@/types/api";
import { lang } from "@/lang";
import { useTagsStore } from "@/store/tagsStore";
import { storeToRefs } from "pinia";

const tagsStore = useTagsStore();
const { tags } = storeToRefs(tagsStore);

const props = defineProps({
  data: { type: Object as PropType<ApiWordResponse>, required: true },
  backgroundColor: String,
});

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

  emit("changeTags");
};

onBeforeMount(async () => {
  selectedTags.value = props.data?.tags.map((item) => item.id) ?? [];
});

const emit = defineEmits(["onClick", "onClickDelete", "changeTags"]);
</script>
<style lang="scss" scoped>
@import "@/assets/fonts";
@import "@/assets/variables";

.word-tile {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: $px-15;
  border-radius: $border-radius-ten;
  border: 2px dashed;

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
    text-align: center;
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
    margin-top: $px-10;
    right: $px-10;
    bottom: $px-10;
    flex-grow: 0;

    i {
      font-size: 1rem;
      cursor: pointer;
    }
  }

  :deep(.p-multiselect) {
    background: none;
    border: 0;
  }

  :deep(.p-multiselect-label) {
    padding: 0 !important;
  }

  :deep(.p-multiselect-token) {
    padding: 5px 12px;
    background: #fff;
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

.actions {
  margin-top: $px-10;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
