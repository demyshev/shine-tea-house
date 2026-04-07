import Image from "next/image";
import { getAllProducts } from "@/src/data/products";
import ProductCard from "@/src/components/ProductCard";
import ContactForm from "@/src/components/ContactForm";

export default function HomePage() {
  const products = getAllProducts();

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative w-full h-[75vh] min-h-[420px]">
        <Image
          src="/images/placeholder.jpg"
          alt="Shine Tea House"
          fill
          priority
          className="object-cover"
        />
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(30,20,10,0.52) 100%)" }}
        >
          <p style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-green-muted)",
            fontSize: "0.7rem",
            fontWeight: 300,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            marginBottom: "16px",
          }}>
            Los Angeles · Est. 2026
          </p>
          <h1 style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-white)",
            fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
            fontWeight: 300,
            letterSpacing: "0.18em",
            lineHeight: 1.1,
            marginBottom: "20px",
          }}>
            Shine Tea House
          </h1>
          <div style={{ width: "40px", height: "0.5px", backgroundColor: "var(--color-green-muted)", margin: "0 auto 20px" }} />
          <p style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-blue-muted)",
            fontSize: "0.85rem",
            fontWeight: 300,
            letterSpacing: "0.12em",
          }}>
            Premium teas, sourced with care.
          </p>
        </div>
      </section>

      {/* ── Collection intro ── */}
      <section style={{ backgroundColor: "var(--color-bg-blue)" }} className="px-6 py-14">
        <div className="max-w-xl mx-auto text-center">
          <p style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-text-muted)",
            fontSize: "0.8rem",
            fontWeight: 300,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            marginBottom: "16px",
          }}>
            Our Collection
          </p>
          <p style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-text)",
            fontSize: "1.05rem",
            fontWeight: 400,
            lineHeight: 1.8,
          }}>
            A curated selection of premium teas sourced in collaboration with
            Beijing Yabaolou Tea House. Shipped from Los Angeles, CA.
          </p>
        </div>
      </section>

      {/* ── Product Grid ── */}
      <section style={{ backgroundColor: "var(--color-bg)" }} className="px-6 py-14">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── About Us ── */}
      <section id="about" style={{ backgroundColor: "var(--color-bg-green)", borderTop: "0.5px solid var(--color-border)" }} className="px-6 py-20">
        <div className="max-w-2xl mx-auto">
          <p style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-text-muted)",
            fontSize: "0.7rem",
            fontWeight: 300,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            marginBottom: "14px",
            textAlign: "center",
          }}>
            Our Story
          </p>
          <h2 style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-text)",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 300,
            letterSpacing: "0.1em",
            textAlign: "center",
            marginBottom: "48px",
          }}>
            About Us
          </h2>

          <div className="space-y-7">
            {[
              "Shine Tea House is a premium tea store based in Los Angeles, CA, dedicated to bringing the finest teas from across Asia to your cup. We believe that great tea is more than a beverage — it is a moment of stillness, a ritual, and a connection to centuries of tradition.",
              "We source our teas in collaboration with Beijing Yabaolou Tea House, Beijing, China — one of the most respected tea merchants in the country.",
              "Our philosophy is simple: offer only teas we would drink ourselves, presented with honesty and care. Every selection in our catalog is chosen for its quality, provenance, and character.",
            ].map((text, i) => (
              <p key={i} style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-text)",
                fontSize: "1.05rem",
                fontWeight: 400,
                lineHeight: 1.9,
                letterSpacing: "0.02em",
              }}>
                {text}
              </p>
            ))}

            <div style={{ borderLeft: "2px solid var(--color-light-green)", paddingLeft: "20px", marginTop: "8px" }}>
              <p style={{
                fontFamily: "var(--font-body)",
                color: "var(--color-text-muted)",
                fontSize: "0.82rem",
                fontWeight: 300,
                lineHeight: 1.8,
                letterSpacing: "0.04em",
              }}>
                Sourced in collaboration with Beijing Yabaolou Tea House · Shipped from Los Angeles, CA
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" style={{ backgroundColor: "var(--color-white)", borderTop: "0.5px solid var(--color-border)" }} className="px-6 py-20">
        <div className="max-w-xl mx-auto">
          <p style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-text-muted)",
            fontSize: "0.7rem",
            fontWeight: 300,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            marginBottom: "14px",
            textAlign: "center",
          }}>
            Get in Touch
          </p>
          <h2 style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-text)",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 300,
            letterSpacing: "0.1em",
            textAlign: "center",
            marginBottom: "48px",
          }}>
            Contact Us
          </h2>

          {/* Contact info */}
          <div className="flex flex-col gap-3 mb-12">
            {[
              ["Location", "Los Angeles, CA"],
              ["Email", "contact@shineteahouse.com"],
              ["Phone", "(213) 555-0100"],
            ].map(([label, value]) => (
              <div key={label} className="flex gap-4 items-baseline">
                <span style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-text-muted)",
                  fontSize: "0.68rem",
                  fontWeight: 300,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  minWidth: "72px",
                }}>
                  {label}
                </span>
                <span style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-text)",
                  fontSize: "0.88rem",
                  fontWeight: 300,
                  letterSpacing: "0.04em",
                }}>
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div style={{ height: "0.5px", backgroundColor: "var(--color-border)", marginBottom: "40px" }} />

          <ContactForm />
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ backgroundColor: "var(--color-bg-green)", borderTop: "0.5px solid var(--color-border)" }} className="px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-orange-red)",
              fontSize: "1.1rem",
              fontWeight: 400,
              letterSpacing: "0.1em",
            }}>
              Shine Tea House
            </p>
            <p style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-text-muted)",
              fontSize: "0.75rem",
              fontWeight: 300,
              letterSpacing: "0.1em",
              marginTop: "4px",
            }}>
              Los Angeles, CA
            </p>
          </div>
          <p style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-text-muted)",
            fontSize: "0.7rem",
            fontWeight: 300,
            letterSpacing: "0.05em",
          }}>
            © {new Date().getFullYear()} Shine Tea House
          </p>
        </div>
      </footer>
    </>
  );
}
