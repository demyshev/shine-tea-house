import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductImage from './ProductImage';

// Mock next/image as a plain <img> for testing
jest.mock('next/image', () => {
  return function MockImage({ src, alt, onError, width, height, className }) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onError={onError}
      />
    );
  };
});

describe('ProductImage', () => {
  it('renders with the provided src initially', () => {
    const { getByRole } = render(
      <ProductImage src="/images/products/milk-oolong-tea/1.jpg" alt="Milk Oolong Tea" />
    );
    const img = getByRole('img');
    expect(img).toHaveAttribute('src', '/images/products/milk-oolong-tea/1.jpg');
  });

  it('falls back to placeholder.jpg when onError fires', () => {
    const { getByRole } = render(
      <ProductImage src="/images/products/missing.jpg" alt="Missing product" />
    );
    const img = getByRole('img');
    fireEvent.error(img);
    expect(img).toHaveAttribute('src', '/images/placeholder.jpg');
  });

  it('uses default width and height of 400 when not provided', () => {
    const { getByRole } = render(
      <ProductImage src="/images/placeholder.jpg" alt="Test" />
    );
    const img = getByRole('img');
    expect(img).toHaveAttribute('width', '400');
    expect(img).toHaveAttribute('height', '400');
  });
});
