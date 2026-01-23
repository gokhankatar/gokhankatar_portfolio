<template>
  <v-container class="py-16">
    <v-card>
      <v-card-title>
        <p class="text-h4">Add Skills - Direkt</p>
      </v-card-title>
      <v-card-text>
        <v-btn
          color="success"
          size="large"
          @click="addSkillsDirect"
          :loading="loading"
          class="mb-4"
        >
          Skills Ekle (Direkt)
        </v-btn>

        <div v-if="logs.length > 0" class="mt-4">
          <p class="text-subtitle-1 font-weight-bold mb-2">Console Logs:</p>
          <v-card variant="outlined" class="pa-4" style="max-height: 400px; overflow-y: auto; background: #f5f5f5;">
            <pre v-for="(log, idx) in logs" :key="idx" :class="log.type === 'error' ? 'text-error' : log.type === 'success' ? 'text-success' : ''">{{ log.message }}</pre>
          </v-card>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";

const loading = ref(false);
const logs = ref<Array<{ message: string; type: string }>>([]);

const addLog = (message: string, type: 'info' | 'success' | 'error' = 'info') => {
  logs.value.push({ message, type });
  console.log(message);
};

const addSkillsDirect = async () => {
  loading.value = true;
  logs.value = [];

  try {
    addLog("🚀 Skills ekleme başlıyor...", "info");

    // NuxtApp'i al
    const nuxtApp = useNuxtApp();
    addLog(`NuxtApp: ${nuxtApp ? '✅ Bulundu' : '❌ Bulunamadı'}`, nuxtApp ? 'success' : 'error');

    if (!nuxtApp) {
      throw new Error("NuxtApp bulunamadı");
    }

    // Firestore'u al
    const { $firestore } = nuxtApp;
    addLog(`Firestore: ${$firestore ? '✅ Bulundu' : '❌ Bulunamadı'}`, $firestore ? 'success' : 'error');

    if (!$firestore) {
      throw new Error("Firestore bulunamadı. Firebase plugin kontrol edin.");
    }

    // Firebase Firestore fonksiyonlarını import et
    addLog("📦 Firebase Firestore import ediliyor...", "info");
    const { collection, addDoc, getDocs, query, where } = await import("firebase/firestore");
    addLog("✅ Firebase Firestore import edildi", "success");

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

    addLog(`📝 ${skillsData.length} skill ekleniyor...`, "info");

    const skillsRef = collection($firestore, "skills");
    addLog("✅ Skills koleksiyonu referansı oluşturuldu", "success");

    let successCount = 0;
    let errorCount = 0;

    for (const skill of skillsData) {
      try {
        const existingQuery = query(
          skillsRef,
          where("skill_name", "==", skill.skill_name)
        );
        const existingSnapshot = await getDocs(existingQuery);
        if (!existingSnapshot.empty) {
          addLog(`⏭️ ${skill.skill_name} zaten var, atlandı`, "info");
          continue;
        }
        addLog(`📤 ${skill.skill_name} ekleniyor...`, "info");
        const docRef = await addDoc(skillsRef, skill);
        addLog(`✅ ${skill.skill_name} eklendi! (ID: ${docRef.id})`, "success");
        successCount++;
      } catch (error: any) {
        addLog(`❌ ${skill.skill_name} hatası: ${error.message}`, "error");
        addLog(`   Hata kodu: ${error.code || 'N/A'}`, "error");
        addLog(`   Hata detayı: ${JSON.stringify(error)}`, "error");
        errorCount++;
      }
    }

    addLog(`\n📊 Özet:`, "info");
    addLog(`✅ Başarılı: ${successCount}`, successCount > 0 ? "success" : "info");
    addLog(`❌ Hatalı: ${errorCount}`, errorCount > 0 ? "error" : "info");

    if (successCount > 0) {
      addLog(`\n🎉 ${successCount} skill başarıyla eklendi!`, "success");
      addLog("Ana sayfayı yenileyip Skills bölümünü kontrol edin.", "info");
    }
  } catch (error: any) {
    addLog(`❌ Genel Hata: ${error.message}`, "error");
    addLog(`Hata detayı: ${JSON.stringify(error)}`, "error");
    addLog(`Stack: ${error.stack || 'N/A'}`, "error");
  } finally {
    loading.value = false;
  }
};

useHead({
  title: "Add Skills Direct",
});
</script>

<style scoped>
pre {
  margin: 4px 0;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
