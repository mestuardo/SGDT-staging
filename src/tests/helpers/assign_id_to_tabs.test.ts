import assignIdToTab from '../../helpers/assign_id_to_tab';

test('assign id 1 to tab information', () => {
  expect(assignIdToTab(1)).toStrictEqual({
    id: 'vertical-tab-1',
    'aria-controls': 'vertical-tabpanel-1',
  });
});
