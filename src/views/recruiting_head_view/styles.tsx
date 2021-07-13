import { makeStyles } from '@material-ui/core/styles';

const recruitingHeadViewStyles = makeStyles((theme) => ({
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
    height: theme.spacing(72),
    textAlign: 'center',
    justifyContent: 'center',
    '@media only screen and (max-width: 1279px)': {
      margin: theme.spacing(0),
    },
    '@media only screen and (max-width: 600px)': {
      height: theme.spacing(73),
    },
  },
  verticalTabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: theme.spacing(30),
  },
  horizontalTabs: {
    display: 'flex',
    marginBottom: 0,
    justifyContent: 'center',
    padding: 0,
    borderRadius: 0,
  },
  queryDetails: {
    textAlign: 'left',
    width: '90%',
    margin: 'auto',
    maxWidth: '250px',
    wordWrap: 'break-word',
    maxHeight: '250px',
    overflowY: 'auto',
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
}));

export default recruitingHeadViewStyles;
