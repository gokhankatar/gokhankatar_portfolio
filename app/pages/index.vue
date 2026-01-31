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
    <SkillsSection />

    <v-responsive :height="display.lgAndUp.value ? 150 : 50" />

    <!-- Projects Section -->
    <ProjectsSection />

    <v-responsive :height="display.lgAndUp.value ? 150 : 50" />

    <!-- Experience Section -->
    <v-sheet id="experience" class="bg-transparent">
      <v-container>
        <ExperienceTimeline />
      </v-container>
    </v-sheet>

    <v-responsive :height="display.lgAndUp.value ? 150 : 50" />

    <!-- Contact Section -->
    <ContactSection />

    <v-responsive :height="display.lgAndUp.value ? 150 : 100" />
  </div>
</template>

<script setup lang="ts">
import { useTheme } from "vuetify";
import { useDisplay } from "vuetify/lib/composables/display.mjs";
import AnimatedTitle from "~/components/common/AnimatedTitle.vue";
import ContactSection from "~/components/homepage/ContactSection.vue";
import ExperienceTimeline from "~/components/homepage/ExperienceTimeline.vue";
import ProjectsSection from "~/components/homepage/ProjectsSection.vue";
import SkillsSection from "~/components/homepage/SkillsSection.vue";
import { aboutHighlights } from "~/utils/contentData";

const theme = useTheme();
const display = useDisplay();
const siteUrl = "https://gokhankatar.dev";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Gokhan Katar",
    url: siteUrl,
    image: `${siteUrl}/img/profile.png`,
    jobTitle: "Full Stack Web Geliştirici",
    sameAs: [
      "https://github.com/gokhankatar",
      "https://www.youtube.com/@npmrungame",
      "https://linkedin.com/in/gokhankatar",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Gokhan Katar Portfolyo",
    url: siteUrl,
    inLanguage: "tr-TR",
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Gokhan Katar | Full Stack Web Geliştirici",
    url: `${siteUrl}/`,
    inLanguage: "tr-TR",
  },
];

useHead({
  title: "Full Stack Web Geliştirici",
  link: [
    {
      rel: "canonical",
      href: `${siteUrl}/`,
    },
  ],
  meta: [
    {
      name: "description",
      content:
        "Gokhan Katar portfolyosu. Nuxt ve Vue ile hızlı, güvenli ve ölçeklenebilir web uygulamaları geliştiriyorum.",
    },
    {
      property: "og:title",
      content: "Gokhan Katar | Full Stack Web Geliştirici",
    },
    {
      property: "og:description",
      content:
        "Nuxt ve Vue ile hızlı, güvenli ve ölçeklenebilir web uygulamaları geliştiren full stack web geliştirici.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: `${siteUrl}/`,
    },
    {
      property: "og:image",
      content: `${siteUrl}/img/profile.png`,
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "Gokhan Katar | Full Stack Web Geliştirici",
    },
    {
      name: "twitter:description",
      content:
        "Nuxt ve Vue ile hızlı, güvenli ve ölçeklenebilir web uygulamaları geliştiren full stack web geliştirici.",
    },
    {
      name: "twitter:image",
      content: `${siteUrl}/img/profile.png`,
    },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify(jsonLd),
    },
  ],
});
</script>

<style scoped>
@import url("~/assets/css/main.css");
</style>
