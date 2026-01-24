<template>
  <v-responsive v-if="display.smAndDown.value" :height="700" />
  <v-responsive v-if="display.md.value" :height="600" />
  <v-responsive v-if="display.lgAndUp.value" :height="425" />

  <v-footer
    :color="$vuetify.theme.current.dark ? 'grey-darken-4' : 'grey-darken-4'"
    class="app-footer"
  >
    <v-container class="footer-container" fluid>
      <v-row class="footer-row">
        <v-col cols="12" md="6">
          <p class="text-h5 font-weight-bold mb-4" style="color: #d34a4c">Gokhan Katar</p>
          <p class="text-subtitle-2 text-grey-lighten-1">
            I design and build scalable, high-performance web applications
            end-to-end—covering frontend, backend, and deployment workflows. I focus on
            clean architecture, security, and maintainable codebases that grow with
            real-world usage.
          </p>
          <p class="text-subtitle-2 text-grey-lighten-1 mt-4">
            When I’m not coding, I share development tips and project breakdowns on my
            YouTube channel and experiment with new tools and frameworks.
          </p>
        </v-col>

        <v-col cols="12" md="6">
          <v-row class="footer-side">
            <v-col cols="12" sm="7">
              <p class="text-h6 font-weight-bold mb-4">Quick Links</p>
              <div class="quick-links">
                <v-btn
                  v-for="link in footerLinks"
                  :key="link.href"
                  :href="link.href"
                  variant="text"
                  size="small"
                  class="quick-link-btn"
                  :ripple="false"
                >
                  <v-icon :icon="link.icon" size="14"></v-icon>
                  <span class="quick-link-text">{{ link.label }}</span>
                </v-btn>
              </div>
            </v-col>
            <v-col cols="12" sm="5">
              <p class="text-h6 font-weight-bold mb-4">Connect</p>
              <div class="d-flex ga-2 connect-links">
                <v-btn
                  href="https://www.youtube.com/@npmrungame"
                  target="_blank"
                  icon="mdi-youtube"
                  variant="text"
                  color="grey-lighten-1"
                  size="small"
                  class="connect-btn"
                  aria-label="YouTube"
                  :ripple="false"
                />
                <v-btn
                  href="https://github.com/gokhankatar"
                  target="_blank"
                  icon="mdi-github"
                  variant="text"
                  color="grey-lighten-1"
                  size="small"
                  class="connect-btn"
                  :ripple="false"
                  aria-label="GitHub"
                />
                <v-btn
                  href="https://linkedin.com/in/gokhankatar"
                  target="_blank"
                  icon="mdi-linkedin"
                  variant="text"
                  color="grey-lighten-1"
                  size="small"
                  class="connect-btn"
                  :ripple="false"
                  aria-label="LinkedIn"
                />
                <v-btn
                  href="mailto:katar_gokhan@hotmail.com"
                  icon="mdi-email"
                  variant="text"
                  color="grey-lighten-1"
                  size="small"
                  class="connect-btn"
                  :ripple="false"
                  aria-label="Email"
                />
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-divider class="my-4"></v-divider>

      <div class="text-center text-subtitle-2 text-grey-lighten-1">
        &copy; {{ currentYear }} Gokhan Katar. All rights reserved.
      </div>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
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
.app-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding-left: 24px;
  padding-right: 24px;
}

.footer-row {
  row-gap: 20px;
  column-gap: 12px;
  justify-content: center;
}

.footer-side {
  row-gap: 12px;
}

.quick-links {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px 12px;
}

.quick-link-btn {
  justify-content: flex-start;
  min-height: 28px;
  text-transform: none;
  letter-spacing: 0;
  transition: color 0.2s ease, transform 0.2s ease;
  gap: 6px;
}

.quick-link-text {
  font-size: 12px;
  line-height: 1.2;
}

.quick-link-btn:hover {
  transform: translateY(-1px);
  color: #d34a4c;
}

.connect-links {
  flex-wrap: wrap;
}

.connect-btn {
  transition: transform 0.2s ease, color 0.2s ease;
}

.connect-btn:hover {
  transform: translateY(-2px);
  color: #d34a4c;
}
</style>
