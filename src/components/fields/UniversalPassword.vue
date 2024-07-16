<template>
  <div class="universal-password">
    <UniversalIcon
      prime-icon="eye"
      class="universal-password__show-icon"
      @click="handleClickShow"
    />
  </div>
  <UniversalDialog
    ref="showPasswordDialog"
    :title="$lang.title.password"
    @confirm="handleClickCloseShow"
    :z-index="1200"
    without-cancel
  >
    {{ value }}
  </UniversalDialog>
</template>
<script lang="ts" setup>
import UniversalIcon from "@/components/icons/UniversalIcon.vue";
import UniversalDialog from "@/components/dialogs/UniversalDialog.vue";
import { ref } from "vue";

defineProps({
  value: {
    type: String,
    required: true,
  },
  entityLabel: {
    type: String,
    default: "Text",
  },
});

const showPasswordDialog = ref();

const handleClickShow = async () => {
  showPasswordDialog.value?.open();
};

const handleClickCloseShow = async () => {
  showPasswordDialog.value?.close();
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables";

.universal-password {
  width: 100%;
  display: flex;
  justify-content: space-between;

  &__show-icon {
    cursor: pointer;
  }
}
</style>
