// Firebase Skills Collection Örnek Verileri
// Bu dosyayı Firebase Console'dan veya Admin SDK ile kullanabilirsiniz

const skillsData = [
  {
    skill_name: "TypeScript",
    field: ["front_end", "back_end"],
    skill_logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    order: 1
  },
  {
    skill_name: "JavaScript",
    field: ["front_end", "back_end"],
    skill_logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    order: 2
  },
  {
    skill_name: "Vue.js",
    field: ["front_end"],
    skill_logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
    order: 3
  },
  {
    skill_name: "Nuxt.js",
    field: ["front_end"],
    skill_logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg",
    order: 4
  },
  {
    skill_name: "Firebase",
    field: ["back_end"],
    skill_logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    order: 5
  },
  {
    skill_name: "Supabase",
    field: ["back_end"],
    skill_logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
    order: 6
  }
];

// Firebase Admin SDK ile eklemek için:
/*
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from './serviceAccountKey.json';

const app = initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function addSkills() {
  const batch = db.batch();
  
  skillsData.forEach((skill, index) => {
    const docRef = db.collection('skills').doc();
    batch.set(docRef, skill);
  });
  
  await batch.commit();
  console.log('Skills added successfully!');
}

addSkills();
*/

// Veya Firebase Console'dan manuel olarak ekleyebilirsiniz
console.log('Skills Data:', JSON.stringify(skillsData, null, 2));
