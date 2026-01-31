import nodemailer from "nodemailer";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  const { name, email, msg, recaptchaToken } = body || {};

  if (!name || !email || !msg) {
    throw createError({
      statusCode: 400,
      statusMessage: "Eksik alan",
    });
  }

  if (config.recaptchaSecretKey) {
    if (!recaptchaToken) {
      throw createError({
        statusCode: 400,
        statusMessage: "reCAPTCHA token missing.",
      });
    }

    const verifyResponse = await $fetch<{
      success: boolean;
      score?: number;
      action?: string;
      "error-codes"?: string[];
    }>(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        body: new URLSearchParams({
          secret: String(config.recaptchaSecretKey),
          response: String(recaptchaToken),
        }),
      }
    );

    const score = verifyResponse.score ?? 0;
    const action = verifyResponse.action ?? "unknown";
    const errorCodes = verifyResponse["error-codes"]?.join(", ");

    if (!verifyResponse?.success || score < 0.3 || action !== "contact_form") {
      throw createError({
        statusCode: 400,
        statusMessage: `reCAPTCHA validation failed. score=${score}, action=${action}${
          errorCodes ? `, codes=${errorCodes}` : ""
        }`,
      });
    }
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.mail,
      pass: config.mail_password,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${config.mail}>`,
      to: config.mail,
      replyTo: email,
      subject: "📩 Yeni İletişim Mesajı",
      html: `
  <div style="background:#f4f6f8;padding:30px;font-family:Arial,sans-serif;">
    <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,.08)">
      <div style="background:#4A148C;padding:20px;color:white">
        <h2 style="margin:0;font-size:22px;">📬 Yeni İletişim Mesajı (=> Portfolio Sitesinden)</h2>
      </div>
      <div style="padding:24px;color:#111827">
        <p style="margin:0 0 12px;"><strong>👤 İsim:</strong> ${name}</p>
        <p style="margin:0 0 12px;"><strong>📧 Email:</strong> ${email}</p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0"/>
        <p style="margin:0 0 8px;font-weight:bold;">📝 Mesaj:</p>
        <div style="background:#f9fafb;padding:16px;border-radius:8px;line-height:1.6;">
          ${String(msg).replace(/\n/g, "<br/>")}
        </div>
      </div>
      <div style="background:#f3f4f6;padding:12px;text-align:center;font-size:12px;color:#6b7280">
        Bu mail iletişim formu üzerinden gönderildi.
      </div>
    </div>
  </div>
  `,
    });
  } catch (error: any) {
    console.error("Mail send failed:", error);
    const detail =
      error?.message || error?.response || error?.code || "Unknown error";
    throw createError({
      statusCode: 500,
      statusMessage: `Mail server error: ${detail}`,
    });
  }

  return { ok: true };
});
