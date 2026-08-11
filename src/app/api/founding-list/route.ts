import { NextRequest, NextResponse } from "next/server";

export type FoundingListSubmission = {
  firstName: string;
  email: string;
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

  const { firstName, email, instagram, company, revenue, learn } = body;

  if (!firstName?.trim() || !email?.trim() || !instagram?.trim() || !company?.trim()) {
    return NextResponse.json(
      { error: "First name, email, Instagram handle, and company are required." },
      { status: 400 },
    );
  }

  if (!EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const submission: FoundingListSubmission = {
    firstName: firstName.trim(),
    email: email.trim().toLowerCase(),
    instagram: instagram.trim(),
    company: company.trim(),
    revenue: revenue?.trim() || undefined,
    learn: learn?.trim() || undefined,
  };

  // TODO: connect to the founding-list backend / email platform (e.g. a
  // CRM, ESP like Klaviyo/Mailchimp, or a database). For now this just
  // logs the submission server-side so the flow is fully wired end to end.
  console.log("[founding-list] new signup", submission);

  return NextResponse.json({ ok: true });
}
