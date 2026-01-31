<template>
  <v-sheet id="projects" class="bg-transparent">
    <v-container>
      <p
        class="text-center text-subtitle-1 text-md-h6 text-lg-h5 text-xl-h4 font-weight-bold mb-5"
        style="letter-spacing: 1px !important"
      >
        My Projects
      </p>
      <v-row v-if="projectsLoading" justify="center" align="center" :dense="display.smAndDown.value">
        <v-col
          v-for="n in 4"
          :key="`project-skeleton-${n}`"
          cols="12"
          sm="6"
          lg="4"
          xl="3"
        >
          <v-skeleton-loader type="card" class="project-card h-auto" />
        </v-col>
      </v-row>

      <div v-else-if="projectsError" class="text-center py-8">
        <v-alert type="error" variant="tonal">Failed to load projects.</v-alert>
      </div>

      <v-row v-else justify="center" align="stretch" :dense="display.smAndDown.value">
        <v-col v-for="project in projects" :key="project.id" cols="12" sm="6" lg="4" xl="3">
          <v-card
            elevation="4"
            class="project-card h-100"
            hover
            :ripple="false"
            :min-height="display.smAndDown.value ? 440 : undefined"
          >
            <v-img
              height="220"
              :src="project.preview_img || ''"
              cover
              class="project-image bg-grey-lighten-3"
            >
              <template #placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular indeterminate color="grey" />
                </div>
              </template>
            </v-img>

            <div class="project-card__overlay d-flex flex-column flex-xl-row">
              <v-btn
                :to="`/projects/${getProjectSlug(project)}`"
                variant="flat"
                class="project-card__btn"
                :ripple="false"
                :size="display.xl.value ? 'large' : 'default'"
                text="View Detail"
                prepend-icon="mdi-eye-outline"
              />
              <v-btn
                v-if="project.project_link"
                :href="project.project_link"
                target="_blank"
                variant="outlined"
                :size="display.xl.value ? 'large' : 'default'"
                class="project-card__btn"
                :ripple="false"
                text="View Project"
                append-icon="mdi-open-in-new"
              />
            </div>

            <v-card-title class="text-caption text-lg-subtitle-2 text-xl-h6 font-weight-bold">
              {{ project.project_name }}
            </v-card-title>

            <v-card-text>
              <p class="text-caption text-xl-subtitle-2 mb-4">
                {{
                  display.xs.value
                    ? truncateText(project.project_description, 60)
                    : truncateText(project.project_description, 100)
                }}
              </p>
              <div
                v-if="getProjectTechnologies(project).length"
                class="project-tech-preview"
              >
                <v-chip
                  v-for="tech in getProjectTechnologies(project).slice(0, 3)"
                  :key="tech"
                  :size="display.xl.value ? 'small' : 'x-small'"
                  variant="tonal"
                  class="project-tech-chip"
                  :text="tech"
                />
                <v-btn
                  v-if="getProjectTechnologies(project).length > 3"
                  :to="`/projects/${getProjectSlug(project)}`"
                  variant="text"
                  size="small"
                  class="project-tech-more"
                  text="More"
                  :ripple="false"
                />
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify/lib/composables/display.mjs";
import type { Project } from "~/composables/core/interfaces";
import { useProjectUtils } from "~/composables/data/useProjectUtils";
import { useText } from "~/composables/data/useText";

const display = useDisplay();
const { truncateText } = useText();
const { getProjectSlug, getProjectTechnologies } = useProjectUtils();

const { data: projects, pending: projectsLoading, error: projectsError } = await useFetch<
  Project[]
>("/api/projects", {
  default: () => [],
});
</script>
