<template>
  <AppLoading v-if="isLoading" />
  <template v-else>
    <div class="init-container">
      <AppHeader />
      <NuxtPage />
      <AppFooter />
    </div>
  </template>
</template>
<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";

const isLoading = ref(true);

onMounted(async () => {
  await nextTick();
  setTimeout(() => {
    isLoading.value = false;
  }, 500);
});
</script>

