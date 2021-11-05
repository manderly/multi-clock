import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('The app\'s title, "Multi Clock", is visible', () => {
  render(<App />);
  const title = screen.getByText(/Multi Clock/i);
  expect(title).toBeInTheDocument();
});
