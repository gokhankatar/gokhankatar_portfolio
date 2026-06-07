import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { toProjectSlug } from "../../utils/projectSlug";

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
  let projectSnap = await getDoc(projectRef);

  if (!projectSnap.exists()) {
    const allProjects = await getDocs(collection(firestore, "projects"));
    const matchedDoc = allProjects.docs.find((entry) => {
      const name = entry.data().project_name as string | undefined;
      return name ? toProjectSlug(name) === projectId : false;
    });

    if (!matchedDoc) {
      throw createError({
        statusCode: 404,
        statusMessage: "Project not found.",
      });
    }

    projectSnap = matchedDoc;
  }

  return {
    ...projectSnap.data(),
    id: projectSnap.id,
  };
});
