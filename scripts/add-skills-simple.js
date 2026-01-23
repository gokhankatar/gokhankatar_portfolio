// Basit Script - Ana sayfada console'da çalıştırın
// Kullanım: Ana sayfada F12 → Console → Bu kodu yapıştırın ve Enter'a basın

(async () => {
  console.log('🚀 Skills ekleme başlıyor...');
  
  // NuxtApp'i bul
  const app = document.querySelector('#__nuxt')?.__vue_app__;
  if (!app) {
    console.error('❌ Nuxt app bulunamadı');
    return;
  }
  
  // Firestore'u al
  const nuxtApp = app.config.globalProperties.$nuxt || window.$nuxt;
  const { $firestore } = nuxtApp || {};
  
  if (!$firestore) {
    console.error('❌ Firestore bulunamadı');
    return;
  }
  
  console.log('✅ Firestore bulundu');
  
  // Firebase Firestore fonksiyonlarını import et
  const firestoreModule = await import('firebase/firestore');
  const { collection, addDoc } = firestoreModule;
  
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
  let successCount = 0;
  let errorCount = 0;
  
  console.log(`📝 ${skillsData.length} skill ekleniyor...\n`);
  
  for (const skill of skillsData) {
    try {
      const docRef = await addDoc(skillsRef, skill);
      console.log(`✅ ${skill.skill_name} eklendi (ID: ${docRef.id})`);
      successCount++;
    } catch (error) {
      console.error(`❌ ${skill.skill_name} hatası:`, error.message);
      errorCount++;
    }
  }
  
  console.log(`\n📊 Özet:`);
  console.log(`✅ Başarılı: ${successCount}`);
  console.log(`❌ Hatalı: ${errorCount}`);
  console.log(`\n🎉 İşlem tamamlandı! Ana sayfayı yenileyip Skills bölümünü kontrol edin.`);
})();
