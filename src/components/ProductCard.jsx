import Link from "next/link";
import ProductImage from "./ProductImage";

export default function ProductCard({ product }) {
  const { slug, name, price, images } = product;
  const thumbnail = images?.[0] ?? "/images/placeholder.jpg";

  return (
    <Link
      href={`/shop/${slug}`}
      className="product-card group"
    >
      <div className="relative w-full aspect-square overflow-hidden">
        <ProductImage
          src={thumbnail}
          alt={name}
          width={400}
          height={400}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <div className="px-3 py-3">
        <h3
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-text)",
            fontSize: "0.95rem",
            fontWeight: 400,
            letterSpacing: "0.04em",
            marginBottom: "4px",
          }}
        >
          {name}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-orange-soft)",
            fontSize: "0.8rem",
            fontWeight: 300,
            letterSpacing: "0.06em",
          }}
        >
          ${price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
