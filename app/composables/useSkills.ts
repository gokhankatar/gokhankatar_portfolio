import { collection, getDocs, query, orderBy } from "firebase/firestore";

interface Skill {
  id?: string;
  skill_name: string;
  field: string[];
  skill_logo: string;
  order: number;
}

export const useSkills = () => {
  const skills = ref<Skill[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchSkills = async () => {
    try {
      loading.value = true;
      error.value = null;

      // Client-side kontrolü
      if (!process.client) {
        console.warn("⚠️ fetchSkills: Called on server-side, skipping...");
        return;
      }

      console.log("🔍 fetchSkills: Starting...");
      const nuxtApp = useNuxtApp();

      const { $firestore } = nuxtApp;

      if (!$firestore) {
        console.error("❌ Firestore not found in NuxtApp");
        throw new Error(
          "Firestore not initialized. Check Firebase plugin and .env file."
        );
      }

      console.log("✅ Firestore found, querying skills collection...");
      const skillsRef = collection($firestore, "skills");
      const q = query(skillsRef, orderBy("order", "asc"));
      const querySnapshot = await getDocs(q);

      skills.value = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        console.log("📄 Skill doc:", { id: doc.id, data });
        return {
          id: doc.id,
          ...data,
        } as Skill;
      });

      console.log(`✅ Fetched ${skills.value.length} skills from Firebase`);
    } catch (err: any) {
      error.value = err.message || "Failed to fetch skills";
      console.error("❌ Error fetching skills:", err);

      // Fallback to default skills if Firebase fails
      if (skills.value.length === 0) {
        console.warn("⚠️ Using fallback skills data");
        skills.value = [
          {
            id: "1",
            skill_name: "Vue.js",
            field: ["front_end"],
            skill_logo:
              "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
            order: 1,
          },
          {
            id: "2",
            skill_name: "Nuxt.js",
            field: ["front_end"],
            skill_logo:
              "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg",
            order: 2,
          },
          {
            id: "3",
            skill_name: "TypeScript",
            field: ["front_end", "back_end"],
            skill_logo:
              "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
            order: 3,
          },
          {
            id: "4",
            skill_name: "Firebase",
            field: ["back_end"],
            skill_logo:
              "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
            order: 4,
          },
        ];
      }
    } finally {
      loading.value = false;
    }
  };

  // Client-side only
  if (process.client) {
    onMounted(() => {
      fetchSkills();
    });
  }

  return {
    skills,
    loading,
    error,
    fetchSkills,
  };
};
