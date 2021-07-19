import {
  red, yellow, green, blueGrey,
} from '@material-ui/core/colors';

const statusColor = (status:string) : string => {
  switch (status) {
    case 'CLOSE':
      return red[500];
    case 'MID':
      return yellow[700];
    case 'FAR':
      return green[500];
    case 'CLOSED':
      return blueGrey[500];
    default:
      return red[500];
  }
};

export default statusColor;
