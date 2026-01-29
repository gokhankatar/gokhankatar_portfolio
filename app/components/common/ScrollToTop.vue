<template>
  <v-btn
    v-show="isVisible"
    class="scroll-top"
    icon
    :ripple="false"
    aria-label="Scroll to top"
    @click="scrollToTop"
  >
    <v-icon size="22">mdi-chevron-up</v-icon>
  </v-btn>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const isVisible = ref(false);

const updateVisibility = () => {
  isVisible.value = window.scrollY > 300;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  updateVisibility();
  window.addEventListener("scroll", updateVisibility, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateVisibility);
});
</script>

<style scoped>
.scroll-top {
  position: fixed;
  right: 20px;
  bottom: 24px;
  z-index: 1300;
  width: 48px;
  height: 48px;
  border-radius: 999px;
  color: #ffffff;
  background: linear-gradient(135deg, #ff7a7a 0%, #ff5d8f 45%, #7a7dff 100%);
  box-shadow: 0 12px 26px rgba(255, 93, 143, 0.4);
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
}

.scroll-top:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 32px rgba(255, 93, 143, 0.5);
}

@media (max-width: 600px) {
  .scroll-top {
    right: 16px;
    bottom: 18px;
    width: 44px;
    height: 44px;
  }
}
</style>
