import { getAllProducts, getProductBySlug } from './products';

describe('getAllProducts', () => {
  it('returns exactly 8 products', () => {
    expect(getAllProducts()).toHaveLength(8);
  });

  it('each product has required fields', () => {
    const requiredFields = ['slug', 'name', 'price', 'description', 'materials', 'images'];
    getAllProducts().forEach((product) => {
      requiredFields.forEach((field) => {
        expect(product).toHaveProperty(field);
      });
    });
  });
});

describe('getProductBySlug', () => {
  it('returns the correct product for a valid slug', () => {
    const product = getProductBySlug('milk-oolong-tea');
    expect(product).not.toBeNull();
    expect(product.slug).toBe('milk-oolong-tea');
    expect(product.name).toBe('Milk Oolong Tea');
    expect(product.price).toBe(25.00);
  });

  it('returns null for an unknown slug', () => {
    expect(getProductBySlug('unknown-slug')).toBeNull();
  });
});
