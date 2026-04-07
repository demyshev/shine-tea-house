# Implementation Plan: Shine Tea House

## Overview

Incremental build of the Shine Tea House Next.js app: project scaffold → data layer → utility functions → pages → API route → email template → wiring and polish.

## Tasks

- [x] 1. Scaffold project and configure environment
  - Initialize a Next.js project with App Router and Tailwind CSS
  - Create `.env.example` with all required variables: `PAYPAL_BUSINESS_EMAIL`, `NEXT_PUBLIC_BASE_URL`, `RESEND_API_KEY`, `FLAT_RATE_SHIPPING_US`
  - Create `public/images/products/` directory structure with one subdirectory per product slug and add a `public/images/placeholder.jpg` fallback image
  - Create `README.md` documenting the image directory structure
  - _Requirements: 11.1, 11.3, 12.3, 12.4_

- [x] 2. Implement product data layer
  - [x] 2.1 Create `src/data/products.js` with all 8 products (slug, name, price, description, materials, images)
    - Include all catalog entries from the design with correct names and prices
    - _Requirements: 5.1, 5.2, 5.3_

  - [ ]* 2.2 Write property test for catalog data integrity (Property 6)
    - **Property 6: All catalog products have correct names, prices, and valid image paths**
    - **Validates: Requirements 5.1, 5.3, 11.2**
    - `// Feature: shine-tea-house, Property 6: All catalog products have correct names, prices, and valid image paths`

  - [x] 2.3 Write unit tests for `getProductBySlug` and `getAllProducts`
    - Test valid slug returns correct product, unknown slug returns `null`, `getAllProducts` returns exactly 8 items
    - _Requirements: 5.1, 5.2_

- [x] 3. Implement `buildPayPalUrl` utility
  - [x] 3.1 Create `src/lib/paypal.js` implementing `buildPayPalUrl(product)`
    - Construct URL with `cmd=_xclick`, `business`, `item_name`, `amount`, `currency_code=USD`, `return`, `cancel_return`, `shipping` from env vars
    - Throw descriptive error in development if required env vars are missing
    - _Requirements: 6.1, 6.2, 8.3_

  - [ ]* 3.2 Write property test for PayPal URL required fields (Property 4)
    - **Property 4: PayPal URL contains all required checkout fields for any product**
    - **Validates: Requirements 6.1, 2.6**
    - `// Feature: shine-tea-house, Property 4: PayPal URL contains all required checkout fields for any product`

  - [ ]* 3.3 Write property test for PayPal URL no on-site payment fields (Property 5)
    - **Property 5: PayPal URL never contains on-site payment fields for any product**
    - **Validates: Requirements 6.3**
    - `// Feature: shine-tea-house, Property 5: PayPal URL never contains on-site payment fields for any product`

- [x] 4. Implement shared layout components
  - [x] 4.1 Create `components/Navbar.jsx` with links to Home, About Us, and Contact Us
    - _Requirements: 10.1_

  - [x] 4.2 Create `components/Footer.jsx` displaying business name and "Los Angeles, CA"
    - _Requirements: 10.2_

  - [x] 4.3 Create root layout (`app/layout.jsx`) that wraps all pages with `Navbar` and `Footer`, applies Tailwind base styles and color palette (white, light green, orange/red, light blue)
    - _Requirements: 9.1, 9.2, 9.3, 10.1, 10.2_

  - [ ]* 4.4 Write property test for Navbar and Footer presence on every page (Property 9)
    - **Property 9: Navbar and footer are present on every page**
    - **Validates: Requirements 10.1, 10.2**
    - `// Feature: shine-tea-house, Property 9: Navbar and footer are present on every page`

- [x] 5. Implement product display components
  - [x] 5.1 Create `components/ProductImage.jsx` — Next.js `<Image>` wrapper with `onError` fallback to `/images/placeholder.jpg`
    - _Requirements: 11.4_

  - [x] 5.2 Create `components/ProductCard.jsx` displaying product thumbnail, name, and price; links to `/shop/[slug]`
    - _Requirements: 1.5, 1.6_

  - [ ]* 5.3 Write property test for ProductCard required fields (Property 1)
    - **Property 1: ProductCard renders required fields for any product**
    - **Validates: Requirements 1.5**
    - `// Feature: shine-tea-house, Property 1: ProductCard renders required fields for any product`

  - [x] 5.4 Write unit test for `ProductImage` placeholder fallback
    - Assert placeholder renders when image src is invalid
    - _Requirements: 11.4_

- [x] 6. Implement Home page
  - [x] 6.1 Create `app/page.jsx` (Server Component) with Hero section (static image), introductory text, and product grid using `ProductCard`
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

  - [ ]* 6.2 Write property test for product grid count (Property 2)
    - **Property 2: Product grid displays all products in the catalog**
    - **Validates: Requirements 1.4**
    - `// Feature: shine-tea-house, Property 2: Product grid displays all products in the catalog`

- [x] 7. Implement Product page
  - [x] 7.1 Create `components/BuyNowButton.jsx` (Client Component) that calls `buildPayPalUrl` and sets `window.location.href`
    - _Requirements: 2.5, 6.2_

  - [x] 7.2 Create `app/shop/[slug]/page.jsx` (Server Component) displaying 1–3 product photos, name, price, description, materials, the Beijing Yabaolou notice, shipping info, and `BuyNowButton`; call `notFound()` for unknown slugs
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 8.1, 8.2, 8.3_

  - [ ]* 7.3 Write property test for product page required fields (Property 3)
    - **Property 3: Product page renders all required fields for any product**
    - **Validates: Requirements 2.3**
    - `// Feature: shine-tea-house, Property 3: Product page renders all required fields for any product`

  - [ ]* 7.4 Write property test for displayed shipping rate (Property 8)
    - **Property 8: Displayed shipping rate matches configured rate for any product page**
    - **Validates: Requirements 8.3, 8.4**
    - `// Feature: shine-tea-house, Property 8: Displayed shipping rate matches configured rate for any product page`

- [x] 8. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 9. Implement About and Contact pages
  - [x] 9.1 Create `app/about/page.jsx` with placeholder brand copy and mention of Beijing Yabaolou Tea House collaboration
    - _Requirements: 3.1, 3.2, 3.3_

  - [x] 9.2 Create `app/contact/page.jsx` with display-only contact form (name, phone, email fields) and "Los Angeles, CA" — no map embed, no submission handler
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

  - [x] 9.3 Write unit tests for About and Contact pages
    - About: assert "Beijing Yabaolou" text present
    - Contact: assert name/phone/email fields and "Los Angeles, CA" present; assert no map embed
    - _Requirements: 3.3, 4.2, 4.3, 4.4_

- [x] 10. Implement order confirmation email and API route
  - [x] 10.1 Create email template component (e.g., `src/emails/OrderConfirmation.jsx`) rendering product name, price, and thank-you message
    - _Requirements: 7.2_

  - [ ]* 10.2 Write property test for email template required fields (Property 7)
    - **Property 7: Order confirmation email contains required fields for any product**
    - **Validates: Requirements 7.2**
    - `// Feature: shine-tea-house, Property 7: Order confirmation email contains required fields for any product`

  - [x] 10.3 Create `app/api/confirm-order/route.js` (POST handler) that calls Resend with the email template; return `{ ok: true }` on success, log error and return `{ ok: false, error }` on failure
    - _Requirements: 7.1, 7.3, 7.4_

- [x] 11. Implement Success page and wire email call
  - Create `app/success/page.jsx` (Client Component) that reads PayPal return query params (`item_name`, `amount`, `payer_email`), calls `POST /api/confirm-order` (fire-and-forget), and renders the success message regardless of API result
  - _Requirements: 7.1, 7.3, 7.4_

- [x] 12. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Property tests use [fast-check](https://github.com/dubzzz/fast-check) with a minimum of 100 iterations each
- Unit tests use Jest + React Testing Library
- All secrets must remain in environment variables and never be committed to the repository
