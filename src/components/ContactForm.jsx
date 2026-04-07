"use client";

import { useState } from "react";

const inputStyle = {
  fontFamily: "var(--font-body)",
  fontWeight: 300,
  fontSize: "0.88rem",
  color: "var(--color-text)",
  backgroundColor: "var(--color-bg-alt)",
  border: "0.5px solid var(--color-border)",
  borderRadius: "3px",
  padding: "10px 14px",
  outline: "none",
  letterSpacing: "0.04em",
  width: "100%",
};

const labelStyle = {
  fontFamily: "var(--font-body)",
  color: "var(--color-text-muted)",
  fontSize: "0.68rem",
  fontWeight: 300,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
};

export default function ContactForm() {
  const [fields, setFields] = useState({ name: "", phone: "", email: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  function handleChange(e) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const data = await res.json();
      setStatus(data.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p style={{
        fontFamily: "var(--font-display)",
        color: "var(--color-text)",
        fontSize: "1.05rem",
        fontWeight: 400,
        lineHeight: 1.8,
        textAlign: "center",
        padding: "32px 0",
      }}>
        Thank you — we&apos;ll be in touch soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {[
        { id: "name", label: "Name", type: "text", placeholder: "Your name" },
        { id: "phone", label: "Phone", type: "tel", placeholder: "Your phone number" },
        { id: "email", label: "Email", type: "email", placeholder: "Your email address" },
      ].map(({ id, label, type, placeholder }) => (
        <div key={id} className="flex flex-col gap-2">
          <label htmlFor={id} style={labelStyle}>{label}</label>
          <input
            id={id}
            name={id}
            type={type}
            placeholder={placeholder}
            value={fields[id]}
            onChange={handleChange}
            required={id !== "phone"}
            style={inputStyle}
          />
        </div>
      ))}

      {status === "error" && (
        <p style={{ fontFamily: "var(--font-body)", color: "var(--color-orange-red)", fontSize: "0.8rem", fontWeight: 300 }}>
          Something went wrong. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        style={{
          fontFamily: "var(--font-body)",
          backgroundColor: status === "loading" ? "var(--color-text-muted)" : "var(--color-orange-red)",
          color: "var(--color-white)",
          fontSize: "0.72rem",
          fontWeight: 300,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          padding: "12px 32px",
          border: "none",
          borderRadius: "3px",
          cursor: status === "loading" ? "not-allowed" : "pointer",
          width: "100%",
          transition: "background-color 0.2s",
        }}
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
