import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    projectId: config.public.firebaseProjectId,
    storageBucket: config.public.firebaseStorageBucket,
    messagingSenderId: config.public.firebaseMessagingSenderId,
    appId: config.public.firebaseAppId,
  };

  if (!firebaseConfig.projectId) {
    throw createError({
      statusCode: 500,
      statusMessage: "Firebase projectId is missing.",
    });
  }

  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  const firestore = getFirestore(app);

  const projectId = getRouterParam(event, "id");
  if (!projectId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Project id is required.",
    });
  }

  const projectRef = doc(firestore, "projects", projectId);
  const projectSnap = await getDoc(projectRef);

  if (!projectSnap.exists()) {
    throw createError({
      statusCode: 404,
      statusMessage: "Project not found.",
    });
  }

  return {
    id: projectSnap.id,
    ...projectSnap.data(),
  };
});
