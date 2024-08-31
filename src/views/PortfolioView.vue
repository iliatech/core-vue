<template>
  <div class="portfolio-view">
    <div class="cv">
      <div class="cv__left">
        <div class="cv__person">ILIA<br />DOMYSHEV</div>
        <div class="cv__position">FRONTEND VUE DEVELOPER</div>
        <div class="cv__contacts">
          Phone: +34 603 14 99 56<br />
          Email: iadomyshev@gmail.com<br />
          GitHub: idomyshev
        </div>
        <div
          v-for="section in leftSections"
          :key="section.title"
          class="cv__section"
        >
          <div class="cv__section-title">
            {{ section.title }}
          </div>
          <div class="cv__section-body">
            {{ section.body }}
          </div>
        </div>
      </div>
      <div class="cv__right">2</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const leftSections = [
  {
    title: "TOOLS",
    body: "...",
  },
  {
    title: "MOBILE TOOLS",
    body: "...",
  },
];
</script>
<style lang="scss" scoped>
@import "@/assets/variables";
.portfolio-view {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 $px-40;
}

.cv {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr;
  font-family: Arial, sans-serif;

  &__left {
    padding: $px-10;
    background: #eee;
  }

  &__right {
    padding: $px-10;
  }

  &__person {
    font-size: 1.75rem;
    line-height: 2.5rem;
  }

  &__position {
    margin-top: $px-10;
    font-size: 1rem;
  }
  &__contacts {
    margin-top: $px-10;
    margin-bottom: $px-10;
    font-size: 0.875rem;
  }

  &__section {
    //
  }
}
</style>
