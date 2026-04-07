/**
 * Constructs a PayPal Standard Checkout redirect URL for a given product.
 * @param {{ name: string, price: number, slug: string }} product
 * @returns {string} Full PayPal checkout URL
 */
export function buildPayPalUrl(product) {
  const business = process.env.PAYPAL_BUSINESS_EMAIL;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const shipping = process.env.FLAT_RATE_SHIPPING_US;

  if (process.env.NODE_ENV === 'development') {
    if (!business) throw new Error('Missing required env var: PAYPAL_BUSINESS_EMAIL');
    if (!baseUrl) throw new Error('Missing required env var: NEXT_PUBLIC_BASE_URL');
    if (!shipping) throw new Error('Missing required env var: FLAT_RATE_SHIPPING_US');
  }

  const params = new URLSearchParams({
    cmd: '_xclick',
    business: business ?? '',
    item_name: product.name,
    amount: String(product.price),
    currency_code: 'USD',
    return: `${baseUrl}/success`,
    cancel_return: `${baseUrl}/shop/${product.slug}`,
    shipping: shipping ?? '',
  });

  return `https://www.paypal.com/cgi-bin/webscr?${params.toString()}`;
}
