/**
 * Order confirmation email template.
 * Props: { productName, price, email }
 */
export default function OrderConfirmationEmail({ productName, price, email }) {
  return (
    <html>
      <body style={{ fontFamily: "sans-serif", color: "#333", maxWidth: "600px", margin: "0 auto", padding: "24px" }}>
        <h1 style={{ fontSize: "24px", marginBottom: "16px" }}>Thank you for your order!</h1>

        <p>Hi{email ? ` ${email}` : ""},</p>

        <p>
          We&apos;re so grateful for your purchase. Your order has been received and is being prepared with care.
        </p>

        <table style={{ width: "100%", borderCollapse: "collapse", margin: "24px 0" }}>
          <tbody>
            <tr>
              <td style={{ padding: "8px 0", fontWeight: "bold" }}>Product</td>
              <td style={{ padding: "8px 0" }}>{productName}</td>
            </tr>
            <tr>
              <td style={{ padding: "8px 0", fontWeight: "bold" }}>Price</td>
              <td style={{ padding: "8px 0" }}>${price}</td>
            </tr>
          </tbody>
        </table>

        <p>
          Your order ships from <strong>Los Angeles, CA</strong>. You&apos;ll receive a shipping notification once
          your tea is on its way.
        </p>

        <p>
          <strong>Returns &amp; Exchanges:</strong> We accept returns and exchanges within <strong>30 days</strong> of
          delivery. Please reach out to us if you have any questions.
        </p>

        <p style={{ marginTop: "32px" }}>
          With gratitude,
          <br />
          <strong>Shine Tea House</strong>
        </p>
      </body>
    </html>
  );
}

/**
 * Renders the order confirmation email to an HTML string.
 * Uses a plain HTML template to avoid react-dom/server import restrictions in Next.js App Router.
 * @param {{ productName: string, price: string|number, email?: string }} params
 * @returns {string}
 */
export function renderOrderConfirmationEmail({ productName, price, email = "" }) {
  const greeting = email ? `Hi ${email},` : "Hi,";
  return `<!DOCTYPE html>
<html>
<body style="font-family:sans-serif;color:#333;max-width:600px;margin:0 auto;padding:24px">
  <h1 style="font-size:24px;margin-bottom:16px">Thank you for your order!</h1>
  <p>${greeting}</p>
  <p>We're so grateful for your purchase. Your order has been received and is being prepared with care.</p>
  <table style="width:100%;border-collapse:collapse;margin:24px 0">
    <tbody>
      <tr>
        <td style="padding:8px 0;font-weight:bold">Product</td>
        <td style="padding:8px 0">${productName}</td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-weight:bold">Price</td>
        <td style="padding:8px 0">$${price}</td>
      </tr>
    </tbody>
  </table>
  <p>Your order ships from <strong>Los Angeles, CA</strong>. You'll receive a shipping notification once your tea is on its way.</p>
  <p><strong>Returns &amp; Exchanges:</strong> We accept returns and exchanges within <strong>30 days</strong> of delivery. Please reach out to us if you have any questions.</p>
  <p style="margin-top:32px">With gratitude,<br/><strong>Shine Tea House</strong></p>
</body>
</html>`;
}
