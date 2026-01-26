<template>
  <v-responsive :height="display.xs.value ? 100 : 150" />
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
          prepend-icon="mdi-arrow-left"
          :ripple="false"
        />

        <div class="project-detail__header">
          <p class="section-title">{{ project.project_name }}</p>
          <div class="project-detail__actions">
            <v-btn
              v-if="project.project_link"
              :href="project.project_link"
              target="_blank"
              variant="flat"
              class="hero-btn hero-btn-primary"
              text="Visit Website"
              append-icon="mdi-open-in-new"
              :ripple="false"
            />
          </div>
        </div>

        <div class="project-detail__media">
          <v-img
            :src="project.preview_img || ''"
            :height="display.mdAndUp.value ? 420 : 260"
            cover
            class="project-detail__image"
          >
            <template #placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular indeterminate color="grey" />
              </div>
            </template>
          </v-img>
        </div>

        <v-row class="project-detail__grid" align="start">
          <v-col cols="12" md="7">
            <div id="project-details" class="project-detail__panel project-detail__body">
              <div
                v-if="project.project_description_raw_data"
                v-html="project.project_description_raw_data"
              />
              <div v-else>
                <p class="text-subtitle-1">
                  {{ project.project_description }}
                </p>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="5">
            <div class="project-detail__panel">
              <p class="project-detail__label">Tech Stack</p>
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
              <p v-else class="project-detail__empty">No technologies listed.</p>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </v-sheet>
</template>

<script lang="ts" setup>
import type {
  Project,
  UsedTechnologyGroup,
  UsedTechnologies,
} from "~/composables/core/interfaces";
import { useDisplay } from "vuetify/lib/composables/display.mjs";

const display = useDisplay();
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

<style scoped>
.project-detail {
  padding-top: 24px;
  padding-bottom: 64px;
  background: radial-gradient(
      80% 120% at 20% 10%,
      rgba(240, 106, 108, 0.12),
      transparent 55%
    ),
    radial-gradient(70% 120% at 80% 0%, rgba(88, 137, 255, 0.12), transparent 55%);
}

.v-theme--light .project-detail {
  background: radial-gradient(
      70% 120% at 20% 10%,
      rgba(255, 196, 198, 0.6),
      transparent 55%
    ),
    radial-gradient(70% 120% at 80% 0%, rgba(186, 210, 255, 0.55), transparent 55%);
}

.project-back {
  text-transform: none;
  font-weight: 600;
  margin-bottom: 12px;
}

.project-detail__grid {
  margin-top: 24px;
}

.project-detail__header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.project-detail__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.project-detail__media {
  max-width: 980px;
  margin: 18px auto 0;
}

.project-detail__image {
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 22px 40px rgba(0, 0, 0, 0.22);
}

.project-detail__label {
  margin: 0 0 6px;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
}

.v-theme--light .project-detail__label {
  color: rgba(31, 41, 55, 0.6);
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
}

.project-detail__panel {
  border-radius: 20px;
  padding: 20px;
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.06), rgba(15, 23, 42, 0.08));
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 18px 36px rgba(0, 0, 0, 0.16);
}

.v-theme--light .project-detail__panel {
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.9), rgba(226, 232, 240, 0.6));
  border-color: rgba(15, 23, 42, 0.12);
  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.08);
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

.v-theme--light .project-tech-chip {
  color: rgba(15, 23, 42, 0.78);
}

.project-detail__empty {
  margin: 0;
  color: rgba(255, 255, 255, 0.6);
}

.v-theme--light .project-detail__empty {
  color: rgba(31, 41, 55, 0.65);
}

.project-detail__body p {
  margin: 0 0 12px;
  line-height: 1.8;
}

.v-theme--light .project-detail__body,
.v-theme--light .project-detail__body p {
  color: rgba(15, 23, 42, 0.78);
}
</style>
