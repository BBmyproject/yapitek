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

  if (
    !isNonEmptyString(firstName, LIMITS.firstName) ||
    !isNonEmptyString(lastName, LIMITS.lastName) ||
    !isNonEmptyString(email, LIMITS.email) ||
    !EMAIL_RE.test(email) ||
    !isNonEmptyString(subject, LIMITS.subject) ||
    !isNonEmptyString(message, LIMITS.message)
  ) {
    return NextResponse.json(
      { ok: false, code: "validation" },
      { status: 400 },
    );
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_EMAIL_TO || "info@yapitekyapi.com";
  const from = process.env.SMTP_FROM || user;

  if (!host || !user || !pass || !from) {
    return NextResponse.json(
      { ok: false, code: "not_configured" },
      { status: 503 },
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
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: process.env.SMTP_SECURE === "true",
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
