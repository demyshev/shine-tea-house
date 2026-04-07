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
      style={{
        fontFamily: "var(--font-body)",
        backgroundColor: "var(--color-orange-red)",
        color: "var(--color-white)",
        fontSize: "0.72rem",
        fontWeight: 300,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        padding: "14px 40px",
        border: "none",
        borderRadius: "3px",
        cursor: "pointer",
        transition: "opacity 0.2s",
      }}
      onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
      onMouseLeave={e => e.currentTarget.style.opacity = "1"}
    >
      Buy Now
    </button>
  );
}
