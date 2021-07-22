import React from 'react';
import { render } from '@testing-library/react';
import Login from '../../../pages/login';

test('Login renders correctly', () => {
  const { getByText } = render(<Login />);
  expect(getByText('Bienvenido a SGDT')).toBeInTheDocument();
});
