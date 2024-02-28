<template>
  <ErrorView v-if="error" :error-type="error" />
  <slot v-else />
</template>
<script lang="ts" setup>
import { computed, onErrorCaptured, ref } from "vue";
import { useRouter } from "vue-router";
import ErrorView from "@/views/ErrorView.vue";
import { useAppStore } from "@/store/appStore";
import { storeToRefs } from "pinia";
import { RegisteredError } from "@/types/errors";

const appStore = useAppStore();
const { globalError } = storeToRefs(appStore);

const localError = ref<RegisteredError | undefined>();

onErrorCaptured((err: unknown) => {
  console.error("Error captured:", err);

  localError.value = RegisteredError.UnknownError;

  return false;
});

const error = computed<RegisteredError | undefined>(() => {
  return globalError.value ?? localError.value;
});

const clearError = () => {
  localError.value = undefined;
};

const router = useRouter();

router.afterEach(() => {
  clearError();
});
</script>
