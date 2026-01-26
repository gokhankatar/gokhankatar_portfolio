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
        <v-row v-if="projectsLoading" justify="center" align="center" :dense="display.smAndDown.value">
          <v-col
            v-for="n in 4"
            :key="`project-skeleton-${n}`"
            cols="12"
            sm="6"
            lg="4"
            xl="3"
          >
            <v-skeleton-loader
              type="card"
              class="project-card h-auto"
            />
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
    <v-sheet id="contact" class="bg-transparent">
      <v-container>
        <p
          class="text-center text-subtitle-1 text-md-h6 text-lg-h5 text-xl-h4 font-weight-bold mb-5"
          style="letter-spacing: 1px !important"
        >
          Contact Me
        </p>
        <v-row>
          <v-col cols="12" md="5">
            <p class="text-subtitle-1 mb-6">
              If you'd like to work on a project together or just say hello, feel free to
              reach out!
            </p>
            <div class="d-flex flex-column ga-4">
              <v-btn
                href="mailto:katar_gokhan@hotmail.com"
                variant="text"
                prepend-icon="mdi-email"
                class="justify-start"
                :ripple="false"
              >
                katar_gokhan@hotmail.com
              </v-btn>
              <v-btn
                href="https://www.youtube.com/@npmrungame"
                target="_blank"
                variant="text"
                prepend-icon="mdi-youtube"
                class="justify-start"
                :ripple="false"
              >
                npmrungame
              </v-btn>
              <v-btn
                href="https://linkedin.com/in/gokhankatar"
                target="_blank"
                variant="text"
                prepend-icon="mdi-linkedin"
                class="justify-start"
                :ripple="false"
              >
                LinkedIn
              </v-btn>
              <v-btn
                href="https://github.com/gokhankatar"
                target="_blank"
                variant="text"
                prepend-icon="mdi-github"
                class="justify-start"
                :ripple="false"
              >
                GitHub
              </v-btn>
            </div>
          </v-col>
          <v-col cols="12" md="7">
            <div class="contact-form">
              <v-form @submit.prevent="handleSubmit">
                <v-text-field
                  v-model="form.name"
                  label="Your Name"
                  required
                  variant="outlined"
                  class="mb-4"
                ></v-text-field>
                <v-text-field
                  v-model="form.email"
                  label="Email"
                  type="email"
                  required
                  variant="outlined"
                  class="mb-4"
                ></v-text-field>
                <v-textarea
                  v-model="form.message"
                  label="Your Message"
                  required
                  variant="outlined"
                  rows="5"
                  class="mb-4"
                ></v-textarea>
                <v-btn
                  type="submit"
                  color="error"
                  size="large"
                  variant="flat"
                  class="text-none"
                  :ripple="false"
                >
                  Send
                </v-btn>
              </v-form>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <v-responsive :height="display.lgAndUp.value ? 150 : 50" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useTheme } from "vuetify";
import type {
  Project,
  Skill,
  UsedTechnologies,
  UsedTechnologyGroup,
} from "~/composables/core/interfaces";

const display = useDisplay();

const form = ref({
  name: "",
  email: "",
  message: "",
});

const theme = useTheme();
const selectedCategory = ref("all");

const { data: skills, pending: skillsLoading, error: skillsError } = await useFetch<
  Skill[]
>("/api/skills", {
  default: () => [],
});

const { data: projects, pending: projectsLoading, error: projectsError } =
  await useFetch<Project[]>("/api/projects", {
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

const aboutHighlights = [
  {
    title: "Clean Code Projects",
    description:
      "Readable, maintainable codebases built with modern best practices and solid architecture.",
    icon: "mdi-code-braces",
    tone: "tone-red",
  },
  {
    title: "Modern Tech Stack",
    description:
      "Nuxt, Vue, TypeScript, and cloud-first tooling to keep your product future-ready.",
    icon: "mdi-rocket-launch",
    tone: "tone-blue",
  },
  {
    title: "Secure and Fast",
    description: "Performance-first delivery with security-minded patterns from day one.",
    icon: "mdi-shield-check",
    tone: "tone-green",
  },
  {
    title: "Custom Software Services",
    description:
      "Tailored solutions aligned with your goals, workflows, and unique business needs.",
    icon: "mdi-account-cog",
    tone: "tone-purple",
  },
  {
    title: "Scalable Architecture",
    description:
      "Built to grow with traffic, features, and teams without costly rewrites.",
    icon: "mdi-chart-line",
    tone: "tone-orange",
  },
  {
    title: "Reliable Partnership",
    description: "Clear communication, thoughtful planning, and dependable delivery.",
    icon: "mdi-handshake",
    tone: "tone-teal",
  },
];

const handleSubmit = async () => {
  // Form submission logic will be implemented
  console.log("Form submitted:", form.value);
  alert("Your message has been sent!");
  form.value = { name: "", email: "", message: "" };
};

useHead({
  title: "Home",
});
</script>

<style scoped>
@import url("../assets/css/main.css");
</style>
