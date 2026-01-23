<template>
  <p ref="root" class="animated-title" :class="titleClass" aria-live="polite">
    <span
      v-for="(char, index) in characters"
      :key="`${char}-${index}`"
      class="animated-title__char"
      :style="{ whiteSpace: char === ' ' ? 'pre' : 'normal' }"
    >
      {{ char }}
    </span>
  </p>
</template>

<script setup lang="ts">
import { animate, stagger } from "animejs";

type Variant = "fadeUp" | "wave" | "glow";

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

const root = ref<HTMLElement | null>(null);
const characters = computed(() => props.text.split(""));

onMounted(() => {
  if (!root.value) {
    return;
  }

  const targets = root.value.querySelectorAll(".animated-title__char");

  if (props.variant === "wave") {
    animate(targets, {
      opacity: [0, 1],
      translateY: [16, 0],
      delay: stagger(40, { start: props.delay }),
      duration: 700,
      easing: "easeOutCubic",
    });
    return;
  }

  if (props.variant === "glow") {
    animate(targets, {
      opacity: [0, 1],
      scale: [0.98, 1],
      delay: stagger(28, { start: props.delay }),
      duration: 600,
      easing: "easeOutQuad",
    });
    return;
  }

  animate(targets, {
    opacity: [0, 1],
    translateY: [10, 0],
    delay: stagger(30, { start: props.delay }),
    duration: 550,
    easing: "easeOutQuad",
  });
});
</script>

<style scoped>
.animated-title__char {
  display: inline-block;
}
</style>
