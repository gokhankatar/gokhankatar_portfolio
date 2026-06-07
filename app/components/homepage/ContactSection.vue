<template>
  <v-sheet id="contact" class="bg-transparent contact-section">
    <v-container>
      <p
        class="text-center text-subtitle-1 text-md-h6 text-lg-h5 text-xl-h4 font-weight-bold mb-3"
        style="letter-spacing: 1px !important"
      >
        Contact Me
      </p>
      <p class="section-subtitle contact-subtitle">
        If you'd like to work on a project together or just say hello, feel free to
        reach out!
      </p>

      <v-row class="contact-grid" align="stretch">
        <v-col cols="12" lg="5" class="contact-col">
          <div class="contact-info-list">
            <a
              v-for="item in contactCards"
              :key="item.label"
              class="contact-card"
              :href="item.href"
              :target="item.target"
              :rel="item.target ? 'noopener noreferrer' : undefined"
            >
              <v-icon :icon="item.icon" size="20" class="contact-card__icon" />
              <div class="contact-card__content">
                <span class="contact-card-title">{{ item.label }}</span>
                <span class="contact-card-value">{{ item.value }}</span>
              </div>
            </a>
          </div>
        </v-col>

        <v-col cols="12" lg="7" class="contact-col">
          <div class="contact-form-card">
            <div class="contact-form-header">
              <div class="contact-form-header__badge">
                <v-icon icon="mdi-send" size="20" />
              </div>
              <div>
                <p class="contact-form-title">Send a message</p>
                <p class="contact-form-subtitle">I usually respond within 24 hours.</p>
              </div>
            </div>

            <v-form class="contact-form" @submit.prevent="handleSubmit" ref="contactFormRef">
              <v-alert
                v-if="submitSuccess"
                type="success"
                variant="tonal"
                class="contact-form__alert"
                text="Message sent successfully."
              />
              <v-alert
                v-if="submitError"
                type="error"
                variant="tonal"
                class="contact-form__alert"
                :text="submitError"
              />

              <v-text-field
                v-model="form.name"
                label="Your Name"
                required
                prepend-inner-icon="mdi-account-outline"
                variant="outlined"
                hide-details="auto"
                class="contact-form__field"
                :density="fieldDensity"
                :rules="rules.name"
              />
              <v-text-field
                v-model="form.email"
                label="Email"
                type="email"
                prepend-inner-icon="mdi-email-outline"
                required
                variant="outlined"
                hide-details="auto"
                class="contact-form__field"
                :density="fieldDensity"
                :rules="rules.email"
              />
              <v-textarea
                v-model="form.message"
                label="Your Message"
                required
                variant="outlined"
                rows="5"
                prepend-inner-icon="mdi-message-outline"
                hide-details="auto"
                counter
                max-length="300"
                placeholder="Tell me about your project..."
                no-resize
                class="contact-form__field"
                :density="fieldDensity"
                :rules="rules.message"
              />

              <div class="contact-form__actions">
                <v-btn
                  type="submit"
                  :size="submitBtnSize"
                  variant="flat"
                  :block="display.smAndDown.value"
                  class="contact-form__submit"
                  :ripple="false"
                  :loading="isSending"
                  :disabled="isSending"
                  text="Send Message"
                  prepend-icon="mdi-send"
                />
              </div>
            </v-form>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { VForm } from "vuetify/components";
import { useDisplay } from "vuetify/lib/composables/display.mjs";
import { contactCards } from "~/utils/contentData";

const display = useDisplay();
const contactFormRef = ref<InstanceType<typeof VForm> | null>(null);
const isSending = ref(false);
const submitError = ref("");
const submitSuccess = ref(false);

const fieldDensity = computed(() => (display.xl.value ? "comfortable" : "compact"));
const submitBtnSize = computed(() => (display.xl.value ? "large" : "default"));

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
