import Image from "next/image";
import { getAllProducts } from "@/src/data/products";
import ProductCard from "@/src/components/ProductCard";

export default function HomePage() {
  const products = getAllProducts();

  return (
    <main>
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] min-h-[400px]">
        <Image
          src="/images/placeholder.jpg"
          alt="Shine Tea House"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center px-4">
          <h1
            className="text-5xl md:text-6xl font-light tracking-widest mb-4"
            style={{ color: "var(--color-white)" }}
          >
            Shine Tea House
          </h1>
          <p
            className="text-lg md:text-xl font-light tracking-wide"
            style={{ color: "var(--color-light-green)" }}
          >
            Premium teas, sourced with care.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="max-w-2xl mx-auto px-6 py-16 text-center">
        <p className="text-base md:text-lg leading-relaxed text-gray-600">
          Welcome to Shine Tea House. We offer a curated selection of premium
          teas sourced in collaboration with Beijing Yabaolou Tea House in
          Beijing, China. Shipped from Los Angeles, CA.
        </p>
      </section>

      {/* Product Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
