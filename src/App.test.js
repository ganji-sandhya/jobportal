import { render, screen } from '@testing-library/react';
import App from './App';

describe('job portal app test', () => {
 it("render job portal header", () => {

  render(<App />);
  const linkElement = screen.getByText(/Job Portal/i);
  expect(linkElement).toBeInTheDocument();
 });
});
