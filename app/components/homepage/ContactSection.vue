<template>
  <v-sheet id="contact" class="bg-transparent contact-section">
    <v-container>
      <p class="section-title">Contact Me</p>
      <p class="section-subtitle contact-subtitle">
        If you'd like to work on a project together or just say hello, feel free to
        reach out!
      </p>

      <v-row class="contact-grid" align="stretch" :dense="display.smAndDown.value">
        <v-col cols="12" lg="5">
          <div class="contact-info-grid">
            <v-card
              v-for="item in contactCards"
              :key="item.label"
              class="contact-card"
              variant="tonal"
              :ripple="false"
              :href="item.href"
              :target="item.target"
            >
              <div class="contact-card__icon">
                <v-icon :icon="item.icon" :size="display.smAndDown.value ? 18 : 22" />
              </div>
              <div class="contact-card__content">
                <p class="contact-card-title text-subtitle-2 text-xl-subtitle-1">
                  {{ item.label }}
                </p>
                <p class="contact-card-value text-caption text-lg-subtitle-2 text-xl-subtitle-1">
                  {{ item.value }}
                </p>
              </div>
            </v-card>
          </div>
        </v-col>

        <v-col cols="12" lg="7">
          <div class="contact-form-card">
            <div class="contact-form-header d-flex justify-space-between align-center">
              <div>
                <p class="contact-card-title">Send a message</p>
                <p class="contact-card-value">I usually respond within 24 hours.</p>
              </div>
              <v-icon icon="mdi-send" size="22" />
            </div>
            <v-form @submit.prevent="handleSubmit" ref="contactFormRef">
              <v-alert
                v-if="submitSuccess"
                type="success"
                variant="tonal"
                class="mb-3"
                text="Message sent successfully."
              />
              <v-alert
                v-if="submitError"
                type="error"
                variant="tonal"
                class="mb-3"
                :text="submitError"
              />
              <v-text-field
                v-model="form.name"
                label="Your Name"
                required
                prepend-inner-icon="mdi-account"
                variant="outlined"
                hide-details="auto"
                :density="display.xl.value ? 'default' : 'compact'"
                :rules="rules.name"
              />
              <v-text-field
                v-model="form.email"
                label="Email"
                type="email"
                prepend-inner-icon="mdi-email"
                required
                class="my-2 my-xl-4"
                variant="outlined"
                hide-details="auto"
                :density="display.xl.value ? 'default' : 'compact'"
                :rules="rules.email"
              />
              <v-textarea
                v-model="form.message"
                label="Your Message"
                required
                variant="outlined"
                rows="5"
                prepend-inner-icon="mdi-message"
                hide-details="auto"
                counter
                max-length="300"
                placeholder="I want to build a website for my business"
                no-resize
                :density="display.xl.value ? 'default' : 'compact'"
                :rules="rules.message"
              />

              <v-btn
                type="submit"
                color="error"
                :size="display.xl.value ? 'default' : 'small'"
                variant="flat"
                :block="display.smAndDown.value"
                class="text-none"
                :ripple="false"
                :loading="isSending"
                :disabled="isSending"
                text="Send"
                prepend-icon="mdi-check"
              />
            </v-form>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { VForm } from "vuetify/components";
import { useDisplay } from "vuetify/lib/composables/display.mjs";
import { contactCards } from "~/utils/contentData";

const display = useDisplay();
const contactFormRef = ref<InstanceType<typeof VForm> | null>(null);
const isSending = ref(false);
const submitError = ref("");
const submitSuccess = ref(false);

const form = ref({
  name: "",
  email: "",
  message: "",
});

const rules = {
  name: [
    (v: string) => !!v || "Name is required",
    (v: string) => (v && v.length >= 2) || "Name must be at least 2 characters",
  ],
  email: [
    (v: string) => !!v || "Email is required",
    (v: string) =>
      (v && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) || "Enter a valid email address",
  ],
  message: [
    (v: string) => !!v || "Message is required",
    (v: string) => (v && v.length >= 10) || "Message must be at least 10 characters",
  ],
};

const handleSubmit = async () => {
  const result = await contactFormRef.value?.validate();
  if (!result?.valid) return;

  try {
    submitError.value = "";
    submitSuccess.value = false;
    isSending.value = true;
    const config = useRuntimeConfig();
    let recaptchaToken: string | null = null;

    if (config.public.recaptchaSiteKey) {
      const { $recaptcha } = useNuxtApp();
      recaptchaToken = (await $recaptcha?.execute("contact_form")) || null;
      if (!recaptchaToken) {
        throw new Error("reCAPTCHA token alınamadı");
      }
    }

    await $fetch("/api/contact", {
      method: "POST",
      body: {
        name: form.value.name,
        email: form.value.email,
        msg: form.value.message,
        recaptchaToken,
      },
    });
    submitSuccess.value = true;
    contactFormRef.value?.reset();
  } catch (error: any) {
    console.error("Error sending message:", error);
    submitError.value =
      error?.data?.statusMessage ||
      error?.data?.message ||
      "Message could not be sent. Please try again.";
  } finally {
    isSending.value = false;
  }
};
</script>

<style scoped>
@import url("~/assets/css/main.css");
</style>