import { makeStyles } from '@material-ui/core/styles';

const requestReviewStyles = makeStyles((theme) => ({
  root: {
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
  formControl: {
    margin: theme.spacing(1),
    width: 180,
  },
  title: {
    margin: theme.spacing(0, 0, 3, 0),
  },
  labelText: {
    fontSize: 'small',
  },
  descriptionGrid: {
    textAlign: 'left',
  },
  questionField: {
    width: '70%',
    margin: theme.spacing(1),
  },
  helperText: {
    fontSize: 'x-small',
    margin: theme.spacing(0.5, 0),
    padding: 0,
    height: 0,
  },
  button: {
    margin: theme.spacing(0, 1),
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

export default requestReviewStyles;
