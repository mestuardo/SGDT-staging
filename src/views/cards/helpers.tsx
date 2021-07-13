import { red, yellow, green } from '@material-ui/core/colors';

const statusColor = (status:string) : string => {
  switch (status) {
    case 'JOB_OFFER':
      return red[500];
    case 'PSYCHOLOGICAL':
      return yellow[500];
    case 'TECHNICAL':
      return green[500];
    default:
      return 'white';
  }
};

export default statusColor;
