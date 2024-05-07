// Dashboard.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';

describe('Dashboard', () => {
  it('shows dashboard statistics', () => {
    render(<Dashboard />);
    expect(screen.getByText(/Visualizations of Budgets and Expenses/i)).toBeInTheDocument();
  });
});
