<template>
  <Sidebar
    v-model:visible="show"
    class="custom-sidebar"
    :position="position"
    :dismissable="false"
  >
    <template #header>
      <div class="custom-sidebar__header">
        <div class="custom-sidebar__header-title">
          {{ title }}
        </div>
        <div class="custom-sidebar__header-icon">
          <i class="pi pi-times" @click="handleClose" />
        </div>
      </div>
    </template>
    <div class="custom-sidebar__container">
      <div class="custom-sidebar__content">
        <slot />
      </div>
      <div class="custom-sidebar__buttons">
        <slot name="buttons-before" />
        <Button
          v-if="cancelButton || closeButton"
          @click="handleClose"
          :label="cancelButton ? $lang.button.cancel : $lang.button.close"
          :class="cancelButton ? 'close-button' : 'cancel-button'"
          outlined
        />
        <slot name="buttons-after" />
      </div>
    </div>
  </Sidebar>
</template>
<script lang="ts" setup>
import Sidebar from "primevue/sidebar";
import { PropType, ref } from "vue";
import Button from "primevue/button";

const show = ref(false);

const emit = defineEmits(["click:close"]);

defineProps({
  title: String,
  closeButton: Boolean,
  cancelButton: Boolean,
  position: {
    type: String as PropType<
      "left" | "right" | "top" | "bottom" | "full" | undefined
    >,
    default: "right",
  },
});

const handleClose = () => {
  emit("click:close");
  close();
};

const close = () => {
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

.custom-sidebar {
  &__header {
    @include header-medium;
    display: flex;
    justify-content: space-between;
  }

  &__header-icon i {
    cursor: pointer;
  }

  &__container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: $px-10;
  }

  &__content {
    @include font-medium;
  }

  &__buttons {
    display: flex;
    justify-content: flex-end;
    gap: $px-15;
  }
}
</style>
<style lang="scss">
.custom-sidebar {
  width: 400px !important;

  .p-sidebar-header-content {
    width: 100%;
  }
  .p-sidebar-close {
    display: none !important;
  }
}
</style>
