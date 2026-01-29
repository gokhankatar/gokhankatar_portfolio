<template>
  <AppLoading v-if="isLoading" />
  <template v-else>
    <div class="init-container">
      <AppHeader />
      <NuxtPage />
      <AppFooter v-if="showFooter" />
    </div>
  </template>
</template>
<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";
import AppLoading from "~/components/common/AppLoading.vue";
import AppFooter from "~/components/layout/AppFooter.vue";
import AppHeader from "~/components/layout/AppHeader.vue";

const isLoading = ref(true);
const showFooter = ref(false);

onMounted(async () => {
  await nextTick();
  setTimeout(() => {
    isLoading.value = false;
    setTimeout(() => {
      showFooter.value = true;
    }, 800);
  }, 300);
});
</script>
