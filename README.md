# Shine Tea House

A minimalistic Japanese-inspired e-commerce store for premium teas, built with Next.js (App Router) and Tailwind CSS.

## Getting Started

1. Copy `.env.example` to `.env.local` and fill in your values:
   ```bash
   cp .env.example .env.local
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Description |
|---|---|
| `PAYPAL_BUSINESS_EMAIL` | Your PayPal business account email address |
| `NEXT_PUBLIC_BASE_URL` | The public URL of your deployed site (e.g. `https://shineteahouse.com`) |
| `RESEND_API_KEY` | Your [Resend](https://resend.com) API key for sending order confirmation emails |
| `FLAT_RATE_SHIPPING_US` | Flat-rate US domestic shipping fee in USD (e.g. `5.00`) |

## Product Image Directory Structure

Product images are stored under `public/images/products/` with one subdirectory per product slug:

```
public/
└── images/
    ├── placeholder.jpg          ← fallback image shown when a product photo is missing
    └── products/
        ├── milk-oolong-tea/     ← place 1–3 photos here (1.jpg, 2.jpg, 3.jpg)
        ├── tieguanyin-tea/
        ├── shou-puer-tea/
        ├── shen-pu-erh-tea/
        ├── da-hong-pao-pressed/
        ├── da-hong-pao/
        ├── hainan-oolong-tea/
        └── green-jasmine-tea/
```

### Adding Product Photos

1. Name your photos `1.jpg`, `2.jpg`, `3.jpg` (up to 3 per product).
2. Place them in the matching `public/images/products/[product-slug]/` directory.
3. Update the `images` array in `src/data/products.js` to reference the new paths:
   ```js
   images: [
     "/images/products/milk-oolong-tea/1.jpg",
     "/images/products/milk-oolong-tea/2.jpg",
   ]
   ```

If a photo file is missing, the site automatically shows `public/images/placeholder.jpg` instead of a broken image.

## Product Catalog

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

## Deployment

Deploy to [Vercel](https://vercel.com) by connecting your GitHub repository. Add all environment variables from `.env.example` in the Vercel project settings.

## Tech Stack

- [Next.js](https://nextjs.org) — App Router
- [Tailwind CSS](https://tailwindcss.com) — styling
- [PayPal Standard Checkout](https://developer.paypal.com) — payment redirect
- [Resend](https://resend.com) — transactional email
