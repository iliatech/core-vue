<template>
  <div class="home-container">
    <div class="home">
      <img
        class="my-photo"
        src="@/images/ID_Leon.jpg"
        alt="Ilia Domyshev 2024"
      />

      <p>Hello! My name is <b>Ilia Domyshev</b>.</p>
      <p>I'm interesting in technologies and work full-time as programmer.</p>
      <p>
        I focused on frontend but also have experience as backend developer.
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

      <div style="clear: both" />

      <h2>Technology Stack</h2>

      <p>
        TypeScript, JavaScript<br />
        Vue 3, Vue 2, CSS3, HTML5, AmCharts5, Lodash, Date-Fns, Mapbox,
        Deck.gl<br />
        Soft: Jira, Confluence, GitHub, Git, Discord, Loom, WebStorm, MacOS
      </p>

      <p>
        <b>Also had experience with</b><br />
        React, Vue 2, Express, C#, ASP.NET, PHP, Laravel, PowerShell, MSSQL,
        Postgres, MySql, Docker
        <br />
        Soft: YouTrack, Asana, Slack, Microsoft Visual Studio, Linux, Windows
        <br />
        Admin: Microsoft Windows Servers, Linux Servers, VMWare & Hyper-V
        Virtualization,<br />
        TFS deploy server, IIS balancing, Zabbix
      </p>

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
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
@import "@/assets/variables";

.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.home {
  width: 700px;
}

.my-photo {
  width: 400px;
  float: left;
  margin-right: 20px;
  margin-bottom: 20px;
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
