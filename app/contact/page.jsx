export default function ContactPage() {
  return (
    <main className="max-w-xl mx-auto px-6 py-16">
      <h1
        className="text-3xl font-light tracking-widest mb-10 text-center"
        style={{ color: "var(--color-orange-red)" }}
      >
        Contact Us
      </h1>

      {/* Contact info */}
      <section className="mb-10 text-gray-600 space-y-2 text-sm tracking-wide">
        <p>Los Angeles, CA</p>
        <p>contact@shineteahouse.com</p>
        <p>(213) 555-0100</p>
      </section>

      {/* Contact form — display only */}
      <form className="space-y-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm tracking-wide text-gray-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="phone" className="text-sm tracking-wide text-gray-700">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Your phone number"
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm tracking-wide text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Your email address"
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
          />
        </div>

        <button
          type="button"
          className="w-full py-2 text-sm tracking-widest font-light text-white rounded"
          style={{ backgroundColor: "var(--color-orange-red)" }}
        >
          Send Message
        </button>
      </form>
    </main>
  );
}
