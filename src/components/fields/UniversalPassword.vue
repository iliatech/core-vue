<template>
  <div class="universal-password">
    <UniversalIcon
      prime-icon="copy"
      class="universal-password__copy-icon"
      @click="handleClickCopy"
    />
  </div>
</template>
<script lang="ts" setup>
import UniversalIcon from "@/components/icons/UniversalIcon.vue";
import { showToast } from "@/helpers/toast";
import { ToastType } from "@/types/toasts";
import { lang } from "@/lang";

const props = defineProps({
  value: {
    type: String,
    required: true,
  },
  entityLabel: {
    type: String,
    default: "Text",
  },
});

const handleClickCopy = async () => {
  try {
    await navigator.clipboard.writeText(props.value);
    showToast({
      type: ToastType.Success,
      text: lang.success.copiedToClipboard(props.entityLabel),
    });
  } catch (err) {
    showToast({
      type: ToastType.Error,
      text: lang.error.notCopiedToClipboard(props.entityLabel),
    });
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables";

.universal-password {
  width: 100%;
  display: flex;
  justify-content: space-between;

  &__copy-icon {
    cursor: pointer;
  }
}
</style>
