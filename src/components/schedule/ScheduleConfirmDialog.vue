<template>
  <Teleport v-if="show" to="body">
    <div class="schedule-confirm-dialog">
      <div class="schedule-confirm-dialog__container">
        <div class="schedule-confirm-dialog__title">
          {{ title }}
        </div>
        <div class="schedule-confirm-dialog__message">
          {{ message }}
        </div>
        <div class="schedule-confirm-dialog__buttons">
          <div
            @click="handleCancel"
            class="schedule-confirm-dialog__cancel-button"
          >
            {{ $lang.button.cancel }}
          </div>
          <div
            @click="handleConfirm"
            class="schedule-confirm-dialog__confirm-button"
          >
            {{ $lang.button.ok }}
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { ref } from "vue";

defineProps({
  title: { type: String, required: true },
  message: { type: String, required: true },
});

const emit = defineEmits(["confirm", "cancel"]);

const show = ref<boolean>(false);

const open = () => {
  show.value = true;
};

const close = () => {
  show.value = false;
};

const handleConfirm = () => {
  emit("confirm");
  close();
};

const handleCancel = () => {
  emit("cancel");
  close();
};

defineExpose({ open });
</script>

<style lang="scss" scoped>
@import "@/assets/fonts.scss";
@import "@/assets/colors.scss";
@import "@/assets/variables.scss";

.schedule-confirm-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 10000;

  &__container {
    width: 400px;
    background: #fff;
    padding: $px-20;
    border: 2px solid pink;
    margin: $px-40;
  }

  &__title {
    @include font-extra-large;
  }

  &__message {
    margin-top: $px-10;
    @include font-medium;
  }

  &__buttons {
    display: flex;
    gap: $px-10;
    justify-content: flex-end;
    margin-top: $px-20;
    @include font-medium;
  }

  &__cancel-button,
  &__confirm-button {
    border: 1px solid #aaa;
    padding: $px-5 0;
    width: 90px;
    text-align: center;
    cursor: pointer;
  }

  &__confirm-button {
    border-color: red;
  }
}
</style>
