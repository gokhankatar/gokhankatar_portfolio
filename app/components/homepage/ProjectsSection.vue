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
          cols="6"
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
        <v-col v-for="project in projects" :key="project.id" cols="6" lg="4" xl="3">
          <v-card
            elevation="0"
            class="project-card h-100"
            :ripple="false"
            :min-height="display.smAndDown.value ? 180 : undefined"
            role="link"
            tabindex="0"
            @click="goToProject(project)"
            @keydown.enter="goToProject(project)"
          >
            <div class="project-card__media">
              <v-img
                :height="display.smAndDown.value ? '100%' : 200"
                :src="project.preview_img || ''"
                cover
                class="project-card__image bg-grey-lighten-3"
              >
                <template #placeholder>
                  <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular indeterminate color="grey" />
                  </div>
                </template>
              </v-img>

              <div v-if="!display.smAndDown.value" class="project-card__overlay">
                <span class="project-card__btn project-card__btn--primary">
                  <v-icon icon="mdi-eye-outline" size="18" />
                  View Detail
                </span>
                <button
                  v-if="project.project_link"
                  type="button"
                  class="project-card__btn project-card__btn--ghost"
                  @click.stop="openExternalLink(project.project_link)"
                >
                  Live Site
                  <v-icon icon="mdi-open-in-new" size="16" />
                </button>
              </div>
            </div>

            <div v-if="!display.smAndDown.value" class="project-card__body">
              <h3 class="project-card__title">{{ project.project_name }}</h3>
              <p class="project-card__desc">
                {{ truncateText(project.project_description, display.xs.value ? 60 : 90) }}
              </p>

              <div class="project-card__footer">
                <div
                  v-if="getProjectTechnologies(project).length"
                  class="project-card__tags"
                >
                  <span
                    v-for="tech in getProjectTechnologies(project).slice(0, 3)"
                    :key="tech"
                    class="project-card__tag"
                  >
                    {{ tech }}
                  </span>
                  <span
                    v-if="getProjectTechnologies(project).length > 3"
                    class="project-card__tag project-card__tag--more"
                  >
                    +{{ getProjectTechnologies(project).length - 3 }}
                  </span>
                </div>

                <span class="project-card__link">
                  Details
                  <v-icon icon="mdi-arrow-right" size="16" />
                </span>
              </div>
            </div>
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
const router = useRouter();
const { truncateText } = useText();
const { getProjectSlug, getProjectTechnologies } = useProjectUtils();

const { data: projects, pending: projectsLoading, error: projectsError } = await useFetch<
  Project[]
>("/api/projects", {
  default: () => [],
});

const getProjectPath = (project: Project) => `/projects/${getProjectSlug(project)}`;

const goToProject = (project: Project) => {
  router.push(getProjectPath(project));
};

const openExternalLink = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};
</script>
