export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  modules: [
    "vuetify-nuxt-module",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "nuxt-lodash",
  ],
  runtimeConfig: {
    // 🔐 Server-side only (private) - never exposed to client
    mail: process.env.MAIL,
    mail_password: process.env.MAIL_PASSWORD,
    recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY,
    // 🔥 Firebase config - client-side accessible (required for Firebase client SDK)
    // ⚠️ Note: Firebase API keys are meant to be public and are protected by Firebase Security Rules
    public: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
      recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      title: "Gokhan Katar | Web Technologies",
      titleTemplate: "%s | Gokhan Katar",
      meta: [
        {
          charset: "utf-8",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          name: "format-detection",
          content: "telephone=no",
        },
        {
          name: "theme-color",
          content: "#D34A4C",
        },
        {
          name: "msapplication-TileColor",
          content: "#D34A4C",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "stylesheet",
          href:
            "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap",
        },
      ],
    },
  },
  lodash: {
    prefix: "_",
    prefixSkip: ["string"],
    upperAfterPrefix: false,
    exclude: ["map"],
    alias: [
      ["camelCase", "stringToCamelCase"],
      ["kebabCase", "stringToKebab"],
      ["isDate", "isLodashDate"],
    ],
  },
  css: ["~/assets/css/main.css"],
  devtools: { enabled: false },
  devServer: {
    host: "0.0.0.0",
    port: 4000,
  },
});
