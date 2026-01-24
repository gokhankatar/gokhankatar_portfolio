<template>
  <div class="app-loading" :class="{ 'is-active': isLoading }" aria-live="polite">
    <div class="app-loading__backdrop"></div>
    <div class="app-loading__content">
      <v-progress-circular indeterminate :size="56" :width="4" color="error" />
      <p class="text-caption text-sm-body-2 mb-0">Loading...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const isLoading = useState<boolean>("page-loading", () => false);
</script>
