import { Resend } from "resend";

export async function POST(request) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const { name, phone, email } = body ?? {};

  if (!name || !email) {
    return Response.json({ ok: false, error: "Name and email are required" }, { status: 400 });
  }

  try {
    await resend.emails.send({
      // While you don't have a domain, Resend only allows sending TO your own
      // verified email using their shared onboarding sender.
      from: "onboarding@resend.dev",
      to: process.env.CONTACT_RECIPIENT_EMAIL,
      subject: `New message from ${name} — Shine Tea House`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone || "—"}</p>
        <p><strong>Email:</strong> ${email}</p>
      `,
    });
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Contact form email failed:", error);
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }
}
