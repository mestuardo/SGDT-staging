import { makeStyles } from '@material-ui/core/styles';
import {
  red,
} from '@material-ui/core/colors';

const recruiterViewStyles = makeStyles((theme) => ({
  gridContainer: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(0),
    marginLeft: theme.spacing(10),
    textAlign: 'center',
    '@media only screen and (max-width: 1250px)': {
      marginLeft: theme.spacing(0),
    },
  },
  gridItem: {
    margin: theme.spacing(0, 0),
    marginLeft: theme.spacing(1),
  },
  root: {
    marginBottom: theme.spacing(0),
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: theme.spacing(69),
    textAlign: 'center',
    justifyContent: 'center',
    '@media only screen and (max-width: 1279px)': {
      margin: theme.spacing(0),
      height: theme.spacing(77),
    },
  },
  verticalTabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: theme.spacing(20),
  },
  horizontalTabs: {
    display: 'flex',
    marginBottom: 0,
    justifyContent: 'center',
    padding: 0,
    borderRadius: 0,
  },
  GridListTile: {
    display: 'grid',
    justifyContent: 'center',
  },
  XgridList: {
    flexWrap: 'nowrap',
    maxWidth: 1100,
    transform: 'translateZ(0)',
    '&::-webkit-scrollbar': {
      height: 5,
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
  YgridList: {
    height: theme.spacing(58),
    '&::-webkit-scrollbar': {
      width: 5,
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
  inputText: {
    fontSize: 'small',
  },
  responsiveHeader: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'space-between',
    '@media only screen and (max-width: 601px)': {
      display: 'grid',
      justifyContent: 'center',
      placeItems: 'center',

    },
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    margin: theme.spacing(1),
    backgroundColor: red[200],
  },
  icon: {
    color: '#fff',
  },
  badgeDefault: {
    marginRight: theme.spacing(2),
    color: 'white',
    backgroundColor: 'red',
  },
  badgeAccepted: {
    color: 'white',
    backgroundColor: 'green',
  },
  badgePsy: {
    color: 'black',
    backgroundColor: 'orange',
  },
  badgeTech: {
    color: 'white',
    backgroundColor: 'blue',
  },

}));

export default recruiterViewStyles;
