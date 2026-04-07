# Design Document: Shine Tea House

## Overview

Shine Tea House is a minimalistic Japanese-inspired e-commerce web application built with Next.js (App Router), Tailwind CSS, and deployed on Vercel. The store sells 8 premium teas with a frictionless "Buy Now → PayPal redirect" checkout flow — no cart, no user accounts, no on-site payment processing.

The architecture is intentionally simple: static/server-rendered Next.js pages, a centralized product data file, a single API route for triggering order confirmation emails via Resend, and PayPal Standard Checkout via URL redirect.

### Key Design Decisions

- **No cart**: Each product page has a single "Buy Now" button that constructs a PayPal redirect URL directly. This eliminates cart state management entirely.
- **No user accounts**: Guest checkout only. No authentication, sessions, or user data stored.
- **PayPal Standard Checkout**: The app redirects to PayPal's hosted checkout page. PayPal handles all payment processing and returns the visitor to a `/success` page with query parameters.
- **Resend for email**: A Next.js API route (`/api/confirm-order`) is called from the success page to send the order confirmation email. Email failure does not block the success page.
- **Centralized product data**: All product info lives in `src/data/products.js`. No database needed.
- **Static images**: Product images are stored in `public/images/products/[slug]/` and referenced via Next.js `<Image>` with a placeholder fallback.

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                        Vercel                           │
│                                                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │              Next.js App (App Router)            │   │
│  │                                                  │   │
│  │  Pages (RSC / Client Components)                 │   │
│  │  ├── / (Home)                                    │   │
│  │  ├── /shop/[slug] (Product Page)                 │   │
│  │  ├── /about                                      │   │
│  │  ├── /contact                                    │   │
│  │  └── /success (Order confirmation landing)       │   │
│  │                                                  │   │
│  │  API Routes                                      │   │
│  │  └── /api/confirm-order (POST)                   │   │
│  │                                                  │   │
│  │  Data Layer                                      │   │
│  │  └── src/data/products.js (static product data)  │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
         │                              │
         ▼                              ▼
  ┌─────────────┐               ┌──────────────┐
  │   PayPal    │               │    Resend    │
  │  Checkout   │               │  Email API   │
  └─────────────┘               └──────────────┘
```

### Data Flow: Purchase

```
Visitor clicks "Buy Now"
        │
        ▼
buildPayPalUrl(product) → constructs redirect URL
        │
        ▼
Browser redirects to PayPal hosted checkout
        │
        ▼
Visitor completes payment on PayPal
        │
        ▼
PayPal redirects to /success?item_name=...&amount=...&payer_email=...
        │
        ▼
/success page calls POST /api/confirm-order
        │
        ▼
API route calls Resend → sends Order_Confirmation_Email
        │
        ▼
Success page renders (regardless of email result)
```

---

## Components and Interfaces

### Page Components

| Route | Component | Type | Description |
|---|---|---|---|
| `/` | `app/page.jsx` | Server Component | Hero + intro + product grid |
| `/shop/[slug]` | `app/shop/[slug]/page.jsx` | Server Component | Product detail + Buy Now |
| `/about` | `app/about/page.jsx` | Server Component | Brand story |
| `/contact` | `app/contact/page.jsx` | Server Component | Contact form (display) |
| `/success` | `app/success/page.jsx` | Client Component | Order confirmation, triggers email |

### Shared Components

| Component | Description |
|---|---|
| `components/Navbar.jsx` | Persistent nav: Home, About Us, Contact Us |
| `components/Footer.jsx` | Business name + Los Angeles, CA |
| `components/ProductCard.jsx` | Product thumbnail, name, price — used in grid |
| `components/ProductImage.jsx` | Next.js `<Image>` wrapper with placeholder fallback |
| `components/BuyNowButton.jsx` | Client component — constructs PayPal URL and redirects |

### API Routes

#### `POST /api/confirm-order`

Sends an order confirmation email via Resend.

**Request body:**
```json
{
  "email": "visitor@example.com",
  "productName": "Milk Oolong Tea",
  "price": "25.00"
}
```

**Response (success):**
```json
{ "ok": true }
```

**Response (failure):**
```json
{ "ok": false, "error": "..." }
```

The `/success` page calls this endpoint but does not block rendering on its result.

### Utility Functions

| Function | Location | Description |
|---|---|---|
| `buildPayPalUrl(product)` | `src/lib/paypal.js` | Constructs PayPal Standard Checkout redirect URL |
| `getProductBySlug(slug)` | `src/data/products.js` | Returns a product object by slug |
| `getAllProducts()` | `src/data/products.js` | Returns all 8 products |

#### `buildPayPalUrl(product)` signature

```js
// product: { name: string, price: number, slug: string }
// returns: string (full PayPal checkout URL)
function buildPayPalUrl(product) { ... }
```

Constructs a URL of the form:
```
https://www.paypal.com/cgi-bin/webscr
  ?cmd=_xclick
  &business={PAYPAL_BUSINESS_EMAIL}
  &item_name={product.name}
  &amount={product.price}
  &currency_code=USD
  &return={BASE_URL}/success
  &cancel_return={BASE_URL}/shop/{product.slug}
  &shipping={FLAT_RATE_SHIPPING_US}
```

All configurable values (`PAYPAL_BUSINESS_EMAIL`, `BASE_URL`, `FLAT_RATE_SHIPPING_US`) come from environment variables.

---

## Data Models

### Product

All product data lives in `src/data/products.js` as a plain JS array. No database.

```js
// src/data/products.js
export const products = [
  {
    slug: "milk-oolong-tea",
    name: "Milk Oolong Tea",
    price: 25.00,
    description: "A smooth, creamy oolong with a naturally sweet finish. Placeholder description.",
    materials: "100% Milk Oolong Tea leaves. Placeholder materials.",
    images: ["/images/products/milk-oolong-tea/1.jpg"],
  },
  // ... 7 more products
];
```

**Product schema:**

| Field | Type | Description |
|---|---|---|
| `slug` | `string` | URL-safe identifier, matches directory name |
| `name` | `string` | Display name |
| `price` | `number` | Price in USD |
| `description` | `string` | Product description (placeholder at launch) |
| `materials` | `string` | Ingredients/materials (placeholder at launch) |
| `images` | `string[]` | 1–3 image paths relative to `public/` |

### Full Product Catalog

| Slug | Name | Price |
|---|---|---|
| `milk-oolong-tea` | Milk Oolong Tea | $25.00 |
| `tieguanyin-tea` | Tieguanyin Tea | $40.00 |
| `shou-puer-tea` | Shou Puer Tea | $30.00 |
| `shen-pu-erh-tea` | Shen Pu-erh Tea | $33.00 |
| `da-hong-pao-pressed` | Da Hong Pao Pressed | $30.00 |
| `da-hong-pao` | Da Hong Pao | $30.00 |
| `hainan-oolong-tea` | Hainan Oolong Tea | $25.00 |
| `green-jasmine-tea` | Green Jasmine Tea | $25.00 |

### Environment Variables

Documented in `.env.example`:

```
PAYPAL_BUSINESS_EMAIL=your-paypal-email@example.com
NEXT_PUBLIC_BASE_URL=https://your-domain.com
RESEND_API_KEY=re_xxxxxxxxxxxx
FLAT_RATE_SHIPPING_US=5.00
```

`NEXT_PUBLIC_BASE_URL` is prefixed with `NEXT_PUBLIC_` so it is available in client components (needed for the PayPal return URL).

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### PBT Applicability Assessment

Most of this application is UI rendering, routing, and external service integration — areas where PBT is not appropriate. However, several areas have universal properties worth testing with property-based testing:

- `buildPayPalUrl` is a pure function whose correctness must hold for any product input
- Product data integrity (prices, image paths) must hold for every product in the catalog
- Component rendering (ProductCard, email template) must include required fields for any product

The contact form, navigation routing, and visual design requirements are best covered by example-based and snapshot tests.

---

### Property 1: ProductCard renders required fields for any product

*For any* valid product object (with name, price, and at least one image), rendering `ProductCard` SHALL produce output that contains the product name, the formatted price, and an image element.

**Validates: Requirements 1.5**

---

### Property 2: Product grid displays all products in the catalog

*For any* product catalog array, rendering the home page product grid SHALL display exactly as many product cards as there are products in the catalog — no products are omitted or duplicated.

**Validates: Requirements 1.4**

---

### Property 3: Product page renders all required fields for any product

*For any* valid product object, rendering the product page component SHALL produce output that contains the product name, price, description, and materials.

**Validates: Requirements 2.3**

---

### Property 4: PayPal URL contains all required checkout fields for any product

*For any* valid product (with a name, price, and slug), `buildPayPalUrl(product)` SHALL return a URL string that contains the product name, the product price, the currency code "USD", the configured PayPal business email, a `return` parameter pointing to `{BASE_URL}/success`, and a `cancel_return` parameter pointing to `{BASE_URL}/shop/{product.slug}`.

**Validates: Requirements 6.1, 2.6**

---

### Property 5: PayPal URL never contains on-site payment fields for any product

*For any* valid product, the URL produced by `buildPayPalUrl(product)` SHALL NOT contain any credit card field names, CVV field names, or bank account field names.

**Validates: Requirements 6.3**

---

### Property 6: All catalog products have correct names, prices, and valid image paths

*For any* product in the catalog exported from `src/data/products.js`, the product SHALL have a name matching the specification, a price matching the specification, an images array with between 1 and 3 entries, and every image path SHALL begin with `/images/products/`.

**Validates: Requirements 5.1, 5.3, 11.2**

---

### Property 7: Order confirmation email contains required fields for any product

*For any* valid product object and visitor email, the email body rendered by the confirmation email template SHALL contain the product name, the product price, and a thank-you message.

**Validates: Requirements 7.2**

---

### Property 8: Displayed shipping rate matches configured rate for any product page

*For any* configured flat-rate US shipping value, the shipping fee displayed on the product page SHALL match the configured `FLAT_RATE_SHIPPING_US` value exactly — no rounding, truncation, or substitution — and the page SHALL indicate "Ships within the US".

**Validates: Requirements 8.3, 8.4**

---

### Property 9: Navbar and footer are present on every page

*For any* page component in the application, rendering that page SHALL include both the `Navbar` component (with links to Home, About Us, and Contact Us) and the `Footer` component (with the business name and "Los Angeles, CA").

**Validates: Requirements 10.1, 10.2**

---

## Error Handling

### Missing Product Slug

If a visitor navigates to `/shop/[slug]` with an unknown slug, `getProductBySlug` returns `null`. The page component calls `notFound()` to render Next.js's built-in 404 page.

### Missing Product Image

`ProductImage` wraps Next.js `<Image>` with an `onError` handler. If the image fails to load, it falls back to `/images/placeholder.jpg`. This covers the case where product image files have not yet been added.

### PayPal Redirect Failure

The app constructs the PayPal URL client-side and performs a `window.location.href` redirect. If the URL is malformed (e.g., missing env var), the redirect will fail visibly in the browser. The `buildPayPalUrl` function validates that required env vars are present and throws a descriptive error during development. In production, missing env vars will surface as a Vercel build/runtime error.

### Order Confirmation Email Failure

Per Requirement 7.4: if the Resend API call fails, the `/api/confirm-order` route logs the error server-side and returns `{ ok: false }`. The `/success` page renders the success message regardless of the API response. The visitor's payment is already complete at this point.

### Contact Form

The contact form is display-only at launch (Requirement 4.5). No submission handler means no failure mode. If a submission handler is added later, it should follow the same pattern: show success/error state without blocking the page.

---

## Testing Strategy

### Unit Tests (Jest + React Testing Library)

Focus on specific examples, edge cases, and component behavior:

- `buildPayPalUrl`: example-based tests with known product inputs, verifying URL structure
- `getProductBySlug`: returns correct product for valid slug, returns `null` for unknown slug
- `getAllProducts`: returns exactly 8 products, each with required fields
- `ProductImage`: renders placeholder when image src is invalid
- `/success` page: renders success message even when `/api/confirm-order` returns an error
- Contact page: renders name, phone, email fields and "Los Angeles, CA" text; no map embed present
- About page: contains "Beijing Yabaolou" text

### Property-Based Tests (fast-check)

Property-based tests use [fast-check](https://github.com/dubzzz/fast-check) and run a minimum of 100 iterations each.

Each test is tagged with a comment referencing the design property:
> `// Feature: shine-tea-house, Property {N}: {property_text}`

**Property 1 test**: Generate arbitrary product objects, render `ProductCard`, assert name/price/image are present.
> `// Feature: shine-tea-house, Property 1: ProductCard renders required fields for any product`

**Property 2 test**: Generate product arrays of varying sizes, render the home page grid, assert card count equals product count.
> `// Feature: shine-tea-house, Property 2: Product grid displays all products in the catalog`

**Property 3 test**: Generate arbitrary product objects, render the product page component, assert name/price/description/materials are present.
> `// Feature: shine-tea-house, Property 3: Product page renders all required fields for any product`

**Property 4 test**: Generate arbitrary products (random names, prices, slugs), call `buildPayPalUrl`, assert URL contains item_name, amount, currency_code=USD, business email, correct return and cancel_return paths.
> `// Feature: shine-tea-house, Property 4: PayPal URL contains all required checkout fields for any product`

**Property 5 test**: Generate arbitrary products, call `buildPayPalUrl`, assert URL contains none of the known on-site payment field names (card, cvv, account_number, etc.).
> `// Feature: shine-tea-house, Property 5: PayPal URL never contains on-site payment fields for any product`

**Property 6 test**: Iterate over all products in the catalog, assert each has the correct name, price, 1–3 images, and all image paths start with `/images/products/`.
> `// Feature: shine-tea-house, Property 6: All catalog products have correct names, prices, and valid image paths`

**Property 7 test**: Generate arbitrary product objects and visitor emails, render the email template, assert product name, price, and thank-you text are present.
> `// Feature: shine-tea-house, Property 7: Order confirmation email contains required fields for any product`

**Property 8 test**: Generate arbitrary US shipping rate values, render the product page with that rate, assert the displayed value matches the input exactly and the page contains "Ships within the US".
> `// Feature: shine-tea-house, Property 8: Displayed shipping rate matches configured rate for any product page`

**Property 9 test**: For each page component, render it and assert both `Navbar` (with all three links) and `Footer` (with business name and location) are present.
> `// Feature: shine-tea-house, Property 9: Navbar and footer are present on every page`

### Integration / Smoke Tests

- Verify `/api/confirm-order` returns `{ ok: true }` when called with valid params and a valid Resend API key (run in CI with a test API key)
- Verify all 8 product slugs resolve to valid pages (smoke test via `next build`)
- Verify `.env.example` documents all required environment variables

### What Is Not Property-Tested

- Visual design, color palette, typography — manual visual review
- PayPal redirect behavior end-to-end — cannot run 100 live PayPal checkouts; covered by example test
- Resend email delivery end-to-end — covered by 1-2 integration tests
- Routing and 404 behavior — covered by example-based tests
