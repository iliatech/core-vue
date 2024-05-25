<template>
  <UniversalSidebar
    ref="sidebar"
    :title="$lang.title.credentialType"
    close-button
    @click:close="close"
  >
    <div class="credential-type-sidebar">
      <label class="credential-type-sidebar__name-label">
        {{ $lang.label.name }}
      </label>
      <InputText v-model="currentState.name" />
    </div>
  </UniversalSidebar>
</template>
<script lang="ts" setup>
import UniversalSidebar from "@/components/sidebars/UniversalSidebar.vue";
import { reactive, ref } from "vue";
import InputText from "primevue/inputtext";

const sidebar = ref<InstanceType<typeof UniversalSidebar>>();
const currentState = reactive<{ name: string }>({
  name: "",
});

defineExpose({
  open() {
    sidebar.value.open();
  },
  close() {
    sidebar.value.close();
  },
});
</script>
<style lang="scss" scoped>
@import "@/assets/variables";
.credential-type-sidebar {
  &__name-label {
    display: block;
    margin-bottom: $px-10;
    margin-top: $px-20;
  }
}
</style>
