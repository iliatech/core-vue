<template>
  <div class="portfolio-view">
    <div class="cv" ref="pdfContainerRef">
      <div class="cv__left">
        <UniversalButton @click="handlePdfExport" label="PDF export" />
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
import html2pdf from "html2pdf.js";
import UniversalButton from "@/components/buttons/UniversalButton.vue";
import { ref } from "vue";

const leftSections = [
  {
    title: "Frameworks",
    body: ["Vue 3 (Composition API), Vue 2"],
  },
  {
    title: "Languages",
    body: ["JavaScript, TypeScript, HTML5, CSS3, SASS"],
  },
  {
    title: "Libraries",
    body: [
      "PrimeVue, Vuetify, Pinia, Vuex",
      "AWS Amplify, Facebook JS SDK, AmCharts, Mapbox, Deck.gl, html2pdf.js",
      "Lodash, DateFNS, Axios",
    ],
  },
  {
    title: "Tools",
    body: [
      "Git, GitHub",
      "Vite, Webpack",
      "Docker, GitHub Actions",
      "Swagger, Postman, Ngrok, Valet, Heroku, npm, nvm",
      "Webstorm, Visual Studio Code",
      "Jira, Confluence, Discord, Slack, Asana, Figma",
      "MacOS, Linux, Windows",
    ],
  },
  {
    title: "ALSO FAMILIAR WITH",
    body: [
      "Frontend: Nuxt, React, Redux + Saga",
      "Backend: Nest, Express.js, Node.js, ASP.NET, Laravel",
      "Languages: C#, PHP, PowerShell",
      "Databases&ORM: Prisma, Sequelize, Postgres, MSSQL, MySQL, MongoDB",
      "Services: Apache, Nginx, IPTables, IIS",
      "Deploy: TFS Deploy Sever",
      "OS: Windows Servers, Linux (Debian, Ubuntu) Servers",
      "Virtualization: VMWare, HyperV",
      "IDE: Visual Studio",
    ],
  },
];

const pdfContainerRef = ref();

const handlePdfExport = () => {
  const options = {
    html2canvas: {
      scale: 2,
    },
    jsPDF: {
      unit: "px",
      //format: ["800px", "1000px"],
      orientation: "l",
    },
    margin: [0, 0, 0, 0],
    filename: "myExport.pdf",
  };

  html2pdf().set(options).from(pdfContainerRef.value).save();
};
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

  &__section-body-item {
    margin-top: $px-5;
  }
}
</style>
