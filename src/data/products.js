export const products = [
  {
    slug: "milk-oolong-tea",
    name: "Milk Oolong Tea",
    price: 25.00,
    description: "A smooth, creamy oolong with a naturally sweet finish. Placeholder description.",
    materials: "100% Milk Oolong Tea leaves. Placeholder materials.",
    images: ["/images/products/milk-oolong-tea/1.jpg"],
  },
  {
    slug: "tieguanyin-tea",
    name: "Tieguanyin Tea",
    price: 40.00,
    description: "A classic Iron Goddess of Mercy oolong with a floral, lingering aroma. Placeholder description.",
    materials: "100% Tieguanyin Tea leaves. Placeholder materials.",
    images: ["/images/products/tieguanyin-tea/1.jpg"],
  },
  {
    slug: "shou-puer-tea",
    name: "Shou Puer Tea",
    price: 30.00,
    description: "A rich, earthy aged pu-erh with a deep, mellow character. Placeholder description.",
    materials: "100% Shou Pu-erh Tea leaves. Placeholder materials.",
    images: ["/images/products/shou-puer-tea/1.jpg"],
  },
  {
    slug: "shen-pu-erh-tea",
    name: "Shen Pu-erh Tea",
    price: 33.00,
    description: "A raw pu-erh with a bright, complex flavor that deepens with age. Placeholder description.",
    materials: "100% Shen Pu-erh Tea leaves. Placeholder materials.",
    images: ["/images/products/shen-pu-erh-tea/1.jpg"],
  },
  {
    slug: "da-hong-pao-pressed",
    name: "Da Hong Pao Pressed",
    price: 30.00,
    description: "Pressed Da Hong Pao oolong with a roasted, mineral-rich depth. Placeholder description.",
    materials: "100% Da Hong Pao Tea leaves. Placeholder materials.",
    images: ["/images/products/da-hong-pao-pressed/1.jpg"],
  },
  {
    slug: "da-hong-pao",
    name: "Da Hong Pao",
    price: 30.00,
    description: "A legendary Wuyi rock oolong with a bold, roasted complexity. Placeholder description.",
    materials: "100% Da Hong Pao Tea leaves. Placeholder materials.",
    images: ["/images/products/da-hong-pao/1.jpg"],
  },
  {
    slug: "hainan-oolong-tea",
    name: "Hainan Oolong Tea",
    price: 25.00,
    description: "A tropical island oolong with a light, refreshing character. Placeholder description.",
    materials: "100% Hainan Oolong Tea leaves. Placeholder materials.",
    images: ["/images/products/hainan-oolong-tea/1.jpg"],
  },
  {
    slug: "green-jasmine-tea",
    name: "Green Jasmine Tea",
    price: 25.00,
    description: "Delicate green tea scented with fresh jasmine blossoms. Placeholder description.",
    materials: "100% Green Tea leaves with jasmine flowers. Placeholder materials.",
    images: ["/images/products/green-jasmine-tea/1.jpg"],
  },
];

export function getAllProducts() {
  return products;
}

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug) ?? null;
}
