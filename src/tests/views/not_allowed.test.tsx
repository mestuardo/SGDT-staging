import React from 'react';
import { render } from '@testing-library/react';
import NotAllowedView from '../../views/not_allowed';

test('Not allowed renders correctly', () => {
  const { getByText } = render(<NotAllowedView />);
  expect(getByText('No tienes acceso a esta vista')).toBeInTheDocument();
});
