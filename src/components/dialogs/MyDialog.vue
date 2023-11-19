<template>
  <Teleport v-if="show" to="body">
    <div class="schedule-dialog" :style="{ zIndex }">
      <div class="schedule-dialog__container">
        <div class="schedule-dialog__title">
          {{ title }}
        </div>
        <div class="schedule-dialog__content">
          <slot />
        </div>
        <div class="schedule-dialog__buttons">
          <MyButton
            @click="handleCancel"
            :label="$lang.button.cancel"
            color="grey"
            width="80px"
            class="schedule-dialog__cancel-button"
          />
          <MyButton
            @click="handleConfirm"
            :label="$lang.button.ok"
            color="pink"
            width="80px"
            class="schedule-dialog__confirm-button"
          />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import MyButton from "@/components/schedule/MyButton.vue";

const props = defineProps({
  title: { type: String, required: true },
  notCloseOnConfirm: Boolean,
  zIndex: { type: Number, default: 1000 },
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
  if (!props.notCloseOnConfirm) {
    close();
  }
};

const handleCancel = () => {
  emit("cancel");
  close();
};

defineExpose({ open, close });
</script>

<style lang="scss" scoped>
@import "@/assets/fonts";
@import "@/assets/colors";
@import "@/assets/variables";

.schedule-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);

  &__container {
    width: 400px;
    background: #fff;
    padding: $px-20;
    border: 1px solid mediumpurple;
    margin: $px-40;
  }

  &__title {
    @include font-extra-large;
  }

  &__content {
    margin-top: $px-10;
    @include font-medium;
  }

  &__buttons {
    display: flex;
    gap: $px-20;
    justify-content: flex-end;
    margin-top: $px-20;
  }
}
</style>
