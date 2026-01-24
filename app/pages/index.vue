<template>
  <div>
    <!-- Hero Section -->
    <v-sheet
      id="home"
      class="hero-section"
      :class="{ 'hero-section--dark': theme.current.value.dark }"
      :style="{ minHeight: 'calc(100vh - 64px)' }"
    >
      <v-container class="hero-container">
        <div class="hero-content">
          <div class="profile-placeholder">
            <v-avatar :size="display.lgAndUp.value ? 220 : 140" class="profile-avatar">
              <v-img src="/img/profile.png" alt="Gokhan Katar" cover></v-img>
            </v-avatar>
          </div>
          <div class="text-subtitle-1 text-xl-h6 mb-2" style="opacity: 0.9">
            Hello, I'm
          </div>
          <AnimatedTitle
            text="Gokhan Katar"
            variant="glow"
            class="hero-name text-h5 text-md-h4 text-lg-h3 text-xl-h2 text-md-h1 font-weight-bold mb-4"
          />
          <div
            class="text-subbtitle-2 text-sm-subtitle-1 text-lg-h4 text-xl-h3 font-weight-bold mb-4"
          >
            Web Developer
          </div>
          <p
            class="text-caption text-sm-subtitle-2 text-lg-subtitle-1 text-xl-h6 mb-6"
            style="opacity: 0.9"
          >
            I design and develop robust, high-performance web applications by taking full
            ownership of both frontend and backend layers. I focus on crafting intuitive,
            user-centric interfaces while building scalable, secure, and maintainable
            backend architectures. By leveraging modern web technologies, clean code
            principles, and performance-driven design, I deliver reliable,
            production-ready systems that scale with real-world usage.
          </p>
          <div class="d-flex flex-wrap ga-4 justify-center">
            <v-btn
              href="#projects"
              size="large"
              variant="flat"
              class="hero-btn hero-btn-primary"
              text="View My Projects"
            />

            <v-btn
              href="#contact"
              size="large"
              variant="outlined"
              class="hero-btn hero-btn-secondary"
              text="Get In Touch"
            />
          </div>
        </div>
      </v-container>
    </v-sheet>

    <!-- About Section -->
    <v-sheet id="about" class="bg-transparent">
      <v-container>
        <p
          class="text-h5 text-sm-h4 text-lg-h3 text-xl-h2 font-weight-bold text-center my-5"
        >
          About Me
        </p>
        <v-row justify="center">
          <v-col cols="12" md="8">
            <p
              class="text-center text-caption text-sm-subtitle-2 text-lg-subtitle-1 text-xl-h6 mb-4"
            >
              Hello! I'm Gokhan Katar, a passionate web developer. I develop user-focused,
              high-performance, and scalable web applications using modern web
              technologies.
            </p>
            <p
              class="text-center text-caption text-sm-subtitle-2 text-lg-subtitle-1 text-xl-h6 mb-4"
            >
              Experienced in both frontend and backend technologies, I'm always open to
              learning and exploring new technologies. I strive to write clean and
              maintainable code by applying best practices in every project.
            </p>

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
                    style="letter-spacing: 1px !"
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
          class="text-h5 text-sm-h4 text-lg-h3 text-xl-h2 font-weight-bold text-center my-5"
        >
          Skills
        </p>

        <div class="d-flex flex-wrap justify-center justify-sm-end ga-2 w-100 mb-3">
          <v-chip-group
            v-model="selectedCategory"
            class="skills-chips d-flex flex-wrap"
            filter
            selected-class="text-primary"
          >
            <v-chip value="all" variant="tonal" class="skills-chip"> All </v-chip>
            <v-chip value="front_end" variant="tonal" color="blue" class="skills-chip">
              Front End
            </v-chip>
            <v-chip value="back_end" variant="tonal" color="green" class="skills-chip">
              Back End
            </v-chip>
            <v-chip value="library" variant="tonal" color="purple" class="skills-chip">
              Library
            </v-chip>
            <v-chip value="tools" variant="tonal" color="orange" class="skills-chip">
              Tools
            </v-chip>
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

            <v-row v-else class="justify-center">
              <v-col
                v-for="(skill, index) in filteredSkills"
                :key="skill.id || index"
                cols="4"
                sm="3"
                md="2"
                lg="1"
                class="d-flex justify-cen"
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
          class="text-h5 text-sm-h4 text-lg-h3 text-xl-h2 font-weight-bold text-center my-5"
        >
          My Projects
        </p>
        <v-row>
          <v-col v-for="project in projects" :key="project.id" cols="12" md="6" lg="4">
            <v-card elevation="4" class="h-100" hover>
              <v-img
                height="200"
                :src="getProjectImage(project.title)"
                cover
                class="bg-grey-lighten-3"
              >
                <template v-slot:placeholder>
                  <div class="d-flex align-center justify-center fill-height">
                    <v-progress-circular indeterminate color="grey"></v-progress-circular>
                  </div>
                </template>
              </v-img>
              <v-card-title class="text-h5 font-weight-bold">{{
                project.title
              }}</v-card-title>
              <v-card-text>
                <p class="text-subtitle-1 mb-4">{{ project.description }}</p>
                <div class="d-flex flex-wrap ga-2 mb-4">
                  <v-chip
                    v-for="tag in project.tags"
                    :key="tag"
                    size="small"
                    variant="outlined"
                  >
                    {{ tag }}
                  </v-chip>
                </div>
                <div class="d-flex ga-2">
                  <v-btn
                    v-if="project.demo"
                    :href="project.demo"
                    target="_blank"
                    color="error"
                    variant="text"
                    size="small"
                  >
                    Live Demo
                  </v-btn>
                  <v-btn
                    v-if="project.github"
                    :href="project.github"
                    target="_blank"
                    color="error"
                    variant="text"
                    size="small"
                  >
                    GitHub
                  </v-btn>
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
        <AnimatedTitle
          text="Contact"
          variant="wave"
          class="text-h3 text-md-h2 text-center font-weight-bold mb-8"
        />
        <v-row>
          <v-col cols="12" md="5">
            <p class="text-h6 mb-6">
              If you'd like to work on a project together or just say hello, feel free to
              reach out!
            </p>
            <div class="d-flex flex-column ga-4">
              <v-btn
                href="mailto:katar_gokhan@hotmail.com"
                variant="text"
                prepend-icon="mdi-email"
                class="justify-start"
              >
                katar_gokhan@hotmail.com
              </v-btn>
              <v-btn
                href="https://www.youtube.com/@npmrungame"
                target="_blank"
                variant="text"
                prepend-icon="mdi-youtube"
                class="justify-start"
              >
                npmrungame
              </v-btn>
              <v-btn
                href="https://linkedin.com/in/gokhankatar"
                target="_blank"
                variant="text"
                prepend-icon="mdi-linkedin"
                class="justify-start"
              >
                LinkedIn
              </v-btn>
              <v-btn
                href="https://github.com/gokhankatar"
                target="_blank"
                variant="text"
                prepend-icon="mdi-github"
                class="justify-start"
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

const display = useDisplay();

const form = ref({
  name: "",
  email: "",
  message: "",
});

const theme = useTheme();
const selectedCategory = ref("all");

interface Skill {
  id?: string;
  skill_name: string;
  field: string[];
  skill_logo: string;
  order: number;
}

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

const formatField = (field?: string) => {
  return field ? field.replace(/_/g, " ") : "";
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

const projects = ref([
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Modern e-commerce solution with payment integration",
    tags: ["Vue.js", "Firebase", "Stripe"],
    demo: "#",
    github: "#",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative task management with real-time updates",
    tags: ["Nuxt.js", "Supabase", "TypeScript"],
    demo: "#",
    github: "#",
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "Personal portfolio website with modern design",
    tags: ["Nuxt.js", "Vue.js", "CSS3"],
    demo: "#",
    github: "#",
  },
]);

const getProjectImage = (title: string) => {
  const svg = `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="300" fill="#f0f0f0"/>
    <text x="200" y="150" text-anchor="middle" fill="#999" font-size="24">${title}</text>
  </svg>`;
  return `data:image/svg+xml;base64,${
    typeof window !== "undefined" ? window.btoa(svg) : ""
  }`;
};

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
