import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';
import {test, expect} from 'vitest';
import { MemoryRouter } from "react-router-dom";

test('renders without crashing', () => {
  render(<MemoryRouter>
    <Home />
  </MemoryRouter>
  );
  const element = screen.getByText(/Welcome to Dota 2 Stats Hub/i);
  expect(element).toBeInTheDocument();
});
