export default function AboutPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1
        className="text-3xl font-light tracking-widest mb-10 text-center"
        style={{ color: "var(--color-orange-red)" }}
      >
        About Us
      </h1>

      <section className="space-y-6 text-gray-600 leading-relaxed text-base md:text-lg">
        <p>
          Shine Tea House is a premium tea store based in Los Angeles, CA,
          dedicated to bringing the finest teas from across Asia to your cup.
          We believe that great tea is more than a beverage — it is a moment of
          stillness, a ritual, and a connection to centuries of tradition.
        </p>

        <p>
          We source our teas in collaboration with Beijing Yabaolou Tea House,
          Beijing, China.
        </p>

        <p>
          Our philosophy is simple: offer only teas we would drink ourselves,
          presented with honesty and care. Every selection in our catalog is
          chosen for its quality, provenance, and character — nothing more,
          nothing less.
        </p>
      </section>
    </main>
  );
}
