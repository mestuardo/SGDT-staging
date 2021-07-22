import {
  red,
  yellow,
  green,
  blueGrey,
} from '@material-ui/core/colors';
import statusColor from '../../views/cards/helpers';

describe('assign statusColor according to status', () => {
  test('assign red to SLA close to end', () => {
    expect(statusColor('CLOSE')).toStrictEqual(red[500]);
  });
  test('assign yellow to SLA mid range to end', () => {
    expect(statusColor('MID')).toStrictEqual(yellow[700]);
  });
  test('assign green to SLA far away from ending', () => {
    expect(statusColor('FAR')).toStrictEqual(green[500]);
  });
  test('assign grey to closed jobOffer', () => {
    expect(statusColor('CLOSED')).toStrictEqual(blueGrey[500]);
  });
  test('assign red to others', () => {
    expect(statusColor('example')).toStrictEqual(red[500]);
  });
});
