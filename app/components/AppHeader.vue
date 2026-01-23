<template>
  <v-app-bar
    :elevation="isScrolled ? 4 : 2"
    fixed
    :color="$vuetify.theme.current.dark ? 'grey-darken-4' : 'white'"
    :style="$vuetify.theme.current.dark 
      ? 'backdrop-filter: blur(10px); background: rgba(18, 18, 18, 0.95) !important;' 
      : 'backdrop-filter: blur(10px); background: rgba(255, 255, 255, 0.95) !important;'"
  >
    <v-container>
      <v-row align="center" justify="space-between" no-gutters>
        <v-col cols="auto">
          <NuxtLink to="/" class="text-decoration-none">
            <span class="text-h5 font-weight-bold" style="color: #D34A4C">GK</span>
          </NuxtLink>
        </v-col>
        
        <v-col cols="auto" class="d-none d-md-flex">
          <v-btn
            v-for="item in navItems"
            :key="item.href"
            :href="item.href"
            variant="text"
            class="text-none"
            color="grey-darken-1"
          >
            {{ item.label }}
          </v-btn>
        </v-col>

        <v-col cols="auto" class="d-flex align-center ga-2">
          <v-btn
            icon
            variant="text"
            @click="toggleTheme"
            :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
          >
            <v-icon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
          </v-btn>
          <v-btn
            icon
            variant="text"
            @click="drawer = !drawer"
            class="d-md-none"
          >
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-navigation-drawer
      v-model="drawer"
      temporary
      location="right"
    >
      <v-list>
        <v-list-item
          v-for="item in navItems"
          :key="item.href"
          :href="item.href"
          @click="drawer = false"
        >
          <v-list-item-title>{{ item.label }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAppTheme } from '~/composables/useTheme'

const { toggleTheme, isDark } = useAppTheme()
const isScrolled = ref(false)
const drawer = ref(false)

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' }
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.v-app-bar {
  transition: all 0.3s ease;
}
</style>
