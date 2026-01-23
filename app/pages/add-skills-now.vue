<template>
  <v-container class="py-16">
    <v-card>
      <v-card-title>
        <p class="text-h4">Add Skills - Otomatik</p>
      </v-card-title>
      <v-card-text>
        <div v-if="loading" class="text-center py-8">
          <v-progress-circular indeterminate color="success" size="64"></v-progress-circular>
          <p class="mt-4">Skills ekleniyor...</p>
        </div>

        <div v-else-if="result">
          <v-alert
            :type="result.success ? 'success' : 'error'"
            variant="tonal"
            class="mb-4"
          >
            <div v-if="result.success">
              <p class="text-h6 font-weight-bold">✅ Başarılı!</p>
              <p>{{ result.count }} skill başarıyla eklendi.</p>
              <v-btn
                href="/"
                color="primary"
                class="mt-4"
              >
                Ana Sayfaya Dön
              </v-btn>
            </div>
            <div v-else>
              <p class="text-h6 font-weight-bold">❌ Hata:</p>
              <p>{{ result.error }}</p>
            </div>
          </v-alert>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const loading = ref(true);
const result = ref<any>(null);

const skillsData = [
  {
    skill_name: "JavaScript",
    field: ["front_end", "back_end"],
    skill_logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    order: 1,
  },
  {
    skill_name: "TypeScript",
    field: ["front_end", "back_end"],
    skill_logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    order: 2,
  },
  {
    skill_name: "Vue.js",
    field: ["front_end"],
    skill_logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
    order: 3,
  },
  {
    skill_name: "Nuxt.js",
    field: ["front_end"],
    skill_logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg",
    order: 4,
  },
  {
    skill_name: "Vue Router",
    field: ["front_end"],
    skill_logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/vuedotjs.svg",
    order: 5,
  },
  {
    skill_name: "Pinia",
    field: ["front_end", "tools"],
    skill_logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/pinia.svg",
    order: 6,
  },
  {
    skill_name: "Vuetify",
    field: ["front_end"],
    skill_logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/vuetify.svg",
    order: 7,
  },
  {
    skill_name: "Axios",
    field: ["library"],
    skill_logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/axios.svg",
    order: 8,
  },
  {
    skill_name: "Anime.js",
    field: ["library"],
    skill_logo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/RecaptchaLogo.svg/250px-RecaptchaLogo.svg.png",
    order: 9,
  },
  {
    skill_name: "Three.js",
    field: ["library"],
    skill_logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
    order: 10,
  },
  {
    skill_name: "ExcelJS",
    field: ["library"],
    skill_logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/microsoftexcel.svg",
    order: 11,
  },
  {
    skill_name: "html2canvas",
    field: ["library"],
    skill_logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/html5.svg",
    order: 12,
  },
  {
    skill_name: "jsPDF",
    field: ["library"],
    skill_logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/adobeacrobatreader.svg",
    order: 13,
  },
  {
    skill_name: "Node.js",
    field: ["back_end"],
    skill_logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    order: 14,
  },
  {
    skill_name: "Firebase",
    field: ["back_end"],
    skill_logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    order: 15,
  },
  {
    skill_name: "Supabase",
    field: ["back_end"],
    skill_logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
    order: 16,
  },
  {
    skill_name: "Nodemailer",
    field: ["back_end"],
    skill_logo: "",
    order: 17,
  },
  {
    skill_name: "Nuxt Lodash",
    field: ["tools"],
    skill_logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/lodash.svg",
    order: 18,
  },
  {
    skill_name: "Git",
    field: ["tools"],
    skill_logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/git.svg",
    order: 19,
  },
  {
    skill_name: "GitHub",
    field: ["tools"],
    skill_logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/github.svg",
    order: 20,
  },
  {
    skill_name: "GitLab",
    field: ["tools"],
    skill_logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/gitlab.svg",
    order: 21,
  },
  {
    skill_name: "Chart.js",
    field: ["library"],
    skill_logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/chartdotjs.svg",
    order: 22,
  },
  {
    skill_name: "Puppeteer",
    field: ["tools"],
    skill_logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/puppeteer.svg",
    order: 23,
  },
  {
    skill_name: "reCAPTCHA",
    field: ["tools"],
    skill_logo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/RecaptchaLogo.svg/250px-RecaptchaLogo.svg.png",
    order: 24,
  },
  {
    skill_name: "Cloudflare",
    field: ["tools"],
    skill_logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/cloudflare.svg",
    order: 25,
  },
  {
    skill_name: "Netlify",
    field: ["tools"],
    skill_logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/netlify.svg",
    order: 26,
  },
  {
    skill_name: "Vercel",
    field: ["tools"],
    skill_logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/vercel.svg",
    order: 27,
  },
];

const addSkills = async () => {
  try {
    console.log("🚀 Skills ekleme başlıyor...");

    const { $firestore } = useNuxtApp();

    if (!$firestore) {
      throw new Error("Firestore not initialized");
    }

    console.log("✅ Firestore bulundu");

    const { collection, addDoc, getDocs, query, where } = await import("firebase/firestore");
    const skillsRef = collection($firestore, "skills");

    let count = 0;
    for (const skill of skillsData) {
      try {
        const existingQuery = query(
          skillsRef,
          where("skill_name", "==", skill.skill_name)
        );
        const existingSnapshot = await getDocs(existingQuery);
        if (!existingSnapshot.empty) {
          console.log(`⏭️ ${skill.skill_name} zaten var, atlandı`);
          continue;
        }
        console.log(`📤 ${skill.skill_name} ekleniyor...`);
        const docRef = await addDoc(skillsRef, skill);
        console.log(`✅ ${skill.skill_name} eklendi (ID: ${docRef.id})`);
        count++;
      } catch (error: any) {
        console.error(`❌ ${skill.skill_name} hatası:`, error.message);
      }
    }

    result.value = { success: true, count };
    console.log(`🎉 ${count} skill başarıyla eklendi!`);
  } catch (error: any) {
    console.error("❌ Hata:", error);
    result.value = {
      success: false,
      error: error.message || "Bilinmeyen hata",
    };
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  if (process.client) {
    setTimeout(() => {
      addSkills();
    }, 300);
  }
});

useHead({
  title: "Add Skills",
});
</script>
