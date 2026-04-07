import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactPage from './page';

describe('ContactPage', () => {
  it('renders the Contact Us heading', () => {
    render(<ContactPage />);
    expect(screen.getByRole('heading', { name: /contact us/i })).toBeInTheDocument();
  });

  it('displays Los Angeles, CA', () => {
    render(<ContactPage />);
    expect(screen.getByText(/Los Angeles, CA/)).toBeInTheDocument();
  });

  it('has a Name input field', () => {
    render(<ContactPage />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  });

  it('has a Phone input field', () => {
    render(<ContactPage />);
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
  });

  it('has an Email input field', () => {
    render(<ContactPage />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it('does not contain an iframe (no map embed)', () => {
    const { container } = render(<ContactPage />);
    expect(container.querySelector('iframe')).toBeNull();
  });
});
