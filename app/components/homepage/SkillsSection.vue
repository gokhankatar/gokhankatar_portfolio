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
            <v-alert type="error" variant="tonal">{{ skillsError }}</v-alert>
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
              <v-tooltip location="top">
                <template #activator="{ props }">
                  <div v-bind="props" :class="['skill-card', `skill-card-${index}`]">
                    <div class="skill-icon" :class="getSkillCategoryClass(skill.field)">
                      <img
                        v-if="skill.skill_logo"
                        :src="skill.skill_logo"
                        :alt="skill.skill_name"
                        :width="display.lgAndUp ? 52 : 32"
                        :height="display.lgAndUp ? 52 : 32"
                        class="skill-logo"
                        @error="handleImageError"
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
                </template>
                <div class="text-subtitle-2">
                  <div class="font-weight-medium">{{ skill.skill_name }}</div>
                  <div class="text-caption">
                    {{ (skill.field || []).map(formatField).join(" · ") }}
                  </div>
                </div>
              </v-tooltip>
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
import { useText } from "~/composables/data/useText";

const display = useDisplay();
const selectedCategory = ref("all");
const { formatField } = useText();

const { data: skills, pending: skillsLoading, error: skillsError } = await useFetch<
  Skill[]
>("/api/skills", {
  default: () => [],
});

const filteredSkills = computed(() => {
  if (selectedCategory.value === "all") {
    return skills.value;
  }
  return skills.value.filter((skill) =>
    (skill.field || []).includes(selectedCategory.value)
  );
});

const handleCategoryChange = (value: string | null) => {
  selectedCategory.value = value || "all";
};

const getSkillCategoryClass = (fields?: string[]) => {
  const field = fields?.[0] || "tools";
  return `skill-icon--${field}`;
};

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.style.display = "none";
  const parent = img.parentElement;
  if (parent) {
    const fallback = document.createElement("div");
    fallback.className = "skill-name-icon";
    fallback.textContent = "?";
    parent.appendChild(fallback);
  }
};
</script>
