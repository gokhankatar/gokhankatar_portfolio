// TypeScript için global tanımlamalar
declare global {
    interface Window {
        grecaptcha?: {
            ready: (callback: () => void) => void;
            execute: (siteKey: string, options: { action: string }) => Promise<string>;
        };
    }
}

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();

    if (!config.public.recaptchaSiteKey) {
        console.warn('⚠️ reCAPTCHA Site Key is not configured');
        return {
            provide: {
                recaptcha: {
                    execute: async () => null
                }
            }
        };
    }

    // reCAPTCHA v3 script
    const loadRecaptcha = (): Promise<void> => {
        return new Promise((resolve, reject) => {
            if (window.grecaptcha) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = `https://www.google.com/recaptcha/api.js?render=${config.public.recaptchaSiteKey}`;
            script.async = true;
            script.defer = true;
            script.onload = () => {
                if (window.grecaptcha) {
                    window.grecaptcha.ready(() => {
                        resolve();
                    });
                } else {
                    reject(new Error('reCAPTCHA yüklenemedi'));
                }
            };
            script.onerror = () => {
                reject(new Error('reCAPTCHA script yüklenemedi'));
            };
            document.head.appendChild(script);
        });
    };

    // Token al
    const executeRecaptcha = async (action: string = 'submit'): Promise<string | null> => {
        try {
            await loadRecaptcha();

            if (!window.grecaptcha) {
                console.error('reCAPTCHA yüklenemedi');
                return null;
            }

            const token = await window.grecaptcha.execute(config.public.recaptchaSiteKey, { action });
            return token;
        } catch (error) {
            console.error('reCAPTCHA token alınamadı:', error);
            return null;
        }
    };

    return {
        provide: {
            recaptcha: {
                execute: executeRecaptcha
            }
        }
    };
});

