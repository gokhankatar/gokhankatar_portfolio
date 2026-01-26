<template>
  <v-app>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </v-app>
</template>

<script setup lang="ts">
useHead({
  script: [
    {
      key: "init-theme",
      tagPosition: "head",
      innerHTML: `(function(){try{var t=localStorage.getItem('theme-mode');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}var isDark=t==='dark';var bg=isDark?'#121212':'#ffffff';document.documentElement.style.colorScheme=isDark?'dark':'light';document.documentElement.style.backgroundColor=bg;document.documentElement.classList.toggle('pre-theme-dark',isDark);if(document.body){document.body.style.backgroundColor=bg;}}catch(e){}})();`,
    },
  ],
  style: [
    {
      key: "init-loading-style",
      tagPosition: "head",
      innerHTML:
        `.app-loading__backdrop{background:#ffffff}.pre-theme-dark .app-loading__backdrop{background:#121212}`,
    },
  ],
});
</script>

<style>
html {
  scroll-behavior: smooth;
}

html.pre-theme-dark,
html.pre-theme-dark body {
  background-color: #121212;
}

section[id] {
  scroll-margin-top: 80px;
}
</style>
