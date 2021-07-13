import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

const drawerWidth = 200;

const drawerStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    height: '10px',
    margin: 0,
    padding: 0,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    height: theme.spacing(6),
  },
  iconStyle: {
    margin: 0,
  },
  title: {
    cursor: 'pointer',
  },
  toolbar: {
    minHeight: theme.spacing(6),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
  },
}));

export default drawerStyles;
