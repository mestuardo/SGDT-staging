import { createTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#D9EDFF',
    },
    success: {
      main: '#4caf50',
    },
    info: {
      main: '#2196f3',
    },
    warning: {
      main: '#ff9800',
    },
  },
});

export default theme;
