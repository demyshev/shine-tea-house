export default function ContactPage() {
  return (
    <main style={{ backgroundColor: "var(--color-bg)" }} className="min-h-screen">

      {/* Header band */}
      <section
        style={{ backgroundColor: "var(--color-bg-blue)", borderBottom: "0.5px solid var(--color-border)" }}
        className="px-6 py-16 text-center"
      >
        <p
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-text-muted)",
            fontSize: "0.7rem",
            fontWeight: 300,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            marginBottom: "14px",
          }}
        >
          Get in Touch
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-text)",
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: 300,
            letterSpacing: "0.1em",
          }}
        >
          Contact Us
        </h1>
      </section>

      <div className="max-w-xl mx-auto px-6 py-14">

        {/* Contact info */}
        <div className="flex flex-col gap-2 mb-12">
          {[
            ["Location", "Los Angeles, CA"],
            ["Email", "contact@shineteahouse.com"],
            ["Phone", "(213) 555-0100"],
          ].map(([label, value]) => (
            <div key={label} className="flex gap-4 items-baseline">
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-text-muted)",
                  fontSize: "0.68rem",
                  fontWeight: 300,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  minWidth: "72px",
                }}
              >
                {label}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-text)",
                  fontSize: "0.88rem",
                  fontWeight: 300,
                  letterSpacing: "0.04em",
                }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>

        <div style={{ height: "0.5px", backgroundColor: "var(--color-border)", marginBottom: "40px" }} />

        {/* Contact form */}
        <form className="space-y-6">
          {[
            { id: "name", label: "Name", type: "text", placeholder: "Your name" },
            { id: "phone", label: "Phone", type: "tel", placeholder: "Your phone number" },
            { id: "email", label: "Email", type: "email", placeholder: "Your email address" },
          ].map(({ id, label, type, placeholder }) => (
            <div key={id} className="flex flex-col gap-2">
              <label
                htmlFor={id}
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-text-muted)",
                  fontSize: "0.68rem",
                  fontWeight: 300,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                {label}
              </label>
              <input
                id={id}
                name={id}
                type={type}
                placeholder={placeholder}
                style={{
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
                }}
              />
            </div>
          ))}

          <button
            type="button"
            style={{
              fontFamily: "var(--font-body)",
              backgroundColor: "var(--color-orange-red)",
              color: "var(--color-white)",
              fontSize: "0.72rem",
              fontWeight: 300,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              padding: "12px 32px",
              border: "none",
              borderRadius: "3px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
}
