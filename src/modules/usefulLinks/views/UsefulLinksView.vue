<template>
  <div class="useful-links-view">
    <a href="https://www.webfx.com/tools/emoji-cheat-sheet/" target="_blank">
      Emoji Cheat Sheet<span class="date"> 2/Nov/2023</span>
    </a>
    <a
      href="https://stackoverflow.com/questions/1274057/how-do-i-make-git-forget-about-a-file-that-was-tracked-but-is-now-in-gitignore"
      target="_blank"
    >
      Git, forget about a file was tracked!<span class="date">
        20/Nov/2023</span
      >
    </a>
  </div>
</template>
<style lang="scss" scoped>
@import "fonts";
@import "@/assets/variables";
.useful-links-view {
  display: flex;
  flex-direction: column;
  gap: $px-10;
  padding: $px-20;

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
