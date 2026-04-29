"use client";

import Script from "next/script";
import { useTranslations } from "next-intl";
import { useState } from "react";

const inputClass =
  "w-full border border-[#d1dfe0] bg-white px-4 py-3 text-sm text-[#1f3a40] outline-none transition-[border-color,box-shadow] placeholder:text-[#1f3a40]/40 focus:border-[#0f677d] focus:ring-1 focus:ring-[#0f677d]/25";
const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#1f3a40]/80";

type Status = "idle" | "sending" | "success" | "error" | "not_configured";
const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

type Grecaptcha = {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

export function ContactForm() {
  const t = useTranslations("ContactPage");
  const [status, setStatus] = useState<Status>("idle");

  async function getRecaptchaToken(): Promise<string | null> {
    if (!recaptchaSiteKey || typeof window === "undefined" || !window.grecaptcha) {
      return null;
    }

    return new Promise((resolve) => {
      window.grecaptcha?.ready(async () => {
        try {
          const token = await window.grecaptcha?.execute(recaptchaSiteKey, {
            action: "contact_form_submit",
          });
          resolve(token ?? null);
        } catch {
          resolve(null);
        }
      });
    });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const website = String(fd.get("website") ?? "").trim();
    if (website) return;

    if (!recaptchaSiteKey) {
      setStatus("not_configured");
      return;
    }

    setStatus("sending");
    const recaptchaToken = await getRecaptchaToken();
    if (!recaptchaToken) {
      setStatus("error");
      return;
    }

    const payload = {
      firstName: String(fd.get("firstName") ?? "").trim(),
      lastName: String(fd.get("lastName") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      subject: String(fd.get("subject") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
      website: "",
      recaptchaToken,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok?: boolean; code?: string };

      if (res.ok && data.ok) {
        setStatus("success");
        form.reset();
        return;
      }
      if (data.code === "not_configured") {
        setStatus("not_configured");
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      {recaptchaSiteKey ? (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
          strategy="afterInteractive"
        />
      ) : null}
      <form
        onSubmit={onSubmit}
        className="relative flex flex-col gap-5 text-[#1f3a40]"
        noValidate
      >
        <div className="pointer-events-none absolute -left-[9999px] opacity-0" aria-hidden>
          <label htmlFor="contact-website">Website</label>
          <input
            type="text"
            id="contact-website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-firstName" className={labelClass}>
              {t("formFirstName")}
            </label>
            <input
              id="contact-firstName"
              name="firstName"
              type="text"
              required
              autoComplete="given-name"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="contact-lastName" className={labelClass}>
              {t("formLastName")}
            </label>
            <input
              id="contact-lastName"
              name="lastName"
              type="text"
              required
              autoComplete="family-name"
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-email" className={labelClass}>
              {t("formEmail")}
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="contact-phone" className={labelClass}>
              {t("formPhone")}
            </label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="contact-subject" className={labelClass}>
            {t("formSubject")}
          </label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="contact-message" className={labelClass}>
            {t("formMessage")}
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={6}
            className={`${inputClass} resize-y min-h-[140px]`}
          />
        </div>

        {status === "success" ? (
          <p className="text-sm text-[#0f677d]" role="status">
            {t("formSuccess")}
          </p>
        ) : null}
        {status === "error" ? (
          <p className="text-sm text-red-700" role="alert">
            {t("formError")}
          </p>
        ) : null}
        {status === "not_configured" ? (
          <p className="text-sm text-amber-800" role="status">
            {t("formNotConfigured")}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex w-full items-center justify-center border border-[#1f3a40]/25 bg-[#1f3a40] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#0f677d] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "sending" ? t("formSending") : t("formSubmit")}
        </button>
      </form>
    </>
  );
}
