import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const postedAppCardStyles = makeStyles((theme) => ({
  gridContainer: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(0),
    marginLeft: theme.spacing(10),
    '@media only screen and (max-width: 1250px)': {
      marginLeft: theme.spacing(0),
    },
  },
  gridItem: {
    margin: theme.spacing(0, 0),
    marginLeft: theme.spacing(1),
  },
  tabpanel: {
    margin: '0',
    minHeight: '500px',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 0,
  },
  horizontalTabs: {
    display: 'flex',
    marginBottom: 0,
    justifyContent: 'center',
    padding: 0,
    borderRadius: 0,
  },
  accordionPaper: {
    margin: '0',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 0,
  },

  accordionHeading: {
    margin: 'auto',
    '@media only screen and (max-width: 768px)': {
      fontSize: 'medium',
    },
  },
  GridListTile: {
    display: 'grid',
    justifyContent: 'center',
  },
  YgridList: {
    minHeight: theme.spacing(56),
    textAlign: 'center',
    // Here the scrollbar is stylized
    '&::-webkit-scrollbar': {
      width: 10,
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '8px',
      boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '8px',
      backgroundColor: 'darkgrey',

    },
  },
  avatar: {
    backgroundColor: green[600],
    height: '100px',
    width: '100px',
    alignItems: 'center',
  },
}));

export default postedAppCardStyles;
