import { useTheme } from "vuetify";
import { computed, ref } from "vue";
import type { ThemeMode } from "./interfaces";

export const useThemeMode = () => {
  const theme = useTheme();
  const mode = ref<ThemeMode>("light");
  const isDark = computed(() => theme.global.current.value.dark);

  const applyTheme = (newMode: ThemeMode) => {
    if (process.client) {
      document.body.classList.add("theme-changing");
    }

    mode.value = newMode;
    theme.global.name.value = newMode;

    if (process.client) {
      localStorage.setItem("theme-mode", newMode);
      document.documentElement.style.colorScheme = newMode;
      setTimeout(() => {
        document.body.classList.remove("theme-changing");
      }, 50);
    }
  };

  const initTheme = () => {
    if (!process.client) {
      return;
    }

    const saved = localStorage.getItem("theme-mode") as ThemeMode | null;
    if (saved) {
      applyTheme(saved);
      return;
    }

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDark ? "dark" : "light");
  };

  const toggleTheme = () => {
    applyTheme(isDark.value ? "light" : "dark");
  };

  return {
    mode,
    applyTheme,
    initTheme,
    toggleTheme,
    isDark,
  };
};
