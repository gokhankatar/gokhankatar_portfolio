<template>
  <v-container class="py-16">
    <v-card>
      <v-card-title>
        <p class="text-h4">Add Skills to Firebase</p>
      </v-card-title>
      <v-card-text>
        <v-alert type="info" variant="tonal" class="mb-4">
          Bu sayfa Firebase'e skills koleksiyonuna örnek veriler ekler.
        </v-alert>

        <v-btn
          color="success"
          size="large"
          @click="addSkills"
          :loading="loading"
          :disabled="loading"
          class="mb-4"
        >
          {{ loading ? "Ekleniyor..." : "Skills Ekle" }}
        </v-btn>

        <div v-if="result">
          <v-alert
            :type="result.success ? 'success' : 'error'"
            variant="tonal"
            class="mt-4"
          >
            <div v-if="result.success">
              <strong>✅ Başarılı!</strong>
              <p>{{ result.count }} skill başarıyla eklendi.</p>
              <p class="text-caption mt-2">
                Ana sayfaya dönüp Skills bölümünü kontrol edebilirsiniz.
              </p>
            </div>
            <div v-else>
              <strong>❌ Hata:</strong>
              <p>{{ result.error }}</p>
            </div>
          </v-alert>
        </div>

        <v-divider class="my-6"></v-divider>

        <div v-if="addedSkills.length > 0">
          <p class="text-h6 mb-2">Eklenen Skills:</p>
          <v-list>
            <v-list-item
              v-for="skill in addedSkills"
              :key="skill.id"
              :title="skill.skill_name"
              :subtitle="`Order: ${skill.order}`"
            >
              <template #prepend>
                <v-icon color="success">mdi-check-circle</v-icon>
              </template>
            </v-list-item>
          </v-list>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";

const loading = ref(false);
const result = ref<any>(null);
const addedSkills = ref<any[]>([]);

const skillsData = [
  {
    skill_name: "JavaScript",
    field: ["front_end", "back_end"],
    skill_logo:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    order: 1,
  },
  {
    skill_name: "TypeScript",
    field: ["front_end", "back_end"],
    skill_logo:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    order: 2,
  },
  {
    skill_name: "Vue.js",
    field: ["front_end"],
    skill_logo:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
    order: 3,
  },
  {
    skill_name: "Nuxt.js",
    field: ["front_end"],
    skill_logo:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg",
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
    skill_logo:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    order: 15,
  },
  {
    skill_name: "Supabase",
    field: ["back_end"],
    skill_logo:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
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
  loading.value = true;
  result.value = null;
  addedSkills.value = [];

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
    const errors: string[] = [];

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
        addedSkills.value.push({ ...skill, id: docRef.id });
        count++;
      } catch (error: any) {
        console.error(`❌ ${skill.skill_name} hatası:`, error);
        errors.push(`${skill.skill_name}: ${error.message}`);
      }
    }

    if (count === 0 && errors.length > 0) {
      throw new Error(`Hiçbir skill eklenemedi. Hatalar: ${errors.join(", ")}`);
    }

    if (errors.length > 0) {
      result.value = {
        success: true,
        count,
        warning: `${errors.length} skill eklenirken hata oluştu`,
      };
    } else {
      result.value = { success: true, count };
    }

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

// Sayfa yüklendiğinde otomatik ekle
onMounted(() => {
  if (process.client) {
    // Kısa bir gecikme sonrası otomatik ekle
    setTimeout(() => {
      addSkills();
    }, 500);
  }
});

useHead({
  title: "Add Skills",
});
</script>
