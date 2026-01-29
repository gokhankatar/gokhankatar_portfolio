<template>
  <div class="experience-section">
    <p
      class="text-center text-subtitle-1 text-md-h6 text-lg-h5 text-xl-h4 font-weight-bold mb-5"
      style="letter-spacing: 1px !important"
    >
      Experience Timeline
    </p>

    <div v-if="pending" class="experience-list--xs experience-list--loading">
      <v-skeleton-loader
        v-for="n in 2"
        :key="n"
        type="card"
        class="experience-skeleton"
      />
    </div>

    <!-- Desktop View -->
    <v-timeline
      v-else-if="!display.xs.value"
      align="center"
      density="comfortable"
      :line-color="isDark ? 'grey-darken-1' : 'grey-lighten-1'"
      class="experience-timeline"
    >
      <v-timeline-item
        v-for="item in experiences"
        :key="item.key"
        :dot-color="item.dotColor"
        fill-dot
      >
        <v-card class="experience-card">
          <v-card-title class="experience-card__title">
            <v-icon :icon="item.icon" size="20" />
            <p class="experience-title text-subtitle-2 text-lg-subtitle-1">
              {{ item.title }}
              <span v-if="item.company"> · {{ item.company }}</span>
            </p>
          </v-card-title>
          <v-card-text>
            <p class="experience-meta text-caption text-lg-subtitle-2 mb-2">
              {{ item.period }}
            </p>
            <p class="experience-description text-caption text-lg-subtitle-2">
              {{ item.description }}
            </p>
            <div class="experience-chips d-flex justify-center justify-sm-start">
              <v-chip
                v-for="chip in item.tech"
                :key="chip"
                size="small"
                variant="tonal"
                class="experience-chip"
                :text="chip"
              />
            </div>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>

    <!-- Mobile View -->
    <div v-else class="experience-list--xs">
      <v-card
        v-for="item in experiences"
        :key="item.key"
        class="experience-card experience-card--xs"
      >
        <v-card-title class="experience-card__title">
          <v-icon :icon="item.icon" size="18" />
          <p class="experience-title text-caption">
            {{ item.title }}
            <span v-if="item.company"> · {{ item.company }}</span>
          </p>
        </v-card-title>
        <v-card-text>
          <p class="experience-meta text-caption mb-1">
            {{ item.period }}
          </p>
          <p class="experience-description extra-small-text">
            {{ item.description }}
          </p>
          <div class="experience-chips justify-center">
            <v-chip
              v-for="chip in item.tech"
              :key="chip"
              size="x-small"
              variant="tonal"
              class="experience-chip"
              :text="chip"
            />
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDisplay, useTheme } from "vuetify";

const theme = useTheme();
const isDark = computed(() => theme.global.current.value.dark);
const display = useDisplay();

type ExperienceDoc = {
  id?: string;
  title?: string;
  company?: string;
  period?: string;
  description?: string;
  icon?: string;
  dot_color?: string;
  technologies?: string[];
};

const { data: experiencesData, pending } = await useFetch<ExperienceDoc[]>(
  "/api/experiences",
  {
    default: () => [],
  }
);

const experiences = computed(() =>
  (experiencesData.value ?? []).map((item, index) => ({
    key: item.id ?? `${item.title ?? "experience"}-${index}`,
    title: item.title ?? "",
    company: item.company ?? "",
    period: item.period ?? "",
    description: item.description ?? "",
    icon: item.icon ?? "mdi-briefcase-outline",
    dotColor: item.dot_color ?? "grey-lighten-1",
    tech: item.technologies ?? [],
  }))
);
</script>
