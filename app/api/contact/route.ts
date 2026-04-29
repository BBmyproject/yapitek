import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const LIMITS = {
  firstName: 80,
  lastName: 80,
  email: 254,
  phone: 40,
  subject: 200,
  message: 8000,
} as const;

function isNonEmptyString(v: unknown, max: number): v is string {
  return typeof v === "string" && v.trim().length > 0 && v.length <= max;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, code: "invalid_json" },
      { status: 400 },
    );
  }

  if (body.website != null && String(body.website).trim() !== "") {
    return NextResponse.json({ ok: false, code: "spam" }, { status: 400 });
  }

  const firstName =
    typeof body.firstName === "string" ? body.firstName.trim() : "";
  const lastName =
    typeof body.lastName === "string" ? body.lastName.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone =
    typeof body.phone === "string" ? body.phone.trim().slice(0, LIMITS.phone) : "";
  const subject =
    typeof body.subject === "string" ? body.subject.trim() : "";
  const message =
    typeof body.message === "string" ? body.message.trim() : "";
  const recaptchaToken =
    typeof body.recaptchaToken === "string" ? body.recaptchaToken.trim() : "";

  if (
    !isNonEmptyString(firstName, LIMITS.firstName) ||
    !isNonEmptyString(lastName, LIMITS.lastName) ||
    !isNonEmptyString(email, LIMITS.email) ||
    !EMAIL_RE.test(email) ||
    !isNonEmptyString(subject, LIMITS.subject) ||
    !isNonEmptyString(message, LIMITS.message) ||
    !isNonEmptyString(recaptchaToken, 4000)
  ) {
    return NextResponse.json(
      { ok: false, code: "validation" },
      { status: 400 },
    );
  }

  const service = process.env.SMTP_SERVICE;
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER || process.env.GMAIL_APP_USER;
  const pass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;
  const to = process.env.CONTACT_EMAIL_TO || "info@yapitekyapi.com";
  const from = process.env.SMTP_FROM || user;
  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
  const recaptchaMinScore = Number(process.env.RECAPTCHA_MIN_SCORE || "0.5");

  if (!user || !pass || !from || !recaptchaSecret) {
    return NextResponse.json(
      { ok: false, code: "not_configured" },
      { status: 503 },
    );
  }

  try {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const remoteIp = forwardedFor?.split(",")[0]?.trim();
    const verifyBody = new URLSearchParams({
      secret: recaptchaSecret,
      response: recaptchaToken,
    });
    if (remoteIp) {
      verifyBody.set("remoteip", remoteIp);
    }

    const verifyRes = await fetch(RECAPTCHA_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: verifyBody.toString(),
      cache: "no-store",
    });

    if (!verifyRes.ok) {
      return NextResponse.json(
        { ok: false, code: "recaptcha_failed" },
        { status: 400 },
      );
    }

    const verifyData = (await verifyRes.json()) as {
      success?: boolean;
      score?: number;
      action?: string;
    };

    const score = typeof verifyData.score === "number" ? verifyData.score : 0;
    if (
      !verifyData.success ||
      verifyData.action !== "contact_form_submit" ||
      score < recaptchaMinScore
    ) {
      return NextResponse.json(
        { ok: false, code: "recaptcha_failed" },
        { status: 400 },
      );
    }
  } catch {
    return NextResponse.json(
      { ok: false, code: "recaptcha_failed" },
      { status: 400 },
    );
  }

  const text = [
    `İsim: ${firstName} ${lastName}`,
    `E-posta: ${email}`,
    `Telefon: ${phone || "—"}`,
    `Konu: ${subject}`,
    "",
    message,
  ].join("\n");

  try {
    const transporter = service
      ? nodemailer.createTransport({
          service,
          auth: { user, pass },
        })
      : host
        ? nodemailer.createTransport({
            host,
            port,
            secure: process.env.SMTP_SECURE === "true",
            auth: { user, pass },
          })
        : nodemailer.createTransport({
            service: "gmail",
            auth: { user, pass },
          });

    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: `[İletişim formu] ${subject}`,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, code: "send_failed" }, { status: 502 });
  }
}
