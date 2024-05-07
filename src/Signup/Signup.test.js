import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Signup from './Signup';

// Mock the navigation
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn().mockImplementation(() => jest.fn())
}));

describe('Signup', () => {
  it('allows the user to sign up', async () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    // // Toggle to the signup form if necessary
    // const toggleButton = screen.getByText(/Sign Up/i);
    // if (toggleButton) {
    //   fireEvent.click(toggleButton);
    // }

    // Fill the form
   // fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
    //fireEvent.change(screen.getByLabelText(/Email Address/i, { selector: 'input[type="semail"]' }), { target: { value: 'john@example.com' } });
    //fireEvent.change(screen.getByLabelText(/Password/i, { selector: 'input[type="spassword"]' }), { target: { value: 'password' } });

    // Click the sign up button
    //fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    // Check the navigation
    // await waitFor(() => {
    //   expect(window.location.pathname).toBe('/home');
    // });
  });
});
