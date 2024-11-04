<template>
  <Sidebar
    v-model:visible="show"
    class="universal-sidebar"
    :position="position"
    :dismissable="false"
    @hide="emit('click:close')"
  >
    <template #header>
      <div class="universal-sidebar__header">
        <div class="universal-sidebar__header-title">
          {{ title }}
        </div>
        <div class="universal-sidebar__header-icon">
          <i class="pi pi-times" @click="emit('click:close')" />
        </div>
      </div>
    </template>
    <div class="universal-sidebar__container">
      <div class="universal-sidebar__content">
        <slot />
      </div>
      <div class="universal-sidebar__buttons">
        <slot name="buttons-before" />
        <Button
          v-if="cancelButton || closeButton"
          @click="emit('click:close')"
          :label="cancelButton ? $lang.button.cancel : $lang.button.close"
          class="cancel-button"
          outlined
        />
        <slot name="buttons-after" />
      </div>
    </div>
  </Sidebar>
</template>
<script lang="ts" setup>
import Sidebar from "primevue/sidebar";
import { ref } from "vue";
import type { PropType } from "vue";
import Button from "primevue/button";

type Position = "left" | "right" | "top" | "bottom" | "full" | undefined;

const show = ref(false);

const emit = defineEmits(["click:close"]);

defineProps({
  title: String,
  closeButton: Boolean,
  cancelButton: Boolean,
  position: {
    type: String as PropType<Position>,
    default: "right",
  },
});

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

.universal-sidebar {
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
    padding: $px-10 0;
    gap: $px-15;
  }

  &__content {
    height: 100%;
    margin-bottom: 15px;
    @include font-medium;
  }

  &__buttons {
    display: flex;
    justify-content: flex-end;
    gap: $px-15;
    padding-bottom: $px-15;
  }
}
</style>
<style lang="scss">
.universal-sidebar {
  width: 400px !important;

  .p-sidebar-header-content {
    width: 100%;
  }
  .p-sidebar-close {
    display: none !important;
  }
}
</style>
