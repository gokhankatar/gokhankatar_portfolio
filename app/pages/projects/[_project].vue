<template>
  <v-sheet class="project-detail">
    <v-container>
      <div v-if="pending" class="text-center py-12">
        <v-progress-circular indeterminate color="error" size="64" />
      </div>

      <v-alert v-else-if="error" type="error" variant="tonal" class="mt-6">
        Failed to load project.
      </v-alert>

      <div v-else-if="project">
        <v-btn
          to="/#projects"
          variant="text"
          class="project-back"
          text="Back to projects"
          :ripple="false"
        />

        <p class="section-title">{{ project.project_name }}</p>

        <v-row class="project-detail__grid" align="start">
          <v-col cols="12" md="7">
            <v-img
              :src="project.preview_img || ''"
              height="360"
              cover
              class="project-detail__image"
            >
              <template #placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular indeterminate color="grey" />
                </div>
              </template>
            </v-img>
          </v-col>
          <v-col cols="12" md="5">
            <p class="project-detail__lede">
              {{ project.project_description }}
            </p>

            <div v-if="project.project_link" class="d-flex ga-2 mt-4">
              <v-btn
                :href="project.project_link"
                target="_blank"
                variant="flat"
                class="hero-btn hero-btn-primary"
                text="Visit Website"
                :ripple="false"
              />
            </div>

            <div v-if="techGroups.length" class="project-detail__tech">
              <div
                v-for="group in techGroups"
                :key="group.category"
                class="project-tech-group"
              >
                <p class="project-tech-title">{{ group.category }}</p>
                <div class="project-tech-chips">
                  <v-chip
                    v-for="item in group.items"
                    :key="item"
                    size="small"
                    variant="tonal"
                    class="project-tech-chip"
                  >
                    {{ item }}
                  </v-chip>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>

        <div
          v-if="project.project_description_raw_data"
          class="project-detail__body"
          v-html="project.project_description_raw_data"
        />
        <div v-else class="project-detail__body">
          <p class="text-subtitle-1">
            {{ project.project_description }}
          </p>
        </div>
      </div>
    </v-container>
  </v-sheet>
</template>

<script lang="ts" setup>
import type { Project, UsedTechnologyGroup, UsedTechnologies } from "~/composables/core/interfaces";

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
</script>

<style scoped>
@import url("../assets/css/main.css");

.project-detail {
  padding-top: 24px;
  padding-bottom: 64px;
}

.project-back {
  text-transform: none;
  font-weight: 600;
  margin-bottom: 12px;
}

.project-detail__grid {
  margin-top: 12px;
}

.project-detail__image {
  border-radius: 18px;
  overflow: hidden;
}

.project-detail__lede {
  margin: 0;
  font-size: 1rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.82);
}

.v-theme--light .project-detail__lede {
  color: rgba(31, 41, 55, 0.7);
}

.project-detail__tech {
  display: grid;
  gap: 10px;
  margin-top: 18px;
}

.project-tech-group {
  display: grid;
  gap: 6px;
}

.project-tech-title {
  margin: 0;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
}

.v-theme--light .project-tech-title {
  color: rgba(31, 41, 55, 0.6);
}

.project-tech-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.project-tech-chip {
  font-size: 0.75rem;
  letter-spacing: 0.01em;
}

.project-detail__body {
  margin-top: 24px;
}
</style>
