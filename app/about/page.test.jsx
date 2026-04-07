import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutPage from './page';

describe('AboutPage', () => {
  it('renders the About Us heading', () => {
    render(<AboutPage />);
    expect(screen.getByRole('heading', { name: /about us/i })).toBeInTheDocument();
  });

  it('mentions Beijing Yabaolou Tea House', () => {
    render(<AboutPage />);
    expect(screen.getByText(/Beijing Yabaolou/)).toBeInTheDocument();
  });
});
