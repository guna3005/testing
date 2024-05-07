// Home.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import expense from './Expenses';

describe('expense', () => {
  it('renders the expense', () => {
    render(< Expenses/>);
    expect(screen.getByText(/Expense List/i)).toBeInTheDocument();
  });
});
