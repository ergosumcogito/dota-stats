import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';

test('renders welcome message', () => {
  render(<Home />);
  const linkElement = screen.getByText(/Welcome to Dota 2 Stats/i);
  expect(linkElement).toBeInTheDocument();
});
