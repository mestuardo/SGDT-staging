import { isWidthUp } from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

/* This function is used to determine the width of the screen and make the number
of components displayed by the GridList according to the size of the screen. */
const getCols = (screenWidth:Breakpoint): { cols: number, gridwidth: string } => {
  if (isWidthUp('lg', screenWidth)) {
    return { cols: 4, gridwidth: '1020px' };
  }
  if (isWidthUp('md', screenWidth)) {
    return { cols: 4, gridwidth: '850px' };
  }
  if (isWidthUp('sm', screenWidth)) {
    return { cols: 2, gridwidth: '500px' };
  }
  return { cols: 1, gridwidth: '433px' };
};

export default getCols;
