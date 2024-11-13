<template>
  <div class="home-page">
    <img
      class="profile-photo"
      src="@/images/bear-robot-logo.jpg"
      alt="Ilia Domyshev 2024"
    />

    <div class="buttons-container">
      <UniversalButton
        label="My LinkedIn"
        icon-pre="linkedin"
        href="https://www.linkedin.com/in/idomyshev/"
        open-in-new-tab
      />
      <UniversalButton
        label="My GitHub"
        icon-pre="github"
        href="https://github.com/idomyshev"
        open-in-new-tab
      />
      <UniversalButton
        v-if="false"
        label="My portfolio"
        icon-pre="id-card"
        :route-name="routes.portfolio.name"
      />
      <UniversalButton
        label="Download my CV"
        icon-pre="download"
        @click="downloadFile"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import UniversalButton from "@/components/buttons/UniversalButton.vue";
import { routes } from "@/settings/routes";

const downloadFile = () => {
  const link = document.createElement("a");
  link.download = "CV_ILIA-DOMYSHEV_12-SEP-2024";
  link.href = "CV_ILIA_DOMYSHEV_12-SEP-2024.pdf";
  link.click();

  // Clean up by removing the anchor element
  link.remove();
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables";

.home-page {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: $px-40;
  flex-direction: row;

  @media (max-width: 700px) {
    flex-direction: column;
  }
}

.profile-photo {
  width: 200px;
  float: left;
  border-radius: $px-20;
  border: 2px dashed #666;
}

.buttons-container {
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: $px-20;
}

h2 {
  font-size: 1.125rem;
  margin: 0;
  padding: 0;
}

p {
  margin: 10px 0 15px;
  line-height: 1.75rem;
  font-size: 1rem;
}

p:last-child {
  margin-bottom: 0;
}

a,
a:hover,
a:active,
a:visited {
  color: inherit;
}
</style>
