<template>
  <div class="init-container">
    <AppHeader />

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
            <v-avatar size="220" class="profile-avatar">
              <v-img src="/img/profile.png" alt="Gokhan Katar" cover></v-img>
            </v-avatar>
          </div>
          <div class="text-subtitle-1 text-xl-h6 mb-2" style="opacity: 0.9">
            Hello, I'm
          </div>
          <AnimatedTitle
            text="Gokhan Katar"
            variant="glow"
            class="text-h5 text-md-h4 text-lg-h3 text-xl-h2 text-md-h1 font-weight-bold mb-4"
            style="color: #ffd700"
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
            >
              View My Projects
            </v-btn>
            <v-btn
              href="#contact"
              size="large"
              variant="outlined"
              class="hero-btn hero-btn-secondary"
            >
              Get In Touch
            </v-btn>
          </div>
        </div>
      </v-container>
    </v-sheet>

    <!-- About Section -->
    <v-sheet id="about" class="bg-transparent py-16">
      <v-container>
        <AnimatedTitle
          text="About Me"
          variant="fadeUp"
          class="text-h3 text-md-h2 text-center font-weight-bold mb-8"
        />
        <v-row justify="center">
          <v-col cols="12" md="8">
            <div class="text-h6 mb-4">
              Hello! I'm Gokhan Katar, a passionate web developer. I develop user-focused,
              high-performance, and scalable web applications using modern web
              technologies.
            </div>
            <div class="text-h6 mb-8">
              Experienced in both frontend and backend technologies, I'm always open to
              learning and exploring new technologies. I strive to write clean and
              maintainable code by applying best practices in every project.
            </div>
            <v-row class="mt-8">
              <v-col cols="12" sm="4" class="text-center">
                <div class="text-h2 font-weight-bold" style="color: #d34a4c">50+</div>
                <div class="text-subtitle-1">Projects</div>
              </v-col>
              <v-col cols="12" sm="4" class="text-center">
                <div class="text-h2 font-weight-bold" style="color: #d34a4c">5+</div>
                <div class="text-subtitle-1">Years Experience</div>
              </v-col>
              <v-col cols="12" sm="4" class="text-center">
                <div class="text-h2 font-weight-bold" style="color: #d34a4c">30+</div>
                <div class="text-subtitle-1">Clients</div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <!-- Skills Section -->
    <v-sheet id="skills" class="py-16 bg-transparent">
      <v-container>
        <div class="skills-header">
          <AnimatedTitle
            text="Skills"
            variant="wave"
            class="text-h3 text-md-h2 text-center font-weight-bold"
          />
          <v-chip-group
            v-model="selectedCategory"
            class="skills-chips"
            filter
            selected-class="text-primary"
          >
            <v-chip value="all" variant="tonal">All</v-chip>
            <v-chip value="front_end" variant="tonal" color="blue">Front End</v-chip>
            <v-chip value="back_end" variant="tonal" color="green">Back End</v-chip>
            <v-chip value="library" variant="tonal" color="purple">Library</v-chip>
            <v-chip value="tools" variant="tonal" color="orange">Tools</v-chip>
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
                    <div
                      v-bind="props"
                      :class="['skill-card', `skill-card-${index}`]"
                      @mouseenter="onSkillHover(index)"
                    >
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

    <!-- Projects Section -->
    <v-sheet id="projects" class="py-16 bg-transparent">
      <v-container>
        <AnimatedTitle
          text="My Projects"
          variant="fadeUp"
          class="text-h3 text-md-h2 text-center font-weight-bold mb-8"
        />
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

    <!-- Contact Section -->
    <v-sheet id="contact" class="py-16 bg-transparent">
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

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useTheme } from "vuetify";
import { useSkills } from "~/composables/useSkills";

const display = useDisplay();

const form = ref({
  name: "",
  email: "",
  message: "",
});

const theme = useTheme();
const selectedCategory = ref("all");

const { skills, loading: skillsLoading, error: skillsError } = useSkills();

const filteredSkills = computed(() => {
  if (selectedCategory.value === "all") {
    return skills.value;
  }
  return skills.value.filter((skill) =>
    (skill.field || []).includes(selectedCategory.value)
  );
});

const onSkillHover = (index: number) => {
  // Animation will be handled by CSS
};

const fieldColor = (field?: string) => {
  const map: Record<string, string> = {
    front_end: "blue",
    back_end: "green",
    library: "purple",
    tools: "orange",
  };
  return field ? map[field] || "grey" : "grey";
};

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
