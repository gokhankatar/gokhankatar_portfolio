// Bu scripti tarayıcı console'unda çalıştırın
// Ana sayfada (http://localhost:4000) F12 ile console'u açın ve bu kodu yapıştırın

(async function() {
  console.log('🚀 Skills ekleme başlıyor...');
  
  try {
    // NuxtApp'i al
    const nuxtApp = window.$nuxt || window.__NUXT__;
    if (!nuxtApp) {
      throw new Error('Nuxt app bulunamadı. Ana sayfada olduğunuzdan emin olun.');
    }
    
    // Firestore'u al
    const { $firestore } = nuxtApp.$nuxt || nuxtApp;
    if (!$firestore) {
      throw new Error('Firestore bulunamadı');
    }
    
    console.log('✅ Firestore bulundu');
    
    // Firebase'i import et
    const { collection, addDoc } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js');
    
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
      }
    ];
    
    const skillsRef = collection($firestore, 'skills');
    let count = 0;
    
    for (const skill of skillsData) {
      try {
        const docRef = await addDoc(skillsRef, skill);
        console.log(`✅ ${skill.skill_name} eklendi (ID: ${docRef.id})`);
        count++;
      } catch (error) {
        console.error(`❌ ${skill.skill_name} hatası:`, error);
      }
    }
    
    console.log(`🎉 ${count} skill başarıyla eklendi!`);
  } catch (error) {
    console.error('❌ Hata:', error);
  }
})();
