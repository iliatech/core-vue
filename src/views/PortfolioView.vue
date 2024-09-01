<template>
  <div class="portfolio-view">
    <div class="cv">
      <div class="cv__left">
        <div class="cv__person">ILIA<br />DOMYSHEV</div>
        <div class="cv__position">FRONTEND VUE DEVELOPER</div>
        <div class="cv__contacts">
          <a href="https://www.linkedin.com/in/idomyshev/">LinkedIn</a>
          <br />
          <a href="https://github.com/idomyshev">GitHub</a>
          <br />
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
            <div
              v-for="bodyItem in section.body"
              :key="bodyItem"
              class="cv__section-body-item"
            >
              {{ bodyItem }}
            </div>
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
    title: "Frameworks",
    body: ["Vue 3, Vue 2"],
  },
  {
    title: "Languages",
    body: ["JavaScript, TypeScript, HTML5, CSS3, SASS"],
  },
  {
    title: "Libraries",
    body: [
      "PrimeVue, Vuetify, Pinia, Vuex, AWS Amplify, Facebook JS SDK, AmCharts, Mapbox, Deck.gl, Lodash, DateFNS, Axios, html2pdf.js",
    ],
  },
  {
    title: "Tools",
    body: [
      "Git, GitHub",
      "Docker, GitHub Actions",
      "Swagger, Postman, Ngrok, Valet, Heroku, npm, nvm",
      "Webstorm, Visual Studio Code",
      "Jira, Confluence, Discord, Slack, Asana, Figma",
      "MacOS, Linux, Windows",
    ],
  },
  {
    title: "Other technologies",
    body: [
      "Frontend: Nuxt, React, Redux + Saga",
      "Backend: Nest, Express.js, Node.js, C#, ASP.NET, PHP, Laravel, Databases: Prisma, Sequelize, Postgres, MySQL, MSSQL, MongoDB",
      "Services: Apache, Nginx, IPTables, PowerShell, TFS Deploy Sever, IIS",
      "OS: Windows Servers, Linux (Debian, Ubuntu) Servers",
      "Virtualization: VMWare, HyperV",
      "IDE: Visual Studio",
    ],
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
    font-size: 1.5rem;
    line-height: 2rem;
  }

  &__position {
    margin-top: $px-10;
    font-size: 1.125rem;
  }
  &__contacts {
    margin-top: $px-10;
    margin-bottom: $px-10;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  &__section {
    //
  }

  &__section-title {
    font-size: 1rem;
    text-transform: uppercase;
  }

  &__section-body {
    border-top: 1px solid #666;
    margin-top: $px-5;
    padding-top: $px-5;
    margin-bottom: $px-20;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
}
</style>
