import { render, screen } from '@testing-library/react';
import StartPage from 'pages/StartPage';
import {test, expect} from 'vitest';
import { MemoryRouter } from "react-router-dom";

test('renders without crashing', () => {
  render(<MemoryRouter>
    <StartPage />
  </MemoryRouter>
  );
  const element = screen.getByText(/Welcome to Dota 2 Stats Hub/i);
  expect(element).toBeInTheDocument();
});
