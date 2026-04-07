import { buildPayPalUrl } from './paypal';

const product = {
  name: 'Milk Oolong Tea',
  price: 25.00,
  slug: 'milk-oolong-tea',
};

beforeEach(() => {
  process.env.PAYPAL_BUSINESS_EMAIL = 'shop@shineteahouse.com';
  process.env.NEXT_PUBLIC_BASE_URL = 'https://shineteahouse.com';
  process.env.FLAT_RATE_SHIPPING_US = '5.00';
});

afterEach(() => {
  delete process.env.PAYPAL_BUSINESS_EMAIL;
  delete process.env.NEXT_PUBLIC_BASE_URL;
  delete process.env.FLAT_RATE_SHIPPING_US;
});

describe('buildPayPalUrl', () => {
  it('contains item_name matching the product name', () => {
    const url = buildPayPalUrl(product);
    expect(url).toContain('item_name=Milk+Oolong+Tea');
  });

  it('contains the product price as amount', () => {
    const url = buildPayPalUrl(product);
    expect(url).toContain('amount=25');
  });

  it('contains currency_code=USD', () => {
    const url = buildPayPalUrl(product);
    expect(url).toContain('currency_code=USD');
  });

  it('contains the configured business email', () => {
    const url = buildPayPalUrl(product);
    expect(url).toContain('business=shop%40shineteahouse.com');
  });

  it('contains correct return URL pointing to /success', () => {
    const url = buildPayPalUrl(product);
    expect(url).toContain('return=https%3A%2F%2Fshineteahouse.com%2Fsuccess');
  });

  it('contains correct cancel_return URL pointing to /shop/{slug}', () => {
    const url = buildPayPalUrl(product);
    expect(url).toContain('cancel_return=https%3A%2F%2Fshineteahouse.com%2Fshop%2Fmilk-oolong-tea');
  });

  it('does not contain on-site payment field names', () => {
    const url = buildPayPalUrl(product);
    const forbidden = ['card', 'cvv', 'account_number', 'credit'];
    forbidden.forEach((field) => {
      expect(url.toLowerCase()).not.toContain(field);
    });
  });

  it('throws in development when PAYPAL_BUSINESS_EMAIL is missing', () => {
    const originalEnv = process.env.NODE_ENV;
    Object.defineProperty(process.env, 'NODE_ENV', { value: 'development', configurable: true });
    delete process.env.PAYPAL_BUSINESS_EMAIL;
    expect(() => buildPayPalUrl(product)).toThrow('PAYPAL_BUSINESS_EMAIL');
    Object.defineProperty(process.env, 'NODE_ENV', { value: originalEnv, configurable: true });
  });
});
