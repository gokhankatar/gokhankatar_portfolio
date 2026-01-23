// Tarayıcı Console'da Çalıştırılacak Script
// Firebase Console'da veya sayfanın console'unda çalıştırın

// Önce Firebase'i import edin (eğer yoksa)
// veya sayfanın console'unda çalıştırın

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
    skill_name: "Firebase",
    field: ["back_end"],
    skill_logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    order: 5,
  },
  {
    skill_name: "Supabase",
    field: ["back_end"],
    skill_logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
    order: 6,
  },
  {
    skill_name: "Node.js",
    field: ["back_end"],
    skill_logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    order: 7,
  },
  {
    skill_name: "HTML5",
    field: ["front_end"],
    skill_logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    order: 8,
  },
  {
    skill_name: "CSS3",
    field: ["front_end"],
    skill_logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    order: 9,
  },
  {
    skill_name: "Git",
    field: ["tools"],
    skill_logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    order: 10,
  },
];

// Tarayıcı console'unda çalıştırın:
// const { $firestore } = useNuxtApp();
// const { collection, addDoc } = await import('firebase/firestore');
// 
// for (const skill of skillsData) {
//   await addDoc(collection($firestore, 'skills'), skill);
//   console.log(`✅ ${skill.skill_name} eklendi`);
// }
