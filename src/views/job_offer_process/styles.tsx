import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from '@material-ui/core/styles';
import StepConnector from '@material-ui/core/StepConnector';
import { green } from '@material-ui/core/colors';

export const jobOfferDetailStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    textAlign: 'center',
  },
  avatar: {
    margin: 'auto',
    width: theme.spacing(20),
    height: theme.spacing(20),
    backgroundColor: theme.palette.primary.main,
    '@media only screen and (max-width: 600px)': {
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
  },
  icon: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    '@media only screen and (max-width: 600px)': {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
  },
  detailBody: {
    textAlign: 'left',
    padding: theme.spacing(4),
    height: '300px',
    '@media only screen and (max-width: 600px)': {
      padding: 0,
      height: '200px',
    },
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: 6,
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

export const profileCardStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    maxWidth: 230,
    margin: theme.spacing(0.5),
  },
  cardHeader: {
    marginBottom: 0,
    paddingBottom: 0,

  },
  avatar: {
    backgroundColor: green[600],
    sizes: 'large',
    alignItems: 'center',
  },
  cardContent: {
    textAlign: 'left',
    height: theme.spacing(12),
  },
}));

export const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 15,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

export const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 35,
    height: 35,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
});

export const recruitmentProcessStepperStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    minHeight: theme.spacing(56),
    width: '100%',
    textAlign: 'center',
  },
  stepper: {
    width: 'fit-content',
    margin: 'auto',
    paddingBottom: 0,
  },
  button: {
    display: 'none',
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  GridListTile: {
    display: 'grid',
    justifyContent: 'center',
  },
  // Vertical grid style
  YgridList: {
    height: theme.spacing(46),
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
}));

export const applicantInfoStyles = makeStyles((theme) => ({
  DialogContent: {
    width: theme.spacing(60),
    '@media only screen and (max-width: 600px)': {
      width: '100%',
    },
  },
  avatar: {
    margin: 'auto',
    width: theme.spacing(10),
    height: theme.spacing(10),
    backgroundColor: theme.palette.primary.main,
  },
  descriptionGrid: {
    height: '200px',
    padding: theme.spacing(4),
    overflowY: 'auto',
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
}));

export const changeStageDialogStyles = makeStyles((theme) => ({
  DialogContent: {
    width: theme.spacing(45),
    '@media only screen and (max-width: 600px)': {
      width: '100%',
    },
  },
  avatar: {
    margin: 'auto',
    width: theme.spacing(10),
    height: theme.spacing(10),
    backgroundColor: theme.palette.primary.main,
  },
  descriptionGrid: {
    height: '200px',
    padding: theme.spacing(4),
    overflowY: 'auto',
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
}));
