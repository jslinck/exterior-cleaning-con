import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { resolveVisitorAttribution } from "@/lib/attribution/resolve";
import { normalizeEmail, normalizePhone } from "@/lib/normalize";

export type FoundingListSubmission = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  instagram: string;
  company: string;
  revenue?: string;
  learn?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  let body: Partial<FoundingListSubmission>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { firstName, lastName, email, phone, instagram, company, revenue, learn } = body;

  if (
    !firstName?.trim() ||
    !lastName?.trim() ||
    !email?.trim() ||
    !phone?.trim() ||
    !instagram?.trim() ||
    !company?.trim()
  ) {
    return NextResponse.json(
      { error: "First name, last name, email, phone, Instagram handle, and company are required." },
      { status: 400 },
    );
  }

  if (!EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const emailNormalized = normalizeEmail(email);

  const contactFields = {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.trim(),
    phone: phone.trim(),
    phoneNormalized: normalizePhone(phone) || null,
    instagram: instagram.trim(),
    company: company.trim(),
    revenue: revenue?.trim() || null,
    learn: learn?.trim() || null,
  };

  // Server-resolved attribution only — never trust anything the client
  // posts for this. First-touch is permanent: this is read once, at
  // create time, and never overwrites an existing lead's attribution.
  const attribution = await resolveVisitorAttribution();

  const existing = await db.lead.findUnique({ where: { emailNormalized } });

  if (existing) {
    await db.lead.update({
      where: { emailNormalized },
      data: contactFields,
    });
  } else {
    await db.lead.create({
      data: {
        ...contactFields,
        emailNormalized,
        creatorId: attribution?.creatorId ?? null,
        referralCodeCaptured: attribution?.referralCode ?? null,
        source: attribution ? "CREATOR" : "DIRECT",
      },
    });
  }

  return NextResponse.json({ ok: true });
}
