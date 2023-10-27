<template>
  <Sidebar
    v-model:visible="show"
    class="custom-sidebar"
    position="right"
    :dismissable="false"
  >
    <template #header>
      <div class="custom-sidebar__header">
        <div class="custom-sidebar__header-title">
          {{ title }}
        </div>
        <div class="custom-sidebar__header-icon">
          <i class="pi pi-times" @click="close" />
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
          v-if="closeButton"
          @click="close"
          :label="$lang.button.close"
          class="close-button"
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
import Button from "primevue/button";

const show = ref(false);

const emit = defineEmits(["click:close"]);

defineProps({
  title: String,
  closeButton: Boolean,
});

const close = () => {
  emit("click:close");
  console.log("C3");
  show.value = false;
};

const open = () => {
  show.value = true;
};

defineExpose({ open });
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
    padding: $space-ten;
  }

  &__content {
    @include font-medium;
  }

  &__buttons {
    display: flex;
    justify-content: flex-end;
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
