<template>
  <div>
    <!-- Hero Section -->
    <v-sheet
      id="home"
      class="hero-section"
      :class="{ 'hero-section--dark': theme.current.value.dark }"
    >
      <v-container class="hero-container">
        <div class="hero-content">
          <div class="profile-placeholder">
            <v-avatar :size="display.xl.value ? 220 : 140" class="profile-avatar">
              <v-img src="/img/profile.png" alt="Gokhan Katar" cover></v-img>
            </v-avatar>
          </div>
          <p class="hero-kicker">Hello, I'm</p>
          <AnimatedTitle
            text="Gokhan Katar"
            variant="glow"
            class="hero-name hero-title text-subtitle-1 text-md-h5 text-lg-h4 text-xl-h3"
          />
          <p class="hero-role">Full-Stack Web Developer</p>
          <div class="hero-badges">
            <span class="hero-badge">Nuxt & Vue</span>
            <span class="hero-badge">Firebase & Supabase</span>
            <span class="hero-badge">UX-focused Delivery</span>
          </div>
          <p class="hero-summary text-caption text-sm-subtitle-2 text-lg-subtitle-1">
            {{
              display.xs.value
                ? "End-to-end web development focused on performance, scalability, and clean architecture with user-centered design."
                : "I design and build high-performance web applications with end-to-end ownership across frontend and backend. I create intuitive, user-focused interfaces and scalable, secure backend systems using modern technologies, clean code principles, and performance-driven design to deliver reliable, production-ready solutions."
            }}
          </p>
          <div class="hero-actions">
            <v-btn
              href="#projects"
              :size="display.xl.value ? 'large' : 'default'"
              variant="flat"
              class="hero-btn hero-btn-primary"
              text="View My Projects"
              :ripple="false"
            />

            <v-btn
              href="#contact"
              :size="display.xl.value ? 'large' : 'default'"
              variant="outlined"
              class="hero-btn hero-btn-secondary"
              text="Get In Touch"
              :ripple="false"
            />
          </div>
        </div>
      </v-container>
    </v-sheet>

    <!-- About Section -->
    <v-sheet id="about" class="bg-transparent">
      <v-container>
        <p
          class="text-center text-subtitle-1 text-md-h6 text-lg-h5 text-xl-h4 font-weight-bold mb-5"
          style="letter-spacing: 1px !important"
        >
          About Me
        </p>
        <v-row justify="center">
          <v-col cols="12" md="9">
            <p class="section-subtitle">
              I build modern web products with a focus on clarity, performance, and
              maintainable architecture.
            </p>

            <div class="about-intro">
              <p class="about-lede text-center">
                I work across the full stack—from UI design and frontend engineering to
                backend systems and deployment. My goal is to ship fast, clean, and
                reliable experiences that scale with real usage.
              </p>
              <div class="about-points">
                <div class="about-point">
                  <v-icon icon="mdi-check-circle-outline" size="18" />
                  <span>Clear UX, strong visual hierarchy, and intentional details.</span>
                </div>
                <div class="about-point">
                  <v-icon icon="mdi-check-circle-outline" size="18" />
                  <span>Secure, scalable APIs and data workflows.</span>
                </div>
                <div class="about-point">
                  <v-icon icon="mdi-check-circle-outline" size="18" />
                  <span
                    >Clean code, reusable components, and long-term maintainability.</span
                  >
                </div>
              </div>
            </div>

            <div class="about-tags">
              <span class="about-tag">Clean Architecture</span>
              <span class="about-tag">Performance First</span>
              <span class="about-tag">Responsive UI</span>
              <span class="about-tag">Reliable Delivery</span>
            </div>

            <v-row class="mt-8" dense>
              <v-col
                v-for="item in aboutHighlights"
                :key="item.title"
                cols="12"
                sm="6"
                md="4"
              >
                <v-card
                  class="about-feature-card d-flex flex-column align-start"
                  elevation="2"
                  variant="tonal"
                >
                  <div class="about-feature-icon" :class="item.tone">
                    <v-icon :icon="item.icon" :size="display.smAndDown.value ? 16 : 20" />
                  </div>

                  <p
                    class="text-subtitle-2 text-lg-subtitle-1 font-weight-bold mb-0 mt-2"
                  >
                    {{ item.title }}
                  </p>

                  <p class="text-caption text-lg-subtitle-2 mb-0">
                    {{ item.description }}
                  </p>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <v-responsive :height="display.lgAndUp.value ? 150 : 50" />

    <!-- Skills Section -->
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
            v-model="selectedCategory"
            class="skills-chips d-flex flex-wrap justify-center justify-sm-end"
            filter
            selected-class="text-primary"
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
              <v-progress-circular
                indeterminate
                color="error"
                size="64"
              ></v-progress-circular>
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
              <v-progress-circular
                indeterminate
                color="error"
                size="64"
              ></v-progress-circular>
            </div>
          </template>
        </ClientOnly>
      </v-container>
    </v-sheet>

    <v-responsive :height="display.lgAndUp.value ? 150 : 50" />

    <!-- Projects Section -->
    <v-sheet id="projects" class="bg-transparent">
      <v-container>
        <p
          class="text-center text-subtitle-1 text-md-h6 text-lg-h5 text-xl-h4 font-weight-bold mb-5"
          style="letter-spacing: 1px !important"
        >
          My Projects
        </p>
        <v-row
          v-if="projectsLoading"
          justify="center"
          align="center"
          :dense="display.smAndDown.value"
        >
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

        <v-row v-else justify="center" align="center" :dense="display.smAndDown.value">
          <v-col
            v-for="project in projects"
            :key="project.id"
            cols="12"
            sm="6"
            lg="4"
            xl="3"
          >
            <v-card elevation="4" class="project-card h-auto" hover>
              <v-img
                height="60%"
                :src="project.preview_img || ''"
                cover
                class="project-image bg-grey-lighten-3"
              >
                <template v-slot:placeholder>
                  <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular indeterminate color="grey"></v-progress-circular>
                  </div>
                </template>
              </v-img>

              <v-card-title
                class="text-caption text-lg-subtitle-2 text-xl-h6 font-weight-bold"
              >
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
                <div class="d-flex ga-2">
                  <v-btn
                    v-if="project.project_link"
                    :href="project.project_link"
                    target="_blank"
                    color="error"
                    variant="text"
                    :size="display.xl.value ? 'small' : 'x-small'"
                    :ripple="false"
                    append-icon="mdi-open-in-new"
                    class="project-link-btn"
                    text="View Project"
                  />
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <v-responsive :height="display.lgAndUp.value ? 150 : 50" />

    <!-- Contact Section -->
    <v-sheet id="contact" class="bg-transparent contact-section">
      <v-container>
        <p class="section-title">Contact Me</p>
        <p class="section-subtitle contact-subtitle">
          If you'd like to work on a project together or just say hello, feel free to
          reach out!
        </p>

        <v-row class="contact-grid" align="stretch" :dense="display.smAndDown.value">
          <v-col cols="12" lg="5">
            <div class="contact-info-grid">
              <v-card
                v-for="item in contactCards"
                :key="item.label"
                class="contact-card d-flex flex-column align-start"
                variant="tonal"
                :ripple="false"
                :href="item.href"
                :target="item.target"
              >
                <v-icon :icon="item.icon" :size="display.xl.value ? 46 : 22" />
                <div>
                  <p class="contact-card-title text-subtitle-2 text-xl-subtitle-1">
                    {{ item.label }}
                  </p>
                  <p
                    class="contact-card-value text-caption text-lg-subtitle-2 text-xl-subtitle-1"
                  >
                    {{ item.value }}
                  </p>
                </div>
              </v-card>
            </div>
          </v-col>

          <v-col cols="12" lg="7">
            <div class="contact-form-card">
              <div class="contact-form-header d-flex justify-space-between align-center">
                <div>
                  <p class="contact-card-title">Send a message</p>
                  <p class="contact-card-value">I usually respond within 24 hours.</p>
                </div>
                <v-icon icon="mdi-send" size="22" />
              </div>
              <v-form @submit.prevent="handleSubmit" ref="contactFormRef">
                <v-text-field
                  v-model="form.name"
                  label="Your Name"
                  required
                  prepend-inner-icon="mdi-account"
                  variant="outlined"
                  hide-details="auto"
                  :density="display.xl.value ? 'default' : 'compact'"
                  :rules="rules.name"
                />
                <v-text-field
                  v-model="form.email"
                  label="Email"
                  type="email"
                  prepend-inner-icon="mdi-email"
                  required
                  class="my-2 my-xl-4"
                  variant="outlined"
                  hide-details="auto"
                  :density="display.xl.value ? 'default' : 'compact'"
                  :rules="rules.email"
                />
                <v-textarea
                  v-model="form.message"
                  label="Your Message"
                  required
                  variant="outlined"
                  rows="5"
                  prepend-inner-icon="mdi-message"
                  hide-details="auto"
                  counter
                  max-length="300"
                  placeholder="I want to build a website for my business"
                  no-resize
                  :density="display.xl.value ? 'default' : 'compact'"
                  :rules="rules.message"
                />

                <v-btn
                  type="submit"
                  color="error"
                  :size="display.xl.value ? 'default' : 'small'"
                  variant="flat"
                  :block="display.smAndDown.value"
                  class="text-none"
                  :ripple="false"
                  text="Send"
                  prepend-icon="mdi-check"
                />
              </v-form>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <v-responsive :height="display.lgAndUp.value ? 150 : 100" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useTheme } from "vuetify";
import type { VForm } from "vuetify/components";
import { useDisplay } from "vuetify/lib/composables/display.mjs";
import type {
  Project,
  Skill,
  UsedTechnologies,
  UsedTechnologyGroup,
} from "~/composables/core/interfaces";
import { aboutHighlights, contactCards } from "~/utils/contentData";

const display = useDisplay();

const form = ref({
  name: "",
  email: "",
  message: "",
});

const theme = useTheme();
const selectedCategory = ref("all");
const contactFormRef = ref<InstanceType<typeof VForm> | null>(null);

const { data: skills, pending: skillsLoading, error: skillsError } = await useFetch<
  Skill[]
>("/api/skills", {
  default: () => [],
});

const { data: projects, pending: projectsLoading, error: projectsError } = await useFetch<
  Project[]
>("/api/projects", {
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

const formatField = (field?: string) => {
  return field ? field.replace(/_/g, " ") : "";
};

const truncateText = (text: string, maxLength: number) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
};

const rules = {
  name: [
    (v: string) => !!v || "Name is required",
    (v: string) => (v && v.length >= 2) || "Name must be at least 2 characters",
  ],
  email: [
    (v: string) => !!v || "Email is required",
    (v: string) =>
      (v && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) || "Enter a valid email address",
  ],
  message: [
    (v: string) => !!v || "Message is required",
    (v: string) => (v && v.length >= 10) || "Message must be at least 10 characters",
  ],
};

const getProjectSlug = (project: Project) => {
  if (project.id) return project.id;
  return project.project_name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

const getProjectTechnologies = (project: Project) => {
  const tech: UsedTechnologies | undefined = project.used_technologies;
  if (!tech) return [];
  if (Array.isArray(tech) && tech.length > 0) {
    if (typeof tech[0] === "string") {
      return tech as string[];
    }
    return (tech as UsedTechnologyGroup[]).flatMap((group) => group.items);
  }
  return [];
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

const getSkillCategoryClass = (fields?: string[]) => {
  const field = fields?.[0] || "tools";
  return `skill-icon--${field}`;
};

const handleSubmit = async () => {
  const result = await contactFormRef.value?.validate();
  if (!result?.valid) return;

  try {
  } catch (error: any) {
    console.error("Error sending message:", error);
  }
};

useHead({
  title: "Home",
});
</script>

<style scoped>
@import url("../assets/css/main.css");
</style>
