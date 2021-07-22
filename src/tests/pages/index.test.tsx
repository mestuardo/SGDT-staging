import React from 'react';
import { render } from '@testing-library/react';
import Index from '../../../pages/index';

test('Homepage renders correctly', () => {
  const { getByRole } = render(<Index />);
  expect(getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
});
