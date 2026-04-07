import { Resend } from "resend";
import { renderOrderConfirmationEmail } from "@/src/emails/OrderConfirmation";

// POST /api/confirm-order
// Body: { email, productName, price }
// Returns: { ok: true } or { ok: false, error: string }
export async function POST(request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const { email, productName, price } = body ?? {};

  if (!email || !productName || price == null) {
    return Response.json(
      { ok: false, error: "Missing required fields: email, productName, price" },
      { status: 400 }
    );
  }

  try {
    await resend.emails.send({
      from: "Shine Tea House <orders@shineteahouse.com>",
      to: email,
      subject: "Your Shine Tea House order confirmation",
      html: renderOrderConfirmationEmail({ productName, price }),
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Failed to send order confirmation email:", error);
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }
}
