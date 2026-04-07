export default function AboutPage() {
  return (
    <main style={{ backgroundColor: "var(--color-bg)" }} className="min-h-screen">

      {/* Header band */}
      <section
        style={{ backgroundColor: "var(--color-bg-green)", borderBottom: "0.5px solid var(--color-border)" }}
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
          Our Story
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
          About Us
        </h1>
      </section>

      {/* Content */}
      <section className="max-w-2xl mx-auto px-6 py-16 space-y-8">
        {[
          "Shine Tea House is a premium tea store based in Los Angeles, CA, dedicated to bringing the finest teas from across Asia to your cup. We believe that great tea is more than a beverage — it is a moment of stillness, a ritual, and a connection to centuries of tradition.",
          "We source our teas in collaboration with Beijing Yabaolou Tea House, Beijing, China — one of the most respected tea merchants in the country.",
          "Our philosophy is simple: offer only teas we would drink ourselves, presented with honesty and care. Every selection in our catalog is chosen for its quality, provenance, and character.",
        ].map((text, i) => (
          <p
            key={i}
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-text)",
              fontSize: "1.05rem",
              fontWeight: 400,
              lineHeight: 1.9,
              letterSpacing: "0.02em",
            }}
          >
            {text}
          </p>
        ))}

        <div
          style={{
            borderLeft: "2px solid var(--color-light-green)",
            paddingLeft: "20px",
            marginTop: "8px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-text-muted)",
              fontSize: "0.82rem",
              fontWeight: 300,
              lineHeight: 1.8,
              letterSpacing: "0.04em",
            }}
          >
            Sourced in collaboration with Beijing Yabaolou Tea House · Shipped from Los Angeles, CA
          </p>
        </div>
      </section>
    </main>
  );
}
