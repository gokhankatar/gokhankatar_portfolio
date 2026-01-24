<template>
  <p class="animated-title" :class="[titleClass, variant]" aria-live="polite">
    <template v-if="variant === 'clip'">
      <template v-for="(word, index) in words" :key="`${word}-${index}`">
        <span
          class="clip"
          :style="{
            '--word-index': index,
            '--word-delay': `${delay}ms`,
          }"
        >
          <span class="clip-word">{{ word }}</span>
        </span>
        <span v-if="index < words.length - 1" class="clip-space">&nbsp;</span>
      </template>
    </template>
    <template v-else>
      <span
        v-for="(char, index) in characters"
        :key="`${char}-${index}`"
        class="animated-title__char"
        :style="{
          whiteSpace: char === ' ' ? 'pre' : 'normal',
          '--char-index': index,
          '--char-delay': `${delay}ms`,
        }"
      >
        {{ char }}
      </span>
    </template>
  </p>
</template>

<script setup lang="ts">
type Variant = "fadeUp" | "wave" | "glow" | "clip";

const props = withDefaults(
  defineProps<{
    text: string;
    titleClass?: string;
    variant?: Variant;
    delay?: number;
  }>(),
  {
    titleClass: "",
    variant: "fadeUp",
    delay: 0,
  }
);

const characters = computed(() => props.text.split(""));
const words = computed(() => props.text.split(" "));
</script>

<style scoped>
.animated-title {
  display: inline-block;
}

.clip {
  overflow: hidden;
  display: inline-block;
  vertical-align: bottom;
}

.clip-word {
  display: inline-block;
  opacity: 0;
  transform: translateY(100%);
  animation: clip-slide 1500ms cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
  animation-delay: calc(var(--word-delay, 0ms) + var(--word-index, 0) * 100ms);
  animation-fill-mode: both;
  will-change: transform, opacity;
}

.clip-space {
  display: inline-block;
  width: 0.4em;
}

.animated-title__char {
  display: inline-block;
  opacity: 0;
  animation-duration: 700ms;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
  animation-delay: calc(var(--char-delay, 0ms) + var(--char-index, 0) * 40ms);
  animation-name: fade-up;
}

.animated-title.wave .animated-title__char {
  animation-name: wave-up;
}

.animated-title.glow .animated-title__char {
  animation-name: glow-in;
}

@keyframes clip-slide {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  35% {
    opacity: 1;
    transform: translateY(0);
  }
  70% {
    opacity: 0.9;
    transform: translateY(-100%);
  }
  100% {
    opacity: 0;
    transform: translateY(-100%);
  }
}

@keyframes fade-up {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes wave-up {
  0% {
    opacity: 0;
    transform: translateY(16px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes glow-in {
  0% {
    opacity: 0;
    transform: scale(0.98);
    filter: blur(2px);
  }
  100% {
    opacity: 1;
    transform: scale(1);
    filter: blur(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .clip-word,
  .animated-title__char {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>
