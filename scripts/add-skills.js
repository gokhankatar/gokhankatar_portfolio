// Firebase Skills Koleksiyonuna Veri Ekleme Scripti
// Kullanım: node scripts/add-skills.js

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, where } from "firebase/firestore";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// .env dosyasını yükle
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, "../.env") });

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Skills verileri
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

async function addSkills() {
  try {
    console.log("🔥 Firebase'e bağlanılıyor...");
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    console.log("✅ Firebase bağlantısı başarılı!");
    console.log(`📝 ${skillsData.length} skill ekleniyor...\n`);

    let successCount = 0;
    let errorCount = 0;

    for (const skill of skillsData) {
      try {
        const existingQuery = query(
          collection(db, "skills"),
          where("skill_name", "==", skill.skill_name)
        );
        const existingSnapshot = await getDocs(existingQuery);
        if (!existingSnapshot.empty) {
          console.log(`⏭️ ${skill.skill_name} zaten var, atlandı`);
          continue;
        }
        const docRef = await addDoc(collection(db, "skills"), skill);
        console.log(`✅ ${skill.skill_name} eklendi (ID: ${docRef.id})`);
        successCount++;
      } catch (error) {
        console.error(`❌ ${skill.skill_name} eklenirken hata:`, error.message);
        errorCount++;
      }
    }

    console.log("\n📊 Özet:");
    console.log(`✅ Başarılı: ${successCount}`);
    console.log(`❌ Hatalı: ${errorCount}`);
    console.log(`\n🎉 İşlem tamamlandı!`);
  } catch (error) {
    console.error("❌ Hata:", error);
    process.exit(1);
  }
}

addSkills();
