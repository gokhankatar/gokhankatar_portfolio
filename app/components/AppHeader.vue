<template>
  <v-app-bar
    :elevation="isScrolled ? 4 : 2"
    fixed
    :color="$vuetify.theme.current.dark ? 'grey-darken-4' : 'white'"
    :style="
      $vuetify.theme.current.dark
        ? 'backdrop-filter: blur(10px); background: rgba(18, 18, 18, 0.95) !important;'
        : 'backdrop-filter: blur(10px); background: rgba(255, 255, 255, 0.95) !important;'
    "
  >
    <v-container fluid class="app-header__container">
      <v-row align="center" justify="space-between" no-gutters class="app-header__row">
        <v-col cols="auto">
          <NuxtLink to="/" class="text-decoration-none">
            <span class="text-h6 font-weight-bold app-header__brand">Gokhan Katar</span>
          </NuxtLink>
        </v-col>

        <v-col cols="auto" class="d-none d-md-flex app-header__nav">
          <v-btn
            v-for="item in navItems"
            :key="item.href"
            :href="item.href"
            variant="text"
            class="text-none"
            color="grey-darken-1"
          >
            {{ item.label }}
          </v-btn>
        </v-col>

        <v-col cols="auto" class="d-flex align-center ga-2 app-header__actions">
          <button
            type="button"
            class="theme-toggle"
            :class="{ 'theme-toggle--dark': isDark }"
            aria-label="Toggle theme"
            @click="handleToggleTheme"
          >
            <span class="theme-toggle__icon theme-toggle__icon--sun">
              <v-icon size="18">mdi-weather-sunny</v-icon>
            </span>
            <span class="theme-toggle__icon theme-toggle__icon--moon">
              <v-icon size="18">mdi-weather-night</v-icon>
            </span>
            <span class="theme-toggle__thumb"></span>
          </button>
          <v-btn icon variant="text" @click="drawer = !drawer" class="d-md-none">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-navigation-drawer v-model="drawer" temporary location="right">
      <v-list>
        <v-list-item
          v-for="item in navItems"
          :key="item.href"
          :href="item.href"
          @click="drawer = false"
        >
          <v-list-item-title>{{ item.label }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useThemeMode } from "~/composables/core/useThemeMode";

const { toggleTheme, isDark, initTheme } = useThemeMode();
const isScrolled = ref(false);
const drawer = ref(false);

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

const handleToggleTheme = () => {
  toggleTheme();
};

onMounted(() => {
  initTheme();
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.v-app-bar {
  transition: all 0.3s ease;
  width: 100%;
  z-index: 1000;
}

.app-header__container {
  padding-inline: 24px;
}

.app-header__row {
  flex-wrap: nowrap;
}

.app-header__nav {
  justify-content: center;
  flex: 1 1 auto;
  min-width: 0;
}

.app-header__actions {
  margin-left: auto;
  flex-wrap: nowrap;
}

.app-header__brand {
  background: linear-gradient(120deg, #ff6a6a, #ffd36e, #f6a5ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  letter-spacing: 0.02em;
}

:deep(.v-theme--dark) .app-header__brand {
  background: linear-gradient(120deg, #8ff0b6, #7ad7c4, #9ad0ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

@media (max-width: 960px) {
  .app-header__container {
    padding-inline: 16px;
  }
}

.theme-toggle {
  position: relative;
  width: 56px;
  height: 28px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 999px;
  padding: 0;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.06);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  transition: background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  outline: none;
}

.theme-toggle--dark {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.18);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
}

.theme-toggle__icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.65;
  transition: opacity 0.2s ease, color 0.2s ease;
  color: inherit;
}

.theme-toggle__icon--sun {
  left: 8px;
  color: #f6b93b;
}

.theme-toggle__icon--moon {
  right: 8px;
  color: #9ea4ff;
}

.theme-toggle__thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, background 0.2s ease;
}

.theme-toggle--dark .theme-toggle__thumb {
  transform: translateX(28px);
  background: #262626;
}

.theme-toggle--dark .theme-toggle__icon--moon,
.theme-toggle:not(.theme-toggle--dark) .theme-toggle__icon--sun {
  opacity: 1;
}
</style>
