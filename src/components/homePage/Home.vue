<template>
  <div class="home-page">
    <img
      class="profile-photo"
      src="@/images/ID_Leon.jpg"
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
      <UniversalButton label="My portfolio" icon-pre="id-card" />
      <UniversalButton label="Download my CV" icon-pre="download" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import UniversalButton from "@/components/buttons/UniversalButton.vue";
</script>
<style lang="scss" scoped>
@import "@/assets/variables";

.home-page {
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
