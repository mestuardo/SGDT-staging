import React from 'react';
import { render } from '@testing-library/react';
import TabPanel from '../../views/tab_panel';

test('tab panel renders with correct id', () => {
  const { getByRole } = render(
    <TabPanel
      tabValue={0}
      index={0}
    >
      <p>example</p>
    </TabPanel>,
  );
  expect(getByRole('tabpanel')).toBeInTheDocument();
});
