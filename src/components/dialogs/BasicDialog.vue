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
                :label="confirmButtonText"
                class="confirm-button"
              />
              <Button
                @click="emit('onCancel')"
                :label="$lang.button.cancel"
                class="cancel-button"
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
import { lang } from "@/lang";

const props = defineProps({
  modelValue: Object as PropType<unknown | null>,
  title: String,
  text: String,
  type: String as PropType<DialogType>,
  confirmButtonText: {
    type: String,
    default: lang.button.confirm,
  },
});

const emit = defineEmits(["onConfirm", "onCancel"]);

const showButtons = computed((): boolean => {
  return props.type === DialogType.Confirm;
});
</script>

<style lang="scss" scoped>
@import "@/assets/fonts.scss";
@import "@/assets/colors.scss";
@import "@/assets/variables.scss";

.basic-dialog {
  width: 400px;
  background: $color-white;
  padding: $space-twenty;
  border-radius: $border-radius;
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
    z-index: $z-index-basic-dialog;
  }

  &__title {
    @include font-extra-large;
  }

  &__text {
    @include font-large;
  }

  &__buttons {
    display: flex;
    gap: $space-ten;

    &-wrapper {
      margin-top: $space-twenty;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
