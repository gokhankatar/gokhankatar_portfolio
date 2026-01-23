// Firebase bağlantısını test etmek için composable
export const useFirebaseTest = () => {
  const testConnection = async () => {
    try {
      const { $firestore } = useNuxtApp();

      if (!$firestore) {
        console.error("❌ Firestore not initialized");
        return { success: false, error: "Firestore not initialized" };
      }

      console.log("✅ Firestore initialized:", $firestore);

      // Test koleksiyonuna bir doküman eklemeyi dene
      const { collection, addDoc } = await import("firebase/firestore");

      const testRef = collection($firestore, "test");
      const docRef = await addDoc(testRef, {
        message: "Firebase connection test",
        timestamp: new Date(),
      });

      console.log("✅ Test document added with ID:", docRef.id);

      return { success: true, docId: docRef.id };
    } catch (error: any) {
      console.error("❌ Firebase connection error:", error);
      return { success: false, error: error.message };
    }
  };

  return { testConnection };
};
