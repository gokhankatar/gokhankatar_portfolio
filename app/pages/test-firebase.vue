<template>
  <v-container class="py-16">
    <v-card>
      <v-card-title>
        <p class="text-h4">Firebase Connection Test</p>
      </v-card-title>
      <v-card-text>
        <div class="mb-4">
          <strong>Firebase Config:</strong>
          <pre class="mt-2 pa-4 bg-grey-lighten-4 rounded">{{ firebaseConfig }}</pre>
        </div>

        <v-btn color="primary" @click="testConnection" :loading="testing" class="mb-4">
          Test Firebase Connection
        </v-btn>

        <div v-if="testResult">
          <v-alert
            :type="testResult.success ? 'success' : 'error'"
            variant="tonal"
            class="mt-4"
          >
            <div v-if="testResult.success">
              ✅ Firebase bağlantısı başarılı!
              <div v-if="testResult.docId" class="mt-2">
                Test doküman ID: {{ testResult.docId }}
              </div>
            </div>
            <div v-else>❌ Firebase bağlantı hatası: {{ testResult.error }}</div>
          </v-alert>
        </div>

        <v-divider class="my-6"></v-divider>

        <div class="mt-4">
          <p class="text-h6 mb-2">Firebase Environment Variables:</p>
          <v-list>
            <v-list-item>
              <v-list-item-title>FIREBASE_API_KEY</v-list-item-title>
              <v-list-item-subtitle>
                {{ config.public.firebaseApiKey ? "✅ Set" : "❌ Missing" }}
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>FIREBASE_AUTH_DOMAIN</v-list-item-title>
              <v-list-item-subtitle>
                {{ config.public.firebaseAuthDomain ? "✅ Set" : "❌ Missing" }}
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>FIREBASE_PROJECT_ID</v-list-item-title>
              <v-list-item-subtitle>
                {{ config.public.firebaseProjectId ? "✅ Set" : "❌ Missing" }}
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>FIREBASE_STORAGE_BUCKET</v-list-item-title>
              <v-list-item-subtitle>
                {{ config.public.firebaseStorageBucket ? "✅ Set" : "❌ Missing" }}
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>FIREBASE_MESSAGING_SENDER_ID</v-list-item-title>
              <v-list-item-subtitle>
                {{ config.public.firebaseMessagingSenderId ? "✅ Set" : "❌ Missing" }}
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>FIREBASE_APP_ID</v-list-item-title>
              <v-list-item-subtitle>
                {{ config.public.firebaseAppId ? "✅ Set" : "❌ Missing" }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </div>

        <v-divider class="my-6"></v-divider>

        <div class="mt-4">
          <p class="text-h6 mb-2">Skills Koleksiyonunu Oluşturma:</p>
          <v-alert type="info" variant="tonal" class="mb-4">
            <strong>Adımlar:</strong>
            <ol class="mt-2">
              <li>
                Firebase Console'a gidin:
                <a href="https://console.firebase.google.com" target="_blank"
                  >console.firebase.google.com</a
                >
              </li>
              <li>Projenizi seçin</li>
              <li>Firestore Database'e gidin</li>
              <li>"Create database" butonuna tıklayın (ilk kez ise)</li>
              <li>"Start in test mode" seçin (geliştirme için)</li>
              <li>"Collection" butonuna tıklayın</li>
              <li>Collection ID: <strong>skills</strong> yazın</li>
              <li>İlk dokümanı ekleyin (aşağıdaki örneği kullanın)</li>
            </ol>
          </v-alert>

          <v-btn
            color="success"
            @click="createSampleSkills"
            :loading="creating"
            class="mb-4"
          >
            Örnek Skills Ekle (Test)
          </v-btn>

          <div v-if="createResult">
            <v-alert
              :type="createResult.success ? 'success' : 'error'"
              variant="tonal"
              class="mt-4"
            >
              <div v-if="createResult.success">
                ✅ {{ createResult.count }} skill başarıyla eklendi!
              </div>
              <div v-else>❌ Hata: {{ createResult.error }}</div>
            </v-alert>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useFirebaseTest } from "~/composables/useFirebaseTest";

const config = useRuntimeConfig();
const { testConnection: testFirebase } = useFirebaseTest();

const testing = ref(false);
const creating = ref(false);
const testResult = ref<any>(null);
const createResult = ref<any>(null);

const firebaseConfig = computed(() => {
  return {
    apiKey: config.public.firebaseApiKey ? "✅ Set" : "❌ Missing",
    authDomain: config.public.firebaseAuthDomain ? "✅ Set" : "❌ Missing",
    projectId: config.public.firebaseProjectId ? "✅ Set" : "❌ Missing",
    storageBucket: config.public.firebaseStorageBucket ? "✅ Set" : "❌ Missing",
    messagingSenderId: config.public.firebaseMessagingSenderId ? "✅ Set" : "❌ Missing",
    appId: config.public.firebaseAppId ? "✅ Set" : "❌ Missing",
  };
});

const testConnection = async () => {
  testing.value = true;
  testResult.value = null;

  try {
    const nuxtApp = useNuxtApp();
    console.log("Nuxt App keys:", Object.keys(nuxtApp));

    const firestore = nuxtApp.$firestore;
    console.log("Firestore:", firestore);

    if (!firestore) {
      testResult.value = {
        success: false,
        error: "Firestore not found. Check console for details.",
      };
      return;
    }

    const { collection, addDoc } = await import("firebase/firestore");
    const testRef = collection(firestore, "test");
    const docRef = await addDoc(testRef, {
      message: "Firebase connection test",
      timestamp: new Date(),
    });

    testResult.value = { success: true, docId: docRef.id };
  } catch (error: any) {
    console.error("Test error:", error);
    testResult.value = { success: false, error: error.message };
  } finally {
    testing.value = false;
  }
};

const createSampleSkills = async () => {
  creating.value = true;
  createResult.value = null;

  try {
    console.log("🚀 createSampleSkills: Başlıyor...");
    const { $firestore } = useNuxtApp();
    console.log("🔍 $firestore:", $firestore);

    if (!$firestore) {
      console.error("❌ Firestore bulunamadı!");
      throw new Error("Firestore not initialized. Please check Firebase configuration.");
    }

    console.log("✅ Firestore bulundu, skills ekleniyor...");
    const { collection, addDoc } = await import("firebase/firestore");

    const sampleSkills = [
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
        skill_name: "Firebase",
        field: ["back_end"],
        skill_logo:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
        order: 5,
      },
      {
        skill_name: "Supabase",
        field: ["back_end"],
        skill_logo:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
        order: 6,
      },
      {
        skill_name: "Node.js",
        field: ["back_end"],
        skill_logo:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        order: 7,
      },
      {
        skill_name: "HTML5",
        field: ["front_end"],
        skill_logo:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        order: 8,
      },
      {
        skill_name: "CSS3",
        field: ["front_end"],
        skill_logo:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        order: 9,
      },
      {
        skill_name: "Git",
        field: ["tools"],
        skill_logo:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        order: 10,
      },
    ];

    const skillsRef = collection($firestore, "skills");
    console.log("📝 Skills koleksiyonu referansı oluşturuldu:", skillsRef);

    let count = 0;
    const errors = [];

    for (const skill of sampleSkills) {
      try {
        console.log(`📤 ${skill.skill_name} ekleniyor...`);
        const docRef = await addDoc(skillsRef, skill);
        console.log(`✅ ${skill.skill_name} başarıyla eklendi (ID: ${docRef.id})`);
        count++;
      } catch (skillError: any) {
        console.error(`❌ ${skill.skill_name} eklenirken hata:`, skillError);
        errors.push(`${skill.skill_name}: ${skillError.message}`);
      }
    }

    if (errors.length > 0) {
      throw new Error(
        `${count} skill eklendi, ${errors.length} hata: ${errors.join(", ")}`
      );
    }

    createResult.value = { success: true, count };
    console.log(`🎉 Toplam ${count} skill başarıyla eklendi!`);
  } catch (error: any) {
    console.error("❌ createSampleSkills hatası:", error);
    console.error("Hata detayları:", {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });
    createResult.value = { success: false, error: error.message || "Bilinmeyen hata" };
  } finally {
    creating.value = false;
  }
};

useHead({
  title: "Firebase Test",
});
</script>
