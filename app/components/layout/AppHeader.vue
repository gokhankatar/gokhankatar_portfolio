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
            <span
              class="text-subtitle-2 text-sm-subtitle-1 text-lg-h6 font-weight-bold app-header__brand"
              >Gokhan Katar</span
            >
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
          <v-btn
            href="/cv.pdf"
            target="_blank"
            download="Gokhan_Katar_CV.pdf"
            variant="tonal"
            class="app-header__cv d-none d-md-inline-flex"
            :ripple="false"
            aria-label="Download CV"
          >
            <v-icon size="18">mdi-download</v-icon>
            Download CV
          </v-btn>
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
  </v-app-bar>

  <transition name="mobile-menu">
    <div v-if="drawer" class="mobile-menu" role="dialog" aria-modal="true">
      <div class="mobile-menu__header">
        <span class="mobile-menu__brand">Gokhan Katar</span>
        <v-btn icon variant="text" @click="drawer = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>

      <div class="mobile-menu__content">
        <v-btn
          v-for="item in navItems"
          :key="item.href"
          :href="item.href"
          variant="text"
          :size="display.xs.value ? 'large' : 'x-large'"
          class="mobile-menu__link"
          :ripple="false"
          @click="drawer = false"
          :prepend-icon="item.icon"
          :text="item.label"
        />
        <v-btn
          href="/cv.pdf"
          target="_blank"
          download="Gokhan_Katar_CV.pdf"
          variant="tonal"
          class="mobile-menu__cta"
          :ripple="false"
        >
          <v-icon size="18">mdi-download</v-icon>
          Download CV
        </v-btn>
      </div>

        <div class="mobile-menu__footer">
          <p class="mobile-menu__footer-title">Connect</p>
          <button
            type="button"
            class="theme-toggle mobile-menu__theme-toggle"
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
          <a class="mobile-menu__mail" href="mailto:katar_gokhan@hotmail.com">
            katar_gokhan@hotmail.com
          </a>
          <div class="mobile-menu__socials">
          <v-btn
            href="https://www.youtube.com/@npmrungame"
            target="_blank"
            icon="mdi-youtube"
            variant="text"
            class="mobile-menu__social-btn"
            :ripple="false"
            aria-label="YouTube"
          />
          <v-btn
            href="https://github.com/gokhankatar"
            target="_blank"
            icon="mdi-github"
            variant="text"
            class="mobile-menu__social-btn"
            :ripple="false"
            aria-label="GitHub"
          />
          <v-btn
            href="https://linkedin.com/in/gokhankatar"
            target="_blank"
            icon="mdi-linkedin"
            variant="text"
            class="mobile-menu__social-btn"
            :ripple="false"
            aria-label="LinkedIn"
          />
          <v-btn
            href="mailto:katar_gokhan@hotmail.com"
            icon="mdi-email"
            variant="text"
            class="mobile-menu__social-btn"
            :ripple="false"
            aria-label="Email"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useThemeMode } from "~/composables/core/useThemeMode";

const { toggleTheme, isDark, initTheme } = useThemeMode();
const isScrolled = ref(false);
const drawer = ref(false);
const display = useDisplay();

const navItems = [
  { href: "#home", label: "Home", icon: "mdi-home-outline" },
  { href: "#about", label: "About", icon: "mdi-account-outline" },
  { href: "#skills", label: "Skills", icon: "mdi-star-outline" },
  { href: "#projects", label: "Projects", icon: "mdi-briefcase-outline" },
  { href: "#contact", label: "Contact", icon: "mdi-email-outline" },
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

.app-header__cv {
  border-radius: 999px;
  text-transform: none;
  font-weight: 700;
  letter-spacing: 0.02em;
  padding-inline: 16px;
  gap: 8px;
  color: #ffffff;
  background: linear-gradient(135deg, #ff7a7a 0%, #ff5d8f 45%, #7a7dff 100%);
  border: none;
  box-shadow: 0 10px 22px rgba(255, 93, 143, 0.35);
}

.app-header__cv:hover {
  transform: translateY(-1px);
  background: linear-gradient(135deg, #ff7a7a 0%, #ff4f88 45%, #6d7bff 100%);
  box-shadow: 0 14px 28px rgba(255, 93, 143, 0.45);
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
  overflow: hidden;
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
  z-index: 0;
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
  top: 2px;
  left: 2px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, background 0.2s ease;
  z-index: 1;
}

.theme-toggle--dark .theme-toggle__thumb {
  transform: translateX(28px);
  background: #262626;
}

.theme-toggle--dark .theme-toggle__icon--moon,
.theme-toggle:not(.theme-toggle--dark) .theme-toggle__icon--sun {
  opacity: 1;
}

.mobile-menu {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100vh;
  border: none;
  z-index: 1400;
  background: rgba(15, 18, 24, 0.98);
  backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
}

.mobile-menu__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px 12px;
}

.mobile-menu__brand {
  font-weight: 700;
  letter-spacing: 0.02em;
}

.mobile-menu__content {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 20px 20px;
  min-height: calc(100vh - 72px);
  flex: 1;
}

.mobile-menu__link {
  justify-content: flex-start;
  text-transform: none;
  font-size: 1.1rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.04);
  gap: 12px;
  transition: transform 0.2s ease, background 0.2s ease;
  width: 100%;
}

.mobile-menu__link:hover {
  transform: translateY(-2px);
  background: rgba(240, 106, 108, 0.12);
}

.mobile-menu__cta {
  margin-top: 4px;
  text-transform: none;
  border-radius: 14px;
  justify-content: center;
  gap: 10px;
  color: #ffffff;
  background: linear-gradient(135deg, #ff7a7a 0%, #ff5d8f 45%, #7a7dff 100%);
  border: none;
  box-shadow: 0 10px 22px rgba(255, 93, 143, 0.35);
}

.v-theme--light .mobile-menu__cta {
  color: #ffffff;
  background: linear-gradient(135deg, #ff7a7a 0%, #ff5d8f 45%, #7a7dff 100%);
}

.mobile-menu__cta:hover {
  transform: translateY(-1px);
  background: linear-gradient(135deg, #ff7a7a 0%, #ff4f88 45%, #6d7bff 100%);
  box-shadow: 0 14px 28px rgba(255, 93, 143, 0.45);
}

.v-theme--light .mobile-menu {
  background: rgba(255, 255, 255, 0.98);
}

.v-theme--light .mobile-menu__link {
  background: rgba(15, 23, 42, 0.04);
}

.mobile-menu__footer {
  position: fixed;
  padding: 10px;
  bottom: 1rem;
  left: 0;
  width: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.v-theme--light .mobile-menu__footer {
  border-top-color: rgba(15, 23, 42, 0.08);
}

.mobile-menu__footer-title {
  margin: 0 0 10px;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
}

.v-theme--light .mobile-menu__footer-title {
  color: rgba(15, 23, 42, 0.6);
}

.mobile-menu__theme-toggle {
  margin-bottom: 10px;
}

.mobile-menu__mail {
  display: inline-flex;
  margin-bottom: 10px;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  text-align: center;
}

.v-theme--light .mobile-menu__mail {
  color: rgba(15, 23, 42, 0.85);
}

.mobile-menu__socials {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}

.mobile-menu__social-btn {
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  width: 36px;
  height: 36px;
  transition: transform 0.2s ease, background 0.2s ease;
}

.v-theme--light .mobile-menu__social-btn {
  background: rgba(15, 23, 42, 0.06);
}

.mobile-menu__social-btn:hover {
  transform: translateY(-2px);
  background: rgba(240, 106, 108, 0.18);
}

:deep(.mobile-menu-enter-active),
:deep(.mobile-menu-leave-active) {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

:deep(.mobile-menu-enter-from),
:deep(.mobile-menu-leave-to) {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
