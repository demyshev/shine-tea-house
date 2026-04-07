"use client";

import { buildPayPalUrl } from "@/src/lib/paypal";

export default function BuyNowButton({ product }) {
  function handleClick() {
    const url = buildPayPalUrl(product);
    window.location.href = url;
  }

  return (
    <button
      type="button"
      aria-label={`Buy ${product.name} now via PayPal`}
      onClick={handleClick}
      style={{ backgroundColor: "var(--color-orange-red)" }}
      className="text-white font-semibold px-8 py-3 rounded-lg text-lg hover:opacity-90 transition-opacity cursor-pointer"
    >
      Buy Now
    </button>
  );
}
