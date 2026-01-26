<template>
  <v-responsive v-if="display.smAndDown.value" :height="900" />
  <v-responsive v-if="display.mdAndUp.value" :height="700" />

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

const footerSpacerHeight = computed(() => {
  if (display.smAndDown.value) return 640;
  if (display.md.value) return 520;
  if (display.lg.value) return 440;
  return 400;
});
</script>

<style scoped>
.app-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, rgba(10, 12, 16, 0.96), rgba(6, 8, 12, 0.99));
  backdrop-filter: blur(12px);
}

.v-theme--light .app-footer {
  border-top: 1px solid rgba(15, 23, 42, 0.08);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.95),
    rgba(242, 244, 248, 0.98)
  );
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 32px;
  padding-bottom: 24px;
}

.footer-row {
  row-gap: 20px;
  column-gap: 24px;
  justify-content: space-between;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-name {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  color: #f06a6c;
}

.v-theme--light .footer-name {
  color: #d34a4c;
}

.footer-subtitle {
  margin: 0;
  color: rgba(255, 255, 255, 0.72);
}

.v-theme--light .footer-subtitle {
  color: rgba(30, 41, 59, 0.78);
}

.footer-meta {
  display: grid;
  gap: 6px;
}

.footer-connect {
  margin-top: 16px;
}

.footer-meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.65);
}

.v-theme--light .footer-meta-item {
  color: rgba(30, 41, 59, 0.7);
}

.footer-meta-link {
  color: inherit;
  text-decoration: none;
}

.footer-meta-link:hover {
  color: #f06a6c;
}

.footer-heading {
  margin: 0 0 12px;
  font-size: 1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
}

.v-theme--light .footer-heading {
  color: rgba(15, 23, 42, 0.85);
}

.quick-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.quick-link-btn {
  justify-content: flex-start;
  min-height: 44px;
  text-transform: none;
  letter-spacing: 0;
  transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
}

.quick-link-text {
  font-size: 0.95rem;
  line-height: 1.3;
}

.quick-link-btn:hover {
  color: #d34a4c;
  border-color: rgba(240, 106, 108, 0.6);
  background: rgba(240, 106, 108, 0.08);
}

.v-theme--light .quick-link-btn {
  border-color: rgba(15, 23, 42, 0.12);
  background: rgba(15, 23, 42, 0.04);
}

.v-theme--light .quick-link-btn:hover {
  border-color: rgba(211, 74, 76, 0.4);
  background: rgba(211, 74, 76, 0.08);
}

.connect-links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.footer-links {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: auto;
}

.footer-links .footer-heading {
  width: 100%;
  text-align: right;
}

.footer-links .quick-links {
  width: 100%;
}

@media (max-width: 960px) {
  .footer-links {
    align-items: flex-start;
    margin-left: 0;
  }

  .footer-links .footer-heading {
    text-align: left;
  }
}

@media (min-width: 960px) {
  .footer-row {
    flex-wrap: nowrap;
  }
}

.connect-btn {
  border-color: rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.75);
  transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.v-theme--light .connect-btn {
  border-color: rgba(15, 23, 42, 0.2);
  color: rgba(15, 23, 42, 0.7);
}

.connect-btn:hover {
  transform: translateY(-1px);
  border-color: #f06a6c;
  color: #f06a6c;
}

.footer-divider {
  margin: 20px 0 16px;
  opacity: 0.5;
}

.footer-bottom {
  display: flex;
  justify-content: center;
}

.footer-copy {
  margin: 0;
  color: rgba(255, 255, 255, 0.6);
}

.v-theme--light .footer-copy {
  color: rgba(15, 23, 42, 0.6);
}
</style>
