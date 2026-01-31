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
      title: "Gokhan Katar | Full Stack Web Geliştirici",
      titleTemplate: "%s | Gokhan Katar",
      meta: [
        {
          charset: "utf-8",
        },
        {
          name: "description",
          content: "Portfolyoma Hoşgeldiniz. Ben Gökhan Katar. Nuxt ve Vue.js ile hızlı, güvenli ve ölçeklenebilir web uygulamaları geliştiriyorum. İşletmeler için kurumsal web siteleri, stok yönetimi, kâr–zarar takibi, yönetim panelleri ve kişiye özel web yazılım çözümleri sunuyorum. Projeler, teknik yetenekler ve iletişim bilgileri."
        },
        {
          name: "keywords",
          content:
            "Gokhan Katar, full stack web geliştirici, Nuxt geliştirici, Vue geliştirici, web developer, frontend, backend, portfolyo",
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
        {
          property: "og:title",
          content: "Gokhan Katar | Full Stack Web Geliştirici",
        },
        {
          property: "og:description",
          content:
            "Nuxt ve Vue ile hızlı, güvenli ve ölçeklenebilir web uygulamaları geliştiren full stack web geliştirici.",
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:url",
          content: "https://gokhankatar.dev/",
        },
        {
          property: "og:image",
          content: "https://gokhankatar.dev/img/profile.png",
        },
        {
          property: "og:locale",
          content: "tr_TR",
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "twitter:title",
          content: "Gokhan Katar | Full Stack Web Geliştirici",
        },
        {
          name: "twitter:description",
          content:
            "Nuxt ve Vue ile hızlı, güvenli ve ölçeklenebilir web uygulamaları geliştiren full stack web geliştirici.",
        },
        {
          name: "twitter:image",
          content: "https://gokhankatar.dev/img/profile.png",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "192x192",
          href: "/img/profile.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "512x512",
          href: "/img/profile.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "manifest",
          href: "/site.webmanifest",
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
  css: ["./assets/css/main.css"],
  devtools: { enabled: false },
  devServer: {
    host: "0.0.0.0",
    port: 5000,
  },
});
