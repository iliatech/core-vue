<template>
  <Teleport v-if="modelValue" to="body">
    <div class="basic-dialog__wrapper">
      <div class="basic-dialog">
        <div v-if="title" class="basic-dialog__title">
          {{ title }}
        </div>
        <div v-if="text" class="basic-dialog__text">
          {{ text }}
        </div>
        <div v-if="showButtons" class="basic-dialog__buttons-wrapper">
          <div class="basic-dialog__buttons">
            <template v-if="type === DialogType.Confirm">
              <Button
                @click="emit('onConfirm')"
                :label="$lang.confirmButton"
                class="p-button-outlined p-button-rounded button-red-crimson"
              />
              <Button
                @click="emit('onCancel')"
                :label="$lang.cancelButton"
                class="p-button-outlined p-button-rounded button-grey-tough"
              />
            </template>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import Button from "primevue/button";
import type { PropType } from "vue";
import { computed } from "vue";
import { DialogType } from "@/types/dialog";

const props = defineProps({
  modelValue: Object,
  title: String,
  text: String,
  type: Object as PropType<DialogType>,
});

const emit = defineEmits(["onConfirm", "onCancel"]);

const showButtons = computed((): boolean => {
  return props.type === DialogType.Confirm;
});
</script>

<style lang="scss" scoped>
@import "@/assets/fontMixins.scss";
@import "@/assets/colors.scss";
@import "@/assets/variables.scss";

.basic-dialog {
  width: 400px;
  background: $color-white;
  padding: $space-medium;
  border-radius: $border-radius;
  max-width: $app-container-width;
  box-shadow: $basic-dialog-shadow;

  &__wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__title {
    @include font-extra-large;
  }

  &__text {
    @include font-large;
  }

  &__buttons {
    display: flex;
    gap: $space-small;

    &-wrapper {
      margin-top: $space-medium;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
