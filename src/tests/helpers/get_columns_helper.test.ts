import assignIdgetColsToTab from '../../helpers/get_columns_helper';

describe('get column number for different screen width', () => {
  test('lg screen returns 4 columns', () => {
    expect(assignIdgetColsToTab('lg')).toStrictEqual({ cols: 4, gridwidth: '1020px' });
  });
  test('md screen returns 4 columns', () => {
    expect(assignIdgetColsToTab('md')).toStrictEqual({ cols: 4, gridwidth: '850px' });
  });
  test('sm screen returns 2 columns', () => {
    expect(assignIdgetColsToTab('sm')).toStrictEqual({ cols: 2, gridwidth: '500px' });
  });
  test('xs screen returns 1 columns', () => {
    expect(assignIdgetColsToTab('xs')).toStrictEqual({ cols: 1, gridwidth: '433px' });
  });
});
