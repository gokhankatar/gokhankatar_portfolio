import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    projectId: config.public.firebaseProjectId,
    storageBucket: config.public.firebaseStorageBucket,
    messagingSenderId: config.public.firebaseMessagingSenderId,
    appId: config.public.firebaseAppId,
  };

  console.log('🔥 Firebase Plugin: Initializing...');
  console.log('🔥 Config:', {
    apiKey: config.public.firebaseApiKey ? '✅' : '❌',
    projectId: config.public.firebaseProjectId ? '✅' : '❌',
    authDomain: config.public.firebaseAuthDomain || 'N/A',
  });
  console.log('🔥 ProjectId değeri:', config.public.firebaseProjectId || 'UNDEFINED');

  // ProjectId kontrolü
  if (!config.public.firebaseProjectId) {
    console.error('❌ FIREBASE_PROJECT_ID eksik! .env dosyasını kontrol edin.');
    console.error('Firebase initialize edilemez, plugin devre dışı kalıyor.');
    return {
      provide: {
        firebase: null,
        auth: null,
        firestore: null,
      },
    };
  }

  try {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const firestore = getFirestore(app);

    console.log('✅ Firebase Plugin: Initialized successfully');
    console.log('✅ Firestore instance:', firestore);

    return {
      provide: {
        firebase: app,
        auth,
        firestore,
      },
    };
  } catch (error: any) {
    console.error('❌ Firebase Plugin: Initialization failed', error);
    throw error;
  }
});
