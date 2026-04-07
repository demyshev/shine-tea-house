import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getAllProducts } from "@/src/data/products";
import ProductImage from "@/src/components/ProductImage";
import BuyNowButton from "@/src/components/BuyNowButton";

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const shippingRate = process.env.FLAT_RATE_SHIPPING_US ?? "5.00";

  return (
    <main style={{ backgroundColor: "var(--color-bg)" }} className="min-h-screen">

      {/* Back link */}
      <div style={{ borderBottom: "0.5px solid var(--color-border)" }} className="px-6 py-4">
        <Link href="/" style={{
          fontFamily: "var(--font-body)",
          color: "var(--color-text-muted)",
          fontSize: "0.72rem",
          fontWeight: 300,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          textDecoration: "none",
        }}>
          ← Shine Tea House
        </Link>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-14">
        <div className="flex flex-col md:flex-row gap-12">

          {/* Photos */}
          <div className="flex flex-col gap-3 md:w-1/2">
            {product.images.slice(0, 3).map((src, i) => (
              <ProductImage
                key={i}
                src={src}
                alt={`${product.name} photo ${i + 1}`}
                width={600}
                height={600}
                className="w-full object-cover"
                style={{ borderRadius: "3px" }}
              />
            ))}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-5 md:w-1/2 md:pt-2">
            <p style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-text-muted)",
              fontSize: "0.7rem",
              fontWeight: 300,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}>
              Shine Tea House
            </p>

            <h1 style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-text)",
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              fontWeight: 400,
              letterSpacing: "0.04em",
              lineHeight: 1.2,
            }}>
              {product.name}
            </h1>

            <p style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-orange-soft)",
              fontSize: "1.1rem",
              fontWeight: 300,
              letterSpacing: "0.08em",
            }}>
              ${product.price.toFixed(2)}
            </p>

            <div style={{ height: "0.5px", backgroundColor: "var(--color-border)" }} />

            <p style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-text)",
              fontSize: "0.88rem",
              fontWeight: 300,
              lineHeight: 1.8,
              letterSpacing: "0.02em",
            }}>
              {product.description}
            </p>

            <p style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-text-muted)",
              fontSize: "0.8rem",
              fontWeight: 300,
              lineHeight: 1.7,
            }}>
              {product.materials}
            </p>

            <div style={{ height: "0.5px", backgroundColor: "var(--color-border)" }} />

            <p style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-text-muted)",
              fontSize: "0.75rem",
              fontWeight: 300,
              lineHeight: 1.7,
              letterSpacing: "0.02em",
            }}>
              Made with help from Beijing Yabaolou Tea House, Beijing, China.
              Returns &amp; exchanges accepted within 30 days.
            </p>

            <p style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-light-blue)",
              fontSize: "0.75rem",
              fontWeight: 300,
              letterSpacing: "0.06em",
            }}>
              Ships within the US · Flat rate: ${shippingRate}
            </p>

            <div className="pt-2">
              <BuyNowButton product={product} />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
