export default defineNuxtPlugin((nuxtApp) => {
  const isLoading = useState<boolean>("page-loading", () => true);

  nuxtApp.hook("page:start", () => {
    isLoading.value = true;
  });

  nuxtApp.hook("page:finish", () => {
    isLoading.value = false;
  });

  nuxtApp.hook("page:error", () => {
    isLoading.value = false;
  });

  nuxtApp.hook("app:mounted", () => {
    isLoading.value = false;
  });
});
