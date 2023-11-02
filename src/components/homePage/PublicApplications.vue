<template>
  <div class="public-features">
    <h3>{{ $lang.title.publicFeatures }}</h3>
    <Button
      :label="$lang.button.usefulLinks"
      @click="router.push(routes.usefulLinks.path)"
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
</script>
<style lang="scss" scoped>
.public-features {
}
</style>
