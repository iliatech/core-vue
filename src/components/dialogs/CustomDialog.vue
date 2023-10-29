<template>
  <Dialog
    v-model:visible="show"
    class="custom-dialog"
    :dismissable="false"
    :style="{ minWidth }"
    :draggable="false"
  >
    <template #header>
      <div class="custom-dialog__header">
        <div class="custom-dialog__header-title">
          {{ title }}
        </div>
        <div class="custom-dialog__header-icon">
          <i class="pi pi-times" @click="close" />
        </div>
      </div>
    </template>
    <div class="custom-dialog__container">
      <div class="custom-dialog__content">
        <slot />
      </div>
      <div class="custom-dialog__buttons">
        <slot name="buttons-before" />
        <Button
          v-if="closeButton"
          @click="close"
          :label="$lang.button.close"
          class="close-button"
          outlined
        />
        <Button
          v-if="cancelButton"
          @click="cancel"
          :label="$lang.button.cancel"
          class="close-button"
          outlined
        />
        <slot name="buttons-after" />
      </div>
    </div>
  </Dialog>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";

const show = ref(false);

const emit = defineEmits(["click:close", "click:cancel"]);

defineProps({
  title: String,
  closeButton: Boolean,
  cancelButton: Boolean,
  minWidth: {
    type: String,
    default: "400px",
  },
});

const close = () => {
  emit("click:close");
  show.value = false;
};

const cancel = () => {
  emit("click:cancel");
  show.value = false;
};

const open = () => {
  show.value = true;
};

defineExpose({ open, close });
</script>
<style lang="scss" scoped>
@import "@/assets/fonts";
@import "@/assets/variables";

.custom-dialog {
  &__header {
    @include header-medium;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  &__header-icon i {
    cursor: pointer;
  }

  &__container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  &__content {
    @include font-medium;
    margin: $px-20 0 $px-10;
  }

  &__buttons {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
<style lang="scss">
.custom-dialog {
  //min-width: 450px !important;

  .p-dialog-header {
    width: 100%;
  }
  .p-dialog-header-icons {
    display: none !important;
  }
}
</style>
