<template>
  <div class="public-area">
    <div class="public-area__left">
      <h2>My Education</h2>

      <p>
        I graduated from
        <a href="http://inter.isu.ru/" target="_blank">
          Irkutsk State University</a
        >
        the faculty of `mathematics and computer science`<br />
        with a <b>specialist degree: Mathematician and System programmer</b>
        (2003 - 2008).
      </p>

      <p>
        Before that, I graduated secondary school with advanced math learning
        (1993 - 2003).
      </p>

      <h2>Professional experience</h2>

      <p>
        (2020 - PRESENT)<br />
        Work full-time in commercial software development as a frontend
        programmer<br />
        with JavaScript language.
      </p>

      <p>
        (2008 - 2020)<br />
        I have worked full-time as system administrator and partially as
        programmer on demand.
      </p>

      <h2>Technology Stack</h2>

      <p>
        (Work Now)<br />
        JavaScript, Vue 3, Express, CSS3, HTML5, AmCharts5, Lodash, Date-Fns,
        Mapbox, Deck.gl<br />
        Soft: Jira, Confluence, GitHub, Git, Discord, Loom, WebStorm, MacOS
      </p>

      <p>
        (Before)<br />
        React, Vue 2, C#, ASP.NET, PHP, Laravel, PowerShell, MSSQL, Postgres,
        MySql, Docker
        <br />
        Soft: YouTrack, Asana, Slack, Microsoft Visual Studio, Linux, Windows
        <br />
        Admin: Microsoft Windows Servers, Linux Servers, VMWare & Hyper-V
        Virtualization,<br />
        TFS deploy server, IIS balancing, Zabbix
      </p>
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
@import "@/assets/variables";

.public-area {
  display: flex;
  &__left {
    padding: $px-20;
    border-right: 1px solid #666;
    border-bottom: 1px solid #666;
  }

  h2 {
    font-size: 1.125rem;
    margin: 0;
    padding: 0;
  }

  p {
    margin: 10px 0 20px;
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
}
</style>
