# Requirements Document

## Introduction

Shine Tea House is a minimalistic e-commerce web application for an online tea store shipping from Los Angeles, CA. The store sells 8 premium tea products sourced in collaboration with Beijing Yabaolou Tea House in Beijing, China. The application features a Japanese-inspired aesthetic using white, light green, orange/red, and light blue tones. Checkout is handled via PayPal redirect (no on-site payment processing), and order confirmation emails are sent via Resend. There are no user accounts, no cart, and no inventory tracking — keeping the experience simple and focused.

---

## Glossary

- **App**: The Shine Tea House Next.js web application
- **Visitor**: Any person browsing the App without an account
- **Product_Page**: An individual page displaying details for a single tea product
- **PayPal_Redirect**: The mechanism by which the App sends the Visitor to PayPal's hosted checkout to complete a purchase
- **Resend**: The third-party email delivery service used to send order confirmation emails
- **Order_Confirmation_Email**: A transactional email sent to the Visitor after a successful PayPal payment
- **Hero_Section**: The top banner area of the Home page containing imagery and introductory text
- **About_Page**: The page at `/about` displaying brand information and the Beijing Yabaolou Tea House collaboration
- **Contact_Page**: The dedicated page at `/contact` containing the contact form and business location
- **Admin**: The developer or store owner who updates product data directly in the codebase

---

## Requirements

### Requirement 1: Home Page

**User Story:** As a Visitor, I want to see an attractive home page that shows all available teas, so that I can understand what Shine Tea House offers and immediately start browsing products.

#### Acceptance Criteria

1. THE App SHALL render a Home page at the root URL (`/`)
2. THE Hero_Section SHALL display at least one static photo image (no video) at the top of the Home page
3. THE Home page SHALL display a brief introductory text about Shine Tea House below the Hero_Section
4. THE Home page SHALL display all 8 tea products in a responsive grid layout below the introductory text
5. THE Home page SHALL display each product's name, price, and at least one photo thumbnail
6. WHEN a Visitor clicks a product, THE App SHALL navigate the Visitor to the corresponding Product_Page

---

### Requirement 2: Individual Product Pages

**User Story:** As a Visitor, I want to view detailed information about a tea product, so that I can decide whether to purchase it.

#### Acceptance Criteria

1. THE App SHALL render a Product_Page at `/shop/[product-slug]` for each of the 8 products
2. THE Product_Page SHALL display between 1 and 3 product photos
3. THE Product_Page SHALL display the product name, price, description, and materials/ingredients (placeholder text acceptable at launch)
4. THE Product_Page SHALL display the following notice: "Shine Tea House makes this item with help from Beijing Yabaolou Tea House, Beijing, China. Returns & exchanges accepted within 30 days."
5. THE Product_Page SHALL display a "Buy Now" button that initiates a PayPal_Redirect for that product
6. WHEN a Visitor clicks "Buy Now", THE App SHALL redirect the Visitor to PayPal's hosted checkout page with the correct product name and price pre-filled

---

### Requirement 3: About Us Page

**User Story:** As a Visitor, I want to learn about Shine Tea House, so that I can understand the brand and its origins.

#### Acceptance Criteria

1. THE App SHALL render an About_Page at `/about`
2. THE About_Page SHALL display placeholder copy describing Shine Tea House
3. THE About_Page SHALL mention the collaboration with Beijing Yabaolou Tea House, Beijing, China

---

### Requirement 4: Contact Us Page

**User Story:** As a Visitor, I want to find contact information and reach out with questions, so that I can get help or more information about Shine Tea House.

#### Acceptance Criteria

1. THE App SHALL render a Contact_Page at `/contact`
2. THE Contact_Page SHALL display a contact form with fields for name, phone number, and email address
3. THE Contact_Page SHALL display the business location as Los Angeles, CA
4. THE Contact_Page SHALL NOT include a map embed
5. THE Contact_Page SHALL NOT require form submission to function (display-only contact info is acceptable)

---

### Requirement 5: Product Catalog

**User Story:** As a Visitor, I want to see accurate product names and prices, so that I know what I am purchasing.

#### Acceptance Criteria

1. THE App SHALL include the following 8 products with the specified prices:
   - Milk Oolong Tea — $25.00
   - Tieguanyin Tea — $40.00
   - Shou Puer Tea — $30.00
   - Shen Pu-erh Tea — $33.00
   - Da Hong Pao Pressed — $30.00
   - Da Hong Pao — $30.00
   - Hainan Oolong Tea — $25.00
   - Green Jasmine Tea — $25.00
2. THE App SHALL store product data (name, price, description, image paths) in a single, centralized data file so that the Admin can update products without modifying page components
3. THE App SHALL support 1 to 3 image files per product, stored under a documented directory (e.g., `public/images/products/[product-slug]/`)

---

### Requirement 6: PayPal Checkout

**User Story:** As a Visitor, I want to pay for a tea product securely, so that I can complete my purchase without entering payment details on the Shine Tea House site.

#### Acceptance Criteria

1. WHEN a Visitor clicks "Buy Now" on a Product_Page, THE App SHALL construct a PayPal_Redirect URL containing the product name, price, currency (USD), and the store's PayPal account identifier
2. THE App SHALL redirect the Visitor to PayPal's hosted checkout page in the same browser tab
3. THE App SHALL NOT collect or store any payment card information on-site
4. THE App SHALL NOT implement a shopping cart — each "Buy Now" initiates a single-item PayPal_Redirect

---

### Requirement 7: Order Confirmation Email

**User Story:** As a Visitor, I want to receive a confirmation email after purchasing, so that I have a record of my order.

#### Acceptance Criteria

1. WHEN a Visitor completes a PayPal payment and is redirected back to the App's success URL, THE App SHALL trigger an Order_Confirmation_Email via Resend
2. THE Order_Confirmation_Email SHALL include the product name, price, and a thank-you message from Shine Tea House
3. THE Order_Confirmation_Email SHALL be sent to the email address provided by PayPal in the return redirect parameters
4. IF the Resend API call fails, THEN THE App SHALL log the error and display a success page to the Visitor regardless (payment is already complete)

---

### Requirement 8: Shipping Information

**User Story:** As a Visitor, I want to know shipping costs before completing my purchase, so that I can make an informed buying decision.

#### Acceptance Criteria

1. THE App SHALL display shipping information indicating that orders ship from Los Angeles, CA
2. THE App SHALL support US domestic shipping only
3. WHERE real-time carrier rate calculation is not feasible to implement, THE App SHALL display a flat-rate US shipping fee clearly on the Product_Page or during PayPal checkout configuration
4. THE App SHALL NOT misrepresent shipping costs to the Visitor

---

### Requirement 9: Visual Design and Branding

**User Story:** As a Visitor, I want the site to feel cohesive and on-brand, so that I have a pleasant browsing experience.

#### Acceptance Criteria

1. THE App SHALL apply a minimal, Japanese-inspired visual style throughout all pages
2. THE App SHALL use the following color palette: white, light green, orange/red, and light blue
3. THE App SHALL use consistent typography and spacing across all pages
4. THE App SHALL be responsive and render correctly on mobile, tablet, and desktop viewport sizes
5. WHEN a page is loading, THE App SHALL display a layout that avoids cumulative layout shift (no unstyled flash of content)

---

### Requirement 10: Navigation

**User Story:** As a Visitor, I want to navigate between pages easily, so that I can explore the site without confusion.

#### Acceptance Criteria

1. THE App SHALL display a persistent navigation bar on all pages containing links to: Home, About Us, and Contact Us
2. THE App SHALL display a footer on all pages containing the business name and location (Los Angeles, CA)
3. WHEN a Visitor navigates between pages, THE App SHALL preserve scroll position at the top of the new page

---

### Requirement 11: Media Asset Management

**User Story:** As an Admin, I want a clear and documented location for product images, so that I can add or replace photos without breaking the site.

#### Acceptance Criteria

1. THE App SHALL store all product images under `public/images/products/[product-slug]/` where `[product-slug]` is the URL-safe name of the product
2. THE App SHALL reference product images using relative paths from the `public/` directory
3. THE App SHALL document the expected image directory structure in a `README.md` at the project root
4. WHERE a product image file is missing, THE App SHALL display a placeholder image rather than a broken image element

---

### Requirement 12: Deployment and Hosting

**User Story:** As an Admin, I want the app deployed on Vercel with a custom domain, so that Visitors can access it reliably.

#### Acceptance Criteria

1. THE App SHALL be deployable to Vercel using standard Next.js build output
2. THE App SHALL be configured to serve all pages over HTTPS
3. THE App SHALL store all secrets (PayPal account ID, Resend API key) as environment variables and SHALL NOT commit them to the GitHub repository
4. THE App SHALL include a `.env.example` file documenting all required environment variables

---
