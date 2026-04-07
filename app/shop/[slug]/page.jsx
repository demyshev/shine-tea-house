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

  if (!product) {
    notFound();
  }

  const shippingRate = process.env.FLAT_RATE_SHIPPING_US ?? "5.00";

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Photos — left column on desktop */}
        <div className="flex flex-col gap-4 md:w-1/2">
          {product.images.slice(0, 3).map((src, i) => (
            <ProductImage
              key={i}
              src={src}
              alt={`${product.name} photo ${i + 1}`}
              width={600}
              height={600}
              className="w-full rounded-lg object-cover"
            />
          ))}
        </div>

        {/* Details — right column on desktop */}
        <div className="flex flex-col gap-4 md:w-1/2">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl font-semibold">${product.price.toFixed(2)}</p>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-gray-600 text-sm">{product.materials}</p>

          <p className="text-sm text-gray-500 border-t pt-4">
            Shine Tea House makes this item with help from Beijing Yabaolou Tea
            House, Beijing, China. Returns &amp; exchanges accepted within 30
            days.
          </p>

          <p className="text-sm text-gray-500">
            Ships within the US · Flat rate: ${shippingRate}
          </p>

          <BuyNowButton product={product} />
        </div>
      </div>
    </main>
  );
}
