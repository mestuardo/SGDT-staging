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
}));

export default requestReviewStyles;
