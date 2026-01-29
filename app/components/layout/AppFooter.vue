<template>
  <v-responsive v-if="display.xs.value" :height="900" />
  <v-responsive v-if="display.sm.value" :height="700" />
  <v-responsive v-if="display.mdAndUp.value" :height="500" />

  <v-footer class="app-footer">
    <v-container class="footer-container" fluid>
      <v-row class="footer-row">
        <v-col cols="12" md="7" lg="6" xl="5" class="footer-brand">
          <p class="footer-name">Gokhan Katar</p>
          <p class="footer-subtitle text-caption text-xl-subtitle-2">
            I design and build scalable, high-performance web applications end-to-end. I
            focus on clean architecture, security, and maintainable codebases that grow
            with real-world usage.
          </p>
          <p class="footer-subtitle text-caption text-xl-subtitle-2 mt-4">
            When I’m not coding, I share development tips and project breakdowns on my
            YouTube channel and experiment with new tools and frameworks.
          </p>
          <div class="footer-meta">
            <div class="footer-meta-item">
              <v-icon icon="mdi-email-outline" size="16" />
              <a
                class="footer-meta-link text-caption"
                href="mailto:katar_gokhan@hotmail.com"
              >
                katar_gokhan@hotmail.com
              </a>
            </div>
            <div class="footer-meta-item">
              <v-icon icon="mdi-youtube" size="16" />
              <a
                class="footer-meta-link text-caption"
                href="https://www.youtube.com/@npmrungame"
                target="_blank"
                rel="noreferrer"
              >
                @npmrungame
              </a>
            </div>
          </div>
          <div class="footer-connect">
            <p class="footer-heading">Connect</p>
            <div class="connect-links">
              <v-btn
                href="https://www.youtube.com/@npmrungame"
                target="_blank"
                icon="mdi-youtube"
                variant="outlined"
                size="small"
                class="connect-btn"
                aria-label="YouTube"
                :ripple="false"
              />
              <v-btn
                href="https://github.com/gokhankatar"
                target="_blank"
                icon="mdi-github"
                variant="outlined"
                size="small"
                class="connect-btn"
                :ripple="false"
                aria-label="GitHub"
              />
              <v-btn
                href="https://linkedin.com/in/gokhankatar"
                target="_blank"
                icon="mdi-linkedin"
                variant="outlined"
                size="small"
                class="connect-btn"
                :ripple="false"
                aria-label="LinkedIn"
              />
              <v-btn
                href="mailto:katar_gokhan@hotmail.com"
                icon="mdi-email"
                variant="outlined"
                size="small"
                class="connect-btn"
                :ripple="false"
                aria-label="Email"
              />
            </div>
          </div>
        </v-col>

        <v-col cols="12" md="5" lg="6" xl="7" class="footer-links">
          <p class="footer-heading text-start">Quick Links</p>
          <div class="quick-links">
            <v-btn
              v-for="link in footerLinks"
              :key="link.href"
              :href="link.href"
              variant="text"
              size="small"
              :prepend-icon="link.icon"
              class="quick-link-btn"
              :ripple="false"
              :text="link.label"
            />
          </div>
        </v-col>
      </v-row>

      <v-divider class="footer-divider"></v-divider>

      <div class="footer-bottom">
        <p class="footer-copy text-caption">
          &copy; {{ currentYear }} Gokhan Katar. All rights reserved.
        </p>
      </div>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify/lib/composables/display.mjs";

const currentYear = new Date().getFullYear();
const display = useDisplay();

const footerLinks = [
  { href: "#home", label: "Home", icon: "mdi-home" },
  { href: "#about", label: "About", icon: "mdi-account" },
  { href: "#skills", label: "Skills", icon: "mdi-star-outline" },
  { href: "#projects", label: "Work", icon: "mdi-briefcase-outline" },
  { href: "#contact", label: "Contact", icon: "mdi-email-outline" },
];
</script>

<style scoped>
@import url("~/assets/css/footer.css");
</style>
