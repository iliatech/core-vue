<template>
  <div class="useful-links">
    <a href="https://www.webfx.com/tools/emoji-cheat-sheet/" target="_blank">
      Emoji Cheat Sheet<span class="date"> 2/Nov/2023</span>
    </a>
  </div>
</template>
<style lang="scss" scoped>
@import "@/assets/fonts";
@import "@/assets/variables";
.useful-links {
  a {
    @include font-large;
    color: #dc3c3c;
    text-decoration: none;
    display: flex;
    align-items: center;

    .date {
      @include font-small;
      color: #666;
      text-decoration: none !important;
      padding-left: $px-15;
    }
  }
}
</style>
