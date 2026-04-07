import Link from "next/link";
import ProductImage from "./ProductImage";

export default function ProductCard({ product }) {
  const { slug, name, price, images } = product;
  const thumbnail = images?.[0] ?? "/images/placeholder.jpg";

  return (
    <Link
      href={`/shop/${slug}`}
      className="group block bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden transition-transform duration-200 hover:scale-[1.02] hover:shadow-md"
    >
      <div className="relative w-full aspect-square">
        <ProductImage
          src={thumbnail}
          alt={name}
          width={400}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium tracking-wide text-gray-800 mb-1">
          {name}
        </h3>
        <p className="text-sm text-gray-500">
          ${price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
