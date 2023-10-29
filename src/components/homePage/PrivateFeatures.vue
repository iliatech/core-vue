<template>
  <div class="private-features">
    <h3>{{ $lang.title.privateFeatures }}</h3>
    <Button
      :label="$lang.button.wordsApp"
      @click="openWordsApp"
      text
      raised
      plain
    />
  </div>
</template>
<script lang="ts" setup>
import Button from "primevue/button";
import router from "@/router";
import { routes } from "@/settings/routes";

const openWordsApp = () => {
  router.push(routes.words.path);
};
</script>
<style lang="scss" scoped>
.private-features {
}
</style>
