<template>
  <div class="base-error-view">
    {{ $lang.error.registeredErrors[errorType] }}.
  </div>
</template>
<script lang="ts" setup>
import type { RegisteredError } from "@/types/errors";
import type { PropType } from "vue";

defineProps({
  errorType: {
    type: String as PropType<RegisteredError>,
    required: true,
  },
});
</script>
<style lang="scss" scoped>
@import "@/assets/fonts";

.base-error-view {
  @include font-extra-large;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
