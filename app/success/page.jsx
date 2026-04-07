"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const itemName = searchParams.get("item_name");
  const amount = searchParams.get("amount");
  const payerEmail = searchParams.get("payer_email");

  useEffect(() => {
    if (!payerEmail) return;
    // Fire-and-forget: do not block rendering on the result
    fetch("/api/confirm-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: payerEmail,
        productName: itemName,
        price: amount,
      }),
    }).catch(() => {
      // Silently ignore — success page renders regardless
    });
  }, [payerEmail, itemName, amount]);

  return (
    <section className="max-w-xl mx-auto px-6 py-24 text-center">
      {/* Checkmark icon */}
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-8"
        style={{ backgroundColor: "var(--color-light-green)" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8"
          style={{ color: "var(--color-orange-red)" }}
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h1
        className="text-3xl font-light tracking-widest mb-4"
        style={{ color: "var(--color-orange-red)" }}
      >
        Order Confirmed!
      </h1>

      {payerEmail && (
        <p className="text-gray-600 mb-6 leading-relaxed">
          Thank you for your purchase. A confirmation email will be sent to{" "}
          <span className="font-medium text-gray-800">{payerEmail}</span>.
        </p>
      )}

      {!payerEmail && (
        <p className="text-gray-600 mb-6 leading-relaxed">
          Thank you for your purchase. A confirmation email will be sent to you shortly.
        </p>
      )}

      {(itemName || amount) && (
        <div
          className="rounded-lg px-6 py-4 mb-8 text-sm text-gray-700"
          style={{ backgroundColor: "var(--color-light-green)", opacity: 0.8 }}
        >
          {itemName && (
            <p className="mb-1">
              <span className="font-medium">Product:</span> {itemName}
            </p>
          )}
          {amount && (
            <p>
              <span className="font-medium">Amount paid:</span> ${amount}
            </p>
          )}
        </div>
      )}

      <Link
        href="/"
        className="inline-block text-sm tracking-wide px-8 py-3 rounded transition-opacity hover:opacity-80"
        style={{
          backgroundColor: "var(--color-orange-red)",
          color: "var(--color-white)",
        }}
      >
        Back to Home
      </Link>
    </section>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <section className="max-w-xl mx-auto px-6 py-24 text-center">
          <p className="text-gray-500 tracking-wide">Loading...</p>
        </section>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
