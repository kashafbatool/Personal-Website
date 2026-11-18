import { render, screen } from '@testing-library/react';
import App from './App';

// Mock @vercel/analytics before importing App
jest.mock('@vercel/analytics/react');

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
