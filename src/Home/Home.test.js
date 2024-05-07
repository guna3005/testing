// Home.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home', () => {
  it('renders the Home component with expected text', () => {
    render(<Home />);
    expect(screen.getByText(/Hey There, Savvy Spender!/i)).toBeInTheDocument();
  });
});
