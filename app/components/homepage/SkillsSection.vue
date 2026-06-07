<template>
  <v-sheet id="skills" class="bg-transparent">
    <v-container>
      <p
        class="text-center text-subtitle-1 text-md-h6 text-lg-h5 text-xl-h4 font-weight-bold mb-5"
        style="letter-spacing: 1px !important"
      >
        Skills
      </p>

      <div class="skills-filter">
        <v-chip-group
          :model-value="selectedCategory"
          class="skills-chips d-flex flex-wrap justify-center justify-sm-end"
          filter
          selected-class="text-primary"
          @update:modelValue="handleCategoryChange"
        >
          <v-chip
            value="all"
            variant="tonal"
            class="skills-chip"
            :size="display.xl.value ? 'default' : 'small'"
            text="All"
          />
          <v-chip
            value="front_end"
            variant="tonal"
            color="blue"
            :size="display.xl.value ? 'default' : 'small'"
            class="skills-chip"
            text="Front End"
          />
          <v-chip
            value="back_end"
            variant="tonal"
            :size="display.xl.value ? 'default' : 'small'"
            color="green"
            class="skills-chip"
            text="Back End"
          />
          <v-chip
            value="library"
            variant="tonal"
            :size="display.xl.value ? 'default' : 'small'"
            color="purple"
            class="skills-chip"
            text="Library"
          />
          <v-chip
            value="tools"
            variant="tonal"
            :size="display.xl.value ? 'default' : 'small'"
            color="orange"
            class="skills-chip"
            text="Tools"
          />
        </v-chip-group>
      </div>

      <ClientOnly>
        <template #default>
          <div v-if="skillsLoading" class="text-center py-8">
            <v-progress-circular indeterminate color="error" size="64" />
          </div>

          <div v-else-if="skillsError" class="text-center py-8">
            <v-alert type="error" variant="tonal">Failed to load skills.</v-alert>
          </div>

          <v-row v-else class="justify-center skills-grid">
            <v-col
              v-for="(skill, index) in filteredSkills"
              :key="skill.id || index"
              cols="4"
              sm="3"
              md="2"
              lg="1"
              class="d-flex justify-center"
            >
              <div
                :title="skillTooltip(skill)"
                :class="['skill-card', `skill-card-${index}`]"
              >
                <div class="skill-icon" :class="getSkillCategoryClass(skill.field)">
                  <img
                    v-if="skill.skill_logo && !failedLogos.has(skill.id || skill.skill_name)"
                    :src="skill.skill_logo"
                    :alt="skill.skill_name"
                    :width="display.lgAndUp ? 52 : 32"
                    :height="display.lgAndUp ? 52 : 32"
                    class="skill-logo"
                    @error="handleImageError(skill)"
                  />
                  <div v-else class="skill-name-icon">
                    {{ skill.skill_name?.charAt(0) || "?" }}
                  </div>
                </div>
                <p
                  class="skill-label text-caption"
                  :class="getSkillCategoryClass(skill.field)"
                >
                  {{ skill.skill_name }}
                </p>
              </div>
            </v-col>
          </v-row>
        </template>
        <template #fallback>
          <div class="text-center py-8">
            <v-progress-circular indeterminate color="error" size="64" />
          </div>
        </template>
      </ClientOnly>
    </v-container>
  </v-sheet>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useDisplay } from "vuetify/lib/composables/display.mjs";
import type { Skill } from "~/composables/core/interfaces";

const display = useDisplay();
const selectedCategory = ref("all");
const failedLogos = ref<Set<string>>(new Set());

const { data: skills, pending: skillsLoading, error: skillsError } = await useFetch<
  Skill[]
>("/api/skills", {
  default: () => [],
});

const normalizeFields = (field: unknown): string[] => {
  if (Array.isArray(field)) {
    return field.flatMap((item) => normalizeFields(item));
  }
  if (typeof field === "string") {
    const trimmed = field.trim();
    return trimmed ? [trimmed] : [];
  }
  return [];
};

const formatSkillField = (field: unknown) => {
  if (typeof field !== "string" || !field) return "";
  return field.replace(/_/g, " ");
};

const getSkillFieldsLabel = (field: unknown) => {
  const labels = normalizeFields(field).map(formatSkillField).filter(Boolean);
  return labels.length ? labels.join(" · ") : "General";
};

const skillTooltip = (skill: Skill) => {
  const fields = getSkillFieldsLabel(skill.field);
  return `${skill.skill_name || "Skill"} — ${fields}`;
};

const filteredSkills = computed(() => {
  if (selectedCategory.value === "all") {
    return skills.value;
  }
  return skills.value.filter((skill) =>
    normalizeFields(skill.field).includes(selectedCategory.value)
  );
});

const handleCategoryChange = (value: string | null) => {
  selectedCategory.value = value || "all";
};

const getSkillCategoryClass = (fields?: Skill["field"] | unknown) => {
  const field = normalizeFields(fields)[0] || "tools";
  return `skill-icon--${field}`;
};

const handleImageError = (skill: Skill) => {
  const key = skill.id || skill.skill_name;
  if (!key || failedLogos.value.has(key)) return;
  failedLogos.value = new Set([...failedLogos.value, key]);
};
</script>
