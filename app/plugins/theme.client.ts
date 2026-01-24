import { onBeforeMount } from "vue";
import { useThemeMode } from "~/composables/core/useThemeMode";

let didInit = false;

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.mixin({
    setup() {
      if (didInit) {
        return;
      }

      didInit = true;
      const { initTheme } = useThemeMode();
      onBeforeMount(() => {
        initTheme();
      });
    },
  });
});
