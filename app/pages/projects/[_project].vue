<template>
  <div class="project-detail-page">
    <div v-if="pending" class="project-detail-page__state">
      <v-progress-circular indeterminate color="error" size="64" />
    </div>

    <v-alert v-else-if="error" type="error" variant="tonal" class="ma-6">
      Failed to load project.
    </v-alert>

    <template v-else-if="project">
      <section class="project-hero">
        <v-img
          :src="project.preview_img || ''"
          cover
          class="project-hero__bg"
        >
          <template #placeholder>
            <div class="project-hero__placeholder" />
          </template>
        </v-img>

        <div class="project-hero__shade project-hero__shade--left" />
        <div class="project-hero__shade project-hero__shade--bottom" />

        <div class="project-hero__backbar">
          <v-container class="project-hero__backbar-inner">
            <NuxtLink to="/#projects" class="project-hero__back">
              <span class="project-hero__back-icon">
                <v-icon icon="mdi-arrow-left" size="18" />
              </span>
              <span>Back to projects</span>
            </NuxtLink>
          </v-container>
        </div>

        <div class="project-hero__content">
          <v-container class="project-hero__container">
            <span class="project-hero__badge">Featured Project</span>
            <h1 class="project-hero__title">{{ project.project_name }}</h1>
            <p class="project-hero__lede">
              {{ heroDescription }}
            </p>

            <div v-if="heroTech.length" class="project-hero__tags">
              <span v-for="tech in heroTech" :key="tech" class="project-hero__tag">
                {{ tech }}
              </span>
            </div>

            <div class="project-hero__actions">
              <v-btn
                v-if="project.project_link"
                :href="project.project_link"
                target="_blank"
                rel="noopener noreferrer"
                variant="flat"
                class="hero-btn hero-btn-primary project-hero__btn"
                text="Visit Website"
                prepend-icon="mdi-play"
                :ripple="false"
              />
              <v-btn
                href="#project-details"
                variant="outlined"
                class="hero-btn hero-btn-secondary project-hero__btn"
                text="More Info"
                prepend-icon="mdi-information-outline"
                :ripple="false"
              />
            </div>
          </v-container>
        </div>
      </section>

      <v-container class="project-detail__content">
        <v-row class="project-detail__grid" align="start">
          <v-col cols="12" md="7">
            <div id="project-details" class="project-detail__panel project-detail__panel--about">
              <div class="project-detail__panel-head">
                <div class="project-detail__panel-icon">
                  <v-icon icon="mdi-text-box-outline" size="20" />
                </div>
                <div>
                  <p class="project-detail__label">About this project</p>
                  <p class="project-detail__panel-sub">Overview & implementation</p>
                </div>
              </div>
              <div class="project-detail__panel-body project-detail__body">
                <div
                  v-if="project.project_description_raw_data"
                  v-html="project.project_description_raw_data"
                />
                <div v-else>
                  <p class="project-detail__text">
                    {{ project.project_description }}
                  </p>
                </div>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="5">
            <div class="project-detail__panel project-detail__panel--tech">
              <div class="project-detail__panel-head">
                <div class="project-detail__panel-icon project-detail__panel-icon--tech">
                  <v-icon icon="mdi-code-tags" size="20" />
                </div>
                <div>
                  <p class="project-detail__label">Tech Stack</p>
                  <p class="project-detail__panel-sub">Tools & technologies used</p>
                </div>
              </div>
              <div class="project-detail__panel-body">
                <div v-if="techGroups.length" class="project-detail__tech">
                  <div
                    v-for="group in techGroups"
                    :key="group.category"
                    class="project-tech-group"
                  >
                    <p class="project-tech-title">{{ group.category }}</p>
                    <div class="project-tech-chips">
                      <span
                        v-for="item in group.items"
                        :key="item"
                        class="project-detail__chip"
                      >
                        {{ item }}
                      </span>
                    </div>
                  </div>
                </div>
                <p v-else class="project-detail__empty">No technologies listed.</p>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </div>
</template>

<script lang="ts" setup>
import type {
  Project,
  UsedTechnologyGroup,
  UsedTechnologies,
} from "~/composables/core/interfaces";
import { useDisplay } from "vuetify/lib/composables/display.mjs";
import { useText } from "~/composables/data/useText";

const display = useDisplay();
const { truncateText } = useText();
const route = useRoute();
const projectId = route.params._project as string;

const { data: project, pending, error } = await useFetch<Project>(
  `/api/projects/${projectId}`
);

const techGroups = computed<UsedTechnologyGroup[]>(() => {
  const tech: UsedTechnologies | undefined = project.value?.used_technologies;
  if (!tech) return [];
  if (Array.isArray(tech) && tech.length > 0 && typeof tech[0] === "string") {
    return [{ category: "Technologies", items: tech as string[] }];
  }
  return (tech as UsedTechnologyGroup[]) ?? [];
});

const heroTech = computed(() =>
  techGroups.value.flatMap((group) => group.items).slice(0, 5)
);

const heroDescription = computed(() => {
  const text = project.value?.project_description || "";
  const limit = display.mdAndUp.value ? 220 : 140;
  return truncateText(text, limit);
});

useHead(() => ({
  title: project.value?.project_name || "Project",
  meta: [
    {
      name: "description",
      content: project.value?.project_description || "Project details.",
    },
  ],
}));
</script>
