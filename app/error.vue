<template>
  <v-app :class="{ 'error-app--dark': isDark }">
    <div class="error-page" :class="{ 'error-page--dark': isDark }">
      <v-container class="error-page__container">
        <v-card class="error-card" elevation="0">
          <div class="error-card__badge">
            {{ statusCode }}
          </div>
          <p class="error-card__title">Sayfa bulunamadı</p>
          <p class="error-card__description">
            Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
          </p>
          <p class="error-card__detail">
            {{ errorMessage }}
          </p>
          <div class="error-card__actions">
            <v-btn
              to="/"
              variant="flat"
              color="error"
              class="error-card__btn"
              :ripple="false"
              text="Ana Sayfa"
            />
            <v-btn
              variant="outlined"
              class="error-card__btn error-card__btn--ghost"
              :ripple="false"
              text="Geri Dön"
              @click="goBack"
            />
          </div>
        </v-card>
      </v-container>
    </div>
  </v-app>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useTheme } from "vuetify";

const error = useError();
const router = useRouter();
const theme = useTheme();

const prefersDark = ref(false);

onMounted(() => {
  try {
    const stored = localStorage.getItem("theme-mode");
    prefersDark.value = stored === "dark";
  } catch {
    prefersDark.value = false;
  }
});

const isDark = computed(() => {
  const themeDark = theme.global.current.value.dark;
  if (process.client) {
    return (
      themeDark ||
      prefersDark.value ||
      document.documentElement.classList.contains("pre-theme-dark")
    );
  }
  return themeDark;
});
const statusCode = computed(() => error.value?.statusCode ?? 404);
const errorMessage = computed(
  () => error.value?.statusMessage || "Beklenmeyen bir hata oluştu."
);

const goBack = () => {
  router.back();
};
</script>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(
      60% 80% at 20% 10%,
      rgba(255, 122, 122, 0.2),
      transparent 60%
    ),
    radial-gradient(50% 70% at 80% 0%, rgba(99, 102, 241, 0.2), transparent 60%);
}

.error-page--dark {
  background: radial-gradient(
      60% 80% at 20% 10%,
      rgba(143, 240, 182, 0.18),
      transparent 60%
    ),
    radial-gradient(50% 70% at 80% 0%, rgba(122, 215, 196, 0.2), transparent 60%);
}

.error-app--dark {
  background-color: #0f121a;
}

.error-app--dark .error-page {
  background-color: #0f121a;
}

html.pre-theme-dark body,
html.pre-theme-dark .v-application {
  background-color: #0f121a;
}

.error-page__container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.error-card {
  width: min(520px, 92vw);
  padding: 28px 24px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(15, 23, 42, 0.08);
  text-align: center;
  backdrop-filter: blur(10px);
}

.error-page--dark .error-card {
  background: rgba(18, 20, 26, 0.8);
  border-color: rgba(255, 255, 255, 0.08);
}

html.pre-theme-dark .error-page {
  background: radial-gradient(
      60% 80% at 20% 10%,
      rgba(143, 240, 182, 0.18),
      transparent 60%
    ),
    radial-gradient(50% 70% at 80% 0%, rgba(122, 215, 196, 0.2), transparent 60%);
}

html.pre-theme-dark .error-card {
  background: rgba(18, 20, 26, 0.8);
  border-color: rgba(255, 255, 255, 0.08);
}

.error-card__badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 72px;
  padding: 6px 12px;
  border-radius: 999px;
  font-weight: 700;
  color: #ffffff;
  background: linear-gradient(135deg, #ff7a7a, #ff5d8f, #7a7dff);
  box-shadow: 0 10px 22px rgba(255, 93, 143, 0.35);
  margin-bottom: 16px;
}

.error-card__title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
}

.error-page--dark .error-card__title {
  color: #f8fafc;
}

.error-card__description {
  margin: 10px 0 6px;
  color: rgba(15, 23, 42, 0.7);
}

.error-page--dark .error-card__description {
  color: rgba(248, 250, 252, 0.7);
}

.error-card__detail {
  margin: 0 0 18px;
  font-size: 0.9rem;
  color: rgba(15, 23, 42, 0.6);
}

.error-page--dark .error-card__detail {
  color: rgba(248, 250, 252, 0.6);
}

.error-card__actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.error-card__btn {
  border-radius: 999px;
  text-transform: none;
  font-weight: 700;
}

.error-card__btn--ghost {
  border-color: rgba(15, 23, 42, 0.2);
}

.error-page--dark .error-card__btn--ghost {
  border-color: rgba(255, 255, 255, 0.2);
}
</style>
