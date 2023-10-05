import { render, screen } from '@testing-library/react';
import App from './loginpage';
import loginpage from './loginpage';/;

test('renders learn react link', () => {
  render(<loginpage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
